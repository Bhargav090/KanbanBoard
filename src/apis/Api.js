import axios from "axios";

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

export const fetchTickets = async () => {
    try {
      const response = await axios.get(API_URL);
      return {
        tickets: response.data.tickets || [],
        users: response.data.users || [],
      };
    } catch (e) {
      console.error("Error:", e);
      return { tickets: [], users: [] };
    }
  };
  