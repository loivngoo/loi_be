import mongoose from 'mongoose';
const db = {
    connect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

const auth = db.user && db.password ? `${db.user}:${db.password}@` : '';
const connOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(`${db.connect}://${auth}${db.host}/${db.database}`, {
            ...connOptions,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        if (connect) console.log(`Mongodb connected - ${connect.connection.host}`);
    } catch (err) {
        console.log(`Database error ${err}`);
    }
};

export { connectDb };
