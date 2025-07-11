import { IncomingMessage, ServerResponse } from 'http';

export const homeController = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Добро пожаловать на главную страницу!');
};
