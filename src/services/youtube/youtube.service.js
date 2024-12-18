import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

export default async function findVideo(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.items && response.data.items.length > 0) {
            const video = response.data.items[0];
            return `https://www.youtube.com/embed/${video.id.videoId}`;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching video from YouTube API:', error);
        throw new Error('Failed to fetch video');
    }
}
