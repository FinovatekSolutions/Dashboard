'use server';

import fetch from 'node-fetch';

export async function pingStarlette() {
  const starletteUrl = process.env.STARLETTE_API_URL;
  // const starletteAccessToken = process.env.HUGGING_FACE_ACCESS_TOKEN;
  if (!starletteUrl) {
    throw new Error('starlette_URL is not defined in environment variables');
  }
  // if (!starletteAccessToken) {
  //   throw new Error('starletteAccessToken is not defined in environment variables');
  // }

  try {
    const response = await fetch(starletteUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch from Starlette API: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Assuming the API returns JSON data
  } catch (error) {
    // Handle errors more specifically based on your needs
    console.error('Error fetching from Starlette API:', error);
    throw error;
  }
}
