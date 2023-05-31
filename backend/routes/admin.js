//Note for testing not used admin authentication remove true from all conditions
const express = require('express')
const router = express.Router()

router.get('/teachers/:clas', async (req, res) => {
    if (req.session.role === 'admin') {
        const { getAllTByClas } = require('../controllers/teacher')
        res.json(await getAllTByClas(req.params.clas))
    }
    else {
        res.json({})
    }
})

router.get('/teachers', async (req, res) => {
    if (req.session.role === 'admin') {
        const { getAllT } = require('../controllers/teacher')
        res.json(await getAllT())
    }
    else {
        res.json({})
    }
});

router.post('/teacher/create', async (req, res) => {
    if (req.session.role === 'admin' || true) {
        if (req.body.email &&
            req.body.fName &&
            req.body.lName &&
            req.body.phone ) {
            const { createTeacher } = require('../controllers/teacher')
            const createdOrNot = await createTeacher(req.body.email,
                req.body.fName,
                req.body.lName,
                req.body.phone)
            if (createdOrNot === true) {
                res.json({ msg: 'Teacher Created Successfully.' })
            }
            else {
                res.json({ msg: 'Teacher Created Failed.' })
            }

        }
        else {
            res.json({ msg: 'All Fields Are required' })

        }
    }
    else {
        res.json({ msg: 'Admin access only' })
    }
})

router.post('/teacher/update', async (req, res) => {
    if (req.session.role === 'admin') {
        if (req.body.email &&
            req.body.fName &&
            req.body.lName &&
            req.body.phone ) {
            const { updateTeacher } = require('../controllers/teacher')
            const docs = await updateTeacher(req.body.email,
                req.body.fName,
                req.body.lName,
                req.body.phone)
            if (docs) {
                res.json({ msg: 'Teacher Updated Successfully.' })
            }
            else {
                res.json({ msg: 'Teacher Updated Failed.' })
            }

        }
        else {
            res.json({ msg: 'All Fields Are required' })

        }
    }
    else {
        res.json({ msg: 'Admin access only' })
    }
})

router.post('/teacher/class/add', async (req, res) => {
    if (req.session.role === 'admin') {
        if (req.body.email &&
            req.body.clas) {
            const { checkClasExist } = require('../controllers/class')
            if (await checkClasExist(req.body.clas)) {
                const { pushClas } = require('../controllers/teacher')
                const docs = await pushClas(req.body.email,
                    req.body.clas)
                if (docs) {
                    res.json({ msg: 'Clas added Successfully.' })
                }
                else {
                    res.json({ msg: 'Clas added Failed.' })
                }
            }
            else {
                res.json({ msg: 'Class not exists' })
            }

        }
        else {
            res.json({ msg: 'All Fields Are required' })

        }
    }
    else {
        res.json({ msg: 'Admin access only' })
    }
})

router.post('/teacher/class/remove', async (req, res) => {
    if (req.session.role === 'admin') {
        if (req.body.email &&
            req.body.clas) {
            const { checkClasExist } = require('../controllers/class')
            if (await checkClasExist(req.body.clas)) {
                const { pullClas } = require('../controllers/teacher')
                const docs = await pullClas(req.body.email,
                    req.body.clas)
                if (docs) {
                    res.json({ msg: 'Clas removed Successfully.' })
                }
                else {
                    res.json({ msg: 'Clas removed Failed.' })
                }
            }
            else {
                res.json({ msg: 'Class not exists' })
            }

        }
        else {
            res.json({ msg: 'All Fields Are required' })

        }
    }
    else {
        res.json({ msg: 'Admin access only' })
    }
})

router.post('/class/create', async (req, res) => {
    if (req.session.role === 'admin') {
        if (req.body.clas) {
            const { createClas } = require('../controllers/class')
            const createdOrNot = await createClas(req.body.clas)
            if (createdOrNot === true) {
                res.json({ msg: 'Class Created Successfully.' })
            }
            else {
                res.json({ msg: 'Class Created Failed.' })
            }

        }
        else {
            res.json({ msg: 'All Fields Are required' })

        }
    }
    else {
        res.json({ msg: 'Admin access only' })
    }
})

router.get('/class', async (req, res) => {
    if (req.session.role === 'admin') {
        const { getAllC } = require('../controllers/class')
        res.json(await getAllC())
    }
    else {
        res.json({})
    }
});


//routes for /student

router.get('/students/:clas', async (req, res) => {
    if (req.session.role === 'admin') {
        const { getAllSByClas } = require('../controllers/student')
        res.json(await getAllSByClas(req.params.clas))
    }
    else {
        res.json({})
    }
})


router.get('/students/', async (req, res) => {
    if (req.session.role === 'admin') {
        const { getAllS } = require('../controllers/student')
        res.json(await getAllS())
    }
    else {
        res.json({})
    }
})

router.post('/student/create', async (req, res) => {
    if (req.session.role === 'admin') {
        if (req.body.email &&
            req.body.parentEmail &&
            req.body.fName &&
            req.body.pName &&
            req.body.lName &&
            req.body.sPhone &&
            req.body.pPhone) {
            const { createStudent } = require('../controllers/student')
            const createdOrNot = await createStudent(req.body.email,
                req.body.parentEmail,
                req.body.fName,
                req.body.pName,
                req.body.lName,
                req.body.sPhone,
                req.body.pPhone)
            if (createdOrNot === true) {
                res.json({ msg: 'Student Created Successfully.' })
            }
            else {
                res.json({ msg: 'Student Created Failed.' })
            }

        }
        else {
            res.json({ msg: 'All Fields Are required' })

        }
    }
    else {
        res.json({ msg: 'Admin access only' })
    }
})

router.post('/student/update', async (req, res) => {
    if (req.session.role === 'admin') {
        if (req.body.email &&
            req.body.fName &&
            req.body.pName &&
            req.body.lName &&
            req.body.sPhone &&
            req.body.pPhone) {
            const { updateStudent } = require('../controllers/student')
            const docs = await updateStudent(req.body.email,
                req.body.fName,
                req.body.pName,
                req.body.lName,
                req.body.sPhone,
                req.body.pPhone)
            if (docs) {
                res.json({ msg: 'Student Updated Successfully.' })
            }
            else {
                res.json({ msg: 'Student Updated Failed.' })
            }

        }
        else {
            res.json({ msg: 'All Fields Are required' })

        }
    }
    else {
        res.json({ msg: 'Admin access only' })
    }
})


router.post('/student/class/update', async (req, res) => {
    if (req.session.role === 'admin') {
        if (req.body.email &&
            req.body.clas) {
            const { updateClassS } = require('../controllers/student')
            const createdOrNot = await updateClassS(req.body.email,
                req.body.clas)
            if (createdOrNot === true) {
                res.json({ msg: 'Class updated Successfully.' })
            }
            else {
                res.json({ msg: 'Class updated Failed.' })
            }

        }
        else {
            res.json({ msg: 'All Fields Are required' })

        }
    }
    else {
        res.json({ msg: 'Admin access only' })
    }
})
router.post('/student/class/remove', async (req, res) => {
    if (req.session.role === 'admin') {
        if (req.body.email) {
            const { removeClassS } = require('../controllers/student')
            const createdOrNot = await removeClassS(req.body.email)
            if (createdOrNot === true) {
                res.json({ msg: 'Class removed Successfully.' })
            }
            else {
                res.json({ msg: 'Class removed Failed.' })
            }
        }
        else {
            res.json({ msg: 'All Fields Are required' })
        }
    }
    else {
        res.json({ msg: 'Admin access only' })
    }
})






module.exports = router