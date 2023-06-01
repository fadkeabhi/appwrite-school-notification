//moved all to appwrite

const feed = require('../models/feed')

const sdk = require('node-appwrite');
const client = new sdk.Client();
const databases = new sdk.Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT) // Your project ID
    .setKey(process.env.APPWRITE_KEY) // Your secret API key


async function createFeed(email,
    title,
    content,
    clas) {
    let isSuccess
    //check if teacher has access to class
    const { findByEmailT } = require('./teacher')
    const docs = await findByEmailT(email)
    if (docs.class.includes(clas)) {
        //teacher have access to class
        await databases.createDocument(process.env.DATABASE_ID, process.env.COLLECTION_ID_FEED, sdk.ID.unique(), {
            title: title,
            content: content,
            createdBy: email,
            class: clas
        })
            .then((e) => {
                isSuccess = true
            })
            .catch((err) => {
                console.log(err)
                isSuccess = false
            })
    }
    else {
        //teacher dont have access to class
        isSuccess = false
    }
    if (isSuccess) {
        //send notification
        let fullName = docs.fName + ' ' + docs.lName
        const { sendNotificationToTopic } = require('./novu')
        //send to student
        sendNotificationToTopic(clas,
            title,
            content,
            fullName)
        //send to parent
        let tmp = 'parent_' + clas
        sendNotificationToTopic(tmp,
            title,
            content,
            fullName)
    }
    return isSuccess
}

async function getFeedByEmail(email) {

    const docs = await databases.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID_FEED,[sdk.Query.equal("createdBy", [email]) , sdk.Query.orderDesc("$createdAt")])
        .catch((err) => {
            console.log(err);
        })
    return docs.documents;
}

async function getFeedByClass(clas) {
    const docs = await databases.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID_FEED,[sdk.Query.equal("class", [clas]) , sdk.Query.orderDesc("$createdAt")])
        .catch((err) => {
            console.log(err)
        })
    return docs.documents
}

async function getFeedByClassWithLimit(clas, limit) {
    const docs = await databases.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID_FEED,[sdk.Query.equal("class", [clas]) , sdk.Query.orderDesc("$createdAt") , sdk.Query.limit(limit)])
        .catch((err) => {
            console.log(err)
        })
    return docs.documents
}

module.exports = { createFeed, getFeedByEmail, getFeedByClass, getFeedByClassWithLimit }