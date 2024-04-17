'use server';

import fetch from 'node-fetch';

export async function pingHuggingFace() {
  const huggingFaceUrl = process.env.HUGGING_FACE_URL;
  const huggingFaceAccessToken = process.env.HUGGING_FACE_ACCESS_TOKEN;
  if (!huggingFaceUrl) {
    throw new Error('huggingFace_URL is not defined in environment variables');
  }
  if (!huggingFaceAccessToken) {
    throw new Error('huggingFaceAccessToken is not defined in environment variables');
  }

  try {
    const response = await fetch(huggingFaceUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch from Hugging Face API: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Assuming the API returns JSON data
  } catch (error) {
    // Handle errors more specifically based on your needs
    console.error('Error fetching from Hugging Face API:', error);
    throw error;
  }
}
