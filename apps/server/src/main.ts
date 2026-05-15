import dotenv from "dotenv";
dotenv.config();


// Enable decorators
import "reflect-metadata";

// Enable env config
import "dotenv/config";

import "./core/config/env";

//Enable dependencies
import "./injection/di";

// Start Server
import "./app";
