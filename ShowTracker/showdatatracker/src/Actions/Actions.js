import axios from "axios";

export async function logout() {
  try {
    try {
      const fetchedData = await axios.post(
        "https://localhost:7015/api/v1/Auth/Logout",
        {},
        {
          withCredentials: true,
        },
        {
          headers: {
            Accept: "*/*",
            Host: "http://localhost:3000",
          },
        }
      );
    } catch (ex) {}
  } catch (ex) {}
}
