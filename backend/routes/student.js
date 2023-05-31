const express = require('express')
const router = express.Router()
const { createHmac } = require('crypto')


router.get('/novu/key', async (req, res) => {
    if (req.session.role === 'student' || req.session.role === 'parent') {
        const hmacHash = createHmac('sha256', process.env.NOVU_API_KEY).update(req.session.email).digest('hex');
        res.json({email:req.session.email,
            hash:hmacHash})
    }
    else {
        res.json({})
    }
})

router.get('/feed/:limit', async (req, res) => {
    //if all feed is requested
    if (!isNaN(req.params.limit)) {
        //if limit exist
        const { getFeedByClassWithLimit } = require('../controllers/feed')
        const docs = await getFeedByClassWithLimit(req.session.clas, Number(req.params.limit))
        res.json(docs)
    }
    else {
        //invalid
        res.json({})
    }


    // limit = Number(req.params.limit)
    // if(limit>10){
    //     res.json({number : limit})
    // }
    // else{
    //     res.json({string : limit})
    // }

})

module.exports = router