import express = require('express')
const promise = require('bluebird')
const path = require('path');
const app = express()
const pg = require('pg')

import { Post } from '../types'
const options = {
  // Initialization Options
  promiseLib: promise
};

const postgresLocation = process.env.DB_URL || 'postgres://localhost:5432'

const pgp = require('pg-promise')(options);
const connectionString = `${postgresLocation}/posts`;
const db = pgp(connectionString);

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

app.get('/api/posts', (req, res, next) => {
  return db.many('select * from post')
    .then((posts: Post[]) => {
      return res.send(posts)
    })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})