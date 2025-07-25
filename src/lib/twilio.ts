
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || accountSid.includes('<YOUR_TWILIO_ACCOUNT_SID>')) {
  throw new Error('Twilio Account SID is not configured. Please set it in your .env.local file.');
}
if (!authToken || authToken.includes('<YOUR_TWILIO_AUTH_TOKEN>')) {
  throw new Error('Twilio Auth Token is not configured. Please set it in your .env.local file.');
}
if (!phoneNumber || phoneNumber.includes('<YOUR_TWILIO_PHONE_NUMBER>')) {
  throw new Error('Twilio Phone Number is not configured. Please set it in your .env.local file.');
}

const twilioClient = twilio(accountSid, authToken);
export const twilioPhoneNumber = phoneNumber;

export default twilioClient;
