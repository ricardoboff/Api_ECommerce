import 'express-async-errors';
import express from "express";

import { seed } from "./seed";
import logs from './middlewares/logs';
import routes from './routes';
import errors from './middlewares/errors'


const port = 3333;

function runServer () {

    const server = express();
    
    // Middleware
    // Habilitadno a deserialização de JSON - Para o express entender JSON
    server.use(express.json());

    server.use(logs);

    server.use(routes);

    server.use(errors);

    
    // Iniciando o Servidor
    server.listen(port, () => {
        console.log(`Server running in Port ${port}`)
    })
}

seed().then( () => {
    runServer();
})