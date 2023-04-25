Backend file-
1) the packages we need toh require while working -
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser  = require('body-parser');

2)app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
here the urlencoded is neded to parse the incoming request with urlencoded payloads and is based upon the body-parser
we are using cors to get the request in http.

3)mongoose.connect('mongodb+srv://bhatiaheman8:<password>@cluster2.yy6ehrg.mongodb.net/HemanDatabaseDB?retryWrites=true&w=majority',
{useUnifiedTopology: true , 
  useNewUrlParser: true,
  writeConcern: {
     w: 'majority'
   }
  });

here we are connecting our database to our mongodb atlas and making a database of name HemanDatabaseDB.

4) const userSchema = new mongoose.Schema({
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

this is the forming of schema or design of database as what u want in ur database like name,email,phone etc.

5) const User = mongoose.model('User', userSchema, 'company');
Then we created our mongoose model and storing our schema in it.here the "company" is out database collection.

6) In this step i have import the given sample file "sample_data.json" using vscode extension of mongodb and connecting it through coneection string.

7) app.get('/income/BMW-Mercedes', (req, res) => {
 User.find({ $and: [
  { car: { $in: ["BMW", "Mercedes-Benz"] } },
  { income: { $lt: "$5" } }]
      })
   .exec()
   .then(users => {
     res.json(users);
   })
    .catch(err => {
     console.log(err);
      res.status(500).json({ error: err });
    });
});

Now , in this step i have created a REST API and getting the call from it to fetch the data from mongodb atlas form database HemanDatabaseDB, here the condition is to fetch data of users having income less then 5USD and having car = BMW and Mercedes-Benz, and the data fetched here is in the form of json otherwise a error will be there.

8)app.get('/gender/phone', async (req, res) => {
  try {
    const users = await User.find({ 
        phone_price: {$gt : "10000"},
        gender: "Male"
    
    })
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

In this get request we want to fetch the data of th users having phone_price greter than 10000 and should be male.here also the fetched data is in form of json and if not fetched will be a error.

9)app.get('/last_name/email', async (req, res) => {
  try {
    const users = await User.find({
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
})
In this step also we want to fetch the data of those users having "M" in their last name and email should contain last name and also have a quote of 15 characters.

10)app.get('/car/email', async (req, res) => {
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
In this step , we want to fatch the data of those users having car "BMW,Mercedes-Benz,Audi" with having email with no digit in it.

11)app.get('/top_cities', async (req, res) => {
  try {
    const cityData = await User.aggregate([
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
In this step we want to fetch data of the cities having high population.

12)app.listen(5000, function(){
  console.log('server started');
});
In this step , we want to call our server on localhost port 5000.




Frontend file-
1) In this we have downloaded the project by writing the command npx crete-react-app Frontend 
and installed a package name axios to fetch data , react table to form a table format.

2)after that we have created a fie named ApiComponent -
  a) import React, { useState, useEffect } from 'react';
     here we imported react and hooks.

  b) function ApiComponent() {
  const [usersQuery1, setUsersQuery1] = useState([]);
  const [usersQuery2, setUsersQuery2] = useState([]);
  const [usersQuery3, setUsersQuery3] = useState([]);
  const [usersQuery4, setUsersQuery4] = useState([]);
  const [usersQuery5, setUsersQuery5] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch data for query 1
      const res1 = await fetch('http://localhost:5000/income/BMW-Mercedes');
      const data1 = await res1.json();
      setUsersQuery1(data1);

      // Fetch data for query 2
      const res2 = await fetch('http://localhost:5000/gender/phone');
      const data2 = await res2.json();
      setUsersQuery2(data2);

      // Fetch data for query 3
      const res3 = await fetch('http://localhost:5000/last_name/email');
      const data3 = await res3.json();
      setUsersQuery3(data3);

      // Fetch data for query 4
      const res4 = await fetch('http://localhost:5000/car/email');
      const data4 = await res4.json();
      setUsersQuery4(data4);

      // Fetch data for query 5
      const res5 = await fetch('http://localhost:5000/top_cities');
      const data5 = await res5.json();
      setUsersQuery5(data5);
    }
    fetchData();
  }, []);
  In this step we have created a function named ApiComponent and created a constant with query name after that we used the useEffect to write the function for fetching data from different
  queries with thier respective routes and from backend file.
 
  c) return (
    <div>
      <h1>Users with income lower than $5 USD and have a car of brand BMW or Mercedes:</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Income</th>
            <th>Car </th>
          </tr>
        </thead>
        <tbody>
          {usersQuery1.map(user => (
            <tr>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.email}</td>
              <td>{user.income}</td>
              <td>{user.car}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <h1>Male users with phone price greater than 10,000:</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Phone Price</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {usersQuery2.map(user => (
            <tr>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.email}</td>
              <td>{user.phone_price}</td>
              <td>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name:</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Quote</th>
          </tr>
        </thead>
        <tbody>
          {usersQuery3.map(user => (
            <tr>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.quote}</td>
            </tr>
          ))}
        </tbody>
      </table>
           
      <h1> Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit:</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Email</th>
            <th>Car</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {usersQuery4.map(user => (
            <tr>
              <td>{user.first_name}</td>
              <td>{user.email}</td>
              <td>{user.car}</td>
              <td>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      

      <h1>Show the data of top 10 cities which have the highest number of users and their average income:</h1>
      <table>
        <thead>
          <tr>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {usersQuery5.map(user => (
            <tr>
              <td>{user.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      

  );
  Now in this step we had written the return statement to return the fetched data, here first we given the heading using "h1" tag . after that we created a table with with "th" tag 
  defining the row of a table, "th" tag to define the header cell of table and "td" tag to define the cell in the table . here the userQuery.map is to fetch data from specific query and 
  in each cell and user.? to specify the data we want in each cell.
 
  d)export default ApiComponent;
  this will help in exporting the file we have created 

3) after this step we go to our main file index.js and write-
  a)import React from 'react'; 
    import ReactDOM from 'react-dom/client';
    import ApiComponent from './ApiComponent';
   In this step we imported our dependencies and our ApiComponent file
  
  b)const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  <React.StrictMode>
    <ApiComponent />  
  </React.StrictMode>
  );
  Here ,it is here to render the react app, and from APiComponent the component we created. 
 after that we start our react app using npm start.
	             