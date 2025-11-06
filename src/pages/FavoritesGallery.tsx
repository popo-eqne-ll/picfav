import type { Photo } from '../types';
import { PhotoItem } from '../components/PhotoItem';
import { useFavorites } from '../hooks/useFavorites';
import { useAppData } from '../hooks/useAppData'; // Import the new hook

export const FavoritesGallery = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { data: allPerformances, loading, error } = useAppData(); // Use the hook

  if (loading) {
    return <div className="page-container"><h2>Loading favorites...</h2></div>;
  }

  if (error) {
    return <div className="page-container"><h2>Error: {error}</h2></div>;
  }

  const allPhotos: Photo[] = allPerformances ? allPerformances.flatMap(p => p.photos) : [];
  const favoritePhotos = allPhotos.filter(photo => favorites.has(photo.id));

  return (
    <div className="page-container">
      <h2>My Favorites</h2>
      {favoritePhotos.length > 0 ? (
        <div className="photo-gallery">
          {favoritePhotos.map(photo => (
            <PhotoItem 
              key={photo.id} 
              photo={photo} 
              isFavorite={true} // Always true here
              onToggleFavorite={() => toggleFavorite(photo.id)}
            />
          ))}
        </div>
      ) : (
        <p>You haven't favorited any photos yet.</p>
      )}
    </div>
  );
};