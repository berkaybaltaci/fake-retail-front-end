import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { HeaderResponsive } from '../components/ui/header';

function MyApp({ Component, pageProps }: AppProps) {
  const links = [
    { link: '/', label: 'Home Page' },
    { link: '/products', label: 'Products' },
  ];
  return (
    <>
      <HeaderResponsive links={links} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
