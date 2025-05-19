const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");
const path = require("path");

const rootDir = path.resolve();
const emailsDir = path.join(rootDir, "src/views/emails");

module.exports = class Email {
  constructor() {
    this.to = [];
    this.from = process.env.EMAIL_FROM;
  }

  newTransport() {
    if (process.env.SEND_EMAIL !== "YES") {
      return {
        sendMail: () => {},
      };
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async send(template, subject, emailContent) {
    const html = pug.renderFile(`${emailsDir}/${template}.pug`, {
      ...emailContent,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendRegisterEmail(user) {
    this.to = user.email;
    await this.send("registrarUsuario", "Felicitaciones por registrarte", {
      user,
    });
  }
};
