import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    fromPromise,
    InMemoryCache,
    NormalizedCacheObject,
  } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';
  import { onError } from '@apollo/client/link/error';
  
  import { REFRESH_TOKEN } from './mutations';
  
  const link = createHttpLink({
    uri: 'http://localhost:8000/graphql',
    credentials: 'include',
  });
  
  export let client: ApolloClient<NormalizedCacheObject>;
  
  const authLink = setContext((operation) => operation);
  
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors && operation.operationName !== 'refreshToken') {
      return fromPromise(client.mutate({ mutation: REFRESH_TOKEN })).flatMap(() => forward(operation));
    }
  
    return fromPromise(Promise.reject(graphQLErrors));
  });
  
  client = new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'none',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'none',
      },
      mutate: {
        errorPolicy: 'none',
      },
    },
    link: authLink.concat(ApolloLink.from([errorLink, link])),
  });
  