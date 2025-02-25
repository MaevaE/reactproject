import React, { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import {useDispatch} from "react-redux";
import { useLocation } from "react-router-dom";
import {addToCart} from "../redux/mapshopSlice";
import {ToastContainer, toast} from "react-toastify";

const Product = () => {
  const [detail, setDetail] = useState({});
  const dispatch = useDispatch();
  let [baseQty,setbaseQty] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const item = location.state.item;
    setDetail(item);
    // Si tu veux traduire directement la description
    item.description = "description";
    setDetail({ ...item }); // Mettre à jour l'état avec la description traduite
  }, [location.state]);

  const tauxDeConversion = 614; 
    
  const convertirEnFCFA = (prixEnEuros) => {
    return Math.round(prixEnEuros * tauxDeConversion);
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto flex my-10 gap-10">
        <div className="w-2/5 relative">
          <img src={detail.image} className="w-full h-[550px] object-cover" />
          {detail.isNew && (
            <p className="bg-black font-semibold font-titleFont absolute text-white px-8 py-1 top-4 -right-0">
              Solde
            </p>
          )}
        </div>

        <div className="w-3/5 flex flex-col gap-12 justify-center">
          <div>
            <h2 className="font-semibold text-2xl ">{detail.title}</h2>
            <div className="flex gap-3 mt-4  items-center">
              <p className="line-through text-gray-500">
                {convertirEnFCFA(detail.oldPrice)} Cfa
              </p>
              <p className="font-semibold text-2xl">{convertirEnFCFA(detail.price)} Cfa</p>
            </div>
          </div>
          <div className="flex gap-2 items-center text-base">
            <div className="flex">
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
            </div>

            <p className="text-xs text-gray-500">(1 avis client)</p>
          </div>

          <p className="text-gray-500 text-base">{detail.description}</p>
          <div className="flex gap-4">
            <div className="w-52 flex items-center border text-gray-500 gap-4 p-3 justify-between">
                <p className="text-sm text-gray-500">Quantite</p>
                <div className="flex items-center gap-4  font-semibold text-sm">
                    <button className="flex items-center border px-2 h-5 font-normal text-lg justify-center hover:bg-gray-700 hover:text-white duration-300 active:bg-black cursor-pointer" onClick={()=> setbaseQty(baseQty === 1 ? (baseQty = 1) : baseQty -1 )}>-</button>
                    <span>{baseQty}</span>
                    <button className="flex items-center border px-2 h-5 font-normal text-lg justify-center hover:bg-gray-700 hover:text-white duration-300 active:bg-black cursor-pointer" onClick={()=>setbaseQty(baseQty+1)}>+</button>
                </div>
                </div>

                <button className="bg-black text-white py-3 px-6 active:bg-gray-800" onClick={()=>dispatch(addToCart({
                  _id:detail._id,
                  title:detail.title,
                  image:detail.image,
                  quantity:baseQty,
                  description:detail.description
                })) && toast.success(`${detail.title} est ajoute`)
                }>
                    Ajouter au panier
                </button>
          </div>
          <p className="text-gray-500 text-base">Categorie : <span className="capitalize font-medium">{detail.category}</span></p>
        </div>
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
  );
};

export default Product;
