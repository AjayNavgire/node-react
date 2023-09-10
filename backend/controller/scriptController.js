
const axios = require('axios');
const { MongoClient } = require('mongodb');
const catchAsyncError = require("../middleware/catchAsyncError");

// API endpoint
const apiEndpoint = 'https://restcountries.com/v3/all';

// MongoDB connection URL
const mongoUrl = process.env.DB_URI || 'mongodb://localhost:27017'; // Use environment variable or default

// Database and collection names
const dbName = 'User';
const collectionName = 'countries';

async function fetchData() {
  try {
    const response = await axios.get(apiEndpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

async function storeData(data) {
  const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert the data into the MongoDB collection
    const result = await collection.insertMany(data);

    console.log(`Inserted ${result.insertedCount} documents into MongoDB.`);
  } catch (error) {
    console.error('Error storing data in MongoDB:', error.message);
  } finally {
    client.close(); // Close the MongoDB connection, even on error
  }
}

exports.script = catchAsyncError(async function () {
    // Fetch data from the API
    const data = await fetchData();

    // Store the data in MongoDB
    await storeData(data);
 
})

// Run the main function
// main();
