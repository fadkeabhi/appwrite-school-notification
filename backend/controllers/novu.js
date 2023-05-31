const { Novu } = require("@novu/node");

const novu = new Novu(process.env.NOVU_API_KEY);

async function createTopic(name) {
    name = name.replace(/\s+/g, '-');
    name = process.env.random + name
    const result = await novu.topics.create({
        key: name,
        name: name,
    })
        .catch((err) => {
            console.log(err)
            return false
        })
    if (result) {
        console.log("Topic created : " + name)
    }
    return true
}

async function removeFromTopic(email, name) {
    name = name.replace(/\s+/g, '-');
    name = process.env.random + name
    const result = await novu.topics.removeSubscribers(name, {
        subscribers: [email],
    })
        .catch((err) => {
            console.log(err)
            return false
        })
    if (result) {
        console.log("Removed : " + name)
    }
}

async function addToTopic(email, name) {
    console.log(email + name)
    name = name.replace(/\s+/g, '-');
    name = process.env.random + name
    const result = await novu.topics.addSubscribers(name, {
        subscribers: [email],
    })
        .catch((err) => {
            console.log(err)
            return false
        })
    if (result) {
        console.log("Added : " + name)
    }
}

async function createSubscriber(email,
    firstName,
    lastName,
    phone,
) {
    await novu.subscribers.identify(email, {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
    })
        .catch((err) => {
            console.log(err)
            return false
        })
}

async function sendNotificationToTopic(clas,
    title,
    content,
    createdBy
) {
    clas = clas.replace(/\s+/g, '-');
    clas = process.env.random + clas
    await novu.trigger('notification', {
        to: [{ type: 'Topic', topicKey: clas }],
        payload: {
            subject: title,
            content: content,
            createdBy:createdBy
        },
    })
        .catch((err) => {
            console.log(err)
            return false
        })
        .then((e) => {
            console.log("Sent Notification")
        })
}


module.exports = { sendNotificationToTopic, createTopic, removeFromTopic, addToTopic, createSubscriber }