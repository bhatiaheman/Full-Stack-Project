import React, { useState, useEffect } from 'react';

function ApiComponent() {
  const [usersQuery1, setUsersQuery1] = useState([]);
  const [usersQuery2, setUsersQuery2] = useState([]);
  const [usersQuery3, setUsersQuery3] = useState([]);
  const [usersQuery4, setUsersQuery4] = useState([]);
  const [usersQuery5, setUsersQuery5] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch data for query 1
      const res1 =  await fetch('http://localhost:5000/income/BMW-Mercedes');
      const data1 = await res1.json();
      setUsersQuery1(data1);

      // Fetch data for query 2
      const res2 =  await fetch('http://localhost:5000/gender/phone');
      const data2 = await res2.json();
      setUsersQuery2(data2);

      // Fetch data for query 3
      const res3 =  await fetch('http://localhost:5000/last_name/email');
      const data3 =  await res3.json();
      setUsersQuery3(data3);

      // Fetch data for query 4
      const res4 =  await fetch('http://localhost:5000/car/email');
      const data4 = await  res4.json();
      setUsersQuery4(data4);

      // Fetch data for query 5
      const res5 =  await fetch('http://localhost:5000/top_cities');
      const data5 =  await res5.json();
      setUsersQuery5(data5);
    }
    fetchData();
  }, []);

  return (
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
            <th>Gender</th>
            <th>Email</th>
            <th>Quote</th>
          </tr>
        </thead>
        <tbody>
          {usersQuery3.map(user => (
            <tr>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
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
            <th>Gender</th>
            <th>Car</th>
          </tr>
        </thead>
        <tbody>
          {usersQuery4.map(user => (
            <tr>
              <td>{user.first_name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.car}</td>
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
}
export default ApiComponent;