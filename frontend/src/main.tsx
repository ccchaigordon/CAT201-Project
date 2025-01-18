import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./components/userContext"; // Import UserProvider
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
import EnterProductId from "./components/admin/EnterProductId";
import EditProduct from "./components/admin/EditProduct";
import AddProduct from "./components/admin/AddProduct";
import LoginPage from "./components/ProfilePage/LoginPage";
import EditUserDetails from "./components/admin/EditUserDetails";
import EnterUserId from "./components/admin/EnterUserId";
import SignUpPage from "./components/ProfilePage/SignUpPage";
import Test from "./components/Test";
import UserProfile from "./components/ProfilePage/UserProfile";
import Invoice from "./components/Cart/Invoice";
import AboutUsPage from "./components/AboutUs/AboutUs";
import DealsPage from "./components/Deals/DealsPage";
import SearchedProducts from "./components/SearchedProducts/SearchedProducts";

const router = createBrowserRouter([
  {
    path: "/test",
    element: <Test />,
  },
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
    path: "/about-us",
    element: <AboutUsPage />,
  },
  {
    path: "/deals",
    element: <DealsPage />,
  },
  {
    path: "/searchedproducts",
    element: <SearchedProducts />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckOutPage />,
  },
  {
    path: "/invoice",
    element: <Invoice />,
  },
  {
    path: "/profile/login",
    element: <LoginPage />,
  },
  {
    path: "/profile/signup",
    element: <SignUpPage />,
  },
  {
    path: "/profile/user",
    element: <UserProfile />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/enter-user-id",
    element: <EnterUserId />,
  },
  {
    path: "/admin/edit-user",
    element: <EditUserDetails />,
  },
  {
    path: "/admin/edit-product",
    element: <EditProduct />,
  },
  {
    path: "/admin/add-product",
    element: <AddProduct />,
  },
  {
    path: "/admin/enter-product-id",
    element: <EnterProductId />,
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
    {/* Wrap the application with UserProvider */}
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import MainPage from "./components/MainPage/MainPage";
// import ArrivalPage from "./components/New Arrivals/ArrivalPage";
// import Fender from "./components/Brands/Fender";
// import PRS from "./components/Brands/Prs";
// import Squier from "./components/Brands/Squier";
// import Marshall from "./components/Brands/Marshall";
// import Nux from "./components/Brands/Nux";
// import Focusrite from "./components/Brands/Focusrite";
// import AboutUsPage from "./components/AboutUs/AboutUs";
// import ProductPage from "./components/global/ProductPage";
// import CartPage from "./components/Cart/CartPage";
// import CheckOutPage from "./components/Cart/CheckOutPage";
// import Guitars from "./components/Categories/Guitars";
// import Basses from "./components/Categories/Basses";
// import Drums from "./components/Categories/Drums";
// import Keyboards from "./components/Categories/Keyboards";
// import Accessories from "./components/Categories/Accessories";
// import TermsOfUse from "./components/Terms/TermsOfUse";
// import Privacy from "./components/Terms/Privacy";
// import DealsPage from "./components/Deals/DealsPage";
// import SearchedProducts from "./components/SearchedProducts/SearchedProducts";
// import AdminPage from "./components/admin/AdminPage";
// import EnterProductId from "./components/admin/EnterProductId";
// import EditProduct from "./components/admin/EditProduct";
// import AddProduct from "./components/admin/AddProduct";
// import EditUserDetails from "./components/admin/EditUser";
// import EnterUserId from "./components/admin/EnterUserId";
// import Invoice from "./components/Cart/Invoice";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainPage />,
//   },
//   {
//     path: "/new-arrivals",
//     element: <ArrivalPage />,
//   },
//   {
//     path: "/product/:id",
//     element: <ProductPage />,
//   },
//   {
//     path: "/about-us",
//     element: <AboutUsPage />,
//   },
//   {
//     path: "/deals",
//     element: <DealsPage />,
//   },
//   {
//     path: "/searchedproducts",
//     element: <SearchedProducts />,
//   },
//   {
//     path: "/cart",
//     element: <CartPage />,
//   },
//   {
//     path: "/checkout",
//     element: <CheckOutPage />,
//   },
//   {
//     path: "/invoice",
//     element: <Invoice />,
//   },
//   {
//     path : "/profile",
//     element: <AdminPage />,
//   },
//   {
//     path: "/admin/enter-user-id",
//     element: <EnterUserId />,
//   },
//   {
//     path: "/admin/edit-user",
//     element: <EditUserDetails />,
//   },
//   {
//     path: "/admin/edit-product",
//     element: <EditProduct />,
//   },
//   {
//     path: "/admin/add-product",
//     element: <AddProduct />,
//   },
//   {
//     path: "/admin/enterid",
//     element: <EnterProductId />,
//   },
//   {
//     path: "/brand",
//     children: [
//       {
//         path: "fender",
//         element: <Fender />,
//       },
//       {
//         path: "prs",
//         element: <PRS />,
//       },
//       {
//         path: "squier",
//         element: <Squier />,
//       },
//       {
//         path: "marshall",
//         element: <Marshall />,
//       },
//       {
//         path: "nux",
//         element: <Nux />,
//       },
//       {
//         path: "focusrite",
//         element: <Focusrite />,
//       },
//     ],
//   },
//   {
//     path: "/category",
//     children: [
//       {
//         path: "guitars",
//         element: <Guitars />,
//       },
//       {
//         path: "basses",
//         element: <Basses />,
//       },
//       {
//         path: "drums",
//         element: <Drums />,
//       },
//       {
//         path: "keyboards",
//         element: <Keyboards />,
//       },
//       {
//         path: "accessories",
//         element: <Accessories />,
//       },
//     ],
//   },
//   {
//     path: "/legal",
//     children: [
//       {
//         path: "terms-of-use",
//         element: <TermsOfUse />,
//       },
//       {
//         path: "privacy-policy",
//         element: <Privacy />,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
