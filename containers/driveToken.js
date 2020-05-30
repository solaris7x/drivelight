const { google } = require("googleapis");

const driveToken = async (req, res) => {
  const servicekey = require("../clutter/keys/renfir-valarian-1x-8e08f8270f2a.json");
  const client_email = servicekey.client_email;
  const private_key = servicekey.private_key;

  const scopes = "https://www.googleapis.com/auth/drive.readonly";
  const jwt = new google.auth.JWT(client_email, null, private_key, scopes);
  const token = await jwt.authorizeAsync();
  //   console.log(token.access_token);
  return res.json({ access: token.access_token });
};

module.exports = driveToken;

// driveToken(client_email, private_key);
