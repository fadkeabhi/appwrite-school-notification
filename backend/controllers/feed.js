const feed = require('../models/feed')

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
        await feed.create({
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
    if(isSuccess){
        //send notification
        let fullName = docs.fName + ' ' + docs.lName
        const {sendNotificationToTopic} = require('./novu')
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

async function getFeedByEmail(email){
    const docs = await feed.find({ createdBy : email })
    .sort({ 'updatedAt': -1 })
    .catch((err)=>{
        console.log(err);
    })
    return docs;
}

async function getFeedByClass(clas) {
    const docs = await feed.find({ class: clas })
        .sort({ 'updatedAt': -1 })
        .catch((err) => {
            console.log(err)
        })
    return docs
}

async function getFeedByClassWithLimit(clas,limit) {
    const docs = await feed.find({ class: clas })
        .sort({ 'updatedAt': -1 })
        .limit(limit)
        .catch((err) => {
            console.log(err)
        })
    return docs
}

module.exports = { createFeed, getFeedByEmail, getFeedByClass, getFeedByClassWithLimit }