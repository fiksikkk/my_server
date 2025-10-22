import http from 'http';
import { handleRequest } from './routes';
import { PORT } from './config';

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
