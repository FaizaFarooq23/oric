import axios from 'axios';

// Function to delete a single file
export const deleteFile = async (username, tableName, filename, endpoint) => {
  try {
    const response = await axios.post(endpoint, { username, tableName, filename });
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};



export const deleteFiles = async (username, tableName, filenames, endpoint) => {
  try {
    console.log(filenames);
    
    // Prepare the payload
    const payload = {
      username,
      tableName,
      filenames
    };
console.log(payload)
    // Send a single request to delete all files at once
    const response = await axios.post(endpoint, payload);
    
    console.log('All files deleted successfully!', response.data);
  } catch (error) {
    console.error('Error deleting files:', error);
    throw error;
  }
};
