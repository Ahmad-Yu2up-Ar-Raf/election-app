"use client"

import { TrendingUp } from "lucide-react"
import { Pie, Bar, BarChart, XAxis, YAxis, PieChart as ChartComponent } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/fragments/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/fragments/chart"
import { CalonType } from "@/lib/schema"
import { 
  transformDataForPieChart, 
  transformDataForBarChart,
  generatePieChartConfig,
  generateBarChartConfig 
} from "@/utils/chartDataTransform"
import { useMemo } from "react"

interface PieChartProps {
  calon: CalonType[];
}

export default function PieChart({ calon }: PieChartProps) {
  // Transform data untuk Pie Chart
  const pieChartData = useMemo(() => 
    transformDataForPieChart(calon), 
    [calon]
  );

  // Transform data untuk Bar Chart
  const barChartData = useMemo(() => 
    transformDataForBarChart(calon), 
    [calon]
  );

  // Generate config untuk Pie Chart
  const pieChartConfig = useMemo(() => 
    generatePieChartConfig(calon), 
    [calon]
  ) as ChartConfig;

  // Generate config untuk Bar Chart
  const barChartConfig = useMemo(() => 
    generateBarChartConfig(calon), 
    [calon]
  ) as ChartConfig;

  // Hitung total votes
  const totalVotes = pieChartData.reduce((sum, item) => sum + item.value, 0);

  // Hitung persentase kenaikan (dummy calculation - bisa disesuaikan dengan logic bisnis)
  const trendPercentage = totalVotes > 0 ? ((totalVotes / 100) * 5.2).toFixed(1) : "0";

  return (
  
      
   
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Vote Distribution</CardTitle>
          <CardDescription>Total votes per candidate</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          {totalVotes > 0 ? (
            <ChartContainer
              config={pieChartConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
            >
              <ChartComponent>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie 
                  data={pieChartData} 
                  dataKey="value" 
                  label={({  value }) => ` ${value}`}
                  nameKey="name" 
                />
              </ChartComponent>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px]">
              <p className="text-muted-foreground">No votes recorded yet</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Total votes: {totalVotes} <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Current vote distribution among candidates
          </div>
        </CardFooter>
      </Card>

     

  )
}