"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/fragments/badge"
import { Checkbox } from "@/components/ui/fragments/checkbox"
import { IconCircleCheckFilled } from "@tabler/icons-react"
import { IconLoader } from "@tabler/icons-react"
import { statuses } from "@/data/data"
import { Elections } from "@/lib/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Elections>[] = [
 {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center  w-14 justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center  w-14 justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("title")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {


      return (
       <div className=" w-32">

      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "finished" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.status}
      </Badge>
       </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="capacity" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex items-center gap-2">

          <span>{ row.getValue("capacity")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "voters",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="voters" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex items-center gap-2">

          <span>{row.original.voters_count}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="start_date" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex items-center gap-2">

          <span>   {row.original.start_date ? new Date(row.original.start_date).toLocaleDateString() : "N/A"}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="end_date" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex items-center gap-2">

          <span>
               {row.original.end_date ? new Date(row.original.end_date).toLocaleDateString() : "N/A"}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
