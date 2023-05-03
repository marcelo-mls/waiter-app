import express from 'express';
import mongoose from 'mongoose';
import router from './app/router';
import path from 'node:path';
import http from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

// npm run dev
// docker run --name mongo -p 27017:27017 -d mongo
mongoose.connect('mongodb://localhost:27017')
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .then(() => {
    const PORT = 3001;

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))); //unix
    // app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads').replace('\\src', ''))); // windows

    app.use(express.json());
    app.use(router);

    server.listen(PORT, () => {
      console.log('=================================================');
      console.log(`| 🚀 Servidor rodando em: http://localhost:${PORT} |`);
      console.log('=================================================');
    });
  }).catch(() => console.log('Erro ao conectar no MongoDB'));
