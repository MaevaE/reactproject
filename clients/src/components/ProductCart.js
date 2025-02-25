import React from "react";
import {cart} from "../assets/index"
import { useNavigate } from "react-router-dom";
import {useDispatch}  from "react-redux";
import { addToCart } from "../redux/mapshopSlice";
import {ToastContainer, toast} from "react-toastify";


const ProductCart =({product})=>{
    const dispatch = useDispatch();
    
    const tauxDeConversion = 614; 
    
    const convertirEnFCFA = (prixEnEuros) => {
      return Math.round(prixEnEuros * tauxDeConversion);
    };
    
    
    const navigation = useNavigate();
    const _id = product.title;
    const isString = (_id) =>{
        return String(_id).toLowerCase("").split("").join("");
    };
    const rootId = isString(_id);
    console.log(rootId);
    const detail =()=>{
        navigation(`/product/${rootId}`,{
            state:{
                item:product,
            }
        })
    };


    return (
        <div className="group relative">
            <div className="w-full h-96 cursor-pointer overflow-hidden" onClick={detail}>
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 duration-500"/>
            </div>
            <div className="w-full border-[1px] px-2 py-4">
                    <div className="flex justify-center items-center gap-3">
                    <div>
                        <h2 className="font-titleFont font-semibold text-base ">{product.title.substring(0, 15)}</h2>
                    </div>
                    <div className="flex gap-2 relative overflow-hidden">
                    <div className=" text-sm justify-end relative flex w-28">
                    <div className="gap-2 flex transform group-hover:-translate-x-32 transition-transform duration-500">
                    <p className="line-through text-[13px] text-gray-500">{convertirEnFCFA(product.oldPrice)} cfa</p>
                    <p className="text-[13px] font-semibold">{convertirEnFCFA(product.price)} Cfa</p>
                    </div>
                    </div>
                    <p className=" flex absolute text-[25px] w-[45px] h-[45px] z-20 text-gray-500 hover:text-gray-900  items-center gap-1  top-0 transform -translate-x-32 group-hover:-translate-x-0 transition-transform cursor-pointer duration-500" onClick={()=>dispatch(addToCart({
                        _id:product._id,
                        title:product.title,
                        image:product.image,
                        price:product.price,
                        quantity:1,
                        description:product.description
                    })) & toast.success(`${product.title} est ajoute`)
                    }>+<img src={cart}/>{""}</p>
                    </div>
                    </div>


                <div>
                    <p>{product.category}</p>
                </div>
                <div className="absolute top-4 right-0">{product.isNew && <p className="bg-black text-white font-semibold font-titleFont px-6 py-1">Solde</p>}</div>
            </div>
            <ToastContainer 
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

                />
        </div>
    )
};
export default ProductCart;