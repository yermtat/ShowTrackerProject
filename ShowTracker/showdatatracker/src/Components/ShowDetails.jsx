import React from "react";
import { useLoaderData } from "react-router-dom";

export default function ShowDetails() {
  const show = useLoaderData();

  return (
    // <div>
    //   <div class="flex justify-center items-center h-screen w-screen">
    //     <ul class="list-none flex">
    //       <li class="filmPoster h-1/4 w-1/4 m-10">
    //         <img src={film.poster} class="h-full" />
    //       </li>
    //       <li id="filmInfo" class="m-10">
    //         <div class="block max-w-[18rem] rounded-lg border border-success-600 bg-transparent text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
    //           <div class="p-6">
    //             <h5 class="mb-2 text-xl font-medium leading-tight text-success-600">
    //               {film.name}
    //             </h5>
    //             <p class="text-base text-success-600">{film.summary}</p>
    //           </div>
    //         </div>
    //       </li>
    //     </ul>
    //   </div>
    // </div>

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
          src="./bg.png"
          alt={show.name}
        />
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          {show.name.length > 15
            ? show.name.substring(0, 15) + "..."
            : show.name}
        </h3>
        <p className="text-gray-400 text-sm">Release Date: {show.premiered}</p>
      </div>
    </div>
  );
}
