import { Link } from 'react-router-dom';
import performances from '../data.json';
import type { Performance } from '../types';
import { useFavorites } from '../hooks/useFavorites';

export const PerformanceList = () => {
  const { favorites } = useFavorites();
  const hasFavorites = favorites.size > 0;

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
        {(performances as Performance[]).map(performance => (
          <Link key={performance.id} to={`/performance/${performance.id}`} className="performance-card">
            <h3>{performance.name}</h3>
            <p>{performance.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
