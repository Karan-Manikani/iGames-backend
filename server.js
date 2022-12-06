require("dotenv").config();
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const connectToDB = require("./database/connectToDB");

connectToDB();

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());
app.set("trust-proxy", 1);

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60,
            sameSite: "none",
            secure: true,
        },
    })
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
