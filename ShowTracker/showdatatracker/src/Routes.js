import Home from "./Home";
import MainWindow from "./MainWindow";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import Myshows from "./Myshows";

const children = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "home",
    element: <Home />,
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
