import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { authContext } from "./MainWindow";
export default function WatchLater() {
  const shows = useLoaderData();

  const isAuthorized = useContext(authContext);

  return (
    <div>
      <div className="flex flex-wrap gap-10 p-10">
        {Array.isArray(shows) && shows.length > 0 ? (
          shows.map((show) => (
            <div>
              <Link
                to={`/showDetails/${show.id}?auth=${isAuthorized.authState}`}
              >
                <div className="bg-yellow-100 dark:bg-yellow-700 rounded-lg shadow-lg overflow-hidden text-black dark:text-white">
                  {show.image ? (
                    <img
                      className="w-full h-56 object-cover"
                      src={show.image.original}
                      alt={show.name}
                    />
                  ) : (
                    <img
                      className="w-full h-56 object-cover"
                      src="/bg.png"
                      alt={show.name}
                    />
                  )}

                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {show.name.length > 15
                        ? show.name.substring(0, 15) + "..."
                        : show.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Release Date: {show.premiered}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h1 className="text-4xl font-bold">Sorry, nothing is found</h1>
        )}
      </div>
    </div>
  );
}
