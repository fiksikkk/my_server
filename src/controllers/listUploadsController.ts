import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

export const listUploadsController = (_req: IncomingMessage, res: ServerResponse): void => {
  const uploadsDir = path.resolve('uploads');
  const templatePath = path.resolve('src/views/uploads.html');

  fs.readFile(templatePath, 'utf-8', (err, template) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Ошибка при загрузке шаблона');
      return;
    }

    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Не удалось прочитать папку uploads');
        return;
      }

      const listItems = files
        .map((file) => `<li><a href="/uploads/${encodeURIComponent(file)}">${file}</a></li>`)
        .join('');

      const html = template.replace('<!--FILES-->', listItems);

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    });
  });
};
