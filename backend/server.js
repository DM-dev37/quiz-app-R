import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import resultRoutes from './routes/resultRoutes.js'

const app = express();
const port = 4000;

//MINDDELWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//DB
connectDB();

// ROUTES
app.use('/api/auth', userRouter)
app.use('/api/results', resultRoutes)


app.get('/', (req, res) => {
    res.send('API WORKING')
});

app.listen(port, () => {
    console.log(`server Started on http://localhost:${port}`)
})