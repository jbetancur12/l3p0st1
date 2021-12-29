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
import Category from './Dashboard/Pages/Categories/components/Category';
import Products from './Dashboard/Pages/Products/Products.page';
import Product from './Dashboard/Pages/Products/components/Product';
import Roles from './Dashboard/Pages/Roles/Roles.page';
import Role from './Dashboard/Pages/Roles/components/Role';
import { ContextProvider } from './context/GlobalContext';
import { ContextProvider as ProviderContext } from './context/ProviderContext';
import { ContextProvider as ProductContext } from './context/ProductContext';
import { ContextProvider as RoleContext } from './context/RoleContext';

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
      <RoleContext>
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

                <PrivateRoute
                  path='/customers'
                  layout={LayoutTwo}
                  component={Customers}
                />
                <PrivateRoute
                  path='/providers'
                  layout={LayoutTwo}
                  component={Providers}
                />
                <PrivateRoute
                  path='/provider/:id'
                  layout={LayoutTwo}
                  component={Provider}
                />
                <PrivateRoute
                  path='/categories'
                  layout={LayoutTwo}
                  component={Categories}
                />
                <PrivateRoute
                  path='/category/:id'
                  layout={LayoutTwo}
                  component={Category}
                />
                <PrivateRoute
                  path='/products'
                  layout={LayoutTwo}
                  component={Products}
                />
                <PrivateRoute
                  path='/product/:id'
                  layout={LayoutTwo}
                  component={Product}
                />
                <PrivateRoute
                  path='/user/edit/:userId'
                  layout={LayoutOne}
                  component={EditProfile}
                />
                <PrivateRoute
                  path='/user/:userId'
                  layout={LayoutOne}
                  component={Profile}
                />

                <PrivateRoute
                  path='/roles'
                  layout={LayoutTwo}
                  component={Roles}
                />
                <PrivateRoute
                  path='/role/:id'
                  layout={LayoutTwo}
                  component={Role}
                />
              </Switch>
            </ContextProvider>
          </ProviderContext>
        </ProductContext>
      </RoleContext>
    </div>
  );
};

export default MainRouter;
