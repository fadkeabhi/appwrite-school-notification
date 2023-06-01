//moved all to appwrite
const sdk = require('node-appwrite');
// Init SDK
const client = new sdk.Client();
const databases = new sdk.Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT) // Your project ID
    .setKey(process.env.APPWRITE_KEY) // Your secret API key

//appwrite
async function createTeacher(email, fName, lName, phone) {
    let email2 = email.replace(/[^a-zA-Z0-9]/g , '_')
    let createdOrNot
    await databases.createDocument(process.env.DATABASE_ID, process.env.COLLECTION_ID_TEACHER, email2, {
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

//appwrite
async function findByEmailT(email) {
    const docs = await databases.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID_TEACHER,[sdk.Query.equal("email", [email])])
        .catch((err) => {
            console.log(err)
        })

    return docs?.documents[0]

}

//appwrite
async function getAllT() {
    const docs = await databases.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID_TEACHER)
        .catch((err) => {
            console.log(err)
        })

    return docs?.documents
}

//appwrite
async function pushClas(email, clas) {
    let isSuccess
    let doc = await findByEmailT(email)
    if(!doc){
        isSuccess = false
    }
    else if(doc.class.includes(clas)){
        isSuccess = true
    }
    else{
        //add class to doc
        doc.class.push(clas)
        await databases.updateDocument(process.env.DATABASE_ID, process.env.COLLECTION_ID_TEACHER, doc.$id, {class : doc.class})
        .then((e) => {
            isSuccess = true
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return isSuccess
}

//appwrite
async function pullClas(email, clas) {
    let isSuccess = false
    let doc = await findByEmailT(email)
    if(!doc){
        isSuccess = false
    }
    else if(!doc.class.includes(clas)){
        isSuccess = true
    }
    else{
        //add class to doc
        // doc.class.pull(clas)
        doc.class.splice(doc.class.findIndex(a => a === clas) , 1)
        await databases.updateDocument(process.env.DATABASE_ID, process.env.COLLECTION_ID_TEACHER, doc.$id, {class : doc.class})
        .then((e) => {
            isSuccess = true
        })
        .catch((err) => {
            console.log(err)
        })
    }
    console.log(isSuccess)
    return isSuccess
}



//appwrite
async function getAllTByClas(clas) {
    let ret = []
    const docs = await databases.listDocuments(process.env.DATABASE_ID, process.env.COLLECTION_ID_TEACHER)
        .catch((err) => {
            console.log(err)
        })
    for(let i = 0; i<docs.total; i++){
        if(docs.documents[i].class.includes(clas)){
            ret.push(docs.documents[i])
        }
    }
    return ret
}

module.exports = { pushClas, getAllTByClas, pullClas, createTeacher, updateTeacher, findByEmailT, getAllT }