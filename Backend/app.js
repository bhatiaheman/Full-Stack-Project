//jshint esverison:6
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser  = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb+srv://bhatiaheman8:Heman123@cluster2.yy6ehrg.mongodb.net/HemanDatabaseDB?retryWrites=true&w=majority',
{useUnifiedTopology: true , 
  useNewUrlParser: true,
  writeConcern: {
     w: 'majority'
   }
  });

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  income: String,
  city: String,
  car: String,
  quote: String,
  phone_price: String 
});

const User = mongoose.model('User', userSchema, 'company');

app.get('/income/BMW-Mercedes',async (req, res) => {
 try{
  const users = await User.find({
    $and: [
      { car: { $in: ["BMW", "Mercedes-Benz"] } },
      { income: { $lt: "$5" } }] })
     res.json(users); 
  } catch (error) {
     console.error(error);
     res.status(500).json({message: 'Server error'});
 }
});

app.get('/gender/phone', async (req, res) => {
  try {
    const users =  await User.find(
      { gender: 'Male', phone_price: { $gt: "10000" } })
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/last_name/email', async (req, res) => {
  try {
    const users =  await User.find({
      $and: [
        {
          last_name: { $regex: /^M/i } 
        },
        {
          email: { $regex: /@.*M\./i } 
        },
        {
          quote: { $exists: true },
          $expr: { $gt: [{ $strLenCP: "$quote" }, 15] }
        }
      ]
    });
    res.json(users); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error' }); 
  }
});

app.get('/car/email', async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        {
          car: { $in: ['BMW', 'Mercedes-Benz', 'Audi'] }
        },
        {
          email: { $not: /\d/ }
        }
      ]
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/top_cities', async (req, res) => {
  try {
    const cityData =  await User.aggregate([
      { $group: { _id: '$city', count: { $sum: 1 }, total_income: { $sum: '$income' } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { _id: 0, city: '$_id', count: 1, avg_income: { $divide: ['$total_income', '$count'] } } }
    ]);
    res.json(cityData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(5000, function(){
  console.log('server started');
});














