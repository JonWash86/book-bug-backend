const cors = require('cors');
const decodeIDToken = require('./authenticateToken');
const express = require('express');
const mongoose = require('mongoose');
const reviewsRouter = require('./controllers/reviews');

const app = express();

app.use(cors());
app.use(decodeIDToken);
app.use(express.json());

app.use('/api', reviewsRouter);

const uri = 'mongodb+srv://jonwash:9tC5ntJ.V67PQL@cluster0.etmz5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Error connecting to DB', err.message);
  });

// commenting out for now; the tutorial doesn't indicate removing or keeping this line yet.
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
