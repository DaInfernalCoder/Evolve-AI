import { fetchAccessToken } from "hume";

export const getHumeAccessToken = async () => {
  try {
    const accessToken = await fetchAccessToken({
      apiKey: String(process.env.HUME_API_KEY),
      secretKey: String(process.env.HUME_SECRET_KEY),
    });

    if (accessToken === "undefined") {
      console.error("Hume access token is undefined");
      return null;
    }

    return accessToken ?? null;
  } catch (error) {
    console.error("Error fetching Hume access token:", error);
    return null;
  }
};
