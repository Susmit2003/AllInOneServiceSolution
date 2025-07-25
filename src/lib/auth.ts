
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import type { UserProfile } from '@/types';

const secretKey = process.env.JWT_SECRET;
const issuer = process.env.JWT_ISSUER;
const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

if (!secretKey || secretKey.includes('<YOUR_JWT_SECRET>')) {
    throw new Error('JWT_SECRET environment variable is not set or is a placeholder. Please set it in your .env.local file.');
}
if (!issuer || issuer.includes('<YOUR_JWT_ISSUER>')) {
    throw new Error('JWT_ISSUER environment variable is not set or is a placeholder. Please set it in your .env.local file.');
}

const key = new TextEncoder().encode(secretKey);
const COOKIE_NAME = 'jwt_token';

interface TokenPayload {
    userId: string;
    mobileNumber: string;
    username: string;
    country: string;
    currency: string;
    fullName?: string;
}

export async function encrypt(payload: TokenPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(issuer)
    .setExpirationTime(expiresIn)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
      issuer: issuer,
    });
    return payload;
  } catch (error) {
    // This will be caught if the token is invalid or expired
    console.log('Failed to verify token:', (error as Error).message);
    return null;
  }
}

export async function setTokenCookie(payload: TokenPayload) {
  // The cookie expiry should roughly match the JWT expiry. '7d' is 7 days.
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
  const session = await encrypt(payload);

  cookies().set(COOKIE_NAME, session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}

export async function clearTokenCookie() {
  cookies().set(COOKIE_NAME, '', { expires: new Date(0) });
}

export async function getTokenPayload(): Promise<TokenPayload | null> {
    const token = cookies().get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await decrypt(token);
}
