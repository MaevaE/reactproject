import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {HiOutlineArrowLeft} from "react-icons/hi";
import { decrementQuantity, incrementQuantity } from "../redux/mapshopSlice";
import {ToastContainer, toast} from "react-toastify";
import { deleteItems ,resetCart} from "../redux/mapshopSlice";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


const Cartitem = () =>{
    const dispatch = useDispatch();
    const tauxDeConversion = 614; 
    
    const convertirEnFCFA = (prixEnEuros) => {
      return Math.round(prixEnEuros * tauxDeConversion);
    };
    const productData = useSelector((state) => state.mapshop.productData);
    const monreset = () => {
        dispatch(resetCart());
        setTimeout(() => {
            toast.success("Votre panier est vide");
        }, 100); // Petit délai pour attendre la mise à jour de Redux
    };

    const croix = (id) => {
        dispatch(deleteItems(id));
        setTimeout(() => {
            toast.error("Produit supprimé");
        }, 100);
    };
    
    
    
    
    
    return (
        <div className="w-2/3 pr-10">
            <div className="w-full">
                <h2 className="text-2xl font-titleFont">Panier d'achats</h2>
            </div>
            <div>
                {
                    productData.map((item)=>(
                        <div key={item._id} className="flex items-center justify-between gap-6 mt-6">
                            <div className="flex items-center gap-2">
                            <RiCloseLine className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300" onClick={()=>croix(item._id)}/>

                            <img className="w-32 h-32 object-cover" src={item.image}/>
                            </div>
                            <h2 className="52">{item.title}</h2>
                            <p className="w-10">{convertirEnFCFA(item.price)} Cfa</p>
                            <div className="w-52 flex items-center border text-gray-500 gap-4 p-3 justify-between">
                                
                            <p className="text-sm">Quantite</p>
                            <div className="flex items-center gap-4 font-semibold text-sm ">
                                        <span onClick={()=>dispatch(decrementQuantity({
                                            _id: item._id,
                                            title: item.title,
                                            image: item.image,
                                            price: item.price,
                                            quantity: 1,
                                            description: item.description
                                        }))} className="font-normal text-lg flex items-center justify-center h-5  border px-2 hover:bg-gray-400 hover:text-white cursor-pointer duration-300 active:hover:bg-black">
                                                -
                                        </span>
                                                {item.quantity}
                                        <span onClick={()=>dispatch(incrementQuantity({
                                            _id: item._id,
                                            title: item.title,
                                            image: item.image,
                                            price: item.price,
                                            quantity: 1,
                                            description: item.description
                                        }))} className="font-normal text-lg flex items-center justify-center h-5  border px-2 hover:bg-gray-400 hover:text-white cursor-pointer duration-300 active:hover:bg-black">
                                                +
                                        </span>
                                </div>
                                </div>
                                <p className="w-14">{item.quantity * convertirEnFCFA(item.price)} Cfa</p>
                        </div>
                    ))
                }
            </div>
            <button className="bg-red-500 text-white hover:bg-red-800 mt-8 ml-7 py-1 px-6" onClick={monreset}>Vider le panier </button>
            <Link to="/"><button className="text-gray-400 hover:text-black duration-300 items-center flex gap-1 mt-8 ml-7 "><span><HiOutlineArrowLeft/></span>Faire des achats</button></Link>
            <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} theme="dark" />

            
        </div>
    );
};

export default Cartitem;