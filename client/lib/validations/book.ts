import { z } from "zod"

export const bookSchema = z.object({
    judul: z.string()
    .min(1,'Judul wajib diisi')
    .min(3, "Judul minimal 3 karakter")
    .max(200, "Judul maksimal 200 karakter"),

    penulis: z.string()
    .min(1, "Penulis wajib diisi")
    .max(100, "Penulis maksimal 100 karakter"),

    penerbit: z.string()
    .min(1, "Penmerbit wajib diisi")
    .max(100, "Penerbit maksimal 100 karakter"),

    tahun: z
    .number({ message: "Tahun harus berupa angka" })
    .int({ message: "Tahun harus bilangan bulat" })
    .min(1900, { message: "Tahun minimal 1900" })
    .max(new Date().getFullYear(), { message: `Tahun maksimal ${new Date().getFullYear()}` }),

     halaman: z
    .number({ message: "Halaman harus berupa angka" })
    .int({ message: "Halaman harus bilangan bulat" })
    .min(1, { message: "Halaman minimal 1" }),
})

export type BookFormData = z.infer<typeof bookSchema>