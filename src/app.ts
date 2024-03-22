import morgan from 'morgan';
import express from 'express';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerjson from '../swagger.json';

// Configuring .env
dotenv.config();
// Express
const app = express();
// Logging
app.use(morgan('dev'));
// Parse the request
app.use(express.urlencoded({ extended: false }));
// Takes care of JSON data
app.use(express.json());
// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerjson));

// RULES OF OUR API raw
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        // set the CORS headers
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
        return res.status(200).json({});
    }

    next();
});

//Importing routes after doing the configurations because of the mysql2 connection
import router from './routes/router';

//Routes
app.use('/api', router);

app.get('/', (req, res) => {
    res.status(200).send('Server is operational!');
});

// Error handling 
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

// Server
export default app;