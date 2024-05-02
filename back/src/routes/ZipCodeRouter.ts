import express from 'express';
import getAddress from '../controller/ZipCodeController';

const zipCode = express.Router();

zipCode.get('/:zipCode', getAddress);

export default zipCode;