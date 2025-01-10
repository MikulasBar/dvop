import express, { Request, Response } from "express";
import { Book, isValidBook } from "./book";

const app = express();
app.use(express.json());

let currentId = 2;
const books: Book[] = [
  {
    id: 0,
    title: "book0",
    author: "author0",
    year: 2000,
    available: true
  },
  {
    id: 1,
    title: "book1",
    author: "author1",
    year: 2001,
    available: false
  }
];

function routeNotFound(req: Request, res: Response) {
  res.status(404).send("Route not found");
}

function getBooks(req: Request, res: Response) {
  const { author, page = 1, limit = 5 } = req.query;

  let filtered = books;

  if (author) {
    filtered = filtered.filter(b => b.author === author);
  }

  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit);
  const paginated = filtered.slice(start, end);
  
  res.send(paginated);
}

function getBookById(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  const book = books.find(b => b.id === id);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send("Book not found");
  }
}

function addBook(req: Request, res: Response) {
  const book = req.body;

  if (!isValidBook(book)) {
    res.status(400).send("Invalid data");
    return;
  }

  book.id = currentId;
  currentId++;

  books.push(book as Book);
  res.send(books);
}

function updateBookById(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  const updated = req.body;

  if (!isValidBook(updated)) {
    res.status(400).send("Invalid data");
    return;
  }

  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    res.status(404).send("Book not found");
    return;
  }

  books[index] = { ...updated, id };
  res.send(books[index]);
}

function deleteBookById(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);

  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    res.status(404).send("Book not found");
    return;
  }

  books.splice(index, 1);
  res.send(`Book with id ${id} deleted`);
}


app.get("/books", getBooks);
app.get("/books/:id", getBookById);
app.post("/books", addBook);
app.put("/books/:id", updateBookById);
app.delete("/books/:id", deleteBookById);

app.use(routeNotFound);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
