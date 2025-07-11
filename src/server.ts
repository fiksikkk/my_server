import http from 'http';
import { handleRequest } from './routes';

const PORT = 3000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});