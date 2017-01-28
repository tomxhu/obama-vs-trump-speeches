import express = require('express')
const path = require('path');
const app = express()

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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})