import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SheetData = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ id: '', avatarName: '', performanceScore: '' });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/data', formData);
      fetchData();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Google Sheet Data</h1>
      <table>
        <thead>
        </thead>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Avatar Name</th>
      <th scope="col">Performance Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Test 1</td>
      <td>8</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Test 2</td>
      <td>7</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Test 3</td>
      <td>6</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Test 4</td>
      <td>5</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Test 5</td>
      <td>4</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Test 6</td>
      <td>3</td>
    </tr>
    <tr>
      <td>7</td>
      <td>Test 7</td>
      <td>2</td>
    </tr>
    <tr>
      <td>8</td>
      <td>Test 8</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
        
        <tbody>
          {data.map((row) => (
            <tr key={row.ID}>
              <td>{row.ID}</td>
              <td>{row['Avatar Name']}</td>
              <td>{row['Performance Score']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Avatar Name"
          value={formData.avatarName}
          onChange={(e) => setFormData({ ...formData, avatarName: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Performance Score"
          value={formData.performanceScore}
          onChange={(e) => setFormData({ ...formData, performanceScore: e.target.value })}
          required
        />
        <br/> <br />
        <button onClick={fetchData} >Sync Data</button>
      
        <button type="submit">Add Row</button>
      </form>
    </div>
  );
};

export default SheetData;
