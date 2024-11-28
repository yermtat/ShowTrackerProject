import axios from "axios";

export const getShowsByName = async (search) => {
  try {
    const url = `https://api.tvmaze.com/search/shows?q=${search}`;
    const options = {
      method: "GET",
    };
    var res = await fetch(url, options).then((response) => response.json());

    return res;
  } catch (error) {
    return error;
  }
};

export const deleteFromWatchlist = async (id) => {
  try {
    const fetchedData = await axios.post(
      `https://localhost:7028/api/v1/ShowsData/Unwatch/${id}`,
      {}, // тело запроса, если оно не нужно, оставьте пустым объектом
      {
        withCredentials: true, // передается в конфигурацию запроса
      },
      {
        Accept: "*/*",
        Host: "http://localhost:3000",
      }
    );
  } catch (error) {
    return error;
  }
};

export const addToWatchlist = async (id) => {
  try {
    const fetchedData = await axios.post(
      `https://localhost:7028/api/v1/ShowsData/MarkWatched/${id}`,
      {}, // тело запроса, если оно не нужно, оставьте пустым объектом
      {
        withCredentials: true, // передается в конфигурацию запроса
      },
      {
        Accept: "*/*",
        Host: "http://localhost:3000",
      }
    );
  } catch (error) {
    return error;
  }
};

export const watchEpisode = async (showId, episodeId) => {
  try {
    const fetchedData = await axios.post(
      `https://localhost:7028/api/v1/ShowsData/MarkWatched/${showId}/${episodeId}`,
      {},
      {
        withCredentials: true,
      },
      {
        Accept: "*/*",
        Host: "http://localhost:3000",
      }
    );
  } catch (error) {
    return error;
  }
};

export const unwatchEpisode = async (showId, episodeId) => {
  try {
    const fetchedData = await axios.post(
      `https://localhost:7028/api/v1/ShowsData/Unwatch/${showId}/${episodeId}`,
      {},
      {
        withCredentials: true,
      },
      {
        Accept: "*/*",
        Host: "http://localhost:3000",
      }
    );
  } catch (error) {
    return error;
  }
};

export const getShowInfoById = async (id) => {
  try {
    const url = `https://api.tvmaze.com/shows/${id}?embed=episodes`;
    const options = {
      method: "GET",
    };

    const showInfo = await fetch(url, options).then((response) =>
      response.json()
    );
    return showInfo;
  } catch (error) {
    return error;
  }
};

export const getUserShowWatchedData = async (id) => {
  try {
    const userWatchedData = await axios.get(
      `https://localhost:7028/api/v1/ShowsData/GetInfo/${id}`,
      {
        withCredentials: true, // передается в конфигурацию запроса
      },
      {
        Accept: "*/*",
        Host: "http://localhost:3000",
      }
    );

    return userWatchedData.data;
  } catch (error) {
    return alert(error.response.data.error);
  }
};

export const addToWatchLater = async (id) => {
  try {
    const fetchedData = await axios.post(
      `https://localhost:7028/api/v1/ShowsData/WatchLater/${id}`,
      {}, // тело запроса, если оно не нужно, оставьте пустым объектом
      {
        withCredentials: true, // передается в конфигурацию запроса
      },
      {
        Accept: "*/*",
        Host: "http://localhost:3000",
      }
    );
  } catch (error) {
    return error;
  }
};

export const deleteFromWatchLater = async (id) => {
  try {
    const fetchedData = await axios.post(
      `https://localhost:7028/api/v1/ShowsData/DeleteFromWatchLater/${id}`,
      {}, // тело запроса, если оно не нужно, оставьте пустым объектом
      {
        withCredentials: true, // передается в конфигурацию запроса
      },
      {
        Accept: "*/*",
        Host: "http://localhost:3000",
      }
    );
  } catch (error) {
    throw error;
  }
};
