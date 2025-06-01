import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  StopCircle,
  Timer,
  XCircle,
} from "lucide-react"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "ongoing",
    label: "Ongoing",
    icon: CheckCircle,
  },
  {
    value: "ended",
    label: "Ended",
    icon: StopCircle,
  },
  {
    value: "upcoming",
    label: "Upcoming",
    icon: XCircle,
  },

]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
]