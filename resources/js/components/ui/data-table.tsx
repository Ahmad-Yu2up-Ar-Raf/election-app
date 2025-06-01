import * as React from "react"
import { debounce } from "lodash"
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconTrendingUp,
} from "@tabler/icons-react"
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
// import { toast } from "sonner"
import { z } from "zod"

// import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/fragments/badge"
import { Button } from "@/components/ui/fragments/button"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/fragments/chart"
import { Checkbox } from "@/components/ui/fragments/checkbox"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/fragments/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/fragments/dropdown-menu"
import { Input } from "@/components/ui/fragments/input"
import { Label } from "@/components/ui/fragments/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/fragments/select"
import { Separator } from "@/components/ui/fragments/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/fragments/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/fragments/tabs"
import { CreateTaskSheet } from "./core/create-calon-sheet"
import { CalonType, Elections } from "@/lib/schema"

import { Mars, Venus } from "lucide-react"
import { DeleteTasksDialog } from "./core/delete-tasks-dialog"

import { AvatarImage,  Avatar, AvatarFallback } from "./fragments/avatar"
import { useInitials } from "@/hooks/use-initials"
import { UpdateTaskSheet } from "./core/calon-update-sheet"
import { router } from "@inertiajs/react"
import { toast } from "sonner"
export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

const columns: ColumnDef<CalonType>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
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
    header: "nama",
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
      <div className="w-50">
    
        {row.original.elections?.title}
     
      </div>
    ),
  },

    {
    accessorKey: "voters",
    header: "voters",
    cell: ({ row }) => (
      <div className="w-32">
    
        {row.original.votes_count}
     
      </div>
    ),
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
      const [open, setOpen] = React.useState(false)
      const [openUpdate, setOpenUpdate] = React.useState(false)
      const [openModal, setOpenModal] = React.useState(false)
      const elections = (table.options.meta as TableMeta)?.elections || []


  const [processing, setProcessing] = React.useState(false);
  const handleDelete = (taskId: number) => {
      try {
        setProcessing(true);
        router.delete(route('dashboard.calon.destroy', { calon: taskId }), {
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => {
            toast.success("Calon deleted successfully");
            setOpenModal(false);
          },
          onError: (errors) => {
            console.error("Delete error", errors);
            toast.error("Failed to delete the calon. Please try again.");
          },
          onFinish: () => {
            setProcessing(false);
          }
        });
      } catch (error) {
        console.error("Delete error", error);
        toast.error("Failed to delete the calon. Please try again.");
      }
    };



      return (
        <>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <IconDotsVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onSelect={() => setOpenUpdate(true)}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={() => setOpenModal(true)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UpdateTaskSheet 
            elections={elections}
            task={row.original} 
            open={openUpdate} 
            onOpenChange={setOpenUpdate}
          />
          <DeleteTasksDialog 
          handledeDelete={handleDelete}
            processing={processing}
            trigger={false} 
            students={row.original} 
            open={openModal} 
            onOpenChange={setOpenModal}
          />
        </>
      )
    },
  },
]

function DraggableRow({ row }: { row: Row<CalonType> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}


interface DataTableProps { 
    data: CalonType[];
    pagination: {
        currentPage: number;
        lastPage: number;
        perPage: number;
        total: number;
    };
    filters: {
        search: string;
        filter: string;
    };
    elections: Elections[];
}

// Add table meta type
type TableMeta = {
    elections: Elections[];
}

export function DataTable({
  data: initialData,
  pagination: serverPagination,
  filters ,
  elections 
}: DataTableProps) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [searchTerm, setSearchTerm] = React.useState(filters.search);
  const [completionFilter, setCompletionFilter] = React.useState<'active' | "inactive" | "pending" | "disqualified" | "rejected" | "approved" | "suspended" | "qualified">(filters.filter as 'active' | "inactive" | "pending" | "disqualified" | "rejected" | "approved" | "suspended" | "qualified");

  // Debounced search function
  const debouncedSearch = React.useMemo(
    () =>
      debounce((search: string) => {
        router.get(
          route('dashboard.calon.index'),
          { search, filter: completionFilter },
          { preserveState: true, preserveScroll: true }
        );
      }, 300),
    [completionFilter]
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: serverPagination.currentPage - 1, // Convert 1-based to 0-based
    pageSize: serverPagination.perPage,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => initialData?.map(({ id }) => id) || [],
    [initialData]
  )

  const table = useReactTable({
    data: initialData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    meta: {
      elections // Pass elections to table meta
    },
    pageCount: serverPagination.lastPage,
    manualPagination: true, // Enable manual pagination
    getRowId: (row) => row!.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater;
      setPagination(newPagination);
      
      router.get(
        route('dashboard.calon.index'),
        { page: newPagination.pageIndex + 1 },
        { 
          preserveState: true,
          preserveScroll: true,
          only: ['calon', 'pagination']
        }
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id)
      const newIndex = dataIds.indexOf(over.id)
      
      // Here you can make an API call to update the order in the database
      // For example using Inertia.js:
      // router.post(route('dashboard.calon.reorder'), {
      //   id: active.id,
      //   newPosition: newIndex
      // })
    }
  }
 

    
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(route('dashboard.calon.index'), {
            search: searchTerm,
            filter: completionFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };


  return (

    <section className="flex flex-1 flex-col gap-4 px-4 lg:px-6" >
      <header>
        <h1 className=" font-semibold text-xl">Candidate List</h1>
      </header>
      <div className="flex items-center justify-between">
 <div className=" flex items-center gap-2">
       <form onSubmit={handleSearch} className="relative flex-1">
          <div className="flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                debouncedSearch(value);
              }}
              className="max-w-[20em] h-8 w-full md:w-[300px]"
            />
     
          </div>
        </form>
 </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="  space-x-2" size="sm">
                <IconLayoutColumns  className="hidden md:inline-flex  size-5"/>
                <span className="hidden lg:inline">Customize Columns</span>
                <span className=" hidden md:inline-flex  lg:hidden ">Columns</span>
                <IconChevronDown   className="  size-5"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
     <CreateTaskSheet elections={elections}/>
        </div>
      </div>
  
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted/20 sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      {searchTerm 
                        ? `No results found for "${searchTerm}"`
                        : "No candidates available."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${pagination.pageSize}`}
                onValueChange={(value) => {
                  const newSize = Number(value);
                  setPagination(prev => ({ ...prev, pageSize: newSize }));
                  router.get(
                    route('dashboard.calon.index'),
                    { 
                      perPage: newSize,
                      page: 1 // Reset to first page when changing page size
                    },
                    { 
                      preserveState: true,
                      preserveScroll: true,
                      only: ['calon', 'pagination']
                    }
                  );
                }}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder={pagination.pageSize} />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      

    </section>
  )
}

