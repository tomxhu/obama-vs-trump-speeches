import express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
import { getAllPosts, getOnePost, createNewPost, deletePostById } from './postgres'

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/dist', express.static('dist'))
app.use('/public', express.static('public'))

app.get('/', function (req: express.Request, res: express.Response) {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>simplest-typescript-webpack-boilerplate</title>
      </head>
      <body>
        <div id="app"></div>
        <script src="../dist/bundle.js"></script>
      </body>
    </html>

  `)
})

app.get('/api/posts', getAllPosts)
app.get('/api/posts/:id', getOnePost)
app.post('/api/posts', createNewPost)
app.delete('/api/posts/:id', deletePostById)


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})