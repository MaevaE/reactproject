import React from "react";
import { banner1,banner2,banner3,banner4 } from "../assets/index";
import {HiArrowLeft} from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi";
import {useState} from "react";


const Banner = () =>{
    const [scrolle,setscrolle]= useState(0);
    const scrollleft =()=>{
        setscrolle(scrolle === 0?3:(prev)=>prev-1)
    };
    const scrollrigth =()=>{
        setscrolle(scrolle === 3?0:(prev)=>prev+1)
    };
    const data =[
            banner1,
            banner2,
            banner3,
            banner4,
    ];
return (
 <div className="w-full h-auto overflow-x-hidden">
    <div className="w-screen h-[650px] realtive">
        <div className="w-[400vw] h-full flex transition-transform duration-1000" style={{transform: `translateX(-${scrolle*100}vw)`}}>
            <img src={data[1]} className="w-full  object-cover h-auto" loading="priority" />
            <img src={data[0]} className="w-full h-auto object-cover " />
            <img src={data[2]} className="w-full h-auto object-cover " />
            <img src={data[3]} className="w-full h-auto object-cover "/>
        </div>
        <div className="absolute w-fit left-0 right-0 mx-auto flex gap-8  bottom-44">
            <div onClick={scrollleft} className="w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white hover:active:bg-gray-900 duration-300"><HiArrowLeft/></div>
            <div onClick={scrollrigth} className="w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white hover:active:bg-gray-900 duration-300"><HiArrowRight/></div>
        </div>
    </div>
</div>
);
}

export default Banner;