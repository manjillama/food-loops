import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { selectAuth } from '../selectors';
import NotFoundPage from '../components/commons/NotFound';
import { MenuPage, AddMenuPage, UpdateMenuPage, MenuItemPage } from '../pages';

const ProtectedRoutes = () => {
  const auth = useSelector(selectAuth);

  if (auth)
    return (
      <Switch>
        <Route path="/menu" component={MenuPage} exact />
        <Route path="/menu/add" component={AddMenuPage} exact />
        <Route path="/menu/:menuItemId/edit" component={UpdateMenuPage} exact />
        <Route path="/menu/:menuItemId" component={MenuItemPage} exact />

        <Route component={NotFoundPage} />
      </Switch>
    );

  return <NotFoundPage />;
};

export default ProtectedRoutes;