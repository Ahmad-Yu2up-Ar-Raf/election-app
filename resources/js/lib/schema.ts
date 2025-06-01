export interface votes { 
    id: number;
    calon_id: number;
    created_at: string;
    updated_at: string;
}


export interface CalonType {
    id: number;

    elections?: Elections;
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
    election_id: number;
}



export interface Elections {
    candidates?: CalonType[];
    candidates_count?: number;
    voters_count?: number;
    voters?: votes[];
        created_at: Date;
       id: number;
        title: string;
        status:'ongoing' | "inactive" | "ended" | 'cancelled' | "rejected" | 'finished' | 'ongoing' |  'upcoming';
        description: string;
        start_date: Date;
        end_date: Date;
        capacity: number;
}
