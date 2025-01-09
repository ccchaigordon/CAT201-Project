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
import ProductPage from "./components/global/ProductPage";
import CartPage from "./components/Cart/CartPage";
import CheckOutPage from "./components/CheckOut/CheckOutPage";
import Guitars from "./components/Categories/Guitars";
import Basses from "./components/Categories/Basses";
import Drums from "./components/Categories/Drums";
import Keyboards from "./components/Categories/Keyboards";
import Accessories from "./components/Categories/Accessories";
import TermsOfUse from "./components/Terms/TermsOfUse";
import Privacy from "./components/Terms/Privacy";
import AdminPage from "./components/admin/AdminPage";
import EditProduct from "./components/admin/EditProduct";

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
    path: "/product/:id",
    element: <ProductPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path : "/profile",
    element: <AdminPage />,
  },
  {
    path: "/admin/edit-product",
    element: <EditProduct />,
  },
  {
    path: "/checkout",
    element: <CheckOutPage />,
  },
  {
    path: "/brand",
    children: [
      {
        path: "fender",
        element: <Fender />,
      },
      {
        path: "prs",
        element: <PRS />,
      },
      {
        path: "squier",
        element: <Squier />,
      },
      {
        path: "marshall",
        element: <Marshall />,
      },
      {
        path: "nux",
        element: <Nux />,
      },
      {
        path: "focusrite",
        element: <Focusrite />,
      },
    ],
  },
  {
    path: "/category",
    children: [
      {
        path: "guitars",
        element: <Guitars />,
      },
      {
        path: "basses",
        element: <Basses />,
      },
      {
        path: "drums",
        element: <Drums />,
      },
      {
        path: "keyboards",
        element: <Keyboards />,
      },
      {
        path: "accessories",
        element: <Accessories />,
      },
    ],
  },
  {
    path: "/legal",
    children: [
      {
        path: "terms-of-use",
        element: <TermsOfUse />,
      },
      {
        path: "privacy-policy",
        element: <Privacy />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
