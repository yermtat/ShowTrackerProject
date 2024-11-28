import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { authContext } from "./MainWindow";
import { useNavigate } from "react-router-dom";
import {
  deleteFromWatchlist,
  addToWatchlist,
  watchEpisode,
  unwatchEpisode,
  addToWatchLater,
  deleteFromWatchLater,
  deleteFromFavourites,
  addToFavourites,
} from "../Actions/ShowsActions";

export default function ShowDetails() {
  const show = useLoaderData();
  const isAuthorized = useContext(authContext);
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Проверяем наличие IMDb ID
    if (!show?.showInfo?.externals?.imdb) {
      console.warn("IMDb ID отсутствует.");
      return;
    }

    const imdbId = show.showInfo.externals.imdb;

    const initializeKbox = () => {
      if (window.kbox) {
        try {
          // Перед вызовом добавляем задержку
          setTimeout(() => {
            window.kbox(".kinobox_player", {
              search: { imdb: imdbId },
            });
          }, 10); // Задержка для инициализации
        } catch (error) {
          console.error("Ошибка вызова kbox:", error);
        }
      }
    };

    const loadScript = () => {
      const script = document.createElement("script");
      script.src = "https://kinobox.tv/kinobox.min.js";
      script.async = true;

      script.onload = initializeKbox;

      document.body.appendChild(script);
    };

    // Если kbox уже загружен, инициализируем сразу
    if (window.kbox) {
      initializeKbox();
    } else {
      loadScript();
    }
  }, [show?.showInfo?.externals?.imdb]); // Зависимость на IMDb ID

  const handleClickWatch = async () => {
    try {
      await addToWatchlist(show.showInfo.id);

      navigateTo(
        `/showDetails/${show.showInfo.id}?auth=${isAuthorized.authState}`
      );
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  const handleClickUnwatch = async () => {
    try {
      await deleteFromWatchlist(show.showInfo.id);

      navigateTo(
        `/showDetails/${show.showInfo.id}?auth=${isAuthorized.authState}`
      );
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  const handleEpisode = async (episodeId, isWatched) => {
    try {
      let fetchedData;
      if (isWatched) {
        await watchEpisode(show.showInfo.id, episodeId);
      } else {
        await unwatchEpisode(show.showInfo.id, episodeId);
      }
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  const handleClicWatchLater = async () => {
    try {
      await addToWatchLater(show.showInfo.id);

      navigateTo(
        `/showDetails/${show.showInfo.id}?auth=${isAuthorized.authState}`
      );
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  const handleDeleteWatchLater = async () => {
    try {
      await deleteFromWatchLater(show.showInfo.id);

      navigateTo(
        `/showDetails/${show.showInfo.id}?auth=${isAuthorized.authState}`
      );
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  const handleClicAddFavourite = async () => {
    try {
      await addToFavourites(show.showInfo.id);

      navigateTo(
        `/showDetails/${show.showInfo.id}?auth=${isAuthorized.authState}`
      );
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  const handleDeleteFavourite = async () => {
    try {
      await deleteFromFavourites(show.showInfo.id);

      navigateTo(
        `/showDetails/${show.showInfo.id}?auth=${isAuthorized.authState}`
      );
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  return (
    <div className="">
      <div class="flex justify-center items-center h-full w-full">
        <ul class="list-none flex">
          <li class=" m-10">
            {show.showInfo.image ? (
              <img
                className="w-full h-56 object-cover"
                src={show.showInfo.image.original}
                alt={show.showInfo.name}
              />
            ) : (
              <img
                className="w-full h-56 object-cover"
                src="./bg.png"
                alt={show.showInfo.name}
              />
            )}
          </li>
          <li id="filmInfo" class="m-10">
            <div class="block max-w-[18rem] rounded-lg border border-success-600 bg-transparent text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
              <div class="p-6">
                <h5 class="mb-2 text-xl font-medium leading-tight text-success-600">
                  {show.showInfo.name} - {show.showInfo.id}
                </h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${show.showInfo.summary}`,
                  }}
                />
              </div>
            </div>

            {isAuthorized.authState && (
              <div>
                <button
                  onClick={
                    show.userWatchedData.isWatched
                      ? handleClickUnwatch
                      : handleClickWatch
                  }
                  className="m-10 h-11 border rounded-md text-white hover:text-orange-400 transition duration-300 ease-in-out bg-black"
                >
                  {show.userWatchedData.isWatched ? (
                    <span>Unwatch</span>
                  ) : (
                    <span>Add to watchlist</span>
                  )}
                </button>
                <button
                  onClick={
                    show.userWatchedData.isWatchLater
                      ? handleDeleteWatchLater
                      : handleClicWatchLater
                  }
                  className={`m-10 h-11 border rounded-md ${
                    show.userWatchedData.isWatched
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed mt-6 p-2 rounded-lg"
                      : " text-white hover:text-orange-400 transition duration-300 ease-in-out bg-black"
                  }`}
                  disabled={show.userWatchedData.isWatched}
                >
                  {show.userWatchedData.isWatchLater ? (
                    <span>Won't watch</span>
                  ) : (
                    <span>Watch later</span>
                  )}
                </button>
                <button
                  onClick={
                    show.userWatchedData.isFavourite
                      ? handleDeleteFavourite
                      : handleClicAddFavourite
                  }
                  className={`m-10 h-11 border rounded-md ${
                    !show.userWatchedData.isWatched
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed mt-6 p-2 rounded-lg"
                      : " text-white hover:text-orange-400 transition duration-300 ease-in-out bg-black"
                  }`}
                  disabled={!show.userWatchedData.isWatched}
                >
                  {show.userWatchedData.isFavourite ? (
                    <span>Don't like</span>
                  ) : (
                    <span>Like</span>
                  )}
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>

      <div>
        <div className="border rounded-xl border-gray-600">
          <ul className="list-none">
            {show.showInfo._embedded.episodes.map((episode) => (
              <li>
                <div className="m-5">
                  <span className="m-5">
                    {" "}
                    {episode.season} x {episode.number}
                  </span>
                  <span className="m-5"> {episode.name}</span>
                  <span className="m-5"> {episode.airdate}</span>

                  {isAuthorized.authState && (
                    <input
                      type="checkbox"
                      defaultChecked={
                        show.userWatchedData.isWatched &&
                        show.userWatchedData.watchedEpisodes.includes(
                          episode.id
                        )
                      }
                      disabled={!show.userWatchedData.isWatched}
                      onChange={(e) =>
                        handleEpisode(episode.id, e.target.checked)
                      }
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadow-md">
        <h1 className="text-xl font-bold mb-4 text-gray-800">
          Результаты поиска: {show.showInfo.name}
        </h1>
        <div className="kinobox_player w-full max-w-lg bg-white rounded-md shadow-md"></div>
      </div>
    </div>
  );
}
