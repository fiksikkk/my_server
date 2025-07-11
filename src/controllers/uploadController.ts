import { IncomingMessage, ServerResponse } from 'http';
import Busboy from 'busboy';
import fs from 'fs';
import path from 'path';
import { ensureUploadsDir } from 'src/utils/ensureUploadsDir';

export const uploadController = (req: IncomingMessage, res: ServerResponse): void => {
  const busboy = Busboy({ headers: req.headers }); // 👈 строго типизирован

  const uploadPath: string = ensureUploadsDir();
  let fileSaved = false;

  // Обработка загружаемого файла
  busboy.on(
    'file', (name, file, {filename}) => {
        if (!filename) {
            file.resume(); // пропускаем, если нет имени
            return;
        }
      const saveTo = path.join(uploadPath, filename);
      const writeStream = fs.createWriteStream(saveTo);

      file.pipe(writeStream);

      file.on('end', () => {
        console.log(`✅ Файл ${name} успешно сохранён`);
        fileSaved = true;
      });

      file.on('error', (err) => {
        console.error(`❌ Ошибка при получении файла:`, err);
      });
    }
  );

  // Завершение загрузки
  busboy.on('finish', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(fileSaved ? 'Загрузка завершена' : 'Файл не был загружен');
  });

  // Ошибка парсера
  busboy.on('error', (err: Error) => {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Ошибка при загрузке файла: ${err.message}`);
  });

  req.pipe(busboy);
};
