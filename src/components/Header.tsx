import { Link } from 'react-router-dom';

interface HeaderProps {
  hasFavorites: boolean;
}

export const Header = ({ hasFavorites }: HeaderProps) => {
  return (
    <header className="app-header">
      <h1><Link to="./">PicFav</Link></h1>
      <nav>
        <Link to="/">ライブ公演一覧</Link>
        {hasFavorites && (
          <Link to="/favorites">お気に入り</Link>
        )}
      </nav>
    </header>
  );
};
