import express from "express";


// initialize express app
const app = express();

// Add your middlewares, routes, and other configurations here
app.use(express.json());

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the "fronted" directory
app.use(express.static(join(__dirname, "../fronted")));

  // Root route
  app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "../fronted/index.html")); // Serve index.html
  });


export { app };