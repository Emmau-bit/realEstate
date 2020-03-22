// const express = require('express');
// const mongoose = require('mongoose');
// const connectDB = require('./config/db');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const expressValidator = require('express-validator');
// const path = require('path');
// const dotenv = require('dotenv');
// dotenv.config();

// const app = express();

// // Connect Database
// connectDB();

// // // Connect Database
// // mongoose
// //   .connect(process.env.DATABASE, {
// //     useNewUrlParser: true,
// //     useCreateIndex: true,
// //     useUnifiedTopology: true
// //   })
// //   .then(() => console.log('DB Connected'));

// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(expressValidator());
// app.use(cors());

// // Define Routes
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/user', require('./routes/api/user'));
// app.use('/api/status', require('./routes/api/status'));
// app.use('/api/property', require('./routes/api/property'));

// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();

const app = express();

// // Connect Database
// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log('DB Connected'));

// Connect Database
connectDB();

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/status', require('./routes/api/status'));
app.use('/api/property', require('./routes/api/property'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
