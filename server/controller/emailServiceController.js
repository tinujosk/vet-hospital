import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordEmail = async (email, password) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your New Account Password',
    text: `Welcome! Your new account password is: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
    console.log('Password email sent successfully');
  } catch (error) {
    console.error('Error sending password email:', error);
    return { success: false, error: error.message };
  }
};


export const sendResetEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    text: `Here is your password reset token: ${token}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    return { success: true };
  } catch (error) {
    console.error('Error sending email: ', error);
    return { success: false, error };
  }
};
