'use server';

import fetch from 'node-fetch';

export async function pingFlaskApi() {
  const flaskApiUrl = process.env.FLASK_API_URL;
  if (!flaskApiUrl) {
    throw new Error('FLASK_API_URL is not defined in environment variables');
  }

  try {
    const response = await fetch(flaskApiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch from Flask API: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Assuming the API returns JSON data
  } catch (error) {
    // Handle errors more specifically based on your needs
    console.error('Error fetching from Flask API:', error);
    throw error;
  }
}
