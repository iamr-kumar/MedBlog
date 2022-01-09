export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://medblogrestapi.herokuapp.com/"
    : "http://localhost:5000";
