import { AppSidebar } from "@/components/ui/app-sidebar"

import { DataTable } from "@/components/ui/core/table/data-table"

import { SiteHeader } from "@/components/ui/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/fragments/sidebar"

import { Elections } from "@/lib/schema"

import { columns } from "@/components/ui/core/table/users-columns"
import { role, statuses } from "@/data/data"
import { CreateTaskSheet } from "@/components/ui/core/create-users-sheet"
import { User } from "@/types"
import { useForm, usePage } from "@inertiajs/react"

import { type BreadcrumbItem, type SharedData } from '@/types';
interface PaginatedData {
    data: User[];
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface ElectionsPageProps {
  users: User[];
  pagination: PaginatedData;

  filters: {
    search: string;
    filter: string;
  };
  flash?: {
    success?: string;
    error?: string;
  };
}



export default function Page({ pagination, filters, flash, users }: ElectionsPageProps) {


    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader siteName="Elections" />
                    <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                
          
                        <div className="flex flex-col px-7 gap-4 py-4 md:gap-6 md:py-6">


            <header className="flex justify-start  flex-col   space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">Adminds Team  Management</h2>
             <p className=" text-muted-foreground">U can make another user/admind account, and then all that account can CRUD ur data</p>
              {/* <CreateTaskSheet  /> */}
            </header>

          <DataTable 
                   createComponent={<CreateTaskSheet/>}
                     data={users} 
                     columns={columns}
                     pagination={pagination}
                     filters={filters}
                    option={role}
                   />

                </div>
                </div>
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}