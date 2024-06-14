const mongoose = require('mongoose')

const URI = process.env.URI

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(URI) 
        console.error(`Database Connection Successful: ${connect.connection.name}`);
    } catch (error) {
        console.error(`Database Connection Failed`);
        process.exit(0)
    }
}

module.exports = connectDB 