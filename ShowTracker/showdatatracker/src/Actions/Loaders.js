import axios from "axios";
import {
  getShowInfoById,
  getUserShowWatchedData,
} from "../Actions/ShowsActions";

export async function trendingLoader() {
  try {
    const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWNkNzk5ZDZlMjY1NTJmMjMzYzQ5NTdlNDljYzY2NSIsIm5iZiI6MTcyOTcxMjI3NS4zNzQ4NzMsInN1YiI6IjY3MDEzODZlZmEzZTY5ZTBlZjdjZmRkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n8-yVilGuEwjSC7lGsR2hcVpS9-OEfVVZiE7jjoakzg",
      },
    };

    return await fetch(url, options).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}

export const showDetailsLoader = async ({ params, request }) => {
  const url = new URL(request.url);
  const isAuth = url.searchParams.get("auth");

  try {
    const showInfo = await getShowInfoById(params.id);
    let userData;
    if (isAuth === "true") {
      userData = await getUserShowWatchedData(params.id);
    } else {
      userData = null;
    }

    return {
      showInfo: showInfo,
      userWatchedData: userData,
    };
  } catch (error) {
    console.log(error);
    window.location.href = "/*";
  }
};

export const myShowsLoader = async () => {
  try {
    const userWatchedData = await axios.get(
      `https://localhost:7028/api/v1/ShowsData/GetWatchedShows`,
      {
        withCredentials: true,
      },
      {
        Accept: "*/*",
        Host: "http://localhost:3000",
      }
    );

    const watchedShows = [];
    let show;

    for (let i = 0; i < userWatchedData.data.length; i++) {
      const url = `https://api.tvmaze.com/shows/${userWatchedData.data[i]}?embed=episodes`;
      const options = {
        method: "GET",
      };

      show = await fetch(url, options).then((response) => response.json());

      watchedShows.push(show);
    }

    return watchedShows;
  } catch (error) {
    console.log(error);
    window.location.href = "/*";
  }
};

export const settingsLoader = async () => {
  try {
    const res = await axios.get(
      `https://localhost:7015/api/v1/Account/GetUserInfo`,
      {
        withCredentials: true, // передается в конфигурацию запроса
      },
      {
        Accept: "*/*",
        Host: "http://localhost:3000",
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    window.location.href = "/*";
  }
};

export const watchLaterLoader = async () => {
  try {
    const userWatchedData = await axios.get(
      `https://localhost:7028/api/v1/ShowsData/GetWatchLaterShows`,
      {
        withCredentials: true,
      },
      {
        Accept: "*/*",
        Host: "http://localhost:3000",
      }
    );

    const watchedShows = [];
    let show;

    for (let i = 0; i < userWatchedData.data.length; i++) {
      const url = `https://api.tvmaze.com/shows/${userWatchedData.data[i]}?embed=episodes`;
      const options = {
        method: "GET",
      };

      show = await fetch(url, options).then((response) => response.json());

      watchedShows.push(show);
    }

    return watchedShows;
  } catch (error) {
    console.log(error);
    window.location.href = "/*";
  }
};

export const favouritesLoader = async () => {
  try {
    const userWatchedData = await axios.get(
      `https://localhost:7028/api/v1/ShowsData/GetFavouriteShows`,
      {
        withCredentials: true,
      },
      {
        Accept: "*/*",
        Host: "http://localhost:3000",
      }
    );

    const watchedShows = [];
    let show;

    for (let i = 0; i < userWatchedData.data.length; i++) {
      const url = `https://api.tvmaze.com/shows/${userWatchedData.data[i]}?embed=episodes`;
      const options = {
        method: "GET",
      };

      show = await fetch(url, options).then((response) => response.json());

      watchedShows.push(show);
    }

    return watchedShows;
  } catch (error) {
    console.log(error);
    window.location.href = "/*";
  }
};
