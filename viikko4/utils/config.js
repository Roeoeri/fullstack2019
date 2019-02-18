if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

let PORT = process.env.PORT 
let mongourl = process.env.MONGODB_URI


if(process.env.NODE_ENV === 'test'){
    mongourl = process.env.TEST_MONGODB_URI
}


module.exports = {
    mongourl,
    PORT
}