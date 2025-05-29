import { z } from 'zod';

const imageSchema = z.union([
  // File object untuk upload baru
  z.instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/svg+xml", "image/gif"].includes(
          file.type
        ),
      {
        message: "Only JPEG, PNG, SVG, and GIF files are allowed",
      }
    ),
  // String untuk existing image path
  z.string().min(1, "Picture is required"),
])

export const calonSchemaForm = z.object({
  nama: z.string().min(1, "Name is required"),
  kelas: z.string().min(1, "Class is required"),  
  visi: z.string().optional(),
  misi: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  gender: z.string().min(1, "Gender is required"),
  picture: imageSchema,
});

// Schema khusus untuk create (harus File)
export const calonCreateSchema = z.object({
  nama: z.string().min(1, "Name is required"),
  kelas: z.string().min(1, "Class is required"),
  visi: z.string().optional(),
  misi: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  gender: z.string().min(1, "Gender is required"),
  picture: z.instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/svg+xml", "image/gif"].includes(
          file.type
        ),
      {
        message: "Only JPEG, PNG, SVG, and GIF files are allowed",
      }
    ),
});

// Schema khusus untuk update (bisa File atau string, tapi tidak required)
export const calonUpdateSchema = z.object({
  nama: z.string().min(1, "Name is required"),
  kelas: z.string().min(1, "Class is required"),
  visi: z.string().optional(),
  misi: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  gender: z.string().min(1, "Gender is required"),
  picture: z.union([
    z.instanceof(File)
      .refine((file) => file.size <= 2 * 1024 * 1024, {
        message: "File size must be less than 2MB",
      })
      .refine(
        (file) =>
          ["image/jpeg", "image/jpg", "image/png", "image/svg+xml", "image/gif"].includes(
            file.type
          ),
        {
          message: "Only JPEG, PNG, SVG, and GIF files are allowed",
        }
      ),
    z.string().min(1), // Existing image path
  ]),
});

export type CalonSchemaForm = z.infer<typeof calonSchemaForm>;
export type CalonCreateSchema = z.infer<typeof calonCreateSchema>;
export type CalonUpdateSchema = z.infer<typeof calonUpdateSchema>;