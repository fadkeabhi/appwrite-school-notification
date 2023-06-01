//moved all to appwrite database

const clasM = require('../models/clas')

const sdk = require('node-appwrite');
const client = new sdk.Client();
const databases = new sdk.Databases(client);
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT) // Your project ID
    .setKey(process.env.APPWRITE_KEY) // Your secret API key


async function checkClasExist(clas) {
    const docs = await databases.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID_CLASS,[sdk.Query.equal("class", [clas])])
    if (docs?.documents[0]) {
        return docs?.documents[0];
    }
    else {
        return false
    }
}

async function createClas(clas) {
    //check if class exist
    let clas2 = clas.replace(/[^a-zA-Z0-9]/g , '_')
    let createdOrNot
    if (await checkClasExist(clas)) {
        createdOrNot = true
    }
    else {
        await databases.createDocument(process.env.DATABASE_ID, process.env.COLLECTION_ID_CLASS, clas2 , {
            class:clas
        })
            .then(() => {
                createdOrNot = true
            })
            .catch((err) => {
                console.log(err)
                createdOrNot = false
            })

        //create novu topic if class is created
        if(createdOrNot){
            const { createTopic } = require('./novu')
            createTopic(clas)
        }
        console.log(createdOrNot)
        return createdOrNot
    }
}


async function getAllC(){
    // databases.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID_CLASS,[sdk.Query.equal("class", ["test"])])
    let docs = await databases.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID_CLASS)
    .catch((err) => {
        console.log(err)
    })
    //filtering unnessesary fields, as select query not working
    return docs.documents
    
    // const docs2 = await clasM.find({})
    // .catch((err) => {
    //     console.log(err)
    // })
    // console.log(docs2)
    // return docs2
}

module.exports = { createClas,checkClasExist,getAllC }