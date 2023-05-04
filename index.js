import express from 'express';

const app = express();

app.use(
  '/litrit-modules',
  express.static('upload', {
    setHeaders: (res) => {
      res.set('Access-Control-Allow-Origin', 'https://brbavar.github.io');
    },
  })
);

app.use(express.static('litrit-modules'));

app.get('/animations.js', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://brbavar.github.io');
  res.send('GET request successful');
});

app.get('/signup-form-handler.js', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://brbavar.github.io');
  res.send('GET request successful');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
