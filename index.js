import express from "express"
import usersController from "./controllers/users.js"

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

const errorHandler = (error, req, res, next) => {
    res.status(500).send({error: error.message})
}

const checkHttpMethod = (req, res, nextFunc) => {
    console.log('Query: ', req.query.token)

    if (req.method === 'GET') {
        nextFunc()
    } else {
        res.status(403).send({error: 'Only get method is allowed'})
    }
}

const secure = (req, res, next) => {
    console.log('Query: ', req.query.token) // /path/?token
    if (req.query.token) {
        const userName = usersController.getUserFromSession(req.query.token)
        if (!userName) {
            res.status(403).send({error: 'Session token is invalid'})
            return;
        }
        req.userName = userName
        next()
    } else {
        res.status(403).send({error: 'No query.token value'})
    }
}

//app.use(checkHttpMethod)

app.get('/hello/:name', (req, res) => {
    res.send({
        greeting: "Warm greeting to you, " + req.params.name
    })
})

app.get('/hello', secure, (req, res) => {
    res.send({
        greeting: 'hello ' + req.userName
    })
})

app.get('/', (req, res) => {
    res.send({
        greeting: "Welcome to greeting API"
    })
})

app.post('/user', (req, res) => {
    usersController.addUser(req.body)
    res.status(201).send({status: 'OK'})
})

app.post('/session', (req, res) => {
    const token = usersController.validatePassword(req.body)
    if (token) {
        res.send({
            status: 'OK',
            sessionToken: token
        })
    } else {
        res.status(403).send({
            status: 'ERROR',
            message: 'Username or password is not correct'
        })
    }
})

app.use(errorHandler)
app.listen(port, () => console.log("Ready at port " + port))
