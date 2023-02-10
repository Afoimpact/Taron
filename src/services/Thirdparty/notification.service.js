const { axiosPOST, } = require('../../utils/request');

class NotificationService {
  static sendEmail = async (data) => {
    const call = await axiosPOST(process.env.NOTIFICATION_SERVICE, data, {
      Authorization: process.env.SERVICE_TOKEN,
    });
    return call.data;
  };
}

module.exports = {NotificationService}