export interface Vote {
    id: number;
    calon_id: number;
    election_id: number;
    created_at: string;
    updated_at: string;
    calon?: CalonType;
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
    votes?: Vote[];
    votes_count: number;
    created_at: string;
    updated_at: string;
    election_id: number;
    elections?: Elections;
}

export interface Elections {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    voters_count: number;
    voters: Vote[]
    title: string;
    status: 'ongoing' | "inactive" | "ended" | 'cancelled' | "rejected" | 'finished' | 'ongoing' | 'upcoming';
    description: string | null;
    start_date: string;
    end_date: string;
    capacity: number;
    candidates_count?: number;
    candidates?: CalonType[];
        visibility: "public" | "private";
}

// Interface untuk data chart
export interface ChartDataPoint {
    date: string;
    total: number;
    [key: string]: number | string; // untuk kandidat individual
}


export function groupVotesByDate(votes: Vote[]): ChartDataPoint[] {
    const grouped: { [date: string]: number } = {};
    
    votes.forEach(vote => {
        const date = new Date(vote.created_at).toISOString().split('T')[0]; // Format: YYYY-MM-DD
        grouped[date] = (grouped[date] || 0) + 1;
    });
    
    // Convert ke array dan sort berdasarkan tanggal
    return Object.entries(grouped)
        .map(([date, total]) => ({ date, total }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Mengelompokkan votes berdasarkan tanggal dan kandidat
 */
export function groupVotesByDateAndCandidate(votes: Vote[]): ChartDataPoint[] {
    const grouped: { [date: string]: { [candidateName: string]: number; total: number } } = {};
    
    votes.forEach(vote => {
        const date = new Date(vote.created_at).toISOString().split('T')[0];
        const candidateName = vote.calon?.nama || `Kandidat ${vote.calon_id}`;
        
        if (!grouped[date]) {
            grouped[date] = { total: 0 };
        }
        
        grouped[date][candidateName] = (grouped[date][candidateName] || 0) + 1;
        grouped[date].total += 1;
    });
    
    // Convert ke array dan sort
    return Object.entries(grouped)
        .map(([date, data]) => ({ date, ...data }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Mengelompokkan votes berdasarkan tanggal dan election
 */
export function groupVotesByDateAndElection(votes: Vote[], elections: Elections[]): ChartDataPoint[] {
    const grouped: { [date: string]: { [electionTitle: string]: number; total: number } } = {};
    const electionMap = new Map(elections.map(e => [e.id, e.title]));
    
    votes.forEach(vote => {
        const date = new Date(vote.created_at).toISOString().split('T')[0];
        const electionTitle = electionMap.get(vote.election_id) || `Election ${vote.election_id}`;
        
        if (!grouped[date]) {
            grouped[date] = { total: 0 };
        }
        
        grouped[date][electionTitle] = (grouped[date][electionTitle] || 0) + 1;
        grouped[date].total += 1;
    });
    
    return Object.entries(grouped)
        .map(([date, data]) => ({ date, ...data }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Filter votes berdasarkan range tanggal
 */
export function filterVotesByDateRange(votes: Vote[], days: number): Vote[] {
    const now = new Date();
    const startDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
    
    return votes.filter(vote => {
        const voteDate = new Date(vote.created_at);
        return voteDate >= startDate && voteDate <= now;
    });
}

/**
 * Filter votes berdasarkan election ID
 */
export function filterVotesByElection(votes: Vote[], electionId: number): Vote[] {
    return votes.filter(vote => vote.election_id === electionId);
}

/**
 * Mendapatkan statistik vote per kandidat
 */
export function getVoteStatsByCandidate(votes: Vote[]): Array<{
    candidateId: number;
    candidateName: string;
    totalVotes: number;
    percentage: number;
}> {
    const totalVotes = votes.length;
    const grouped: { [candidateId: number]: { name: string; count: number } } = {};
    
    votes.forEach(vote => {
        const candidateId = vote.calon_id;
        const candidateName = vote.calon?.nama || `Kandidat ${candidateId}`;
        
        if (!grouped[candidateId]) {
            grouped[candidateId] = { name: candidateName, count: 0 };
        }
        grouped[candidateId].count++;
    });
    
    return Object.entries(grouped).map(([id, data]) => ({
        candidateId: parseInt(id),
        candidateName: data.name,
        totalVotes: data.count,
        percentage: totalVotes > 0 ? Math.round((data.count / totalVotes) * 100) : 0
    })).sort((a, b) => b.totalVotes - a.totalVotes);
}


export function generateAreaChartData(votes: Vote[], type: 'total' | 'by-candidate' | 'by-election' = 'by-candidate', elections?: Elections[]): ChartDataPoint[] {
    switch (type) {
        case 'by-candidate':
            return groupVotesByDateAndCandidate(votes);
        case 'by-election':
            return elections ? groupVotesByDateAndElection(votes, elections) : groupVotesByDate(votes);
        default:
            return groupVotesByDate(votes);
    }
}


export function formatDateForDisplay(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short'
    });
}



 export interface filters {
    search: string;
    filter: string;
  };