import express from 'express';
const router = express.Router();
import {
    connectEther,
    eventFilter,
    sendTransactions
} from '../controllers/connectEtherController.js'

router.route('/').get(connectEther);

export default router;