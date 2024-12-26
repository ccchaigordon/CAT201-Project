import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import ArrivalPage from "./components/New Arrivals/ArrivalPage";
import Fender from "./components/Brands/Fender";
import PRS from "./components/Brands/Prs";
import Squier from "./components/Brands/Squier";
import Marshall from "./components/Brands/Marshall";
import Nux from "./components/Brands/Nux";
import Focusrite from "./components/Brands/Focusrite";
import BrandPage from "./components/Brands/BrandPage";
import CartPage from "./components/Cart/CartPage";

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
    element: <BrandPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
