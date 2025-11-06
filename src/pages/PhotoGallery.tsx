import { useParams } from 'react-router-dom';
import type { Performance } from '../types';
import { PhotoItem } from '../components/PhotoItem';
import { useFavorites } from '../hooks/useFavorites';
import { useAppData } from '../hooks/useAppData'; // Import the new hook

export const PhotoGallery = () => {
  const { performanceId } = useParams<{ performanceId: string }>();
  const { favorites, toggleFavorite } = useFavorites();
  const { data: allPerformances, loading, error } = useAppData(); // Use the hook

  if (loading) {
    return <div className="page-container"><h2>Loading photos...</h2></div>;
  }

  if (error) {
    return <div className="page-container"><h2>Error: {error}</h2></div>;
  }

  if (!allPerformances) {
    return <div className="page-container"><h2>No performance data available.</h2></div>;
  }

  const performance = allPerformances.find(p => p.id === performanceId);

  if (!performance) {
    return <div className="page-container"><h2>Performance not found</h2></div>;
  }

  return (
    <div className="page-container">
      <h2>{performance.name}</h2>
      <div className="photo-gallery">
        {performance.photos.map(photo => (
          <PhotoItem 
            key={photo.id} 
            photo={photo} 
            isFavorite={favorites.has(photo.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};