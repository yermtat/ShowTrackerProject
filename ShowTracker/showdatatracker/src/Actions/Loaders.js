import axios from "axios";

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

export const showDetailsLoader = async ({ params }) => {
  try {
    console.log(params.id);
    const url = `https://api.tvmaze.com/shows/${params.id}?embed=episodes`;
    const options = {
      method: "GET",
    };

    const showInfo = await fetch(url, options).then((response) =>
      response.json()
    );
    console.log(showInfo);

    let userWatchedData;

    try {
      userWatchedData = await axios.get(
        `https://localhost:7028/api/v1/ShowsData/GetInfo/${params.id}`,
        {
          withCredentials: true, // передается в конфигурацию запроса
        },
        {
          Accept: "*/*",
          Host: "http://localhost:3000",
        }
      );

      console.log(userWatchedData.data);
    } catch {
      return { showInfo: showInfo, userWatchedData: null };
    }

    return { showInfo: showInfo, userWatchedData: userWatchedData.data };
  } catch (error) {
    console.log(error);
  }
};

export const myShowsLoader = async () => {
  try {
    const userWatchedData = await axios.get(
      `https://localhost:7028/api/v1/ShowsData/GetWatchedShows`,
      {
        withCredentials: true, // передается в конфигурацию запроса
      },
      {
        Accept: "*/*",
        Host: "http://localhost:3000",
      }
    );

    console.log(userWatchedData.data);

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

    console.log(watchedShows);
    return watchedShows;
  } catch (error) {
    console.log(error);
  }
};

export const settingsLoader = async () => {
  try {
    const res = await axios.get(
      `https://localhost:7015/api/v1/Account/IsEmailConfirmed`,
      {
        withCredentials: true, // передается в конфигурацию запроса
      },
      {
        Accept: "*/*",
        Host: "http://localhost:3000",
      }
    );

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
