import dotenv from "dotenv"
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { availableParallelism } from "node:os";
import cluster from "node:cluster";
import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";
import { app } from "./app.js";

dotenv.config({
    path : "./.env"
});


// if(cluster.isPrimary){
//     const numCPUs = availableParallelism();
//     // create one worker per available code
//     for(let i = 0; i < numCPUs; i++){
//         cluster.fork({
//             PORT:3000 + i
//         });
//     }

//     // set up the adapter on the primary thread

//     setupPrimary();
// }else{
//     // opent the database file.
// }




