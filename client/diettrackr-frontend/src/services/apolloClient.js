import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_API_URL, // stored in .env
    cache: new InMemoryCache(),
  });
  
  export default client;
  