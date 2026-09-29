const { google } = require("googleapis");
const { Readable } = require("stream");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

function getDriveClient() {
  if (
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY
  ) {
    throw new Error("Google Drive credentials are not configured");
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: SCOPES,
  });

  return google.drive({
    version: "v3",
    auth,
  });
}

async function uploadImageToDrive({
  buffer,
  originalName,
  mimeType,
}) {
  const drive = getDriveClient();

  const safeName = `${Date.now()}_${originalName.replace(
    /[^a-zA-Z0-9._-]/g,
    "_"
  )}`;

  const response = await drive.files.create({
    requestBody: {
      name: safeName,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    },
    media: {
      mimeType,
      body: Readable.from(buffer),
    },
    fields: "id,name,mimeType,webViewLink,webContentLink",
  });

  const file = response.data;

  if (!file.id) {
    throw new Error("Google Drive upload failed: no file ID returned");
  }

  return {
    fileId: file.id,
    fileName: file.name,
    mimeType: file.mimeType,
    webViewLink: file.webViewLink || null,
    webContentLink: file.webContentLink || null,
  };
}

module.exports = {
  uploadImageToDrive,
};