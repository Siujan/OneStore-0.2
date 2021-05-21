import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import UsersDAO from './dao/usersDAO.js'
import ProductsDAO from './dao/productsDAO.js'

dotenv.config()
const MongoClient = mongodb.MongoClient;
 
const PORT = process.env.PORT || 8000;

MongoClient.connect(
    process.env.DB_URI,
    {
        poolSize: 50,
        writeConcern: {
            wtimeout: 2500
        },
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(err =>{
        console.error(err.stack)
        process.exit(1);
    })
    .then(async client =>{
        //create DAO here
        await UsersDAO.injectDB(client);
        await ProductsDAO.injectDB(client);
        app.listen(PORT, ()=>{
            console.log(`listening on port ${PORT}`)
        })
    })