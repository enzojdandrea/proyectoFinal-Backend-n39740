import dotenv from "dotenv";

import Express from "express";
import productsRouterM from "./routes/productsRouterM.js"
import cartRouter from "./routes/cartRouterFS.js";
import mongoose from "mongoose";

void (async () => {
    await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const PORT = 8083;

    const app = Express();

    app.use(Express.json());
    app.use(Express.urlencoded({ extended: true }));

    app.use("/api/products", productsRouterM);
    // app.use("/api/cart", cartRouter);

    app.listen(PORT, () => {
        console.log(`Server listenig on port ${PORT}`);
    });
})();
