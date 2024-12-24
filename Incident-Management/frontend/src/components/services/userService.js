import { GET_USER_PROFILE_URL } from "../utils/constants";

  export const fetchProfile = async (userId) => {
    const auth = localStorage.getItem('auth'); 
    console.log(auth);
  
    const response = await fetch(`${GET_USER_PROFILE_URL}/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
    });
  
    if (!response.ok) {
        throw new Error('Failed to fetch profile data');
    }
  
    return await response.json();
  };
  
  
  
  