import { IncomingForm } from "formidable";
import fs from "fs/promises";
import path from "path";
import { getSession } from "next-auth/react";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseFormData(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
}

async function processFiles(session, fields, files) {
  const username = session.user.username;
  let tableName = fields.tableName;
  // Ensure tableName is a string
  tableName = tableName.toString();
  const uploadDir = path.join(process.cwd(), "public/uploadfile", username, tableName);
  await fs.mkdir(uploadDir, { recursive: true });

  const savedFiles = {};

  for (const fileKey in files) {
    if (files.hasOwnProperty(fileKey)) {
      const fileArray = files[fileKey];
      for (const file of fileArray) {
        const oldPath = file.filepath;
        const filename = fields[`${fileKey}_name`] || fileKey;
        const newPath = path.join(uploadDir, `${filename}.png`);
        await fs.rename(oldPath, newPath);
        savedFiles[fileKey] = newPath;
      }
    }
  }

  return savedFiles;
}


export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    if (!session || !session.user || !session.user.username) {
      console.error("User not authenticated");
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { fields, files } = await parseFormData(req);
    const data = await processFiles(session, fields, files);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: error.message });
  }
}
