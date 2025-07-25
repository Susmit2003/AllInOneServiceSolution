import Razorpay from 'razorpay';
import { env } from 'process';

const razorpayKeyId = env.RAZORPAY_KEY_ID;
const razorpayKeySecret = env.RAZORPAY_KEY_SECRET;

if (!razorpayKeyId || razorpayKeyId.includes('<YOUR_RAZORPAY_KEY_ID>')) {
  throw new Error('Razorpay Key ID is not configured. Please set RAZORPAY_KEY_ID in your .env.local file.');
}
if (!razorpayKeySecret || razorpayKeySecret.includes('<YOUR_RAZORPAY_KEY_SECRET>')) {
  throw new Error('Razorpay Key Secret is not configured. Please set RAZORPAY_KEY_SECRET in your .env.local file.');
}

export const razorpayInstance = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});
