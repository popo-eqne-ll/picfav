import { getOrSetDeviceId } from './deviceId';

/**
 * Posts the favorite status of a photo to the API.
 * @param photoId The ID of the photo.
 * @param status The new status ('favorited' or 'unfavorited').
 */
export const postFavoriteStatus = async (photoId: string, status: 'favorited' | 'unfavorited') => {
  const deviceId = getOrSetDeviceId();

  const payload = {
    photoId,
    deviceId,
    status,
  };

  console.log('Simulating API POST request with payload:', payload);

  // In a real application, you would use fetch() to send this to your backend:
  /*
  try {
    const response = await fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const result = await response.json();
    console.log('API response:', result);
  } catch (error) {
    console.error('Failed to post favorite status:', error);
    // Here you might want to handle the error, e.g., show a notification to the user
  }
  */

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 300));
};
