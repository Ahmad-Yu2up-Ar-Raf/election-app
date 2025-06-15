import Password from '@/pages/settings/password';
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
export const userCreateSchema = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.string().min(3, "email is required"),
  password: z.string().min(8, "password min 8"),
  password_confirmation: z.string().min(8, "password min 8"),
  role: z.string().min(1, "Role is required"),
});
export const userUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  password_confirmation: z.string().optional(),
  role: z.string().optional(),
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
  visibility: z.string().optional(),
  description: z.string().optional(),
 start_date: z.unknown(),
   end_date: z.unknown(),
  capacity: z.coerce.number().int().min(1, "Capacity must be at least 1"),
});

export  const Updateelections = z.object({
  title: z.string().min(1, "Title is required").optional(),
  status: z.string().optional(),
  start_date: z.unknown(),
  visibility: z.string().optional(),
   end_date: z.unknown(),
  description: z.string().optional(),
  capacity: z.coerce.number().int().min(1, "Capacity must be at least 1").optional(),
});


export const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(8),
  remember: z.unknown().optional()
});

export const registerCreateSchema = z.object({
  name: z.string().min(4, "Name is required"),
  email: z.string().min(3, "email is required"),
  password: z.string().min(8, "password min 8"),
  password_confirmation: z.string().min(8, "password min 8"),

});


export type ElectionCreate  = z.infer<typeof electionCreateSchema>;
export type UpdateElections = z.infer<typeof Updateelections>;
export type CalonSchemaForm = z.infer<typeof calonSchemaForm>;
export type UsersSchemaForm = z.infer<typeof userCreateSchema>;
export type UsersUpdateForm = z.infer<typeof userUpdateSchema>;
export type CalonCreateSchema = z.infer<typeof calonCreateSchema>;
export type UserCreateSchema = z.infer<typeof userCreateSchema>;
export type CalonUpdateSchema = z.infer<typeof calonUpdateSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerCreateSchema>;