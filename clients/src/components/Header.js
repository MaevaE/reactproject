import React from "react";
import { useSelector }  from "react-redux";
import { cart, mapshop, user } from "../assets/index";
import { Link } from "react-router-dom";

const Header = () =>{
    const productData = useSelector((state)=> state.mapshop.productData);
    const userInfo = useSelector((state)=> state.mapshop.userInfo);
    console.log(userInfo);
return  (
            <div className="w-full h-20  bg-white border-b-[1px]  border-b-gray-800 font-titleFont sticky top-0 z-50">
               <div  className="max-w-screen-xl h-full flex items-center mx-auto justify-between  ">


               <Link to="/"><div className="text-black text-4xl font-bold line-through">mapshop</div></Link>
              
               <div>
                   <div className="flex items-center gap-8">
                      <ul className="flex items-center gap-8">
                               <li className="text-base text-black font-bold hover:text-orange-900 hover:underline hover:ring-offset-2 decoration-[1px] cursor-pointer duration-300">Acceuil</li>
                               <li className="text-base text-black font-bold hover:text-orange-900 hover:underline hover:ring-offset-2 decoration-[1px] cursor-pointer duration-300">Pages</li>
                               <li className="text-base text-black font-bold hover:text-orange-900 hover:underline hover:ring-offset-2 decoration-[1px] cursor-pointer duration-300">shop</li>
                               <li className="text-base text-black font-bold hover:text-orange-900 hover:underline hover:ring-offset-2 decoration-[1px] cursor-pointer duration-300">Elements</li>
                               <li className="text-base text-black font-bold hover:text-orange-900 hover:underline hover:ring-offset-2 decoration-[1px] cursor-pointer duration-300">Blog</li>
                       </ul>
                       <Link to="/Cart"><div className="relative">
                            <img src={cart} className="w-6"/>
                            <span className="absolute w-6  bottom-4 left-0 text-sm flex items-center justify-center font-semibold font-titleFont">{productData.length}</span>
                            </div>
                        </Link>
                        <Link to="/Login">
                       <img src={ userInfo ? userInfo.image : " https://i.pravatar.cc/150" } className="w-10 h-10 rounded-full "/>
                       </Link>
                       {
                        userInfo && <p className="font-titleFont font-semibold underline underline-offset-2 text-base ">{userInfo.name}</p>
                       }
                    </div>
                </div>
                </div>
        </div>
    );
        
}

export default Header;