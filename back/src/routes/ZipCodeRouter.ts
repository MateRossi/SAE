import express from "express";
import getAddress from "../controller/ZipCodeController";

const zipCodeRouter = express.Router();

zipCodeRouter.get("/:zipCode", getAddress);

export default zipCodeRouter;