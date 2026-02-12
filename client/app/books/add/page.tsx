import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AddBookForm } from "@/components/addBookForm";

export default function AddBookPage() {
  return (
    <section className="p-20 w-full ">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl mb-8">Tambah Buku Baru</h1>
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

        <AddBookForm />
      </div>
    </section>
  );
}
