# Teeny Tome Tool API

The **Teeny Tome Tool API** is an open-source project that generates tiny book covers, including front covers and, when possible, spines and back covers. It pulls book cover images from **OpenLibrary** as the primary source, with **Google Books** as a fallback.

## 🚀 Features
- Fetches high-quality **front covers** for books by ISBN.
- Uses **OpenLibrary** first, then falls back to **Google Books**.
- Supports **batch ISBN lookup** for bulk cover retrieval.
- Provides **JSON responses** with book title, author, and cover URL.
- API-first approach, designed for integration with tiny book projects.

## 📌 Getting Started

### **1️⃣ Install & Run Locally**

#### **Clone the Repository**
```sh
git clone https://github.com/bookchiq/teeny-tome-tool-api.git
cd teeny-tome-tool-api
```

#### **Install Dependencies**
```sh
npm install
```

#### **Set Up Environment Variables**
Create a `.env` file in the root directory and add your Google Books API key:
```
GOOGLE_BOOKS_API_KEY=your_google_api_key_here
```

#### **Run the Server**
```sh
node server.js
```
The API will be available at `http://localhost:5050`.

---
## 📡 API Endpoints

### **Get a Single Book Cover**
**Request:**
```
GET /cover/:isbn
```
Example:
```sh
curl http://localhost:5050/cover/9780143127748
```
**Response:**
```json
{
  "source": "OpenLibrary",
  "title": "The Body Keeps the Score",
  "author": "Bessel van der Kolk",
  "cover": "https://covers.openlibrary.org/b/id/12345678-L.jpg"
}
```

---
### **Batch Fetch Book Covers**
**Request:**
```
POST /covers
```
**Payload:**
```json
{
  "isbns": ["9780143127748", "9780062316097"]
}
```
**Response:**
```json
[
  {
    "isbn": "9780143127748",
    "source": "OpenLibrary",
    "title": "The Body Keeps the Score",
    "author": "Bessel van der Kolk",
    "cover": "https://covers.openlibrary.org/b/id/12345678-L.jpg"
  },
  {
    "isbn": "9780062316097",
    "source": "GoogleBooks",
    "title": "Sapiens",
    "author": "Yuval Noah Harari",
    "cover": "http://books.google.com/books/content?id=XXX&printsec=frontcover&img=1&zoom=1"
  }
]
```

---
## 📤 Deployment

To deploy on **Render**:
1. Push your code to GitHub.
2. Create a new **Web Service** on Render.
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node server.js`
5. Add Environment Variables:
   - `PORT=5050`
   - `GOOGLE_BOOKS_API_KEY=your_google_api_key_here`
6. Click **Deploy**!

---
## 🛠 Next Steps
- Implement **spine generation** (fallback when no spine is available).
- Add **back cover support** where possible.
- Provide **customization options** for tiny book dimensions.
- Allow **community contributions** to improve cover quality.

📚 **Happy Tiny Book Making!** 🚀

