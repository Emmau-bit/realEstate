const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

app.use(compression());
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

var distDir = __dirname + '/dist/';
app.use(express.static(distDir));

if (process.env.NODE_ENV === 'production') {
  //   // Set static folder
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
