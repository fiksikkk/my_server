import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

export const homeController = (req: IncomingMessage, res: ServerResponse): void => {
  const filePath = path.resolve('public/index.html');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Ошибка при загрузке страницы');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
};
