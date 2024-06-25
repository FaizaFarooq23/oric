import { IncomingForm } from "formidable";
import mv from "mv";

// Configure the Next.js API to disable the bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Main request handler function for the API route
export default async function handler(req, res) {
  // Use a promise to handle data from the incoming form
  const data = await new Promise((resolve, reject) => {
    // Create a new IncomingForm instance to handle file upload
    const form = new IncomingForm();
    // Set the upload directory
    form.uploadDir = "./public/uploads";
    form.keepExtensions = true; // Keep the file extensions

    // Parse the incoming form data
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      try {
        // Ensure the file exists and is an array
        if (files.profile_picture && Array.isArray(files.profile_picture) && files.profile_picture.length > 0) {
          const oldPath = files.profile_picture[0].filepath;
          const filename = fields.profile_picture_name;
          const newPath = `./public/uploads/cover_${filename}.png`;
          console.log("New path:", newPath);
          // Move the uploaded file to the specified directory
          mv(oldPath, newPath, function (err) {
            if (err) {
              console.error(err);
              return reject(err);
            }
            // Send the path to the uploaded file as a response
            resolve({ profile_picture_path: newPath });
          });
        } else {
          reject(new Error("No cover picture uploaded"));
        }
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  });

  // Send the response with the uploaded file path
  res.status(200).json(data);
}
