import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { PhotoItem } from '../components/PhotoItem';
import { useFavorites } from '../hooks/useFavorites';
import { useAppData } from '../hooks/useAppData'; // Import the new hook

export const PhotoGallery = () => {
  const { performanceId } = useParams<{ performanceId: string }>();
  const { favorites, toggleFavorite } = useFavorites();
  const { data: allPerformances, loading, error } = useAppData(); // Use the hook
  const location = useLocation();
  const navigate = useNavigate();
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const photoId = params.get('photo');
    if (photoId && !loading) {
      const photoElement = document.getElementById(`photo-${photoId}`);
      if (photoElement) {
        photoElement.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    }
  }, [location.search, loading]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const debounce = (func: (...args: unknown[]) => void, wait: number) => {
      let timeout: number;
      return (...args: unknown[]) => {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => func.apply(this, args), wait);
      };
    };

    const handleScroll = debounce(() => {
      const photoElements = Array.from(gallery.getElementsByClassName('photo-item')) as HTMLElement[];
      if (photoElements.length === 0) return;

      const viewportCenter = window.innerHeight / 2;

      let closestPhoto: { id: string | null, distance: number } = { id: null, distance: Infinity };

      photoElements.forEach(photoEl => {
        const rect = photoEl.getBoundingClientRect();
        const photoCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - photoCenter);

        if (distance < closestPhoto.distance) {
          closestPhoto = { id: photoEl.id.replace('photo-', ''), distance };
        }
      });

      if (closestPhoto.id) {
        const params = new URLSearchParams(location.search);
        if (params.get('photo') !== closestPhoto.id) {
          navigate(`?photo=${closestPhoto.id}`, { replace: true, state: { fromScroll: true } });
        }
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, location.search, navigate]);

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
      <div className="photo-gallery" ref={galleryRef}>
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