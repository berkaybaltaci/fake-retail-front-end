import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  credentials: 'include',
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
});

export default client;
