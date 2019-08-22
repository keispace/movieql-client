import React from 'react';
import client from './apolloClient';
import { HashRouter, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import Home from './home';
import Detail from './Detail';
function App() {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <>
          <Route exact={true} path={"/"} component={Home} />
          <Route exact={true} path={"/details/:movieId"} component={Detail} />
        </>
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
