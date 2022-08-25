require('dotenv').config()

const http = require("http")

const app = require("./app/app")

const server = http.createServer(app)

const PORT = process.env.PORT || 3000


server.listen(PORT, () => {
    console.log(`server run success ${PORT}`);
})