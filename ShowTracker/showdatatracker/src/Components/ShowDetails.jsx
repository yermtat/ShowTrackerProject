import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { authContext } from "./MainWindow";
import axios from "axios";

export default function ShowDetails() {
  const show = useLoaderData();
  const isAuthorized = useContext(authContext);

  const handleClick = async () => {
    try {
      const fetchedData = await axios.post(
        `https://localhost:7028/api/v1/ShowsData/MarkWatched/${show.id}`,
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
    } catch (errors) {
      console.log(errors);
    }
  };

  const handleEpisode = (episodeNumber, seasonNumber, isWatched) => {
    console.log("checkbox");
    console.log(isWatched);
  };

  return (
    <div className="">
      <div class="flex justify-center items-center h-full w-full">
        <ul class="list-none flex">
          <li class=" m-10">
            {show.image ? (
              <img
                className="w-full h-56 object-cover"
                src={show.image.original}
                alt={show.name}
              />
            ) : (
              <img
                className="w-full h-56 object-cover"
                src="./bg.png"
                alt={show.name}
              />
            )}
          </li>
          <li id="filmInfo" class="m-10">
            <div class="block max-w-[18rem] rounded-lg border border-success-600 bg-transparent text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
              <div class="p-6">
                <h5 class="mb-2 text-xl font-medium leading-tight text-success-600">
                  {show.name} - {show.id}
                </h5>
                <div dangerouslySetInnerHTML={{ __html: `${show.summary}` }} />
              </div>
            </div>

            {isAuthorized.authState && (
              <button
                onClick={handleClick}
                className="m-10 h-11 border rounded-md text-white hover:text-orange-400 transition duration-300 ease-in-out bg-black"
              >
                Add to watchlist
              </button>
            )}
          </li>
        </ul>
      </div>

      <div>
        <div className="border rounded-xl border-gray-600">
          <ul className="list-none">
            {show._embedded.episodes.map((episode) => (
              <form onSubmit={handleEpisode}>
                <li>
                  <div className="m-5">
                    <span className="m-5">
                      {" "}
                      {episode.season} x {episode.number}
                    </span>
                    <span className="m-5"> {episode.name}</span>
                    <span className="m-5"> {episode.airdate}</span>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleEpisode(
                          episode.season,
                          episode.number,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                </li>
              </form>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
