import { getOrSetDeviceId } from './deviceId';

// Get GAS endpoint from environment variable
const GAS_ENDPOINT = import.meta.env.VITE_GAS_ENDPOINT;

/**
 * Posts the favorite status of a photo to the API.
 * @param photoId The ID of the photo.
 * @param status The new status ('favorited' or 'unfavorited').
 */
export const postFavoriteStatus = async (photoId: string, status: 'favorited' | 'unfavorited') => {
  if (!GAS_ENDPOINT) {
    console.error('VITE_GAS_ENDPOINT is not defined. Skipping API POST.');
    return;
  }

  const deviceId = getOrSetDeviceId();

  const payload = {
    photo_id: photoId, // Use photoId as photo_id
    device_id: deviceId,
    status: status,
  };

  // Convert payload to URLSearchParams for application/x-www-form-urlencoded
  const formBody = new URLSearchParams(payload as Record<string, string>).toString();

  console.log('Sending API POST request to GAS endpoint:', GAS_ENDPOINT, 'with payload:', payload);

  try {
    const response = await fetch(GAS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    // Assuming GAS returns JSON, revert to .json()
    const result = await response.json(); 
    console.log('GAS API response:', result);
  } catch (error) {
    console.error('Failed to post favorite status to GAS:', error);
    // Here you might want to handle the error, e.g., show a notification to the user
  }
};