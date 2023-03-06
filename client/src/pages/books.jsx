import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


const Books = () => {

    const [books, setBooks] = useState([]);

   useEffect(() => {
    const fetchALlBooks = async () => {
        try{
            const res = await axios.get("http://localhost:8800/books");
            console.log(res)
        }catch (err) {
            console.log(err)
        }
    }

    fetchALlBooks()
   }, []);

    return (
        <div>Books</div>
    )
}

export default Books