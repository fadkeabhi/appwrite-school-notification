const clasM = require('../models/clas')

async function checkClasExist(clas) {
    const docs = await clasM.findOne({ class: clas })
    if (docs) {
        return docs;
    }
    else {
        return false
    }
}

async function createClas(clas) {
    //check if class exist
    let createdOrNot
    if (await checkClasExist(clas)) {
        createdOrNot = true
    }
    else {
        await clasM.create({
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
        return createdOrNot
    }
}


async function getAllC(){
    const docs = await clasM.find({})
    .catch((err) => {
        console.log(err)
    })
    return docs
}


module.exports = { createClas,checkClasExist,getAllC }