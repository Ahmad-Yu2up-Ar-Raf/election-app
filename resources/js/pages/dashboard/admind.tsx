import { AppSidebar } from "@/components/ui/app-sidebar";
import { ChartAreaInteractive } from "@/components/ui/core/data/chart-area-interactive";
import { DataTable } from "@/components/ui/core/table/data-table";
import { SectionCards } from "@/components/ui/section-cards";
import { SiteHeader } from "@/components/ui/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/fragments/sidebar";

import { CalonType, Vote, Elections } from "@/lib/schema";
import PieChart from "@/components/ui/core/data/pie-chart";
import TabelBatang from "@/components/ui/core/data/bar-chart";

import { CreateTaskSheet } from "@/components/ui/core/create-calon-sheet";
import { statuse } from "@/data/data"
import { columns } from "@/components/ui/core/table/candidate-columns"

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
  elections,
}: PageProps) {



  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader siteName="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards calon={calon} elections={elections} votes={votes} />
              {calon.length >= 2 && votes.length >= 1 && (
                <>
                  <div className="px-4 lg:px-6">
                    <ChartAreaInteractive
                      votes={votes}
                      elections={elections}
                      chartType="total"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-6">
                    <PieChart calon={calon} />
                    <TabelBatang calon={calon} />
                  </div>
                </>
              )}
                     <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                
          
                        <div className="flex flex-col px-5 gap-4 py-4 md:gap-6 md:py-6">


            <header className="flex items-center justify-between space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">Candidate List</h2>
            
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

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
