import React, { useRef, useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useLoaderData } from "react-router-dom";
import Modal from "react-modal";
import { getShowsByName } from "../Actions/ShowsActions";
import { authContext } from "./MainWindow";

export default function Home() {
  const trendingShows = useLoaderData();
  const isAuthorized = useContext(authContext);

  const [modalIsOpen, setIsOpen] = useState(false);

  const searchRef = useRef();
  const [shows, setShows] = useState();

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  const handleClick = async () => {
    const search = searchRef.current.value;

    console.log(isAuthorized.authState);
    try {
      const res = await getShowsByName(search);

      setShows(res);

      setIsOpen(true);
    } catch (error) {
      return alert(error.message);
    }
  };

  return (
    <div>
      <div className="search-bar-container p-20">
        <div className="relative h-64 bg-cover bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center max-w-lg">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Find Your Show
              </h1>
              <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden w-full md:w-2/3 mx-auto">
                <input
                  type="text"
                  placeholder="Type show's name"
                  className="w-full px-6 py-3 text-gray-700 focus:outline-none"
                  ref={searchRef}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3"
                  type="button"
                  onClick={handleClick}
                >
                  Search
                </button>

                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => {
                    setIsOpen(false);
                  }}
                  contentLabel="Shows Modal"
                >
                  <div className="w-full flex flex-wrap">
                    {Array.isArray(shows) && shows.length > 0 ? (
                      shows.map((show) => (
                        <div key={show.show.id}>
                          <Link
                            to={`/showDetails/${show.show.id}?auth=${isAuthorized.authState}`}
                          >
                            <div className="w-48 bg-gray-800 rounded-lg overflow-hidden shadow-lg text-white m-10">
                              {show.show.image ? (
                                <img
                                  className="w-full h-56 object-cover"
                                  src={show.show.image.original}
                                  alt={show.show.name}
                                />
                              ) : (
                                <img
                                  className="w-full h-56 object-cover"
                                  src="/bg.png"
                                  alt={show.show.name}
                                />
                              )}

                              <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">
                                  {show.show.name.length > 15
                                    ? show.show.name.substring(0, 15) + "..."
                                    : show.show.name}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                  Release Date: {show.show.premiered}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <h1 className="text-4xl font-bold">
                        Sorry, nothing is found
                      </h1>
                    )}
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="slider-container p-20">
        <Slider {...settings}>
          {trendingShows &&
            trendingShows.results.map((show) => (
              <div
                key={show.id}
                className="max-w-xs rounded overflow-hidden shadow-lg bg-gray-800 text-white"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                  alt={show.name}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {" "}
                    {show.name.length > 15
                      ? show.name.substring(0, 15) + "..."
                      : show.name}
                  </div>
                  <p className="text-gray-400 text-base">
                    {show.overview > 100
                      ? `${show.overview.substring(0, 100)}...`
                      : show.overview}
                  </p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}
