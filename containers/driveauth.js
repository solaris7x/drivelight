const { google } = require("googleapis");

const driveauth = async (client_email, private_key) => {
  const scopes = "https://www.googleapis.com/auth/drive.readonly";
  const jwt = new google.auth.JWT(client_email, null, private_key, scopes);
  return google.drive({
    version: "v3",
    auth: jwt,
  });
};

module.exports = driveauth;
