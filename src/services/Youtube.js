import axios from "axios";

const client = axios.create();

client.interceptors.request.use((config) => {
  console.log("entrou");
  const baseUrl = "https://www.googleapis.com/youtube/v3";
  const authToken = process.env.VUE_APP_YOUTUBE_TOKEN;
  config.url = baseUrl + config.url.concat(`&key=${authToken}`);
  return config;
});

export const getVideoDataByCode = async (code) => {
  try {
    const response = await client.get(`/videos?id=${code}&part=snippet`);
    if (response.data.items.length === 0) return null;
    return response.data.items[0];
  } catch(error) {
    console.error(error);
    return null;
  }
};
