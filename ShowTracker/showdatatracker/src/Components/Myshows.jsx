import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function Myshows() {
  const shows = useLoaderData();

  return (
    <div>
      <div className="w-full flex flex-wrap">
        {Array.isArray(shows) && shows.length > 0 ? (
          shows.map((show) => (
            <div>
              <Link to={`/showDetails/${show.id}`}>
                <div className="w-48 bg-gray-800 rounded-lg overflow-hidden shadow-lg text-white m-10">
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
