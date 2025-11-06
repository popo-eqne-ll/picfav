import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useAppData } from '../hooks/useAppData'; // Import the new hook

export const PerformanceList = () => {
  const { favorites } = useFavorites();
  const { data: performances, loading, error } = useAppData(); // Use the hook
  const hasFavorites = favorites.size > 0;

  if (loading) {
    return <div className="page-container"><h2>Loading performances...</h2></div>;
  }

  if (error) {
    return <div className="page-container"><h2>Error: {error}</h2></div>;
  }

  if (!performances || performances.length === 0) {
    return <div className="page-container"><h2>No performances available.</h2></div>;
  }

  return (
    <div className="page-container">
      <h2>ライブ公演一覧</h2>
      <div className="performance-list">
        {hasFavorites && (
          <Link to="/favorites" className="performance-card favorite-shortcut-card">
            <h3>お気に入りの写真</h3>
            <p>{favorites.size}枚の写真</p>
          </Link>
        )}
        {performances.map(performance => (
          <Link key={performance.id} to={`/performance/${performance.id}`} className="performance-card">
            <h3>{performance.name}</h3>
            <p>{performance.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};