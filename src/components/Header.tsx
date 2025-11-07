import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  hasFavorites: boolean;
}

export const Header = ({ hasFavorites }: HeaderProps) => {
  const location = useLocation();

  return (
    <header className="app-header">

      <nav>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''} aria-current={location.pathname === '/' ? 'page' : undefined}>ライブ公演一覧</Link>
        {hasFavorites && (
          <Link to="/favorites" className={location.pathname === '/favorites' ? 'active' : ''} aria-current={location.pathname === '/favorites' ? 'page' : undefined}>お気に入り</Link>
        )}
      </nav>
    </header>
  );
};