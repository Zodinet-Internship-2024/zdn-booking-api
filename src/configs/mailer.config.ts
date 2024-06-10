import { MailerOptions } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const mailerConfig: MailerOptions = {
  transport: {
    host: process.env.MAIL_HOST, // e.g., smtp.gmail.com
    port: +process.env.MAIL_PORT, // e.g., 587
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
  },
  defaults: {
    from: '"No Reply" <kangn2101@gmail.com>',
  },
  template: {
    dir: join(__dirname, '..', 'templates'),
    adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
    options: {
      strict: true,
    },
  },
};
