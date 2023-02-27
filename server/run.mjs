import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({
    logger: true
})
fastify.register(cors, {
    origin: 'http://localhost:3000',
})

// Declare a route
fastify.get('/base', function (request, reply) {
    reply.send({ hello: 'world' })
})


// Run the server!
fastify.listen({ host: '127.0.0.1', port: 3001 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log(`Server is now listening on ${address}`)
})