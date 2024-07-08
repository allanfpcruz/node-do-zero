import { createServer } from 'node:http'

const server = createServer(() => {
  console.log('ok')
})

server.listen(3333)