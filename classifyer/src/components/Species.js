import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const SpeciesList = () => {
  const [speciesData, setSpeciesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        const response = await axios.get('https://www.canada.ca/content/dam/eccc/documents/csv/cesindicators/status-wild-species/2023/2_selected-groups.csv');
        Papa.parse(response.data, {
          complete: (result) => {
            setSpeciesData(result.data);
            setLoading(false);
          },
          header: true,
        });
      } catch (err) {
        setError('Failed to fetch species data');
        setLoading(false);
      }
    };

    fetchSpeciesData();
  }, []);

  if (loading) return <p>Loading species data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Species in Canada</h2>
      <table>
        <thead>
          <tr>
            <th>Species Group</th>
            <th>Number of Species</th>
          </tr>
        </thead>
        <tbody>
          {speciesData.map((row, index) => (
            <tr key={index}>
              <td>{row['Species Group']}</td>
              <td>{row['Number of Species']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpeciesList;
