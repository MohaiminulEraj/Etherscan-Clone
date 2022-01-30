import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import { connectEther, eventFilter, sendTransactions } from './etherConnect.js'
import dotenv from 'dotenv';
import cors from 'cors';
import connectEtherRoutes from './routes/connectEtherRoutes.js';
// parsing .env file
dotenv.config()
// creating server instance
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json()); // parsing body
app.use('/api', cors()); // Enabling CORS for all /api routes

// connectEther();

app.get('/', (req, res) => {
    res.send('API is running....')
})

app.use('/api/search', connectEtherRoutes);

// app.get('/search', (req, res) => {
//     try {
//         console.log(req.query.text)
//         connectEther(req.query.text);
//     } catch (error) {
//         console.log(`${error} `.red.underline.bold);
//     }
// })

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));