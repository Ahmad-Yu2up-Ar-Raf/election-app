import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Vote, Elections, generateAreaChartData, filterVotesByDateRange, ChartDataPoint } from "@/lib/schema"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/fragments/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/fragments/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/fragments/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/fragments/toggle-group"

type ChartInterface = {
  votes: Vote[]
  elections?: Elections[]
  chartType?:  'by-candidate' | 'total'   | 'by-election'
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

  if (type === 'by-election') {
    // Extract election names from data
    const elections = new Set<string>()
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'date' && key !== 'total') {
          elections.add(key)
        }
      })
    })
    
    // Generate fixed colors for each election
    const colors = [
      "var(--primary)", // Blue
     
    ]
    
    elections.forEach((election, index) => {
      config[election] = {
        label: election,
        color: colors[index % colors.length],
      }
    })
  }

  return config
}

export function ChartAreaInteractive({ 
  votes = [], 
  elections = [],
  chartType = 'total'
}: ChartInterface) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")
  const [viewType, setViewType] = React.useState<   'total' | 'by-candidate'  |  'by-election'>(chartType)

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  // Process and filter data
  const processedData = React.useMemo(() => {
    let filteredVotes = votes

    // Filter by time range
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    filteredVotes = filterVotesByDateRange(votes, days)

    // Generate chart data based on view type
    return generateAreaChartData(filteredVotes, viewType, elections)
  }, [votes, elections, timeRange, viewType])

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
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>
          {viewType === 'total' && 'Total Votes Over Time'}
          {viewType === 'by-candidate' && 'Votes by Candidate'}
          {viewType === 'by-election' && 'Votes by Election'}
        </CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Voting activity for the selected time period
          </span>
          <span className="@[540px]/card:hidden">Voting activity</span>
        </CardDescription>
        <CardAction className="flex flex-col gap-2">
          {/* Chart Type Selector */}
          <ToggleGroup
            type="single"
            value={viewType}
            onValueChange={(value) => value && setViewType(value as any)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-3 @[767px]/card:flex"
          >
            <ToggleGroupItem value="total" >Total</ToggleGroupItem>
            <ToggleGroupItem value="by-candidate">By Candidate</ToggleGroupItem>
            <ToggleGroupItem value="by-election">By Election</ToggleGroupItem>
          </ToggleGroup>
          
          {/* Time Range Selector */}
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          
          {/* Mobile Selectors */}
          <div className="flex gap-2 @[767px]/card:hidden">
            <Select value={viewType} onValueChange={(value) => setViewType(value as any)}>
              <SelectTrigger className="flex w-32" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="total">Total</SelectItem>
                <SelectItem value="by-candidate">By Candidate</SelectItem>
                <SelectItem value="by-election">By Election</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="flex w-32" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d">3 months</SelectItem>
                <SelectItem value="30d">30 days</SelectItem>
                <SelectItem value="7d">7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={processedData}>
            <defs>
              {gradientDefs}
            </defs>
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
              defaultIndex={isMobile ? -1 : 10}
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
    </Card>
  )
}