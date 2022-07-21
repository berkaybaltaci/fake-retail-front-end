import type { NextPage } from 'next';
import Home from '../components/home/home';

const HomePage: NextPage = () => {
  return <Home viewCount={50} />;
};

export default HomePage;
