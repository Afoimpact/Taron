// import nodemailer from 'nodemailer';
const AWS = require('aws-sdk');

const SES_CONFIG = {
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_,
};

const ses = new AWS.SES(SES_CONFIG);

class EmailUtils {
  static sendEmail = (
    recipientEmail,
    message,
    subject
  ) => {
    let params = {
      Source: process.env.VERIFIED_EMAIL,
      Destination: {
        ToAddresses: [recipientEmail],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: message,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
    };
    return ses.sendEmail(params).promise();
  };

  static sendTemplateEmail = (data) => {
    let params = {
      Source: process.env.VERIFIED_EMAIL,
      Template: data.template,
      Destination: {
        ToAddresses: [data.email],
      },
      TemplateData: data.template_data,
    };
    return ses.sendTemplatedEmail(params).promise();
  };
}

module.exports = {EmailUtils}