import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { HeaderResponsive } from '../components/ui/header';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import { CartProvider } from '../lib/context-store';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  const links = [
    { link: '/', label: 'Home Page' },
    { link: '/products/page/1', label: 'Products' },
    { link: '/login', label: 'Login' },
    { link: '/register', label: 'Register' },
  ];
  return (
    <CartProvider>
      <ApolloProvider client={apolloClient}>
        <NextNProgress />
        <HeaderResponsive links={links} />
        <Component {...pageProps} />
      </ApolloProvider>
    </CartProvider>
  );
}

export default MyApp;
