const express = require('express')
const router = express.Router()

router.get('/projectid',(req,res)=>{
    res.json({projectId:process.env.APPWRITE_PROJECT})
})

router.get('/session', async (req, res) => {
    if (req.session.role === 'admin') {
        res.json({
            role: req.session.role,
            email:req.session.email
        })
    }
    else if (req.session.role === 'teacher') {
        const { findByEmailT } = require('../controllers/teacher')
        data = await findByEmailT(req.session.email)
        res.json({
            google: req.user,
            role: req.session.role,
            email: data.email,
            fName: data.fName,
            lName: data.lName,
            phone: data.phone,
            class: data.class
        })
    }
    else if (req.session.role === 'student') {
        const { findByEmailS } = require('../controllers/student')
        data = await findByEmailS(req.session.email)
        res.json({
            google: req.user,
            role: req.session.role,
            email: data.email,
            parentEmail: data.parentEmail,
            fName: data.fName,
            pName: data.pName,
            lName: data.lName,
            sPhone: data.sPhone,
            pPhone: data.pPhone,
            clas:data.clas
        })
    }
    else if (req.session.role === 'parent') {
        const { findByEmailP } = require('../controllers/student')
        data = await findByEmailP(req.session.email)
        res.json({
            google: req.user,
            role: req.session.role,
            email: data.email,
            parentEmail: data.parentEmail,
            fName: data.fName,
            pName: data.pName,
            lName: data.lName,
            sPhone: data.sPhone,
            pPhone: data.pPhone,
            clas:data.clas
        })
    }
    else {
        res.json({})
    }
})

module.exports = router