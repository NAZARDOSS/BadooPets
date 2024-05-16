//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//export default App;

function Dogs() {
  const [dogs, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5296/api/DogsStorage')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Once data is fetched, update the state to store the products
          setProducts(data);
        })
        .catch(error => {
          // Handle any errors
          console.error('There was a problem fetching the products:', error);
        });
  }, []); // Empty dependency array means this effect will run once after the component mounts

  return (
      <div>
          <h1>Dogs</h1>
          <ul>
              {dogs.map(dog => (
                  <li key={dog.id}>
                      <strong>Name:</strong> {dog.name}, <strong>Age:</strong> {dog.age}
                  </li>
              ))}
          </ul>
      </div>
  );
}

export default Dogs;
