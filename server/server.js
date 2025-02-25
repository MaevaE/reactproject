
const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/stripe/charge", cors(), async (req, res) => {
    console.log("Données reçues :", req.body);
    let { amount, id } = req.body;
    console.log("amount et id", amount, id);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "XAF", // FCFA
            payment_method: id,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never" // Bloque les redirections
            }
        });

        res.json({
            message: "Paiement réussi",
            success: true,
        });
    } catch (error) {
        console.log("Erreur Stripe", error);
        res.status(400).json({
            message: "Paiement échoué",
            success: false,
            error: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Le serveur démarre sur le port ${port}`);
});
