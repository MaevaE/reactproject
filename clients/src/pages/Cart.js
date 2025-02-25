
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { ocean, payment } from "../assets/index";
import Cartitem from "../components/Cartitem";
import {ToastContainer, toast} from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";






const Cart =()=>{
       
        const tauxDeConversion = 614; 
    
        const convertirEnFCFA = (prixEnEuros) => {
          return Math.round(prixEnEuros * tauxDeConversion);
        };
        const tauxDeConversion2 = 0.954; 
    
        const convertirEURO = (prixEnEuros) => {
          return Math.round(prixEnEuros * tauxDeConversion2);
        };
    const productData = useSelector((state) => state.mapshop.productData);
    const userInfo = useSelector((state)=> state.mapshop.userInfo);
    const [paynow , setPaynow] = useState(false);
    const [totalAmt, setTotalAmt] = useState(0);
    useEffect(()=>{
        let price= 0;
        productData.map((item)=>{
            price+=item.quantity * convertirEURO(item.price);
            return price
        })
        setTotalAmt(price);
    },[productData])
  

    const Checkout = () => {
        const elements = useElements();
        const stripe = useStripe();
    
        const handlesubmit = async (event) => {
            event.preventDefault();
    
            if (!userInfo) {
                toast.error("Connectez-vous avant !");
                return;
            }
    
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
            });
    
            if (!error) {
                console.log("Token généré", paymentMethod);
                console.log("Montant total (en FCFA) :", totalAmt);  // Ajoutez cette ligne
                console.log("ID du paiement :", paymentMethod.id);
                try {
                    const { id } = paymentMethod;
                    const response = await axios.post("http://localhost:8080/stripe/charge", {
                        amount: totalAmt*100,
                        id: paymentMethod.id,
                    });
                    console.log("Réponse du serveur Stripe:", response); 
                    if (response.data.success) {
                        console.log("Paiement réussi");
                        toast.success("Paiement réussi !");
                    } else {
                        toast.error("Échec du paiement !");
                    }
                } catch (error) {
                    console.error("Erreur de paiement", error);
                    toast.error("Erreur lors du paiement");
                }
            } else {
                console.log(error.message);
                toast.error(error.message);
            }
        };
    
        return (
            <form onSubmit={handlesubmit}>
                <CardElement options={{ hidePostalCode: true }} />
                <button
                    type="submit"
                    className="text-base w-full bg-black text-white py-3 mt-6 hover:bg-gray-800 duration-300"
                >
                    Procéder au paiement
                </button>
            </form>
        );
    };
    
   



    const Stripe =()=>{
        const PUBLIC_KEY = "pk_test_51QoBKEPtbwGIs5ec7QqQpFnsXfV4mry9wSzqKxMHU3iP3ySLgvZ0fVwmpfqVmlN1pkRJpO6CywsOJAaR9twZ6pbB00Stb5AX95";
        const stripePromise = loadStripe(PUBLIC_KEY);
        return (
            <Elements stripe={stripePromise}>
                    <Checkout/>
            </Elements>
        );
    };
    return (
        <div>
             <img src={ocean} className="h-60 w-full object-cover"/>
             <div className="max-w-screen-lg mx-auto py-20 flex">
                <Cartitem />
                <div className="w-1/3 bg-[#fafafa] py-4 px-4">
                            <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
                                  <h2 className="text-[2xl] font-medium">Total du panier</h2>
                                  <p className="flex gap-6 items-center text-base">
                                    total partiel{""}
                                    <span className="font-titleFont font-bold text-lg">
                                        {convertirEnFCFA(totalAmt)} Cfa
                                    </span>
                                  </p>

                                  <p className="flex gap-6 items-center text-base">
                                    Le shipping{""}
                                    <span className="font-titleFont font-bold text-lg">
                                        texte factice 
                                    </span>
                                  </p>
                            </div>
                            <p className="font-titleFont font-semibold justify-between  flex mt-6">Total <span className="text-xl font-bold">{convertirEnFCFA(totalAmt)} Cfa</span></p>
                            <div className="mt-6 bg-white h-40">
                                <h1 className="text-base font-semibold font-titleFont text-[20px]">Payement</h1>
                                <Stripe/>
                                </div>
                </div>
             </div>
             <ToastContainer 
    position="top-left"
    autoClose={2000}  // La notification disparaît après 2 secondes
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
export default Cart;
