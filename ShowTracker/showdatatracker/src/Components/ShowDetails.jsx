import React, { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { authContext } from "./MainWindow";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ShowDetails() {
  const show = useLoaderData();
  const isAuthorized = useContext(authContext);
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Убедитесь, что kbox доступен
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = "https://kinobox.tv/kinobox.min.js";
      script.async = true;
      script.onload = () => {
        if (window.kbox) {
          window.kbox(".kinobox_player", {
            search: { title: show.showInfo.name },
          });
        }
      };
      document.body.appendChild(script);
    };

    if (!window.kbox) {
      loadScript();
    } else {
      window.kbox(".kinobox_player", { search: { title: show.showInfo.name } });
    }
  }, [show]); // Обновлять при изменении названия фильма

  const handleClickWatch = async () => {
    try {
      const fetchedData = await axios.post(
        `https://localhost:7028/api/v1/ShowsData/MarkWatched/${show.showInfo.id}`,
        {}, // тело запроса, если оно не нужно, оставьте пустым объектом
        {
          withCredentials: true, // передается в конфигурацию запроса
        },
        {
          Accept: "*/*",
          Host: "http://localhost:3000",
        }
      );

      console.log(fetchedData);
      navigateTo(`/showDetails/${show.showInfo.id}`);
    } catch (errors) {
      console.log(errors);
    }
  };

  const handleClickUnwatch = async () => {
    try {
      const fetchedData = await axios.post(
        `https://localhost:7028/api/v1/ShowsData/Unwatch/${show.showInfo.id}`,
        {}, // тело запроса, если оно не нужно, оставьте пустым объектом
        {
          withCredentials: true, // передается в конфигурацию запроса
        },
        {
          Accept: "*/*",
          Host: "http://localhost:3000",
        }
      );

      console.log(fetchedData);

      navigateTo(`/showDetails/${show.showInfo.id}`);
    } catch (errors) {
      console.log(errors);
    }
  };

  const handleEpisode = async (episodeId, isWatched) => {
    try {
      let fetchedData;
      if (isWatched) {
        fetchedData = await axios.post(
          `https://localhost:7028/api/v1/ShowsData/MarkWatched/${show.showInfo.id}/${episodeId}`,
          {}, // тело запроса, если оно не нужно, оставьте пустым объектом
          {
            withCredentials: true, // передается в конфигурацию запроса
          },
          {
            Accept: "*/*",
            Host: "http://localhost:3000",
          }
        );
      } else {
        fetchedData = await axios.post(
          `https://localhost:7028/api/v1/ShowsData/Unwatch/${show.showInfo.id}/${episodeId}`,
          {}, // тело запроса, если оно не нужно, оставьте пустым объектом
          {
            withCredentials: true, // передается в конфигурацию запроса
          },
          {
            Accept: "*/*",
            Host: "http://localhost:3000",
          }
        );
      }

      console.log(fetchedData);
    } catch (errors) {
      console.log(errors);
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
              <button
                onClick={
                  show.userWatchedData.showId
                    ? handleClickUnwatch
                    : handleClickWatch
                }
                className="m-10 h-11 border rounded-md text-white hover:text-orange-400 transition duration-300 ease-in-out bg-black"
              >
                {show.userWatchedData.showId ? (
                  <span>Unwatch</span>
                ) : (
                  <span>Add to watchlist</span>
                )}
              </button>
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
                        show.userWatchedData.showId === show.showInfo.id &&
                        show.userWatchedData.watchedEpisodes.includes(
                          episode.id
                        )
                      }
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
