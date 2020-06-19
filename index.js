const express = require("express")

const server = express()

server.use(express.json())

const projects = []

//middlewares
function projectExists(req , res, next){
  const {id} = req.params
  const project = projects.find(p => p.id == id)

  if(!project){
    return res.status(400).json({error: 'Project not found!'})
  }

  return next();
}

function logRequests(req, res, next) {

  console.count("Número de requisições")

  return next()
}

server.use(logRequests)


server.post('/projects', (req, res) => {
  const { id, title } = req.body

  const project = {
    "id": id,
    "title": title,
    "tasks": []
  }

  projects.push(project);

  return res.status(200).json('Project successfully registered')
})

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.put('/projects/:id', projectExists, (req, res) => {
  const {id} = req.params
  const { title } = req.body
  
  const project = projects.find( project => project.id == id )

  project.title = title

  return res.json(projects)
})

server.delete('/projects/:id', projectExists, (req, res) => {
 const { id } = req.params
 
 const projetoIndex = projects.findIndex( p => p.id == id)
 projects.splice(projetoIndex, 1)
 
 return res.send()

})

server.post('/projects/:id/tasks', projectExists, (req, res)=> {
  const { id } = req.params
  const { title } = req.body

  const project = projects.find( p => p.id == id)
  project.tasks.push(title)

  return res.json(project)
})



server.listen(3000)