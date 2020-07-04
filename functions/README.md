The command bellow need to be executed inside the functions directory:
## Run logs:
npm run logs

## Compile cloud functions
npm run build

## Test the cloud functions
npm run serve

## Deploy cloud functions
npm run deploy

## Configure the mail transferts
Configure the email transport using the default SMTP transport and a GMail account (free for tests).
For other types of transports such as Sendgrid see https://nodemailer.com/transports/
 => TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables:
firebase functions:config:set gmail.mail=compte_that_send_the_email  gmail.password=**********

Also, don't forget to unlock captcha for the google account: https://accounts.google.com/DisplayUnlockCaptcha
and enable less secure app on https://myaccount.google.com/lesssecureapps
Note: These actions should be done after each deplyment to follow google security purpose
good luck!
