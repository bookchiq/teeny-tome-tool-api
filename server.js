require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5050;
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json());

// Function to get book cover from OpenLibrary
const fetchOpenLibraryCover = async (isbn) => {
    try {
        const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
        const response = await axios.get(url);
        const bookData = response.data[`ISBN:${isbn}`];

        if (bookData && bookData.cover) {
            return {
                source: "OpenLibrary",
                title: bookData.title,
                author: bookData.authors?.map(a => a.name).join(", "),
                cover: bookData.cover.large || bookData.cover.medium || bookData.cover.small
            };
        }
    } catch (error) {
        console.error("OpenLibrary error:", error.message);
    }
    return null;
};

// Function to get book cover from Google Books
const fetchGoogleBooksCover = async (isbn) => {
    try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${GOOGLE_BOOKS_API_KEY}`;
        const response = await axios.get(url);

        if (response.data.totalItems > 0) {
            const book = response.data.items[0].volumeInfo;
            return {
                source: "GoogleBooks",
                title: book.title,
                author: book.authors?.join(", "),
                cover: book.imageLinks?.thumbnail
            };
        }
    } catch (error) {
        console.error("Google Books error:", error.message);
    }
    return null;
};

// API Route to fetch book cover
app.post("/covers", async (req, res) => {
    const { isbns } = req.body; // Expecting an array of ISBNs
    
    if (!Array.isArray(isbns) || isbns.length === 0) {
        return res.status(400).json({ error: "Please provide an array of ISBNs" });
    }

    const results = await Promise.all(isbns.map(async (isbn) => {
        let bookData = await fetchOpenLibraryCover(isbn);
        if (!bookData) {
            bookData = await fetchGoogleBooksCover(isbn);
        }

        return {
            isbn,
            ...bookData,
            error: bookData ? null : "Cover not found"
        };
    }));

    res.json(results);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
