import nodemailer from 'nodemailer';

export const emailRegister = async (data) => {

    const { name, email, token } = data;


    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    //Email information

    const info = await transport.sendMail({
        from: '"UpTask - Project Manager" <accounts@uptask.com>',
        to: email,
        subject: "UpTask - Confirm your account.",
        text: "Confirm your account in UpTask",
        html: `
            <p>Hello ${name}, confirm your account:</p>

            <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm account</a>

            <p>If you did not create this account you can ignore this message.</p>
            <p>Greetings.</p>
        `
    })
    
};

export const emailForgotPassword = async (data) => {

    const { name, email, token } = data;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    //Email information

    const info = await transport.sendMail({
        from: '"UpTask - Project Manager" <accounts@uptask.com>',
        to: email,
        subject: "UpTask - Restore your Password.",
        text: "Restore your Password",
        html: `
            <p>Hello ${name},</p>

            <p>to reset your password follow the next link to generate a new password:</p>
            
            <a href="${process.env.FRONTEND_URL}/forget-password/${token}">Restore password</a>

            <p>If you did not requested this email you can ignore this message.</p>
            <p>Greetings.</p>
        `
    })
    
};