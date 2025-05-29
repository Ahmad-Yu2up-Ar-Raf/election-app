export interface CalonType {
    id: number;
    nama: string;
    gender: "male" | "female";
    status: 'active' | "inactive" | "pending" | "disqualified" | "rejected" | "approved" | "suspended" | "qualified'";
    visi: string;
    misi: string;
    picture: string;
    kelas: string;
  
}