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
const C_NAME = 'mali'
const RECORDS_PER_PAGE = 1000000;

app.get('/pageData', (req, response) => {
    
    let stream = db.collection(C_NAME).find().limit(RECORDS_PER_PAGE).stream();
    let first = true;
    response.write('[')
    stream.on('data', function(item) {
        let prefix = first ? "" : ","
        response.write(prefix + JSON.stringify(item));
        first = false;
        //response.write(item)
      });
      stream.on('end', function() {
        response.write(']')
        response.end();
      });

})
app.get('/allData', (req, response) => {
    
    let stream = db.collection(C_NAME).find().stream();
    let first = true;
    response.write('[')
    stream.on('data', function(item) {
        let prefix = first ? "" : ","
        response.write(prefix + JSON.stringify(item));
        first = false;
        //response.write(item)
      });
      stream.on('end', function() {
        response.write(']')
        response.end();
      });

})
