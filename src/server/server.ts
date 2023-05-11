import express from "express";
import { router } from "../routes";
import conn from "../db/conn";
import cors from "cors";

const server = express();

server.use(router);
server.use(express.json());
server.use(cors());

conn();

export { server };
