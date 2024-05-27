import { useState, useEffect } from 'react';
import axios from 'axios';

const useFieldCheck = (username, field, value, endpoint) => {
  const [isExisting, setIsExisting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username || !field || !value) return;

    const checkExistingField = async () => {
      setLoading(true);
      try {
        const response = await axios.get(endpoint, {
          params: { username, [field]: value },
        });

        const existingItems = response.data;
        setIsExisting(existingItems.some(item => item[field] === value));
      } catch (error) {
        console.error('Error checking existing field:', error);
      } finally {
        setLoading(false);
      }
    };

    checkExistingField();
  }, [username, field, value, endpoint]);

  return { isExisting, loading };
};

export default useFieldCheck;
