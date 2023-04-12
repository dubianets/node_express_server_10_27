import mongoose from 'mongoose';

function dbConnect (){
  mongoose.connect('mongodb://127.0.0.1/king_county_movers', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Connected');
  });
}

export default dbConnect;