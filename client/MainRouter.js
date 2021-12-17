import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Users from './user/Users';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import Menu from './core/Menu';
// import Dashboard from './Dashboard/Providers/ProviderForm';
import { LayoutOne, LayoutTwo } from './Layouts';
import Products from './Dashboard/Products.form';
// import Categories from './Dashboard/Categories.form';
import Customers from './Dashboard/Customers.page';
import Providers from './Dashboard/Providers.page';
import Categories from './Dashboard/Categories.page';

function RouteWrapper({ component: Component, layout: Layout, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

const MainRouter = () => {
  const [path, setPath] = useState('/');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.pathname);
    }
  }, []);

  return (
    <div>
      <Switch>
        <RouteWrapper exact path='/' layout={LayoutOne} component={Home} />
        <RouteWrapper path='/users' layout={LayoutOne} component={Users} />
        <RouteWrapper path='/signup' layout={LayoutOne} component={Signup} />
        <RouteWrapper path='/signin' layout={LayoutOne} component={Signin} />
        <RouteWrapper path='/customers' layout={LayoutTwo} component={Customers} />
        <RouteWrapper path='/providers' layout={LayoutTwo} component={Providers} />
        <RouteWrapper path='/categories' layout={LayoutTwo} component={Categories} />
        <RouteWrapper
          path='/dashboard'
          layout={LayoutTwo}
          component={Products}
        />
        {/* <RouteWrapper
          path='/products'
          layout={LayoutTwo}
          component={Categories}
        /> */}
        {/* <RouteWrapper
          path='/categories'
          layout={LayoutTwo}
          component={Dashboard}
        /> */}
        <PrivateRoute
          path='/user/edit/:userId'
          layout={LayoutOne}
          component={EditProfile}
        />
        <RouteWrapper
          path='/user/:userId'
          layout={LayoutOne}
          component={Profile}
        />
      </Switch>
    </div>
  );
};
export default MainRouter;
