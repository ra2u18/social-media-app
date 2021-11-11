import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './common/apollo-client';

const client = createApolloClient();

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
