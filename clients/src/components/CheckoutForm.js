// CheckoutForm.js (Composant de paiement avec Stripe)
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            toast.error("Stripe n'est pas chargé !");
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            toast.error(error.message);
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:8000/create-payment-intent", {
                amount: 5000, // Remplace par le montant réel
            });

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                toast.error(confirmError.message);
            } else if (paymentIntent.status === "succeeded") {
                toast.success("Paiement réussi !");
            }
        } catch (err) {
            toast.error("Une erreur est survenue lors du paiement !");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full p-4 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-bold mb-4">Entrez les informations de votre carte</h2>
            <CardElement className="p-2 border border-gray-300 rounded-md" />
            <button 
                type="submit" 
                disabled={!stripe || loading}
                className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
            >
                {loading ? "Traitement..." : "Payer"}
            </button>
            <ToastContainer autoClose={2000} theme="dark" />
        </form>
    );
};

export default CheckoutForm;
