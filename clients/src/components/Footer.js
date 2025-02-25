import React from "react";
import { payment } from "../assets/index";
import { ImGithub } from "react-icons/im";
import { FaFacebookF , FaInstagram, FaTwitter, FaYoutube, FaHome } from "react-icons/fa";
import {MdLocationOn} from "react-icons/md";
import {BsPersonFill, BsPaypal} from "react-icons/bs";


const Footer =()=>{
    return (
        <div className="bg-black text-[#949494] py-20 px-20 font-titleFont">
            <div className="max-w-screen-xl mx-auto grid grid-cols-4 ">
                    {/*logocart*/}
                        <div className="flex flex-col gap-7">
                        <div className="text-white text-4xl font-bold line-through">mapshop</div>
                        <img src={payment} className="w-40 bg-white"/>
                        <div className="flex flex-row gap-7 text-lg text-gray-400">
                        <div><ImGithub className="hover:text-white duration-300 hover:cursor-pointer"/></div>
                        <div><FaFacebookF className="hover:text-white duration-300 hover:cursor-pointer"/></div>
                        <div><FaTwitter className="hover:text-white duration-300 hover:cursor-pointer"/></div>
                        <div><FaInstagram className="hover:text-white duration-300 hover:cursor-pointer"/></div>
                        <div><FaYoutube className="hover:text-white duration-300 hover:cursor-pointer"/></div>
                        
                        </div>
                        </div>

                    {/*contact */}
                        <div >
                        <h2 className="text-[2xl] font-semibold mb-4 text-white">Contatez-nous</h2>
                            <div className="text-base flex flex-col gap-4 ">
                                    <p>Douala,Cameroun</p>
                                    <p>Contact:6XXXXXXX</p>
                                    <p>Email:mapshop@gmail.com</p>
                            </div>
                        </div>

                        <div>
                        <h2 className="text-[2xl] font-semibold mb-4 text-white ">Profil</h2>
                        <div className="gap-1 flex flex-col">
                        <p className="flex  gap-2 items-center  hover:text-white hover:cursor-pointer duration-300"><span><BsPersonFill/></span>Mon Compte</p>
                        <p className="flex  gap-2 items-center  hover:text-white hover:cursor-pointer duration-300"><span><BsPaypal/></span>Checkout</p>
                        <p className="flex  gap-2 items-center  hover:text-white hover:cursor-pointer duration-300"><span><FaHome/></span>suivi des Commandes</p>
                        <p className="flex  gap-2 items-center  hover:text-white hover:cursor-pointer duration-300"><span><MdLocationOn/></span>aide et soutien</p>
                        </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <input type="text" className="bg-transparent border px-4 py-2 text-sm" placeholder="E-mail"/>
                            <button className="text-sm border text-white  border-t-0 hover:bg-gray-900 duration-300 hover:active:bg-white hover:cursor-pointer hover:active:text-black">Souscrire</button>
                        </div>
            </div>
            
        </div>
    )
};


export default Footer;