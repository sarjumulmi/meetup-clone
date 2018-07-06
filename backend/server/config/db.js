import mongoose from 'mongoose';

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/meetupClone');
  mongoose.connection
    .once('open', () => {
      console.log('Mongo DB running');
    })
    .on('error', (err) => {
      console.error(err);
    });
};
