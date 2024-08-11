// import { createServer } from 'node:http'

// const server = createServer((req, res) => {
//   res.write('Hello World')
//   return res.end()
// })

// server.listen(3333)

//esse seria um servidor com node nativo, praticamente nunca usado


//exemplos de caminhos

// server.get('/', () => {
//   return 'Hello World'
// })

// server.get('/hello', () => {
  //   return 'Hello Allan'
  // })
  
  //MÉTODOS HTTP
  
  //GET, POST, PUT, DELETE


import { fastify } from 'fastify'
//import { DatabaseMemory } from './database.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()
const Database = new DatabasePostgres()

//const Database = new DatabaseMemory()
  
server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body

  await Database.create({
    title,
    description,
    duration
  })

  return reply.status(201).send()
})

//obs: o navegador, por padrão, realiza apenas requisições GET, é preciso de uma extenção do VScode para outras requisições

server.get('/videos', async (request, reply) => {
  const search = request.query.search
  const videos = await Database.list(search)
  return videos
})

server.put('/videos/:id', async(request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body

  await Database.update(videoId, {
    title,
    description,
    duration
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', async(request, reply) => {
  const videoId = request.params.id

  await Database.delete(videoId)

  return reply.status(200).send()
})

server.listen(
  {
    port: process.env.PORT ?? 3333,
  }
)