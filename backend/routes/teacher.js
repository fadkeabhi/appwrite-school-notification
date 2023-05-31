const express = require('express')
const router = express.Router()

router.post('/feed/create', async (req, res) => {
    if (req.session.role === 'teacher') {
        if (req.body.title &&
            req.body.content &&
            req.body.clas) {
            const { createFeed } = require('../controllers/feed')
            const docs = await createFeed(req.session.email,
                req.body.title,
                req.body.content,
                req.body.clas)
            if (docs === true) {
                res.json({ msg: 'Feed Created Successfully.' })
            }
            else {
                res.json({ msg: 'Feed Created Failed.' })
            }
        }
        else {
            res.json({ msg: 'All Fields Are required' })
        }
    }
    else {
        res.json({ msg: 'Teacher access only' })
    }
})

router.get('/feed/get', async (req,res) => {
    if (req.session.role === 'teacher') {
        const { getFeedByEmail } = require('../controllers/feed')
        res.json( await getFeedByEmail(req.session.email));
    }
})


module.exports = router