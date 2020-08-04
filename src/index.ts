import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from 'body-parser'


//config environment
dotenv.config();

/**
 * App Variables
 */

// Check PORT was loaded from environment config
if (!process.env.PORT) {
    process.exit(1);
}
 
const PORT: number = parseInt(process.env.PORT as string);
 
const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
