import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './common/apollo-client';

const client = createApolloClient();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
