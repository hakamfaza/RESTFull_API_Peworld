const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

const { SERVER_HOST, SERVER_PORT } = require('./src/utils/env');

const app = express();

app.use(express.json());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  }),
);

app.use(xss());
app.use(cors());
app.use(express.static('public'));

const data = () => {
  try {
    // app.use();
  } catch (error) {
    console.log(error);
  }
};
data();

const host = SERVER_HOST;
const port = SERVER_PORT;
app.listen(port, host, () => {
  console.log(`server running at http://${host}:${port}`);
});
