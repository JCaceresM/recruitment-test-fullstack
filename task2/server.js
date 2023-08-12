const fastify = require('fastify')({
  logger: true
});
const fastifyStatic = require('@fastify/static');
const path = require('path');

const start = async () => {
  try {
    fastify.register(fastifyStatic, {
      root: path.join(__dirname, 'dist')
    });
    fastify.setNotFoundHandler((request, reply) => {
      reply.sendFile('index.html');
    });
    
    fastify.listen(process.env.PORT || 3000, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
