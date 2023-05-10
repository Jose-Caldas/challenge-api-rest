import express from "express";
import { router } from "../routes";
import conn from "../db/conn";

const server = express();

server.use(router);
server.use(express.json());

conn();

export { server };
