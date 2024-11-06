import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://www.alphavantage.co/query?function=HISTORICAL_OPTIONS&symbol=IBM&apikey=demo'
        );
        const historicalData = response.data; // Assuming this is the response format

        // You may need to adjust this based on the actual structure of the API response
        const formattedData = historicalData["optionData"]?.map(item => ({
          startDate: item.startDate,
          price: item.price,
          endDate: item.endDate
        })) || [];

        setData(formattedData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty array ensures this only runs once, on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Historical Options Data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Start Date</th>
            <th>Price</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.startDate}</td>
                <td>{item.price}</td>
                <td>{item.endDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
