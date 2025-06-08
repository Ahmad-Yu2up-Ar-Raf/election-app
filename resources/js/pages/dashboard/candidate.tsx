import { AppSidebar } from "@/components/ui/app-sidebar"

import { DataTable } from "@/components/ui/core/table/data-table"

import { SiteHeader } from "@/components/ui/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/fragments/sidebar"

import { CalonType, Elections } from "@/lib/schema"

import { columns } from "@/components/ui/core/table/candidate-columns"
import { statuse } from "@/data/data"
import { CreateTaskSheet } from "@/components/ui/core/create-calon-sheet"


interface PaginatedData {
    data: CalonType[];
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
  calon: CalonType[]
  pagination: PaginatedData;
     elections: Elections[]
  filters: {
    search: string;
    filter: string;
  };
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function Page({ pagination, filters, flash, calon , elections}: ElectionsPageProps) {



    
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
                <SiteHeader siteName="Candidate" />
                    <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                
          
                        <div className="flex flex-col px-5 gap-4 py-4 md:gap-6 md:py-6">


            <header className="flex items-center justify-between space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">Candidate Management</h2>
            
              {/* <CreateTaskSheet  /> */}
            </header>

            <DataTable 
            nas="nama"
            createComponent={
          <CreateTaskSheet elections={elections}/>
            }
            option={statuse}
              data={calon} 
              columns={columns}
              pagination={pagination}
              filters={filters}
              elections={elections}
            />

                </div>
                </div>
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}