const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:   'smtp.gmail.com',
  port:   587,
  secure: false, 
  auth: {
    user: 'houssamtarik270@gmail.com', 
    pass: 'mjjugnpyubfufntp'          
  },
  tls: {
    rejectUnauthorized: false         
  }
});

/**
 * Send OTP Email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} otp - 6-digit OTP code
 * @param {string} type - 'verify' or 'reset'
 */
async function sendOtpEmail(to, subject, otp, type) {
  try {
    const mailOptions = {
      from: `"Smart CV Builder AI" <houssamtarik270@gmail.com>`,
      to,
      subject,
      text: `Your OTP code is: ${otp}. It expires in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #4f46e5; text-align: center;">Smart CV Builder AI</h2>
          <hr style="border: 0; border-top: 1px solid #e0e0e0;" />
          <p>Hello,</p>
          <p>Thank you for using our platform. Your 6-digit verification code is:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1e1b4b; background-color: #f3f4f6; padding: 10px 20px; border-radius: 5px; border: 1px dashed #4f46e5;">
              ${otp}
            </span>
          </div>
          <p>This code is valid for 10 minutes. Please do not share it with anyone.</p>
          <hr style="border: 0; border-top: 1px solid #e0e0e0; margin-top: 30px;" />
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">This is an automated email, please do not reply.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ [EMAIL] OTP sent successfully to ${to}`);
  } catch (error) {
    console.error('❌ [EMAIL ERROR]', error);
    throw error;
  }
}

module.exports = { sendOtpEmail };