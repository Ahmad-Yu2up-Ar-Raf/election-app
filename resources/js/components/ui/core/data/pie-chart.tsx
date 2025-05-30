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
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      
      {/* Pie Chart */}
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

      {/* Bar Chart */}
      <Card className="flex flex-col justify-between">
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
            Active candidates: {calon.filter(c => c.status === 'approved').length} <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing vote count for all candidates
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}