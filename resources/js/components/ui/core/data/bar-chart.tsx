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

export default function TabelBatang({ calon }: PieChartProps) {
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


  // Generate config untuk Bar Chart
  const barChartConfig = useMemo(() => 
    generateBarChartConfig(calon), 
    [calon]
  ) as ChartConfig;

  // Hitung total votes
  const totalVotes = pieChartData.reduce((sum, item) => sum + item.value, 0);

  

  return (
 
      <Card className="flex flex-col h-full justify-between">
        <CardHeader>
          <CardTitle>Vote Ranking</CardTitle>
          <CardDescription>Votes comparison by candidate</CardDescription>
        </CardHeader>
        <CardContent>
          {totalVotes > 0 ? (
            <ChartContainer 
              className="mx-auto max-h-[230px]"
              config={barChartConfig}
            >
              <BarChart
                accessibilityLayer
                data={barChartData}
                layout="vertical"
                margin={{
                  left: 0,
                }}
              >
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => {
                    // Truncate long names
                    return value.length > 15 ? `${value.substring(0, 15)}...` : value;
                  }}
                />
                <XAxis dataKey="votes" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="votes" layout="vertical" radius={5} />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-[230px]">
              <p className="text-muted-foreground">No votes recorded yet</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Active candidates: {calon.length} <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing vote count for all candidates
          </div>
        </CardFooter>
      </Card>
  
  )
}