import Home from "./Components/Home";
import MainWindow from "./Components/MainWindow";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Myshows from "./Components/Myshows";

import {
  favouritesLoader,
  myShowsLoader,
  settingsLoader,
  showDetailsLoader,
  trendingLoader,
  watchLaterLoader,
} from "./Actions/Loaders";

import ShowDetails from "./Components/ShowDetails";
import Settings from "./Components/Settings";
import WatchLater from "./Components/WatchLater";
import Favourites from "./Components/Favourites";
import ErrorPage from "./Components/ErrorPage";

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
    path: "myshows",
    element: <Myshows />,
    loader: myShowsLoader,
  },
  {
    path: "showDetails/:id",
    element: <ShowDetails />,
    loader: showDetailsLoader,
  },
  {
    path: "settings",
    element: <Settings />,
    loader: settingsLoader,
  },
  {
    path: "watchLater",
    element: <WatchLater />,
    loader: watchLaterLoader,
  },
  {
    path: "favourites",
    element: <Favourites />,
    loader: favouritesLoader,
  },
  {
    path: "*",
    element: <ErrorPage />,
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
