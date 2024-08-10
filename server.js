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
import { DatabaseMemory } from './database.js'
const server = fastify()

const Database = new DatabaseMemory()
  
server.post('/videos', (request, reply) => {
  const { title, description, duration } = request.body

  Database.create({
    title,
    description,
    duration
  })

  return reply.status(201).send()
})

//obs: o navegador, por padrão, realiza apenas requisições GET, é preciso de uma extenção do VScode para outras requisições

server.get('/videos', (request, reply) => {
  const search = request.query.search
  const videos = Database.list(search)
  return videos
})

server.put('/videos/:id', (request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body

  Database.update(videoId, {
    title,
    description,
    duration
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) => {
  const videoId = request.params.id

  Database.delete(videoId)

  return reply.status(200).send()
})

server.listen(
  {
    port: 3333,
  }
)