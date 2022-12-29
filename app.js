const express = require('express')
const {connectToDb, getDb} = require('./db')

// init app and middlewares
const app = express();
const PORT = 3000


// db connection
let db;
connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`server is listening at port ${PORT}`);
        })
        db = getDb()
    }
})


//routes

app.get('/api', (req, res) => {
    let books;
    db.collection('books').find()
        .toArray((err, data) => {
            if (!err) {
                books = data;
                res.status(200).send(books)
                
            }
            else {
                res.status(500)
            }
        })

    
    
})