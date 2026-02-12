# 📚 PustakaApp - MERN Stack Library System

A full-stack library inventory application built to demonstrate **CRUD** operations using the **MERN Stack** (MongoDB, Express, React/Next.js, Node.js).

> **Note:** This project uses **Next.js 16** with the App Router architecture.

## 🚀 Tech Stack

### **Frontend (Client)**
* **Framework:** [Next.js 16.1.6](https://nextjs.org/) (App Router)
* **Language:** TypeScript (`.tsx`, `.ts`)
* **Styling:** Tailwind CSS
* **Data Fetching:** Native Fetch API
* **State Management:** React Hooks (`useState`, `useEffect`)

### **Backend (Server)**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **Validation:** Express-Validator
* **Cors:** Enabled for cross-origin resource sharing

## API Endpoints Reference

The Express Backend exposes the following RESTful endpoints:

| Method | Endpoint           | Description              | Body Required                                  |
|--------|--------------------|--------------------------|-----------------------------------------------|
| GET    | `/api/books`       | Get all books            | -                                             |
| GET    | `/api/books/:id`   | Get single book details  | -                                             |
| POST   | `/api/books`       | Create a new book        | `{ judul, penulis, penerbit, tahun, kategori }` |
| PUT    | `/api/books/:id`   | Update book data         | `{ judul, penulis, penerbit, ... }`          |
| DELETE | `/api/books/:id`   | Delete a book            | -                                             |
