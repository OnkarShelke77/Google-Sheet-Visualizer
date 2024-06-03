const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const GOOGLE_SHEET_ID = '134ZIhplKHX5TV1kPLXft9QsKDD1y5Epmm-aQ5fBqIzs';
const GOOGLE_SHEET_RANGE = 'Sheet1';
const API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY';

const SHEETS_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${GOOGLE_SHEET_RANGE}?key=${API_KEY}`;

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(SHEETS_API_URL);
    const rows = response.data.values;
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      let obj = {};
      row.forEach((cell, i) => {
        obj[headers[i]] = cell;
      });
      return obj;
    });
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error.response ? error.response.data : error.message);
    res.status(500).send('Error retrieving data');
  }
});

app.post('/api/data', async (req, res) => {
  const { id, avatarName, performanceScore } = req.body;
  try {
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${GOOGLE_SHEET_RANGE}:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;
    await axios.post(appendUrl, {
      values: [[id, avatarName, performanceScore]]
    });
    res.status(201).send('Row added');
  } catch (error) {
    console.error('Error adding data:', error.response ? error.response.data : error.message);
    res.status(500).send('Error adding data');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
