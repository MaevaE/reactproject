import React from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";
import { useLoaderData } from "react-router-dom";
import { useState , useEffect } from "react";

const Home = () =>{
    const [products,setproducts]= useState([]);
    const data = useLoaderData();
    useEffect(()=>{
        setproducts(data.data);
    },[data])
return  <div>
    <Banner/>
    <Products products={products}/>
</div>;
}

export default Home;