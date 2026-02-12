"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { bookSchema, type BookFormData } from "@/lib/validations/book";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function AddBookForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BookFormData>({ resolver: zodResolver(bookSchema) });

  async function onSubmit(data: BookFormData) {
    setServerError(null);

    try {
      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error) {
          setError("judul", {
            type: "server",
            message: "Judul buku sudah ada, gunakan yang lain",
          });
          return;
        }
        setServerError(result.message || "terjadi kesalahan");
        return;
      }
      sessionStorage.setItem("toastMessage", "Buku berhasil ditambahkan!");

      router.push("/");
      router.refresh();
    } catch (error) {
      setServerError("Gagal terhubung ke server" + error);
    }
  }

  return (
    <Card className="w-1/3 mx-auto p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {serverError && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {serverError}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="judul">Judul</Label>
          <Input id="judul" placeholder=" Judul Buku" {...register("judul")} />
          {errors.judul && (
            <p className="text-sm text-red-500">{errors.judul.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="penulis">Penulis</Label>
          <Input
            id="penulis"
            placeholder=" Penulis Buku"
            {...register("penulis")}
          />
          {errors.penulis && (
            <p className="text-sm text-red-500">{errors.penulis.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="penerbit">Penerbit</Label>
          <Input
            id="penerbit"
            placeholder=" Penerbit Buku"
            {...register("penerbit")}
          />
          {errors.penerbit && (
            <p className="text-sm text-red-500">{errors.penerbit.message}</p>
          )}
        </div>
        <div className="flex flex-row space-x-2 w-full">
          <div className="space-y-2 w-full">
            <Label htmlFor="tahun">Tahun</Label>
            <Input
              id="tahun"
              type="number"
              placeholder=" Tahun Buku"
              {...register("tahun", { valueAsNumber: true })}
            />
            {errors.tahun && (
              <p className="text-sm text-red-500">{errors.tahun.message}</p>
            )}
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="halaman">Halaman</Label>
            <Input
              id="halaman"
              type="number"
              placeholder=" Halaman Buku"
              {...register("halaman", { valueAsNumber: true })}
            />
            {errors.halaman && (
              <p className="text-sm text-red-500">{errors.halaman.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan" : "Simpan"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
