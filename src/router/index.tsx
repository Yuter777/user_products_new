import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import { Spin } from "antd";
import { Suspense, lazy, FC } from "react";

const withSuspense = (Component: React.LazyExoticComponent<FC>) => {
  return (props: any) => (
    <Suspense fallback={<Spin size="large" />}>
      <Component {...props} />
    </Suspense>
  );
};

const Layout = withSuspense(lazy(() => import("../layout/layout")));
const Dashboard = withSuspense(
  lazy(() => import("../pages/dashboard/Dashboard"))
);
const Products = withSuspense(lazy(() => import("../pages/products/Products")));
const Users = withSuspense(lazy(() => import("../pages/users/Users")));
const Profile = withSuspense(lazy(() => import("../pages/profile/Profile")));
const NotFound = withSuspense(lazy(() => import("../pages/not-found")));
const Login = withSuspense(lazy(() => import("../pages/Login/Login")));
const SignUp = withSuspense(lazy(() => import("../pages/SignUp/SignUp")));

export const routes = createBrowserRouter([
  {
    path: paths.LOGIN,
    element: <Login />,
  },
  {
    path: paths.SIGNUP,
    element: <SignUp />,
  },
  {
    path: paths.HOME,
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: paths.PRODUCTS,
        element: <Products />,
      },
      {
        path: paths.USERS,
        element: <Users />,
      },
      {
        path: paths.PROFILE,
        element: <Profile />,
      },
      {
        path: paths.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
  {
    path: paths.NOT_FOUND,
    element: <NotFound />,
  },
]);
