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
// import Products from './Dashboard/Products.form';
// import Categories from './Dashboard/Categories.form';
import Customers from './Dashboard/Pages/Customers/Customers.page';
import Providers from './Dashboard/Pages/Providers/Providers.page';
import Provider from './Dashboard/Pages/Providers/components/Provider';
import Categories from './Dashboard/Pages/Categories/Categories.page';
import Products from './Dashboard/Pages/Products/Products.page';
import Product from './Dashboard/Pages/Products/components/Product';
import { ContextProvider } from './context/GlobalContext';
import { ContextProvider as ProviderContext } from './context/ProviderContext';
import { ContextProvider as ProductContext } from './context/ProductContext';

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
      <ProductContext>
        <ProviderContext>
          <ContextProvider>
            <Switch>
              <RouteWrapper
                exact
                path='/'
                layout={LayoutOne}
                component={Home}
              />
              <RouteWrapper
                path='/users'
                layout={LayoutOne}
                component={Users}
              />
              <RouteWrapper
                path='/signup'
                layout={LayoutOne}
                component={Signup}
              />
              <RouteWrapper
                path='/signin'
                layout={LayoutOne}
                component={Signin}
              />

              <RouteWrapper
                path='/customers'
                layout={LayoutTwo}
                component={Customers}
              />
              <RouteWrapper
                path='/providers'
                layout={LayoutTwo}
                component={Providers}
              />
              <RouteWrapper
                path='/provider/:id'
                layout={LayoutTwo}
                component={Provider}
              />
              <RouteWrapper
                path='/categories'
                layout={LayoutTwo}
                component={Categories}
              />
              <RouteWrapper
                path='/category/:id'
                layout={LayoutTwo}
                component={Categories}
              />
              <RouteWrapper
                path='/products'
                layout={LayoutTwo}
                component={Products}
              />
              <RouteWrapper
                path='/product/:id'
                layout={LayoutTwo}
                component={Product}
              />
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
          </ContextProvider>
        </ProviderContext>
      </ProductContext>
    </div>
  );
};
export default MainRouter;
