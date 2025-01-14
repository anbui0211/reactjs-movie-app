import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import TvShowDetail from "./pages/TvShowDetail";

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
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
