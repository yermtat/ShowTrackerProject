import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLoaderData } from "react-router-dom";
import Modal from 'react-modal';

export default function Home() {
  const trendingShows = useLoaderData();

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
    console.log(searchRef.current.value);
    const search = searchRef.current.value;

    // const fetchedData = await fetch(
    //   `https://api.tvmaze.com/search/shows?q=${search}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })


    // const url = `https://api.tvmaze.com/search/shows?q=${search}`;
    // const options = {
    //   method: "GET"
    // };
    //   var res = await fetch(url, options)
    //   .then((response) => response.json())
    //   .then((results) => {
    //       setShows({
    //           results
    //       })});
    
    //   // const data = await fetchedData.json().then(d => setShows(d));

    //   console.log(res);


    const url = `https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=false&language=en-US&page=1`;
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWNkNzk5ZDZlMjY1NTJmMjMzYzQ5NTdlNDljYzY2NSIsIm5iZiI6MTcyOTc3NDYxOC41NjM4NjIsInN1YiI6IjY3MDEzODZlZmEzZTY5ZTBlZjdjZmRkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5H5On7YwdvZ41xF-9Ns6oJPpgHJBjIbVhC3QqOKMoY'
  }
};

var res = await fetch(url, options).then((res) => res.json());

setShows(res);

      setIsOpen(true);
  }

  return (
    <div>

      <div className="search-bar-container p-20">
        <div className="relative h-64 bg-cover bg-center" 
           >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center max-w-lg">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Find Your Show</h1>
            <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden w-full md:w-2/3 mx-auto">
              <input 
                type="text" 
                placeholder="Type show's name" 
                className="w-full px-6 py-3 text-gray-700 focus:outline-none" 
                ref={searchRef}
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3" type="button" onClick={handleClick}></button>

              <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {setIsOpen(false)}}
        contentLabel="Shows Modal"
      >
        <div className="w-full">
          {/* {shows &&
            shows.map((show) => (


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
            ))} */}



{shows &&
            shows.results.map((show) => (

              <div className="flex">
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




