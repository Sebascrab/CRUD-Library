import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchALlBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                console.log(res)
                setBooks(res.data);
            } catch (err) {
                console.log(err)
            }
        }

        fetchALlBooks()
    }, []);

    return (
        <div>
            <h1>Sebas Book Shop</h1>
            <div className='books'>
                {books.map((book) => (
                    <div className='book' key={book.id}>
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <span>{book.price}</span>
                    </div>
                ))}
            </div>
            <button>
                <Link to='/add'>
                    Add New Book
                </Link>
            </button>
        </div>
    )
}

export default Books