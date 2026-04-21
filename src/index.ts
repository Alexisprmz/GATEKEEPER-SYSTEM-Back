import server from './server'

const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log(`REST Api en puerto ${port}`)
})