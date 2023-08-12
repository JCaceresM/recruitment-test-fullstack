export default () => ({
  JWT_SECRET: process.env.JWT_SECRET || '3000',
  PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
});
