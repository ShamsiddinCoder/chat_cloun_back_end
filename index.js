const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const server = http.createServer(app);
const Routers = require('./routers/routers');
const fileUpload = require('express-fileupload');
const path = require('path');
const filePathMiddleware = require('./middleware/filePath.middleware');

app.use(cors());
app.use(filePathMiddleware(path.resolve(__dirname, 'static')));
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));

app.use('/api', Routers);

server.listen(5000, () => console.log('Server running on port 5000'));