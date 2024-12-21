import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

export const formatUrl = (query) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1`;

export default async function findVideo(query) {
  const formatted = `${formatUrl(query)}&key=${apiKey}`;
  try {
    const response = await axios.get(formatted);
    if (response.data.items && response.data.items.length) {
      const video = response.data.items[0];
      return `https://www.youtube.com/embed/${video.id.videoId}`;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Failed to fetch video');
  }
}
