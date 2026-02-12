import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EditBookForm } from "@/components/editBookForm";
import Book from "@/lib/book";

async function getBook(id: string): Promise<Book | null> {
  const res = await fetch(`http://localhost:5000/api/books/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const response = await res.json();
  return response.data;
}

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    return (
      <section className="p-20 w-full">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl mb-8">Buku Tidak Ditemukan</h1>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="p-20 w-full ">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl mb-8">Update Buku</h1>
        <div className="w-1/3 mx-auto mb-4">
          <Link href="/">
            <Button
              type="button"
              variant="outline"
              className="flex item-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
          </Link>
        </div>

        <EditBookForm book={book} />
      </div>
    </section>
  );
}
