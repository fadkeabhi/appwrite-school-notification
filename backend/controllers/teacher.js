const sdk = require('node-appwrite');


// Init SDK
const client = new sdk.Client();
const databases = new sdk.Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT) // Your project ID
    .setKey(process.env.APPWRITE_KEY) // Your secret API key


async function createTeacher(email, fName, lName, phone) {
    let createdOrNot
    await databases.createDocument(process.env.DATABASE_ID, process.env.COLLECTION_ID_TEACHER, email.replace(/[^a-zA-Z0-9 ]/g), {
        email: email,
        fName: fName,
        lName: lName,
        phone: phone
    })
        .then(() => {
            createdOrNot = true
        })
        .catch((err) => {
            console.log(err)
            createdOrNot = false
        })
    return createdOrNot
}

async function updateTeacher(email, fName, lName, phone) {
    let docs
    await teacher.updateOne({ email: email },
        {
            fName: fName,
            lName: lName,
            phone: phone,
        })
        .then((e) => {
            docs = e
        })
        .catch((err) => {
            console.log(err)
        })
    return docs
}

async function findByEmailT(email) {
    const docs = await teacher.findOne({ email: email })
        .catch((err) => {
            console.log(err)
        })

    return docs

}

async function getAllT() {
    const docs = await teacher.find({})
        .catch((err) => {
            console.log(err)
        })
    return docs
}

async function pushClas(email, clas) {
    let isSuccess
    await teacher.findOne({ email: email })
        .catch((err) => {
            console.log(err)
            isSuccess = false
        })
        .then((e) => {
            if (e.class.includes(clas)) {
                isSuccess = true
            }
            else {
                e.class.push(clas)
                const result = e.save()
                if (result) {
                    isSuccess = true
                }
            }
        })
    return isSuccess
}

async function pullClas(email, clas) {
    let isSuccess
    await teacher.findOne({ email: email })
        .catch((err) => {
            console.log(err)
            isSuccess = false
        })
        .then((e) => {
            if (e.class.includes(clas)) {
                e.class.pull(clas)
                const result = e.save()
                if (result) {
                    isSuccess = true
                }
            }
            else {
                isSuccess = true
            }
        })
    return isSuccess
}

async function getAllTByClas(clas) {
    const docs = await teacher.find({ class: clas })
        .catch((err) => {
            console.log(err)
        })
    return docs
}

module.exports = { pushClas, getAllTByClas, pullClas, createTeacher, updateTeacher, findByEmailT, getAllT }