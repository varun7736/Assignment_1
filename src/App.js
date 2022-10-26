import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [apiData, setApiData] = useState();

  useEffect(() => {
    const fetchApiData = async () => {
      const response = await fetch(
        "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
      );

      if (!response.ok) {
        throw new Error("Something went wrong...!");
      }

      const responseData = await response.json();

      //console.log(responseData);

      const loadedData = [];

      for (const content in responseData) {
        if (content === "Time Series (5min)") {
          const timeData = responseData[content];
          //console.log(timeData);
          for (const date in timeData) {
            loadedData.push({
              dateTime: date,
              open: timeData[date]["1. open"],
              high: timeData[date]["2. high"],
              low: timeData[date]["3. low"],
              close: timeData[date]["4. close"],
              volume: timeData[date]["5. volume"],
            });
          }
        }
      }

      //console.log(loadedData.length);
      setApiData(loadedData);
    };

    fetchApiData().catch((error) => {
      console.log("Error " + error.message);
    });
  }, []);

  let dataList;
  let displaydata = "Loading...";

  if (apiData) {
    dataList = apiData.map((data) => (
      <tr key={data.dateTime}>
        <td>{data.dateTime}</td>
        <td>{data.open}</td>
        <td>{data.high}</td>
        <td>{data.low}</td>
        <td>{data.close}</td>
        <td>{data.volume}</td>
      </tr>
    ));

    displaydata = (
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>Date Time</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>{dataList}</tbody>
        </table>
      </div>
    );
  }

  return <div>{displaydata}</div>;
}

export default App;
