/* mySeedScript.js */

// require the necessary libraries
const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;


function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
  // Connection URL


  const client = new MongoClient('mongodb://localhost:27018', {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const collection = client.db("leposti_dev").collection("users");

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    collection.drop();

    // make a bunch of time series data
    let timeSeriesData = [];

    for (let i = 0; i < 50; i++) {
      const name = faker.name.firstName();
      const lname = faker.name.lastName();
      const doc_id = Math.floor(Math.random() * 1000000) + 1088000000;
      const phone = faker.phone.phoneNumber();
      const city = faker.address.city()
      const address = faker.address.streetAddress()
      const email = faker.internet.email()

      let data = { name, lname, doc_id, phone, city, address, email }

      timeSeriesData.push(data);
    }

    console.log(timeSeriesData);
    collection.insertMany(timeSeriesData);

    console.log("Database seeded! :)");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();