import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/fragments/sidebar"

import data from "@/data/data.json"
import { CalonType } from "@/lib/schema"

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


interface PageProps { 
      calon: CalonType[];
    pagination: PaginatedData
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Page({ calon, pagination,flash }  : PageProps)  {




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
        <SiteHeader />
        <div className="flex flex-1 flex-col">
                {calon.length > 0 && (
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
                  
  <DataTable data={calon} />
            </div>

          </div>
            )}
      
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}