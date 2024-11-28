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
    <div className="flex flex-col items-center p-6 bg-surface dark:bg-surface-dark text-on-surface dark:text-on-surface-dark">
      {/* Информация о сериале */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start w-full max-w-6xl gap-8 ">
        {/* Изображение сериала */}
        <div className="w-full sm:w-1/3">
          {show.showInfo.image ? (
            <img
              className="w-full h-auto rounded-lg object-cover shadow-md"
              src={show.showInfo.image.original}
              alt={show.showInfo.name}
            />
          ) : (
            <img
              className="w-full h-auto rounded-lg object-cover shadow-md"
              alt={show.showInfo.name}
            />
          )}
        </div>

        {/* Основная информация */}
        <div className="w-full sm:w-2/3">
          <div className="rounded-lg p-6 bg-slate-400 bg-opacity-35 dark:bg-primary-container-dark shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-primary dark:text-primary-dark">
              {show.showInfo.name}
            </h2>
            <p className="mb-2">
              <strong>Language:</strong> {show.showInfo.language}
            </p>
            <p className="mb-2">
              <strong>Genres:</strong> {show.showInfo.genres.join(", ")}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {show.showInfo.status}
            </p>
            <p className="mb-2">
              <strong>Runtime:</strong> {show.showInfo.averageRuntime} minutes
            </p>
            <div
              className="text-secondary dark:text-secondary-dark"
              dangerouslySetInnerHTML={{
                __html: show.showInfo.summary,
              }}
            />
          </div>

          {isAuthorized.authState && (
            <div className="flex flex-wrap gap-4 mt-6">
              {/* Кнопка Watch */}
              <button
                onClick={
                  show.userWatchedData.isWatched
                    ? handleClickUnwatch
                    : handleClickWatch
                }
                className="`w-full sm:w-auto px-6 py-3 text-center font-bold text-black bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700 transition-transform transform hover:scale-105"
              >
                {show.userWatchedData.isWatched
                  ? "Unwatch"
                  : "Add to watchlist"}
              </button>

              {/* Кнопка Watch Later */}
              <button
                onClick={
                  show.userWatchedData.isWatchLater
                    ? handleDeleteWatchLater
                    : handleClicWatchLater
                }
                disabled={show.userWatchedData.isWatched}
                className={`w-full sm:w-auto px-6 py-3 text-center rounded-md ${
                  show.userWatchedData.isWatched
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "font-bold text-black bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700 transition-transform transform hover:scale-105"
                }`}
              >
                {show.userWatchedData.isWatchLater
                  ? "Won't watch"
                  : "Watch later"}
              </button>

              {/* Иконка Favourite */}
              <button
                onClick={
                  show.userWatchedData.isFavourite
                    ? handleDeleteFavourite
                    : handleClicAddFavourite
                }
                disabled={!show.userWatchedData.isWatched}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition ${
                  !show.userWatchedData.isWatched
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : show.userWatchedData.isFavourite
                    ? "bg-red-600 text-white hover:bg-red-500"
                    : "bg-gray-500 text-gray-200 hover:bg-gray-400"
                }`}
              >
                ♥
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Видеоплеер */}
      <div className="w-full max-w-6xl my-8 bg-secondary-container dark:bg-secondary-container-dark p-6 rounded-lg">
        <div className="kinobox_player w-full h-full"></div>
      </div>

      {/* Список эпизодов */}
      <div className="w-full max-w-6xl">
        {Object.entries(
          show.showInfo._embedded.episodes.reduce((acc, episode) => {
            if (!acc[episode.season]) acc[episode.season] = [];
            acc[episode.season].push(episode);
            return acc;
          }, {})
        ).map(([season, episodes]) => (
          <div key={season} className="mb-8 ">
            <h4 className="text-2xl font-bold mb-4 text-primary dark:text-primary-dark">
              Season {season}
            </h4>
            <ul className="border bg-slate-400 bg-opacity-35 border-outline dark:border-outline-dark rounded-lg bg-surface-variant dark:bg-surface-variant-dark p-4">
              {episodes.map((episode) => (
                <li
                  key={episode.id}
                  className="flex justify-between items-center py-2 border-b border-outline dark:border-outline-dark last:border-b-0"
                >
                  <div>
                    <span className="font-bold text-on-surface dark:text-on-surface-dark">
                      {episode.season}x{episode.number}
                    </span>{" "}
                    - {episode.name}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-secondary dark:text-secondary-dark">
                      {episode.airdate}
                    </span>
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
                        className={`w-5 h-5 ${
                          show.userWatchedData.isWatched && "cursor-pointer"
                        }  accent-primary dark:accent-primary-dark`}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
