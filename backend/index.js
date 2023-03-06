const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

const db = mysql.createConnection({
    host: "127.0.0.1", 
    user: "root", 
    password: "3577", 
    database: "test"
});

// If there is an authentication problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '3577';

// allows us to send json data
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
    res.json("Hello, this is the backend!");
});

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q, (err,data) => {
        if (err) {
            return res.json(err)
        } return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
    ];


    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err)
        } return res.json("book has been successfully created")
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) {
            return res.json(err);
        } return res.json("Book has been successfully deleted!")
    })
});


app.put("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `cover` = ? WHERE id = ?";

        const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
        ];


    db.query(q, [...values, bookId], (err, data) => {
        if (err) {
            return res.json(err);
        } return res.json("Book has been successfully updated!")
    })
});

app.listen(8800, () => {
    console.log('Connected to backend!');
});

