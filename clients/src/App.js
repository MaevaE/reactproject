import React from "react";
import Home  from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Product from "./components/Product";
import {createBrowserRouter,Outlet,RouterProvider,ScrollRestoration} from "react-router-dom";
import { productsData } from "./api/Api";
import Login from "./pages/Login";


const Layout =()=>{
  return (
    <div>
      <Header/>
      <ScrollRestoration/>
      <Outlet/>
      <Footer/>
    </div>
  );
};
const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
      path:"/",
      element:<Home/>,
      loader:productsData
      },
      {
        path:"/Product/:id",
        element:<Product/>
      },
      {
        path:"/Cart",
        element:<Cart/>

      },
      {
        path:"/Login",
        element:<Login/>
      }
    ]
  }
])
function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
