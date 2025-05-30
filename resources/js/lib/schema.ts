export interface votes { 
    id: number;
    calon_id: number;
    created_at: string;
    updated_at: string;
}


export interface CalonType {
    id: number;
    nama: string;
    gender: "male" | "female";
    status: 'active' | "inactive" | "pending" | "disqualified" | "rejected" | "approved" | "suspended" | "qualified";
    visi: string;
    misi: string;
    picture: string;
    kelas: string;
    votes: votes[];
    votes_count: number;
    created_at: string;
    updated_at: string;
}