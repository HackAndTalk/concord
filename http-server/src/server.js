const express = require('express');
const path = require('path');

const server = express();

const buildDir = path.resolve(path.join(__dirname, '../../client/build'));

console.log({ buildDir });

server.use(express.static(buildDir));
server.get('/*', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'))
})

server.listen(3000, () => {
  console.log('listening on port 3000');
})