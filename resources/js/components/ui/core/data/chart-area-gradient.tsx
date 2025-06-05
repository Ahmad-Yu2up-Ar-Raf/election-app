"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Vote, Elections, generateAreaChartData, filterVotesByDateRange, ChartDataPoint } from "@/lib/schema"
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
import React from "react"

export const description = "An area chart with gradient fill"




type ChartInterface = {
  votes: Vote[]
   chartType?:  'by-candidate' 

}


const generateChartConfig = (data: ChartDataPoint[], type: string): ChartConfig => {
  const config: ChartConfig = {
    total: {
      label: "Total Votes",
      color: "var(--primary)", // Fixed blue color
    }
  }

  if (type === 'by-candidate') {

    const candidates = new Set<string>()
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'date' && key !== 'total') {
          candidates.add(key)
        }
      })
    })
    
    // Generate fixed colors for each candidate
    const colors = [
      "var(--primary)", 
   
    ]
    
    candidates.forEach((candidate, index) => {
      config[candidate] = {
        label: candidate,
        color: colors[index % colors.length],
      }
    })
  }


  return config
}

export function ChartAreaGradient({ votes = []  ,   chartType = 'by-candidate'}: ChartInterface) {
     const [viewType, setViewType] = React.useState< 'by-candidate'  >(chartType)







  const [timeRange, setTimeRange] = React.useState("90d")






 

 
  // Process and filter data
  const processedData = React.useMemo(() => {
    let filteredVotes = votes

    // Filter by time range
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    filteredVotes = filterVotesByDateRange(votes, days)

    // Generate chart data based on view type
    return generateAreaChartData(filteredVotes, viewType)
  }, [votes,  timeRange, viewType])

  // Generate dynamic chart config
  const chartConfig = React.useMemo(() => {
    return generateChartConfig(processedData, viewType)
  }, [processedData, viewType])

  // Get all data keys for rendering areas (excluding 'date')
  const dataKeys = React.useMemo(() => {
    if (processedData.length === 0) return []
    
    return Object.keys(processedData[0]).filter(key => key !== 'date')
  }, [processedData])

  // Generate gradient definitions with proper color mapping
  const gradientDefs = dataKeys.map((key, index) => {
    const colorConfig = chartConfig[key]
    const color = colorConfig?.color || "var(--primary)" // Fallback color
    
    return (
      <linearGradient key={key} id={`fill${key.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
        <stop
          offset="5%"
          stopColor={color}
          stopOpacity={0.8}
        />
        <stop
          offset="95%"
          stopColor={color}
          stopOpacity={0.1}
        />
      </linearGradient>
    )
  })




console.log(processedData)




  return (
    <Card className="flex flex-col h-full justify-between">
      <CardHeader>
        <CardTitle>Area Chart - Gradient</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={processedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
           <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }}
                    />
        <ChartTooltip
              cursor={false}

              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <defs>
                 {dataKeys.map((key, index) =>  (
     <linearGradient id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="95%"
                  stopColor="var(--primary)"
                  stopOpacity={0.8}
                />
            
              </linearGradient>
                 )
                
                
                )}
         
              {/* <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient> */}
            </defs>
                 {dataKeys.map((key, index) => {
                      const colorConfig = chartConfig[key]
                      const color = colorConfig?.color || "var(--primary)" // Fallback color
                      const cleanKey = key.replace(/\s+/g, '') // Remove spaces for gradient ID
                      
                      return (
                        <Area
                          key={key}
                          dataKey={key}
                          type="natural"
                          fill={`url(#fill${cleanKey})`}
                          stroke={color}
                          stackId="a"
                          fillOpacity={0.6}
                        />
                      )
                    })}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
