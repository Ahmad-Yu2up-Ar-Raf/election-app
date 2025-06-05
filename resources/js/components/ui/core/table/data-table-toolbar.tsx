"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/fragments/button"
import { Input } from "@/components/ui/fragments/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { CreateTaskSheet } from "../create-elections-sheet"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { router } from "@inertiajs/react"
import React from "react"
import { debounce } from "lodash"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  option: any
  createComponent: React.ReactNode,
  getColums?: string
     filters: {
        search: string;
        filter: string;
    };
}

export function DataTableToolbar<TData>({
  table,
  option,
  filters,
    getColums = "name",
  createComponent
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
   

 const currentPath = window.location.pathname;
          const pathNames = currentPath.split('/').filter(path => path)[1]

const [searchTerm, setSearchTerm] = React.useState(filters.search);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(route(`dashboard.${pathNames}.index`), {
            search: searchTerm,
            
        }, {
            preserveState: true,
            preserveScroll: true,
        });
        [pathNames]
    };

      const debouncedSearch = React.useMemo(
        () =>
          debounce((search: string) => {
            router.get(
              route(`dashboard.${pathNames}.index`),
              { search,  },
              { preserveState: true, preserveScroll: true }
            );
          }, 300),
        [searchTerm, pathNames]
      );

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter tasks..."
          value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                debouncedSearch(value);
              }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={option}
          />
        )}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
      {createComponent}
      </div>
    </div>
  )
}
