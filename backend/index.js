require("dotenv").config();

const express = require('express')
const session = require('express-session');
const mongoose = require('mongoose')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const { Client, Users } = require('node-appwrite');

//mongoose db connection.
const { connectToMongoose } = require('./db')
connectToMongoose()
    .then(() => {
        console.log('Mongodb connected success')
    })

const app = express();

//testing models for syntax errors
const stud = require('./models/student')
const clas = require('./models/clas')
const teacher = require('./models/teacher')
const feed = require('./models/feed')

//testing appwrite functions
// const {pullClas} = require('./controllers/teacher')
// pullClas("email","a")

//testing novu
const novu = require('./controllers/novu')

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configure session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));


//cors
app.use(cors({ origin: true, credentials: true }));

//oauth code
// Configure Passport with Google OAuth credentials
passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        (accessToken, refreshToken, profile, done) => {
            // Handle user authentication logic here
            // The 'profile' parameter contains user information
            // Call 'done' with user data to complete the authentication process
            // console.log(profile)
            done(null, profile);
        })
);


// Serialize and deserialize user data
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // console.log(user)
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());


//Routes


app.get('/auth/success', async (req, res) => {
    try {
        res.json(req.session);
    } catch (e) {
        console.log(e);
    }
})

app.post('/auth/callback', async (req, res) => {

    let sessions = {}
    let user = {}
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(process.env.APPWRITE_PROJECT)
        .setKey(process.env.APPWRITE_KEY);

    const users = new Users(client);
    let found = false

    //get session information
    await users.listSessions(req.body.userId)
        .then((e) => {
            sessions = e
            for (let i = 0; i < sessions.total; i++) {
                if (sessions.sessions[i].$id === req.body.sessionId) {
                    found = true
                }
            }
            if (!found) {
                res.json({ role: "" })
            }

        })
        .catch((err) => {
            console.log(err)
        })

    //check if session present in sesson array

    if (found) {
        await users.get(req.body.userId)
            .then((e) => {
                user = e
            })
            .catch((err) => {
                console.log(err)
            })

        //implement user login
        let flag = 0
        let role = ""
        //admin login
        if (user.email == process.env.adminMail1 || user.email == process.env.adminMail2) {
            role = 'admin'
            flag = 1
        }
        else {
            //teacher login

            const { findByEmailT } = require('./controllers/teacher')
            data = await findByEmailT(user.email)
            if (data && user.email === data.email) {
                role = 'teacher'
                flag = 1

            }
            //parent and student login
            if (flag === 0) {
                const { findByEmailS } = require('./controllers/student')
                data1 = await findByEmailS(user.email)
                if (data1 && user.email === data1.email) {
                    role = 'student'
                    flag = 1
                    req.session.clas = data1.class
                }
            }
            if (flag === 0) {
                const { findByEmailP } = require('./controllers/student')
                data2 = await findByEmailP(user.email)
                if (data2 && user.email === data2.parentEmail) {
                    role = 'parent'
                    flag = 1
                    req.session.clas = data2.class
                }
            }

        }
        if (flag === 0) {
            console.log("user not login")
            req.logout((err) => { console.log(err) });
        }
        else {
            req.session.role = role
            req.session.email = user.email
        }
        console.log(role)
        res.json({role:role})
    }

    //get user info

})

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL }),
    async (req, res) => {
        let flag = 0
        let role = ""
        //admin login
        if (req.user._json.email == process.env.adminMail1 || req.user._json.email == process.env.adminMail2) {
            role = 'admin'
            flag = 1
        }
        else {
            //teacher login

            const { findByEmailT } = require('./controllers/teacher')
            data = await findByEmailT(req.user._json.email)
            if (data && req.user._json.email === data.email) {
                role = 'teacher'
                flag = 1

            }
            //parent and student login
            if (flag === 0) {
                const { findByEmailS } = require('./controllers/student')
                data1 = await findByEmailS(req.user._json.email)
                if (data1 && req.user._json.email === data1.email) {
                    role = 'student'
                    flag = 1
                    req.session.clas = data1.class
                }
            }
            if (flag === 0) {
                const { findByEmailP } = require('./controllers/student')
                data2 = await findByEmailP(req.user._json.email)
                if (data2 && req.user._json.email === data2.parentEmail) {
                    role = 'parent'
                    flag = 1
                    req.session.clas = data2.class
                }
            }

        }
        if (flag === 0) {
            console.log("user not login")
            req.logout((err) => { console.log(err) });
        }
        else {
            req.session.role = role
            req.session.email = req.user._json.email
        }
        console.log(role)
        if (role === 'admin') {
            res.redirect(process.env.frontend_url_admin);
        } else if (role === 'student' || role === 'parent') {
            res.redirect(process.env.student_url);
        } else if (role === 'teacher') {
            res.redirect(process.env.frontend_url_teach);
        }

        // Redirect to the frontend after successful authentication

    }
);

app.get('/auth/user', (req, res) => {
    // console.log(req.user)
    res.json(req.user);
});


app.get('/logout', (req, res) => {
    req.logout((err) => { console.log(err) });
    res.json({ logout: "true" });
});


//Other Routes
const userRouter = require('./routes/user.js')
app.use('/user', userRouter)

const adminRouter = require('./routes/admin.js')
app.use('/admin', adminRouter)

const teacherRouter = require('./routes/teacher.js')
app.use('/teacher', teacherRouter)

const studentRouter = require('./routes/student')
app.use('/student', studentRouter)

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
