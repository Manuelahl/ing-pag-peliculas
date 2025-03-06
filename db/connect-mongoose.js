const mongoose = require('mongoose');

const getConnection = async () => {

    try{
        const url = 'mongodb://manuelah:3rTZxTFf51Z920V9@cluster0-shard-00-00.s4n8u.mongodb.net:27017,cluster0-shard-00-01.s4n8u.mongodb.net:27017,cluster0-shard-00-02.s4n8u.mongodb.net:27017/?ssl=true&replicaSet=atlas-qctbkh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
        
        await mongoose.connect(url);
    
        console.log('conexión exitosa');

    } catch(error) {
        console.log(error);
    }
}

    module.exports = {
        getConnection,
    }
