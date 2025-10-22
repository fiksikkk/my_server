import { config as envConfig } from 'dotenv';

const result = envConfig();

if (result.error || !result.parsed) {
  throw new Error(`File .env is missing or invalid: ${result.error}`);
}

const config = result.parsed;

const PORT = config['PORT'];

export { PORT };
