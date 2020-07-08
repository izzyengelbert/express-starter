import dotenv from 'dotenv';
import dbConfig from './dbConfig';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  db: { ...dbConfig },
  secret: process.env.SECRET_KEY || ''
};
