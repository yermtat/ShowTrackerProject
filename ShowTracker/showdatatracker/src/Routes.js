import Home from "./Home";
import MainWindow from "./MainWindow";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import Myshows from "./Myshows";
import { trendingLoader } from "./Actions/Loaders";

const children = [
  {
    path: "/",
    element: <Home />,
    loader: trendingLoader,
  },
  {
    path: "home",
    element: <Home />,
    loader: trendingLoader,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "myshows",
    element: <Myshows />,
  },
];

const Routes = [
  {
    path: "/",
    element: <MainWindow />,
    children: children,
  },
];

export default Routes;
