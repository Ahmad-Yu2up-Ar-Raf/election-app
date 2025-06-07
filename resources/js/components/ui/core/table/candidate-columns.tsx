"use client"

import { ColumnDef, TableMeta } from "@tanstack/react-table"

import { Badge } from "@/components/ui/fragments/badge"
import { Checkbox } from "@/components/ui/fragments/checkbox"
import { IconCircleCheckFilled } from "@tabler/icons-react"
import { IconLoader } from "@tabler/icons-react"
import { statuses } from "@/data/data"
import { CalonType, Elections } from "@/lib/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions-candidate"
import { useInitials } from "@/hooks/use-initials"
import { Avatar, AvatarImage } from "../../fragments/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { Mars, Venus } from "lucide-react"

export const columns: ColumnDef<CalonType>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
      <div className="flex items-center justify-center">
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
    accessorKey: "nama",
      header: ({ column }) => (
      <DataTableColumnHeader column={column} title="nama" />
    ),
    cell: ({ row }) => {
          const getInitials = useInitials();
      return  (
        <div className="flex items-center w-45 gap-4  ">
        
           <Avatar className="  relative flex size-10 shrink-0 overflow-hidden rounded-full">
                                        <AvatarImage src={row.original.picture} alt={row.original.nama} />
                                        <AvatarFallback className="rounded-lg  bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(row.original.nama)}
                                        </AvatarFallback>
                                    </Avatar>




       
        {row.original.nama}
        
        </div>
      )
    },
    enableHiding: false,
  },
      {
    accessorKey: "Election",
    header: "Election",
    cell: ({ row }) => (
      <div className="w-40">
    
        {row.original.elections?.title}
     
      </div>
    ),
  },

    {
    accessorKey: "voters",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="voters" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex w-32 items-center gap-2">

          <span>{row.original.votes_count}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
    {
    accessorKey: "Class",
    header: "Class",
    cell: ({ row }) => (
      <div className="w-32">
    
        {row.original.kelas}
     
      </div>
    ),
  },

  {
    accessorKey: "gender",
    header: "gender",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
         {row.original.gender === "male" ? (
          <Mars  />
        ) : (
          <Venus />
        )}
        {row.original.gender}
        </Badge>
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
       <div className=" w-32">

      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "active" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.status}
      </Badge>
       </div>
    ),
  },
    {
    accessorKey: "Created At",
    header: "Created At",
    cell: ({ row }) => (
      <div className="w-20">
    
        {row.original.created_at ? new Date(row.original.created_at).toLocaleDateString() : "N/A"}
     
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row, table }) => { 
        const elections = (table.options.meta as TableMeta<Elections[]>)?.elections || []
      return( 
      <>
<DataTableRowActions election={elections}  row={row} />
      </>
      )
    } 
  },
]
