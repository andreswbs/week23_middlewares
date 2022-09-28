import express from "express"

const app = express()
const port = process.env.PORT || 8080

const checkHttpMethod = (req, res, nextFunc) => {
    console.log('Query: ', req.query.token)

    if (req.method === 'GET') {
        nextFunc()
    } else {
        res.status(403).send({error: 'Only get method is allowed'})
    }
}

app.use(checkHttpMethod)

app.get('/hello/:name', (req, res) => {
    res.send({
        greeting: "Warm greeting to you, " + req.params.name
    })
})

app.get('/', (req, res) => {
    res.send({
        greeting: "Welcome to greeting API"
    })
})

app.listen(port, () => console.log("Ready at port " + port))
