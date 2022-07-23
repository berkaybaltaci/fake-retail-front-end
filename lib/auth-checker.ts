import { gql } from '@apollo/client';
import apolloClient from './apollo';

export default async function isLoggedIn() {
  const queryStr = `currentUser {
    name
  }`;

  const query = gql`
    query {
      ${queryStr}
    }
  `;

  const { data } = await apolloClient.query({
    query: query,
  });

  console.log(data);

  return data.currentUser !== null;
}
