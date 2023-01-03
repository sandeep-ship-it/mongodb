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

app.get('/size', (req, res) => {
    let books;
    db.collection('mali').count({}, (err, cnt) => {
        if (err) {
            console.log(err) 
        } else {
            books = cnt
            //console.log(cnt)
            console.log(books)
            res.json(books)
        }
    })
})

const RECORDS_PER_PAGE = 10000;
app.get('/api', (req, res) => {
    let page = req.query.p
    db.collection('mali').find().skip(page*RECORDS_PER_PAGE).limit(RECORDS_PER_PAGE).toArray((err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json(data)
        }
    } )

})
