// Importing React hooks: useEffect (for side effects) and useState (to manage state)
import { useEffect, useState } from "react";

// Main functional component
function App() {
  // State to store fetched data from the API
  const [apidata, setApidata] = useState(null);

  // State to store error message if fetch fails
  const [error, setError] = useState(null);

  // useEffect hook runs once after the component is mounted
  useEffect(() => {
    // Fetching data from the local JSON server
    fetch("http://localhost:5000/quotes")
      .then((response) => {
        // If response is not OK (e.g., 404 or 500), throw a custom error
        if (!response.ok) {
          throw new Error(
            "Failed to fetch data. JSON Server might not be running"
          );
        }
        // Parse the JSON response
        return response.json();
      })
      // Set the API data to state
      .then((data) => setApidata(data))
      // Catch network or fetch-related errors and update the error state
      .catch((err) => setError(err.message));
  }, []);

  // JSX to render the component
  return (
    <>
      <div>
        {/* Title Header */}
        <h1 className="text-center">
          Fetching data from db.json using JSON Server
        </h1>

        {/* Display error message if there's a problem fetching data */}
        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              fontSize: "25px",
              margin: "60px",
            }}
          >
            ⚠️ {error}
          </p>
        )}

        {/* If there's no error, display the table with data */}
        {!error && (
          <div>
            <table className="table table-dark table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>QUOTE</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through API data and render each row */}
                {apidata &&
                  apidata.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.quote}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

// Exporting the App component as default
export default App;

/*
To run JSON Server locally and make this app work:
1. Make sure you have installed json-server globally or in your project.
2. In your terminal, navigate to the folder where `db.json` exists.
3. Run this command:
   npx json-server --watch db.json --port 5000

This will start a fake REST API at: http://localhost:5000/quotes
Make sure the endpoint matches the URL in your fetch().
*/
