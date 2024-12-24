import axios from "axios";
import { API_BASE_URL_PINCODE } from "../utils/constants";



export const PincodeService = {
  getLocationByPincode: async (pincode) => {
    try {
      const response = await axios.get(`${API_BASE_URL_PINCODE}/${pincode}`);
      if (response.status === 200) {
        const place = response.data.places[0];
        return {
          country: response.data.country,
          state: place.state,
          city: place["place name"],
        };
      } else {
        throw new Error("Invalid response from API");
      }
    } catch (error) {
      console.error("Error fetching location by pincode:", error);
      throw new Error("Could not fetch location details");
    }
  },
};
