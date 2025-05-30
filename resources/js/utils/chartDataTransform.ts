// utils/chartDataTransform.ts
import { CalonType, votes } from "@/lib/schema"

export interface ChartAreaData {
  date: string;
  [key: string]: string | number; // untuk setiap calon
}

export interface ChartPieData {
  name: string;
  value: number;
  fill: string;
}

export interface ChartBarData {
  name: string;
  votes: number;
  fill: string;
}

// Transformasi data untuk Area Chart - Voting trend per tanggal
export const transformDataForAreaChart = (calon: CalonType[], votes: votes[]): ChartAreaData[] => {
  // Group votes by date
  const votesByDate: { [date: string]: { [calonId: number]: number } } = {};
  
  votes.forEach(vote => {
    const voteDate = new Date(vote.created_at).toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    if (!votesByDate[voteDate]) {
      votesByDate[voteDate] = {};
    }
    
    if (!votesByDate[voteDate][vote.calon_id]) {
      votesByDate[voteDate][vote.calon_id] = 0;
    }
    
    votesByDate[voteDate][vote.calon_id]++;
  });

  // Create chart data array
  const chartData: ChartAreaData[] = [];
  
  // Sort dates
  const sortedDates = Object.keys(votesByDate).sort();
  
  sortedDates.forEach(date => {
    const dateData: ChartAreaData = { date };
    
    // Add vote count for each calon on this date
    calon.forEach(candidate => {
      const candidateName = candidate.nama.replace(/\s+/g, ''); // Remove spaces for property name
      dateData[candidateName] = votesByDate[date][candidate.id] || 0;
    });
    
    chartData.push(dateData);
  });

  return chartData;
};

// Transformasi data untuk Pie Chart - Total votes per calon
export const transformDataForPieChart = (calon: CalonType[]): ChartPieData[] => {
  const colors = [
    "var(--chart-1)",
    "var(--chart-2)", 
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-6)",
    "var(--chart-7)",
    "var(--chart-8)"
  ];

  return calon.map((candidate, index) => ({
    name: candidate.nama,
    value: candidate.votes_count || 0,
    fill: colors[index % colors.length]
  }));
};

// Transformasi data untuk Bar Chart - Total votes per calon
export const transformDataForBarChart = (calon: CalonType[]): ChartBarData[] => {
  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)", 
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-6)",
    "var(--chart-7)",
    "var(--chart-8)"
  ];

  return calon.map((candidate, index) => ({
    name: candidate.nama,
    votes: candidate.votes_count || 0,
    fill: colors[index % colors.length]
  }));
};

// Generate chart config untuk Area Chart
export const generateAreaChartConfig = (calon: CalonType[]) => {
  const config: any = {
    votes: {
      label: "Votes",
    }
  };

  calon.forEach((candidate, index) => {
    const candidateName = candidate.nama.replace(/\s+/g, '');
    config[candidateName] = {
      label: candidate.nama,
      color: `var(--chart-${(index % 8) + 1})`,
    };
  });

  return config;
};

// Generate chart config untuk Pie Chart
export const generatePieChartConfig = (calon: CalonType[]) => {
  const config: any = {
    votes: {
      label: "Votes",
    }
  };

  calon.forEach((candidate, index) => {
    const candidateKey = candidate.nama.toLowerCase().replace(/\s+/g, '');
    config[candidateKey] = {
      label: candidate.nama,
      color: `var(--chart-${(index % 8) + 1})`,
    };
  });

  return config;
};

// Generate chart config untuk Bar Chart  
export const generateBarChartConfig = (calon: CalonType[]) => {
  const config: any = {
    votes: {
      label: "Votes",
    }
  };

  calon.forEach((candidate, index) => {
    const candidateKey = candidate.nama.toLowerCase().replace(/\s+/g, '');
    config[candidateKey] = {
      label: candidate.nama,
      color: `var(--chart-${(index % 8) + 1})`,
    };
  });

  return config;
};