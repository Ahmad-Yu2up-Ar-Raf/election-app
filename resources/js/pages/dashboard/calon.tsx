import { AppSidebar } from "@/components/ui/app-sidebar"
import { ChartAreaInteractive } from "@/components/ui/core/data/chart-area-interactive"
import { DataTable } from "@/components/ui/data-table"
import { SectionCards } from "@/components/ui/section-cards"
import { SiteHeader } from "@/components/ui/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/fragments/sidebar"

import { CalonType, votes, Elections } from "@/lib/schema"
import PieChart from "@/components/ui/core/data/pie-chart"
import TabelBatang from "@/components/ui/core/data/bar-chart"
import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"

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
    elections: Elections[];
}

export default function Page({ 
    calon: initialCalon, 
    pagination, 
    filters, 
    flash, 
    votes: initialVotes,  
    elections  
}: PageProps) {

    const [votes, setVotes] = useState<votes[]>(initialVotes || []);
    const [calon, setCalon] = useState<CalonType[]>(initialCalon || []);
    const [isConnected, setIsConnected] = useState(false);

    // Callback untuk handle vote event
    const handleVoteEvent = useCallback((e: { vote: votes }) => {
        console.log("Received vote event:", e);
        
        // Update votes state
        setVotes(prevVotes => {
            const newVotes = [...prevVotes, e.vote];
            console.log("Updated votes:", newVotes);
            return newVotes;
        });

        // Update calon state
        setCalon(prevCalon => {
            return prevCalon.map(candidate => {
                if (candidate.id === e.vote.calon_id) {
           
                    console.log("Updating candidate:", candidate.id);
                    toast.info(` New Vote!!! `)
                    return {
                        ...candidate,
                        votes_count: (candidate.votes_count || 0) + 1,
                        votes: [...(candidate.votes || []), e.vote]
                    };
                }
                return candidate;
            });
        });
    }, []);

    useEffect(() => {
        // Tunggu sampai Echo tersedia
        const initializeEcho = () => {
            if (!window.Echo) {
                console.log("Echo not ready, retrying...");
                setTimeout(initializeEcho, 100);
                return;
            }

            console.log("Initializing Echo connection...");
            
            try {
                const echo = window.Echo;
                
                // Setup connection event listeners
                if (echo.connector && echo.connector.pusher) {
                    echo.connector.pusher.connection.bind('error', (error: any) => {
                        console.error('WebSocket Error:', error);
                        setIsConnected(false);
                    });
                    
                    echo.connector.pusher.connection.bind('connected', () => {
                        console.log('WebSocket Connected');
                        setIsConnected(true);
                    });
                    
                    echo.connector.pusher.connection.bind('disconnected', () => {
                        console.log('WebSocket Disconnected');
                        setIsConnected(false);
                    });
                }

                // Listen to votes channel
                const channel = echo.channel('votes');
                
                channel.listen('.VoteCreatedEvent', (e: any) => {
                    console.log('Vote event received:', e);
                    handleVoteEvent(e);
                });

                // Cleanup function
                return () => {
                    console.log("Cleaning up Echo listeners...");
                    if (channel) {
                        channel.stopListening('.VoteCreatedEvent');
                    }
                };
            } catch (error) {
                console.error("Error initializing Echo:", error);
            }
        };

        const cleanup = initializeEcho();
        
        return cleanup;
    }, [handleVoteEvent]);

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
                            
                            {calon.length >= 2 && votes.length >= 1 && (
                                <>
                                    <div className="px-4 lg:px-6">
                                        <ChartAreaInteractive />
                                    </div>
                                    
                                    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
                                        <PieChart calon={calon}/>
                                        <TabelBatang calon={calon} />
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