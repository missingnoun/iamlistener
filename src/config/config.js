const env = process.env.NODE_ENV; // 'dev' or 'prod'

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3000,
    host: process.env.DEV_DB_HOST || 'localhost',
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 5432,
    name: process.env.DEV_DB_NAME || 'db',
    conn: process.env.DATABASE_URL 
  },
  security: {
    tokenLife : 3600
  },
  session: {
    secret: process.env.SESSION_KEY,
    expirydate: new Date(Date.now() + 60 * 60 * 1000)
  }
};

const prod = {
  app: {
    port: parseInt(process.env.TEST_APP_PORT) || 3000
  },
  db: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT) || 5432,
    name: process.env.TEST_DB_NAME || 'prod',
    conn: process.env.DATABASE_URL
  },
  security: {
    tokenLife : 3600
  },
  session: {
    secret: process.env.SESSION_KEY,
    expiryDate: new Date(Date.now() + 60 * 60 * 1000)
  }
};

const config = {
  dev,
  prod
};

export default config[env];
