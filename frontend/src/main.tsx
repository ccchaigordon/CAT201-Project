import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import ArrivalPage from "./components/New Arrivals/ArrivalPage";
import Fender from "./components/Products/Fender";
import PRS from "./components/Products/Prs";
import Squier from "./components/Products/Squier";
import Marshall from "./components/Products/Marshall";
import Nux from "./components/Products/Nux";
import Focusrite from "./components/Products/Focusrite";
import ProductPage from "./components/Products/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/new-arrivals",
    element: <ArrivalPage />,
  },
  {
    path: "/fender",
    element: <Fender />,
  },
  {
    path: "/prs",
    element: <PRS />,
  },
  {
    path: "/squier",
    element: <Squier />,
  },
  {
    path: "/marshall",
    element: <Marshall />,
  },
  {
    path: "/nux",
    element: <Nux />,
  },
  {
    path: "/focusrite",
    element: <Focusrite />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
