import express from 'express';
const router = express.Router();

//MODALITY
import modalityRouter from '../packages/modality/routes/modalityRouter';

//CRM


//GED


//MODALITY
router.use('/modalities', modalityRouter);

//CRM


//GED

export default router;