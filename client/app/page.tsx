import { DeleteBookButton } from "@/components/deleteBookButton";
import { ToastHandler } from "@/components/ToastHandler";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Book from "@/lib/book";
import { Plus } from "lucide-react";
import Link from "next/link";

async function getBooks(): Promise<Book[]> {
  "use server";
  try {
    const res = await fetch("http://localhost:5000/api/books", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    const response = await res.json();
    return response.data || [];
  } catch (err) {
    console.error("error fetching books: ", err);
    return [];
  }
}

export default async function Home() {
  const books = await getBooks();

  return (
    <section className="p-20 w-full  ">
      <ToastHandler />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl mb-8">Pustaka App</h1>

        <Link href="/books/add" className="mb-8">
          <Button className="cursor-pointer">
            <Plus />
            Tambah Buku
          </Button>
        </Link>
        <Table className="w-2/3 mx-auto ">
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-xs">Judul</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Penerbit</TableHead>
              <TableHead>Tahun</TableHead>
              <TableHead>Halaman</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Tidak ada data buku
                </TableCell>
              </TableRow>
            ) : (
              books.map((book) => (
                <TableRow key={book._id}>
                  <TableCell className="whitespace-normal wrap-break-word max-w-xs">
                    {book.judul}
                  </TableCell>
                  <TableCell>{book.penulis}</TableCell>
                  <TableCell>{book.penerbit}</TableCell>
                  <TableCell>{book.tahun}</TableCell>
                  <TableCell>{book.halaman}</TableCell>
                  <TableCell className="flex flex-row gap-2 w-fit">
                    <Link href={`/books/${book._id}`}>
                      <Button className="cursor-pointer ">Detail</Button>
                    </Link>
                    <Link href={`/books/edit/${book._id}`}>
                      <Button className="bg-blue-500 cursor-pointer hover:bg-blue-500/90">
                        Edit
                      </Button>
                    </Link>
                    <DeleteBookButton id={book._id} judul={book.judul} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
