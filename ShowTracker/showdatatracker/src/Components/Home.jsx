import React, { useRef, useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, Link, useLoaderData } from "react-router-dom";
import Modal from "react-modal";
import { getShowsByName } from "../Actions/ShowsActions";
import { authContext } from "./MainWindow";

export default function Home() {
  const trendingShows = useLoaderData();
  const isAuthorized = useContext(authContext);
  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = useState(false);

  const searchRef = useRef();
  const [shows, setShows] = useState();

  const navigateTo = (path) => {
    navigate(path);
  };

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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

  const handleClickTrendShow = async (e, name) => {
    try {
      const res = await getShowsByName(name);

      console.log(res[0].show.id);
      navigateTo(
        `/showDetails/${res[0].show.id}?auth=${isAuthorized.authState}`
      );
    } catch (error) {
      return alert(error.message);
    }
  };

  return (
    <div className="text-gray-900 dark:text-gray-100">
      {/* Search Bar Section */}
      <div className="search-bar-container p-8 md:p-20">
        <div
          className="relative h-64 bg-cover bg-center"
          style={{ backgroundImage: `url('/bg-image.jpg')` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-yellow-500 mb-4">
              Find Your Show
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6 text-center">
              Discover the best entertainment tailored for you
            </p>
            <div className="flex items-center bg-yellow-100 dark:bg-yellow-700 rounded-full shadow-lg overflow-hidden w-full md:w-2/3 max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Type show's name"
                className="w-full px-6 py-3 text-black focus:outline-none rounded-l-full"
                ref={searchRef}
              />
              <button
                className="bg-yellow-500 dark:bg-yellow-400 hover:bg-yellow-600 dark:hover:bg-yellow-500 text-black px-6 py-3 font-bold rounded-r-full"
                type="button"
                onClick={handleClick}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Container */}
      <div className="slider-container p-8 md:p-20">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 text-center mb-8">
          Trending Shows
        </h2>
        <Slider {...settings}>
          {trendingShows &&
            trendingShows.results.map((show) => (
              <div key={show.id} className="p-4">
                <div
                  className="rounded-lg overflow-hidden shadow-lg bg-yellow-100 dark:bg-yellow-700 cursor-pointer"
                  onClick={(e) => {
                    handleClickTrendShow(e, show.name);
                  }}
                >
                  <div className="aspect-w-2 aspect-h-3">
                    <img
                      className="w-full h-full object-cover"
                      src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                      alt={show.name}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-black dark:text-white mb-2">
                      {show.name.length > 15
                        ? show.name.substring(0, 15) + "..."
                        : show.name}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {show.overview.length > 100
                        ? `${show.overview.substring(0, 100)}...`
                        : show.overview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => {
            setIsOpen(false);
          }}
          contentLabel="Shows Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            content: {
              padding: 0,
              border: "none",
              inset: "10% auto auto auto",
            },
          }}
        >
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-4xl w-full mx-4 md:mx-auto overflow-hidden">
              {/* Header Section */}
              <div className="p-4 bg-yellow-500 dark:bg-yellow-600 text-black dark:text-white font-bold text-lg">
                Available Shows
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-black dark:text-white text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Content Section */}
              <div className="p-6 max-h-[80vh] overflow-auto">
                {Array.isArray(shows) && shows.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {shows.map((show) => (
                      <div key={show.show.id} className="w-48">
                        <Link
                          to={`/showDetails/${show.show.id}?auth=${isAuthorized.authState}`}
                        >
                          <div className="bg-yellow-100 dark:bg-yellow-700 rounded-lg shadow-lg overflow-hidden text-black dark:text-white">
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
                              <h3 className="font-bold text-lg mb-2">
                                {show.show.name.length > 15
                                  ? show.show.name.substring(0, 15) + "..."
                                  : show.show.name}
                              </h3>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                Release Date: {show.show.premiered}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h1 className="text-2xl md:text-4xl font-bold text-yellow-500">
                    Sorry, nothing is found
                  </h1>
                )}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
