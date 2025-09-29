import http from 'http';
import { handleRequest } from './routes';
import { config as envConfig } from 'dotenv';

const server = http.createServer(handleRequest);

const result = envConfig();

if (result.error || !result.parsed) {
  throw new Error(`File .env is missing or invalid: ${result.error}`);
}

const config = result.parsed;

const PORT = config['PORT'];

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
