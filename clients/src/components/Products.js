import React from "react";
import ProductCart from "./ProductCart";

const Products=({products})=>{
    
    return (
        <div className="py-10">
            <div  className="flex flex-col gap-4 items-center">
                <h1 className="text-white bg-black text-[2xl] py-2 w-80 text-center">Faire du shopping tout les jours</h1>
                <span className="w-20 h-[2px] bg-black"></span>
                <p className="text-gray-600 text-center maw-w-[400px]">
                    "Découvrez nos collections exclusives et trouvez le produit parfait pour vous ! Profitez d’offres exceptionnelles et d’une livraison rapide. Qualité et satisfaction garanties. Faites votre shopping dès maintenant !"
                </p>
            </div>
            <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10">
                {
                    products.map((item)=>(
                        <ProductCart key={item._id} product={item}/>
                    ))
                }
            </div>
        </div>
    )
};
export default Products ;