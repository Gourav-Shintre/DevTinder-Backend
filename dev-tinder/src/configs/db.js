import mongoose from 'mongoose'
// Connection string comes from .env so it stays out of source control.
// Falls back to a local MongoDB, which corporate network filtering cannot block.
const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/devTinder";

export const connectDB = async function (){
    // No try/catch here on purpose: if the connection fails we want the
    // returned promise to REJECT so app.js can refuse to start the server.
    // Catching without rethrowing would make this resolve as if it succeeded.
    await mongoose.connect(URI);
}

