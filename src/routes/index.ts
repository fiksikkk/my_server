import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';
import { homeController } from 'src/controllers/homeController';
import { uploadController } from 'src/controllers/uploadController';
import { listUploadsController } from 'src/controllers/listUploadsController';

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;

  if (url === '/' && method === 'GET') {
    return homeController(req, res);
  }

  if (url === '/upload' && method === 'POST') {
    return uploadController(req, res);
  }

  if (url === '/uploads' && method === 'GET') {
    return listUploadsController(req, res);
  }

  if (url?.startsWith('/uploads/') && method === 'GET') {
    const fileName = decodeURIComponent(url.replace('/uploads/', ''));
    const filePath = path.resolve('uploads', fileName);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Файл не найден');
        return;
      }

      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    });

    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
};
