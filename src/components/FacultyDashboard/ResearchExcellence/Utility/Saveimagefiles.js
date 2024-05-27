// utils/fileUpload.js
import axios from 'axios';

export const uploadFile = async (file, username, endpoint, fieldName, tableName) => {
  const formData = new FormData();
  formData.append(fieldName, file); // Use fieldName as the key for appending file

  // Append username and tableName if needed
  if (username) {
    formData.append("username", username);
  }
  if (tableName) {
    formData.append("tableName", tableName);
  }

  try {
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
