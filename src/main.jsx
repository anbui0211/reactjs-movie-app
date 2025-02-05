import { lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ModalProvider from "./context/ModalProvider";
import "./index.css";
import RootLayout from "./pages/RootLayout.jsx";
import SearchPage from "./pages/SearchPage";

// lazy import
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const TvShowDetail = lazy(() => import("./pages/TvShowDetail"));
const PeoplePage = lazy(() => import("./pages/PeoplePage"));
const HomePage = lazy(() => import("./pages/HomePage"));

const router = createBrowserRouter([
  {
    // Định nghĩa layout được sử dụng chung
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "/tv/:id",
        element: <TvShowDetail />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/people/:id",
        element: <PeoplePage />,
        loader: async ({ params }) => {
          const res = fetch(
            `https://api.themoviedb.org/3/person/${params.id}?append_to_response=combined_credits`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
              },
            },
          );
          return res;
        },
      },
    ],
  },

]);
createRoot(document.getElementById("root")).render(
  <ModalProvider>
    <RouterProvider router={router} />
  </ModalProvider>,
);
