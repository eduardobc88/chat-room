const APP_CONFIG = {
  port: 3000,
  mongoDBURI: 'mongodb://172.17.0.2:27017/FSDE',
  bcryptSaltRounds: 12,
  appSecret: 'iCD5e@rx$3-9rR_QZwIW2Dg-Zn^h&heS', // 32 characters
  staticFilesPath: 'static',
  staticFilesPrefix: '/public',
  sessionMaxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
  ipAddressToListen: '0.0.0.0', // 0.0.0.0 for docker container
  domain: 'localhost', // localhost \ domain.com
  websiteTemplatesPath: './website/view/template/', // change only if edit the structure website directory
}

module.exports = APP_CONFIG
