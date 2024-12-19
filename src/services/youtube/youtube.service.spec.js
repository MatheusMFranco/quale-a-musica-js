import { vi, describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';
import findVideo, { formatUrl } from './youtube.service';

vi.mock('axios');
axios.get = vi.fn();

describe('findVideo', () => {
  const apiKey = 'mock-api-key';
  const query = 'cats';

  beforeEach(() => {
    vi.clearAllMocks();
    import.meta.env.VITE_API_KEY = apiKey;
  });

  it('should return the YouTube embed link when a video is found', async () => {
    const mockResponse = {
      data: {
        items: [
          {
            id: { videoId: '123abc' },
            snippet: { title: 'Video Title', description: 'Video Description' }
          }
        ]
      }
    };

    axios.get.mockResolvedValue(mockResponse);

    const expectedUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=undefined`;
    const video = await findVideo(query);

    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    expect(video).toBe('https://www.youtube.com/embed/123abc');
  });

  it('should return null when no video is found', async () => {
    const mockResponse = {
      data: { items: [] }
    };

    axios.get.mockResolvedValue(mockResponse);
    const result = await findVideo(query);

    expect(result).toBeNull();
    expect(axios.get).toHaveBeenCalled();
  });

  it('should throw an error when the request fails', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await expect(findVideo(query)).rejects.toThrow('Failed to fetch video');
    expect(axios.get).toHaveBeenCalled();
  });

  it('should throw an error when there is no song name', async () => {
    await expect(findVideo(null)).rejects.toThrow('Failed to fetch video');
  });

  it('should format url name', () => {
    const url = formatUrl('song');
    expect(url).toBe('https://www.googleapis.com/youtube/v3/search?part=snippet&q=song&type=video&maxResults=1');
  });
});
