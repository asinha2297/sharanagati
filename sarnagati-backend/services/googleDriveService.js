const { google } = require("googleapis");
const { Readable } = require("stream");
const { createPrivateKey } = require("crypto");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

function getPrivateKey() {
  let privateKey = process.env.GOOGLE_PRIVATE_KEY.trim();
  const quote = privateKey[0];
  if ((quote === "\"" || quote === "'") && privateKey.endsWith(quote)) {
    privateKey = privateKey.slice(1, -1);
  }

  privateKey = privateKey
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .trim();

  try {
    createPrivateKey(privateKey);
  } catch {
    throw new Error(
      "GOOGLE_PRIVATE_KEY must be a valid PEM private key from a Google service account JSON file."
    );
  }

  return privateKey;
}

function getDriveClient() {
  const requiredVariables = [
    "GOOGLE_SERVICE_ACCOUNT_EMAIL",
    "GOOGLE_PRIVATE_KEY",
    "GOOGLE_DRIVE_FOLDER_ID",
  ];
  const missingVariables = requiredVariables.filter(
    (name) => !process.env[name]?.trim()
  );
  if (missingVariables.length > 0) {
    throw new Error(
      `Google Drive configuration is missing: ${missingVariables.join(", ")}`
    );
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: getPrivateKey(),
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