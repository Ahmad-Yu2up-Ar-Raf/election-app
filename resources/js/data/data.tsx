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
   Clock, Check,  PauseOctagon, Trophy, XOctagon,
   LucideIcon
} from "lucide-react"



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
export const role = [
  {
    value: "user",
    label: "User",
    icon: CheckCircle,
  },
  {
    value: "admind",
    label: "Admind",
    icon: StopCircle,
  },


]

export enum Status {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  Suspended = "suspended",
  Qualified = "qualified",
  Disqualified = "disqualified",
  Active = "active",
  Inactive = "inactive",
}

// Interface StatusItem
export interface StatusItem {
  value: Status;
  label: string;
  icon: LucideIcon;
}

// Data mapping
export const statuse: StatusItem[] = [
  { value: Status.Pending, label: "Pending", icon: Clock },
  { value: Status.Approved, label: "Approved", icon: Check },
  { value: Status.Rejected, label: "Rejected", icon: XCircle },
  { value: Status.Suspended, label: "Suspended", icon: PauseOctagon },
  { value: Status.Qualified, label: "Qualified", icon: Trophy },
  { value: Status.Disqualified, label: "Disqualified", icon: XOctagon },
  { value: Status.Active, label: "Active", icon: CheckCircle },
  { value: Status.Inactive, label: "Inactive", icon: StopCircle },
];
