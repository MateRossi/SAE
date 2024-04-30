import axios from "axios";
import { Request, Response } from 'express';

async function getAddress (req: Request, res: Response) {
    const zipCode = req.params.zipCode;
    try {
        const viaCepUrl = `https://viacep.com.br/ws/${zipCode}/json/`;
        const response = await axios.get(viaCepUrl);
        const address = response.data;
        res.json(address);
    } catch (error) {
        res.status(400).json({error: "Erro aobuscar CEP."});
    };
};

export default getAddress;