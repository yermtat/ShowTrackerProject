import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLoaderData } from "react-router-dom";

export default function Home() {
  const trendingShows = useLoaderData();

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div>
      <div className="slider-container">
        <Slider {...settings}>
          {trendingShows &&
            trendingShows.results.map((show) => (
              // <div className="max-w-xs rounded overflow-hidden shadow-lg bg-gray-800 text-white">
              //   <img
              //     className="w-full h-48 object-cover"
              //     src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              //     alt={show.name}
              //   />
              //   <div className="px-6 py-4">
              //     <div className="font-bold text-xl mb-2">{show.name}</div>
              //     {/* <p className="text-gray-400 text-base">
              //       {show.overview > 100
              //         ? `${show.overview.substring(0, 100)}...`
              //         : show.overview}
              //     </p> */}
              //   </div>
              // </div>

              <div>
                <div className="w-48 bg-gray-800 rounded-lg overflow-hidden shadow-lg text-white">
                  <img
                    className="w-full h-56 object-cover"
                    src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                    alt={show.name}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{show.name}</h3>
                    <p className="text-gray-400 text-sm">
                      Release Date: {show.first_air_date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}
