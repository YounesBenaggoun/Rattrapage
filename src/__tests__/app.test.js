
require('dotenv').config({
    quiet: true,
});


const request = require("supertest");
const app = require("../app.js");
const mongoose = require("mongoose");


beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.disconnect();
});






require("./api.js")();
require("./authTest.js")();

