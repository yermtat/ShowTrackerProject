export async function trendingLoader() {
  try {
    const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWNkNzk5ZDZlMjY1NTJmMjMzYzQ5NTdlNDljYzY2NSIsIm5iZiI6MTcyOTcxMjI3NS4zNzQ4NzMsInN1YiI6IjY3MDEzODZlZmEzZTY5ZTBlZjdjZmRkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n8-yVilGuEwjSC7lGsR2hcVpS9-OEfVVZiE7jjoakzg",
      },
    };

    return await fetch(url, options).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
}
