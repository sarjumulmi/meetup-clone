import express from 'express';
import dbConfig from './config/db';
import middlewaresConfig from './config/middlewares';
import { MeetupRoutes, GroupRoutes } from './modules';

const app = express();
// database
dbConfig();

// middlewares
middlewaresConfig(app);

app.use('/api', [MeetupRoutes, GroupRoutes]);

const port = process.env.PORT || 3000;

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App listening on port: ${port}`);
  }
});
