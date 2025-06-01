import React from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { format } from "date-fns"

interface AreaChartProps {
  data: any[]
  config: {
    lines: {
      id: string
      label: string
      color: string
    }[]
  }
}

export function AreaChartWrapper({ data, config }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          {config.lines.map((line) => (
            <linearGradient
              key={line.id}
              id={`color-${line.id}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={line.color}
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor={line.color}
                stopOpacity={0}
              />
            </linearGradient>
          ))}
        </defs>
        <XAxis
          dataKey="date"
          tickFormatter={(date) => format(new Date(date), "MMM d")}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis stroke="#888888" fontSize={12} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">
                      {format(new Date(payload[0].payload.date), "MMM d, yyyy")}
                    </div>
                    {payload.map((entry: any) => (
                      <div
                        key={entry.dataKey}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-1">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{
                              backgroundColor: entry.color,
                            }}
                          />
                          <span className="font-medium">{entry.name}</span>
                        </div>
                        <span>{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        {config.lines.map((line) => (
          <Area
            key={line.id}
            type="monotone"
            dataKey={line.id}
            name={line.label}
            stroke={line.color}
            fill={`url(#color-${line.id})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}
