import dotenv from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { availableParallelism } from "node:os";
import cluster from "node:cluster";
import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import { connect } from "node:http2";

dotenv.config({
  path: "./.env",
});


const port = process.env.PORT || 3000;

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo db connection failed !!!",err)
})

