import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { HeaderResponsive } from '../components/ui/header';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import { CartProvider } from '../lib/context-store';

function MyApp({ Component, pageProps }: AppProps) {
  const links = [
    { link: '/', label: 'Home Page' },
    { link: '/products/page/1', label: 'Products' },
  ];
  return (
    <CartProvider>
      <ApolloProvider client={apolloClient}>
        <HeaderResponsive links={links} />
        <Component {...pageProps} />
      </ApolloProvider>
    </CartProvider>
  );
}

export default MyApp;
