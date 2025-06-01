import { update } from 'lodash';
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
  kelas: z.string().min(1, "Class is required").max(10, "Class must be less than 50 characters"),  
  visi: z.string(),
  misi: z.string(),
  status: z.string().min(1, "Status is required").optional(),
  gender: z.string().min(1, "Gender is required"),
    election_id: z.number(),
  picture: imageSchema,
});

// Schema khusus untuk create (harus File)
export const calonCreateSchema = z.object({
  nama: z.string().min(1, "Name is required"),
  kelas: z.string().min(1, "Class is required").max(10, "Class must be less than 50 characters"),
  visi: z.string(),
  misi: z.string(),
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
  nama: z.string().min(1, "Name is required").optional(),
  kelas: z.string().min(1, "Class is required").max(10, "Class must be less than 50 characters").optional(),
  visi: z.string().optional(),
  misi: z.string().optional(),
  status: z.string().min(1, "Status is required").optional(),
  gender: z.string().min(1, "Gender is required").optional(),
  election_id: z.number(),
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


export const electionCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.string().optional(),
  description: z.string().optional(),
  start_date: z.date().min(new Date(), "Start date must be in the future"),
  end_date: z.date().min(new Date(), "End date must be in the future"),
  capacity: z.coerce.number().int().min(1, "Capacity must be at least 1"),
});

export  const Updateelections = z.object({
  title: z.string().min(1, "Title is required").optional(),
  status: z.string().optional(),
  description: z.string().optional(),
  start_date: z.date().optional(),
  end_date: z.date().min(new Date(), "End date must be in the future").optional(),
  capacity: z.coerce.number().int().min(1, "Capacity must be at least 1").optional(),
});


export type ElectionCreate  = z.infer<typeof electionCreateSchema>;
export type UpdateElections = z.infer<typeof Updateelections>;
export type CalonSchemaForm = z.infer<typeof calonSchemaForm>;
export type CalonCreateSchema = z.infer<typeof calonCreateSchema>;
export type CalonUpdateSchema = z.infer<typeof calonUpdateSchema>;