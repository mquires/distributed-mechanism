import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  mode: process.env.NODE_ENV,
  clientUrl: process.env.CLIENT_URL,
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
    protocol: process.env.PROTOCOL,
    basePath: process.env.BASE_PATH || 'api',
    url: `${process.env.PROTOCOL}://${process.env.HOST}`,
  },
  orm: {
    type: 'postgres',
    url: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
    entities: ['dist/**/**/*.entity{.js,.ts}'],
    sslEnabled: process.env.DB_SSL_ENABLED === 'true',
    synchronize: true,
    db: {
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      pwd: process.env.DB_PASS,
    },
  },
};

export default config;
