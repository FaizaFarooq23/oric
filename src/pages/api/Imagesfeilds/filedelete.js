
import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { tableName, filename, username } = req.body;
    if (!tableName || !filename) {
      return res.status(400).json({ error: "Missing tableName or filename" });
    }
    const filePath = path.join(process.cwd(), "public/uploadfile", username, tableName, filename);
    try {
      await fs.access(filePath); // Check if the file exists
      await fs.unlink(filePath); // Delete the file
      res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
      if (error.code === 'ENOENT') {
        return res.status(404).json({ error: "File not found" });
      }
      throw error;
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: error.message });
  }
}
