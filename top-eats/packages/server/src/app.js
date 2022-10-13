import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { API_URL, DB_URL } from './configs/index.js';
import routes from './routes/index.js';


// added after trying to host on ec2 instance
import * as path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(API_URL, routes);

// added to host on ec2 instance:

// **Some imports .... **

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// ................ 
// Other Routes and Code...
// ...............
// (Add below code after all other routes)
//Serve Static Assets in production 
//set static folder

app.use(express.static('../../client/build'));
app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'packages', 'client', 'build', 'index.html'));});


export default app;