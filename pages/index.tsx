import type { NextPage } from 'next';
import Home from '../components/home/home';
import { MAIN_CONTENT_HEIGHT } from '../lib/constants';

const HomePage: NextPage = () => {
  return (
    <div style={{ padding: '1px', height: MAIN_CONTENT_HEIGHT }}>
      <Home viewCount={60} />
    </div>
  );
};

export default HomePage;
