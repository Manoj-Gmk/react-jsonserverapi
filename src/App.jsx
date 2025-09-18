import { useEffect, useState } from "react";

function App() {
  const [apidata, setApidata] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching data from the local JSON server
    fetch("http://localhost:5000/quotes")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch data. JSON Server might not be running"
          );
        }
        return response.json();
      })
      .then((data) => setApidata(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <div>
        <h1 className="text-center">
          Fetching data from db.json using JSON Server
        </h1>
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
