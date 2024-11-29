import { Link } from "react-router-dom";

export default function ErrorPage({
  errorCode = 404,
  message = "Page Not Found",
}) {
  return (
    <div className="text-gray-900 dark:text-gray-100  dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 lg:py-16 text-center">
        <div className="max-w-xl mx-auto bg-yellow-100 dark:bg-yellow-700 p-8 rounded-lg shadow-lg">
          <h1 className="text-6xl lg:text-8xl font-extrabold text-yellow-600 dark:text-yellow-300 mb-4">
            {errorCode}
          </h1>
          <p className="text-xl lg:text-2xl font-medium text-gray-800 dark:text-gray-200 mb-6">
            {message}
          </p>
          <p className="text-md text-gray-700 dark:text-gray-300 mb-6">
            Oops! It seems something went wrong. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-yellow-500 dark:bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-500 transition"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
