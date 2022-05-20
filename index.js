const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

const { PORT } = require('./src/utils/env');

const auth = require('./src/router/auth.router');
const users = require('./src/router/users.router');
const portfolio = require('./src/router/portfolio.router');
const experience = require('./src/router/experience.router');
const skills = require('./src/router/skills.router');

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
    app.use(auth);
    app.use(users);
    app.use(portfolio);
    app.use(experience);
    app.use(skills);
  } catch (error) {
    console.log(error);
  }
};
data();

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
