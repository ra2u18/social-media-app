import { ApolloClient, ApolloLink } from '@apollo/client';
import { errorLink } from './config/apollo/error-link';
import { createHttpLink } from './config/apollo/http-link';
import { localCache } from './config/apollo/local-cache';

export function createApolloClient() {
  const httpLink = createHttpLink();

  const apolloClient = new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: localCache,
    assumeImmutableResults: true,
  });

  return apolloClient;
}
