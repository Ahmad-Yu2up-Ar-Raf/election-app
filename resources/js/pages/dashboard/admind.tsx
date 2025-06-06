import { AppSidebar } from "@/components/ui/app-sidebar"
import { ChartAreaInteractive } from "@/components/ui/core/data/chart-area-interactive"
import { DataTable } from "@/components/ui/data-table"
import { SectionCards } from "@/components/ui/section-cards"
import { SiteHeader } from "@/components/ui/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/fragments/sidebar"

import { CalonType, Vote, Elections } from "@/lib/schema"
import PieChart from "@/components/ui/core/data/pie-chart"
import TabelBatang from "@/components/ui/core/data/bar-chart"
// import { useEffect, useState, useCallback } from "react"
// import { toast } from "sonner"
// import { useEcho } from "@laravel/echo-react"
// import { ChartAreaGradient } from "@/components/ui/core/data/chart-area-gradient"

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
    votes: Vote[];
    elections: Elections[];
}

export default function Page({ 
    calon,
    pagination, 
    filters, 
    flash, 
    votes,
    elections  
}: PageProps) {


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
                            <SectionCards calon={calon} elections={elections} votes={votes} />
                            
                            {calon.length >= 2 && votes.length >= 1 &&  (
                                <>
                                   
                                      <div className="px-4 lg:px-6">
                                        <ChartAreaInteractive
                                             votes={votes}
                elections={elections}
                chartType="total"
                                        />
                                    </div>
                                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 ">
                                        <PieChart calon={calon}/>
                                        <TabelBatang calon={calon} />
                                        {/* <ChartAreaGradient votes={votes}/> */}
                                    </div>
                                </>
                            )}
                           
                            <DataTable elections={elections} filters={filters} data={calon} pagination={pagination} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}