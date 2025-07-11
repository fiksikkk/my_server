import { IncomingMessage, ServerResponse } from 'http';
import { homeController } from 'src/controllers/homeController';
import { uploadController } from 'src/controllers/uploadController';

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;

  if (url === '/' && method === 'GET') {
    return homeController(req, res);
  }

  if (url === '/upload' && method === 'POST') {
    return uploadController(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
};
