import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { selectAuth } from '../selectors';
import NotFoundPage from '../components/commons/NotFound';
import { MenuPage } from '../pages';

const ProtectedRoutes = () => {
  const auth = useSelector(selectAuth);

  if (auth)
    return (
      <Switch>
        <Route path="/menu" component={MenuPage} exact />
        <Route component={NotFoundPage} />
      </Switch>
    );

  return <NotFoundPage />;
};

export default ProtectedRoutes;
