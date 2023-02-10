const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1', //Specify your region
});

const ses = new AWS.SES();
/* ==================Create Template=================*/

const params = {
  Template: {
    TemplateName: 'Otp',
    SubjectPart: 'Verification',
    HtmlPart: `<!DOCTYPE html>
      <html>
        <head>
          <title>OTP Email</title>
          <style>
            /* Add CSS for styling the email */
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              padding: 20px;
              text-align: center;
            }
      
            /* Add media queries for responsiveness */
            @media only screen and (max-width: 600px) {
              body {
                padding: 10px;
              }
            }
      
            h1 {
              color: #333;
              margin-top: 50px;
              font-size: 36px;
              text-align: center;
            }
      
            p {
              font-size: 18px;
              color: #666;
              margin-bottom: 20px;
            }
      
            .otp-code {
              font-size: 24px;
              color: #000;
              margin-bottom: 20px;
              font-weight: bold;
            }
      
            /* Add company logo */
            .logo {
              display: block;
              margin: 0 auto;
              width: 200px;
              margin-bottom: 20px;
            }
      
            /* Add "Need Help?" section */
            .help-section {
              margin-top: 50px;
              text-align: center;
            }
      
            /* Add "Need Help?" message */
            .help-section p {
              font-size: 18px;
              color: #666;
              margin-bottom: 20px;
            }
      
            /* Add "Contact Support" button */
            .help-section a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #333;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              margin-bottom: 20px;
            }
      
            /* Add hover effect to "Contact Support" button */
            .help-section a:hover {
              background-color: #666;
            }
      
            .social-links {
              margin-top: 50px;
              text-align: center;
            }
      
            /* Add social media icons */
            .social-links a {
              margin-right: 10px;
              display: inline-block;
            }
      
            /* Add sizes to social media icons */
            .social-links img {
              width: 40px;
              height: 40px;
            }
      
            /* Add hover effect to social media icons */
            .social-links a:hover {
              opacity: 0.7;
            }
      
            /* Add copyright section */
            .copyright {
              font-size: 14px;
              color: #999;
              margin-top: 50px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <img
            class="logo"
            src="https://res.cloudinary.com/dsavh0wlc/image/upload/v1674598608/assets/taron-logo_zv26lr.png"
            alt="Taron Logo"
          />
          <h1>Your OTP Code</h1>
          <p>Use the code below to complete your verification process:</p>
          <p class="otp-code">{{otp}}</p>
          <div class="help-section">
            <p>Need help?</p>
            <a href="mailto:support@taron.com">Contact Support</a>
          </div>
          <div class="social-links">
            <a href="#"
              ><img
                src="https://res.cloudinary.com/dsavh0wlc/image/upload/v1674598607/assets/facebook_wb3xt5.png"
                alt="Facebook"
            /></a>
            <a href="#"
              ><img
                src="https://res.cloudinary.com/dsavh0wlc/image/upload/v1674598608/assets/twitter_s38gh8.png"
                alt="Twitter"
            /></a>
            <a href="#"
              ><img
                src="https://res.cloudinary.com/dsavh0wlc/image/upload/v1674598607/assets/instagram_gpvxzp.png"
                alt="Instagram"
            /></a>
          </div>
          <div class="copyright">
            Copyright ©
            <?php echo date('Y'); ?>
            Taron Events Limited
          </div>
        </body>
      </html>
      `,
    TextPart: '',
  },
};

ses.createTemplate(params, (err, data) => {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data); // successful response
});
