import { useParams } from 'react-router-dom';
import performances from '../data.json';
import { PhotoItem } from '../components/PhotoItem';
import { useFavorites } from '../hooks/useFavorites';
import type { Performance } from '../types';

export const PhotoGallery = () => {
  const { performanceId } = useParams<{ performanceId: string }>();
  const { favorites, toggleFavorite } = useFavorites();

  const performance = (performances as Performance[]).find(p => p.id === performanceId);

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
            isFavorite={favorites.has(photo.url)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};
