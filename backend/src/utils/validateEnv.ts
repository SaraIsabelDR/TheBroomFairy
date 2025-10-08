import dotenv from 'dotenv'
dotenv.config()

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'PORT'] as const;

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Falta la variable de entorno: ${key}`);
  }
});
