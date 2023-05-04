import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import mongoose from "mongoose";
import config from "./config/config.js";
const app = express();
const PORT = 8080;
const connection = mongoose.connect(config.mongo.URL);
//se define el sv de apollo
const apollo = new ApolloServer({ typeDefs, resolvers });
//se inicia el sv
await apollo.start();
//se conecta apollo sv con el sv de express mediante un middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressMiddleware(apollo));
app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) });