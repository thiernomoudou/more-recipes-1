const kue = require('kue');
const path = require('path');
const winston = require('winston');
const Email = require('email-templates');
const nodeMailer = require('nodemailer');

const config = require('./../config');
const redisConfig = require('./../config/redis');

const queue = kue.createQueue({ redis: redisConfig[process.env.NODE_ENV] });
winston.info('The queue was created successfully. listening to jobs.');

const transporter = nodeMailer.createTransport({
  service: config.MAILER.SERVICE,
  auth: {
    user: config.MAILER.USER, // generated ethereal user
    pass: config.MAILER.PASS // generated ethereal password
  }
});

const sendEmail = async (recipient, message, template) => {
  if (!recipient) {
    return Promise.reject(new Error('No user provided'));
  }
  if (!message) {
    return Promise.reject(new Error('No message provided'));
  }

  const email = new Email({
    message: {
      from: '👻 Bahdcoder More-recipes',
      subject: `👻 ${message.subject || 'Bahdcoder More-recipes'}`,
      to: recipient.email
    },
    transport: transporter,
    send: true,
    preview: false,
    views: {
      root: path.resolve('server/emails')
    }
  });

  try {
    const results = await email.send({
      template: template.pug,
      locals: { ...template.locals }
    });

    return Promise.resolve(results);
  } catch (error) {
    return Promise.reject(error);
  }
};

queue.process('mails', async (job, done) => {
  try {
    const email = job.data;
    winston.info(`The email to ${email.recipient.email} is being processed ...`);
    await sendEmail(email.recipient, email.message, email.template);
    winston.info(`The email to ${email.recipient.email} was successfull.`);
    done();
  } catch (errors) {
    winston.info('The email sending was a failure.');
    winston.info(errors);
    done();
  }
});

