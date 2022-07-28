import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { HeaderResponsive } from '../components/ui/header';
import apolloClient from '../lib/apollo-client';
import { BACKGROUND_COLOR, LINKS, MAIN_CONTENT_HEIGHT } from '../lib/constants';
import { CartProvider } from '../lib/context-store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ApolloProvider client={apolloClient}>
        <NextNProgress />
        <HeaderResponsive links={LINKS} />
        <div
          style={{
            backgroundColor: BACKGROUND_COLOR,
          }}
        >
          <Component {...pageProps} />
        </div>
      </ApolloProvider>
    </CartProvider>
  );
}

export default MyApp;
