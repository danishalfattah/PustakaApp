import { Button } from "@/components/ui/button";
import Book from "@/lib/book";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DeleteBookButton } from "@/components/deleteBookButton";

async function getBookDetail(id: string): Promise<Book | null> {
  try {
    const res = await fetch(`http://localhost:5000/api/books/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    const response = await res.json();
    return response.data || null;
  } catch (err) {
    console.error("error fetching books: ", err);
    return null;
  }
}

export default async function DetailBook({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookDetail(id);

  if (!book) {
    return (
      <section className="p-20 w-full">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl mb-8">Buku tidak ditemukan</h1>
          <Link href="/">
            <Button>Kembali ke Beranda</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="p-20 w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl mb-8">Detail Buku</h1>

        <div className="w-2/3 mx-auto bg-white rounded-lg border shadow-sm">
          <div className="p-8 space-y-4">
            <div className="grid grid-cols-[150px_1fr] gap-4">
              <p className="text-muted-foreground font-medium">Judul Buku</p>
              <p className="font-semibold">{book.judul}</p>

              <p className="text-muted-foreground font-medium">Penulis</p>
              <p>{book.penulis}</p>

              <p className="text-muted-foreground font-medium">Penerbit</p>
              <p>{book.penerbit}</p>

              <p className="text-muted-foreground font-medium">Tahun Terbit</p>
              <p>{book.tahun}</p>

              <p className="text-muted-foreground font-medium">
                Jumlah Halaman
              </p>
              <p>{book.halaman}</p>
            </div>
          </div>

          <div className="border-t p-6 flex gap-3">
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
            </Link>
            <Button className="bg-blue-500 hover:bg-blue-500/90 cursor-pointer">
              Edit
            </Button>
            <DeleteBookButton id={book._id} judul={book.judul} />
          </div>
        </div>
      </div>
    </section>
  );
}
