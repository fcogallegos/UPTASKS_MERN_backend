import nodemailer from 'nodemailer';

export const emailRegister = async (data) => {

    const { name, email, token } = data;

    //TODO: move to environment variables
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "22c95861b8b1d7",
          pass: "d9f822114c0787"
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

    //TODO: move to environment variables
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "22c95861b8b1d7",
          pass: "d9f822114c0787"
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
            
            <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Restore password</a>

            <p>If you did not requested this email you can ignore this message.</p>
            <p>Greetings.</p>
        `
    })
    
};