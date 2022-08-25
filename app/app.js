require("dotenv").config('../.env')
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(
    [
        morgan('dev'),
        cors(),
        express.json()
    ]
)

app.get("/health", (_req, res) => {
    res.status(200).json({ "message": "success" })
})



app.use(
    (_req, _res, next) => {
        const error = new Error("resource not found")
        error.status = 404
        next(error)
    }
)


app.use(
    (error, _req, res, _next) => {
        if(error.status){
            res.status(error.status).json(
                {
                    message: error.message
                }
            )
        }else{
            res.status(500).json(
                {
                    message: "Something Went wrong"
                }
            )
        }
    }
)











module.exports = app;