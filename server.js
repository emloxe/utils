const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression()); // 压缩
app.use((req, res, next) => { // 允许跨域
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.static(__dirname)); // 当前目录作为资源目录

app.listen('8080', (req, res) => {
  console.log('connect to http://127.0.0.1:8080');
});
