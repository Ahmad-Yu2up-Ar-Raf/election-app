import { AppSidebar } from "@/components/ui/app-sidebar"
import { ChartAreaInteractive } from "@/components/ui/core/data/chart-area-interactive"
import { DataTable } from "@/components/ui/data-table"
import { SectionCards } from "@/components/ui/section-cards"
import { SiteHeader } from "@/components/ui/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/fragments/sidebar"

import data from "@/data/data.json"
import { CalonType, votes } from "@/lib/schema"
import PieChart from "@/components/ui/core/data/pie-chart"

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
    pagination: PaginatedData;
    filters: {
        search: string;
        filter: string;
    };
    flash?: {
        success?: string;
        error?: string;
    };
    votes: votes[];
}

export default function Page({ calon, pagination, filters, flash, votes  }: PageProps) {
    console.log("calon", calon);
    console.log("votes", votes);
    
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
                <SiteHeader siteName="Dashboard" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                
          
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                             <SectionCards calon={calon} votes={votes} />
                                {calon.length >= 2 && votes.length >= 1 && (
                    <>
                  
                            
                      
                            {/* <div className="px-4 lg:px-6">
                                <ChartAreaInteractive calon={calon} votes={votes} />
                            </div> */}
                            
                          
                            <PieChart calon={calon} />
                            
                    </>
                ) }
                           
                       
                            <DataTable filters={filters} data={calon} pagination={pagination} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}