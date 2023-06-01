const student = require('../models/student')

const sdk = require('node-appwrite');
const client = new sdk.Client();
const databases = new sdk.Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT) // Your project ID
    .setKey(process.env.APPWRITE_KEY) // Your secret API key

async function createStudent(email,
    parentEmail,
    fName,
    pName,
    lName,
    sPhone,
    pPhone) {
    const { findByEmailT } = require("./teacher")
    let createdOrNot
    if (await findByEmailS(email) ||
        await findByEmailS(parentEmail) ||
        await findByEmailP(email) ||
        await findByEmailP(parentEmail) ||
        await findByEmailT(email) ||
        await findByEmailT(parentEmail)) {
        createdOrNot = false
    }
    else {
        let email2 = email.replace(/[^a-zA-Z0-9]/g, '_')
        await databases.createDocument(process.env.DATABASE_ID, process.env.COLLECTION_ID_STUDENT, email2, {
            email: email,
            parentEmail: parentEmail,
            fName: fName,
            pName: pName,
            lName: lName,
            sPhone: sPhone,
            pPhone: pPhone,
            class: ''
        })
            .then(() => {
                createdOrNot = true
            })
            .catch((err) => {
                console.log(err)
                createdOrNot = false
            })
    }
    // create subscriber in novu if createdOrNot
    if (createdOrNot) {
        const { createSubscriber } = require('./novu')
        //create student
        createSubscriber(email,
            fName,
            lName,
            sPhone)
        //create parent
        createSubscriber(parentEmail,
            pName,
            lName,
            pPhone)
    }

    return createdOrNot
}

async function updateStudent(email,
    fName,
    pName,
    lName,
    sPhone,
    pPhone) {

    let docs
    let email2 = email.replace(/[^a-zA-Z0-9]/g, '_')
    await databases.updateDocument(process.env.DATABASE_ID, process.env.COLLECTION_ID_STUDENT, email2, {
        fName: fName,
        pName: pName,
        lName: lName,
        sPhone: sPhone,
        pPhone: pPhone
    })
        .then((e) => {
            docs = e
        })
        .catch((err) => {
            console.log(err)
        })
    return docs

}

async function findByEmailS(email) {
    const docs = await databases.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID_STUDENT, [sdk.Query.equal("email", [email])])
        .catch((err) => {
            console.log(err)
        })
    return docs?.documents[0]
}

async function findByEmailP(email) {
    const docs = await databases.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID_STUDENT, [sdk.Query.equal("parentEmail", [email])])
        .catch((err) => {
            console.log(err)
        })
    return docs?.documents[0]
}

async function getAllSByClas(clas) {
    const docs = await databases.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID_STUDENT, [sdk.Query.equal("class", [clas])])
        .catch((err) => {
            console.log(err)
        })
    return docs?.documents
}

async function getAllS() {
    const docs = await databases.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID_STUDENT)
        .catch((err) => {
            console.log(err)
        })
    return docs?.documents
}

async function updateClassS(email, clas) {
    let isSuccess
    let old
    const { checkClasExist } = require('./class')
    if (await checkClasExist(clas)) {
        //get old class
        old = await findByEmailS(email)

        //update class
        let email2 = email.replace(/[^a-zA-Z0-9]/g, '_')
        const result = await databases.updateDocument(process.env.DATABASE_ID, process.env.COLLECTION_ID_STUDENT, email2, {
            class: clas
        })
            .catch((err) => {
                console.log(err)
                isSuccess = false
            })
        if (result) {
            isSuccess = true
        }
        else {
            isSuccess = false
        }
    }
    else {
        isSuccess = false
    }

    //remove student from old topic
    //add student to topic if isSuccess
    if (isSuccess) {
        const { addToTopic, removeFromTopic } = require('./novu')
        let tmp = 'parent_' + clas
        //student
        if (old) {
            await removeFromTopic(email, old.class)
            await removeFromTopic(old.parentEmail, tmp)
            console.log("old found")
        }
        await addToTopic(email, clas)
        await addToTopic(old.parentEmail, tmp)

        //parent
    }

    return isSuccess
}


async function removeClassS(email) {
    let isSuccess
    let old
    const { checkClasExist } = require('./class')
    //get old class
    old = await findByEmailS(email)
    let email2 = email.replace(/[^a-zA-Z0-9]/g, '_')
    const result = await databases.updateDocument(process.env.DATABASE_ID, process.env.COLLECTION_ID_STUDENT, email2, {
        class: ''
    })
        .catch((err) => {
            console.log(err)
            isSuccess = false
        })
    if (result) {
        isSuccess = true
    }
    else {
        isSuccess = false
    }


    //remove student from old topic
    if (isSuccess) {
        const { removeFromTopic } = require('./novu')
        await removeFromTopic(email, old.class)
        let tmp = 'parent_' + old.class
        await removeFromTopic(old.parentEmail, tmp)
    }

    return isSuccess
}

module.exports = { updateStudent, removeClassS, updateClassS, getAllSByClas, getAllS, createStudent, findByEmailS, findByEmailP }