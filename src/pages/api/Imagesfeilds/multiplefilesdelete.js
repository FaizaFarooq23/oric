
import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
   
    const { tableName, filenames, username } = req.body;

    if (!tableName || !filenames || !Array.isArray(filenames) || !username) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const basePath = path.join(process.cwd(), "public", "uploadfile", username, tableName);
    console.log(`Base path: ${basePath}`);

    await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(basePath, filename);
        console.log(`Attempting to delete file: ${filePath}`);
        try {
          await fs.access(filePath);
          await fs.unlink(filePath);
          console.log(`File deleted: ${filePath}`);
        } catch (error) {
          if (error.code === 'ENOENT') {
            console.warn(`File not found: ${filePath}`);
          } else {
            console.error(`Error deleting file ${filePath}:`, error);
            throw error;
          }
        }
      })
    );

    res.status(200).json({ message: "Files deleted successfully" });
  } catch (error) {
    console.error("Error deleting files:", error);
    res.status(500).json({ error: error.message });
  }
}
