import express from 'express';
import { DB_URL } from './config'
import errorHandler from './middlewares/errorHandler';
import routes from './routes'
import mongoose from 'mongoose'
const PORT = 3000;
const app = express();


// Database connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Database connected successfully...'))
.catch(err => console.log(err));

app.use(express.json())
app.use('/api', routes)


app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
})