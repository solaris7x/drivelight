const driveauth = require("./driveauth");

const driveQuery = async (req, res) => {
  // const servicekey = require("../clutter/keys/renfir-valarian-1x-8e08f8270f2a.json");
  const client_email = process.env.service_email;
  const private_key = process.env.service_private_key.replace(/\\n/g, "\n");

  console.log(process.env.service_private_key.replace(/\\n/g, "\n"));
  const drive = await driveauth(client_email, private_key);

  // console.log(req.params);
  // console.log(req.headers);

  const driveFindId = async (drive, parentId, name) => {
    // const parentId = "1PVmMKk3y76uR5zvThr-FMoOekKhmktaS";
    const params = {
      pageSize: 50,
      orderBy: "name",
      corpora: "drive",
      driveId: "0APf25tE9P6-YUk9PVA",
      includeTeamDriveItems: true,
      supportsTeamDrives: true,
      fields: "nextPageToken, files(id, name, mimeType)",
    };
    params.q = `'${parentId}' in parents and trashed = false and name = '${name}'`;
    // console.log(params);
    let driveRes = await drive.files.list(params);
    if (
      driveRes.data.files[0].mimeType == "application/vnd.google-apps.shortcut"
    ) {
      const shortparams = {
        fileId: driveRes.data.files[0].id,
        supportsTeamDrives: true,
        fields: "name , shortcutDetails",
      };
      const shortres = await drive.files.get(shortparams);
      // console.log(shortres.data);
      driveRes.data.files[0].id = shortres.data.shortcutDetails.targetId;
      driveRes.data.files[0].mimeType =
        shortres.data.shortcutDetails.targetMimeType;
    }
    // console.log(driveRes.data.files);
    return driveRes.data.files[0];
  };

  const driveFolder = await driveFindId(
    drive,
    "1BV64m443RsydpcUDJ_SEMkfdrhKRaJKU",
    // "output_files_k40-test1"
    req.params.folder
  );
  // console.log(driveFolder);
  const driveFile = await driveFindId(
    drive,
    driveFolder.id,
    req.params.segment
  );
  console.log(driveFile);
  //Return file if MPD
  if (driveFile.mimeType == "text/xml") {
    let filerstream = await drive.files.get(
      { fileId: driveFile.id, alt: "media" },
      { responseType: "stream" }
    );
    // console.log(filerstream.data);

    //Set res headers
    res.header("Content-Type", "text/xml");
    res.header("Content-Disposition", "attachment");
    res.header("Cache-Control", "max-age=60, public");

    filerstream.data.pipe(res);
    filerstream.data.on("error", (err) => {
      console.log("Error in read stream..." + err);
    });
    return;
    // return res.send("Will get XML soon");
  } else {
    const redirURL =
      "https://www.googleapis.com/drive/v3/files/" +
      driveFile.id +
      "?alt=media";
    console.log(redirURL);
    return res.status(307).redirect(redirURL);
    // return res.send("dreibjw");
  }
};

module.exports = driveQuery;
