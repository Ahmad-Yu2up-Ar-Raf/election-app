"use client";

import { cn } from "@/lib/utils";
import {
    CheckCircle,
    Clock,
    Star,
    TrendingUp,
    Video,
    Globe,
    Trophy,
    Vote,
    Medal,
    Award,
    Crown,
    Users,
    Target,
    Flag
} from "lucide-react";
import { BlurFade } from "../core/animate/blur-fade";
export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
}

import { Elections } from "@/lib/schema";
import { useMemo } from "react";
import { Link, router } from "@inertiajs/react";
import { toast } from "sonner";
import { Button } from "./button";

// Array of possible icons with their colors
const ICONS = [
    { icon: <Trophy className="w-4 h-4 text-yellow-500" />, color: "yellow" },
    { icon: <Vote className="w-4 h-4 text-blue-500" />, color: "blue" },
    { icon: <Medal className="w-4 h-4 text-purple-500" />, color: "purple" },
    { icon: <Award className="w-4 h-4 text-pink-500" />, color: "pink" },
    { icon: <Crown className="w-4 h-4 text-amber-500" />, color: "amber" },
    { icon: <Users className="w-4 h-4 text-green-500" />, color: "green" },
    { icon: <Target className="w-4 h-4 text-red-500" />, color: "red" },
    { icon: <Flag className="w-4 h-4 text-indigo-500" />, color: "indigo" },
];

interface BentoGridProps {
    items: Elections[];
}

// const itemsSample: BentoItem[] = [
//     {
//         title: "Analytics Dashboard",
//         meta: "v2.4.1",
//         description:
//             "Real-time metrics with AI-powered insights and predictive analytics",
//         icon: <TrendingUp className="w-4 h-4 text-blue-500" />,
//         status: "Live",
//         tags: ["Statistics", "Reports", "AI"],
//         colSpan: 2,
//         hasPersistentHover: true,
//     },
//     {
//         title: "Task Manager",
//         meta: "84 completed",
//         description: "Automated workflow management with priority scheduling",
//         icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
//         status: "Updated",
//         tags: ["Productivity", "Automation"],
//     },
//     {
//         title: "Media Library",
//         meta: "12GB used",
//         description: "Cloud storage with intelligent content processing",
//         icon: <Video className="w-4 h-4 text-purple-500" />,
//         tags: ["Storage", "CDN"],
//         colSpan: 2,
//     },
//     {
//         title: "Global Network",
//         meta: "6 regions",
//         description: "Multi-region deployment with edge computing",
//         icon: <Globe className="w-4 h-4 text-sky-500" />,
//         status: "Beta",
//         tags: ["Infrastructure", "Edge"],
//     },
// ];

function BentoGrid({ items }: BentoGridProps) {

  const transformedItems = useMemo(() => {
        return items.map((item, index) => {
            const iconIndex = Math.abs(index) % ICONS.length;
            const hasLargeVoters = (item.voters_count || 0) >= 10;
            
            return {
                ...item,
                icon: ICONS[iconIndex].icon,
                iconColor: ICONS[iconIndex].color,
                // colSpan: hasLargeVoters ? 2 : 1,
                hasPersistentHover: hasLargeVoters,
                meta: `${item.voters_count || 0} voters`,
                tags: [
                    item.status,
                    `${item.candidates_count || 0} candidates`,
                    new Date(item.end_date) > new Date() ? 'Ongoing' : 'Ended'
                ]
            };
        });
    }, [items]);



    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto">
            {transformedItems.map((item, index) => {
           
                const isGanjil = index % 2 !== 0;
                return(
                <BlurFade 
                
                direction={"up"} duration={2} delay={index * 1} inView   key={index}     className={cn(
                        "group relative p-4 rounded-xl overflow-hidden transition-all duration-300",
                        "border border-gray-100/80 dark:border-white/20 bg-white dark:bg-black",
                        "hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] cursor-pointer dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)]",
                        "hover:-translate-y-0.5 will-change-transform",
                        isGanjil || "col-span-1",
                        !isGanjil ? "md:col-span-2" : "",
                         {
                            "shadow-[0_2px_12px_rgba(0,0,0,0.03)] -translate-y-0.5": item.hasPersistentHover,
                            "dark:shadow-[0_2px_12px_rgba(255,255,255,0.03)]": item.hasPersistentHover,
                        }
                        
                    )}>

 
           
                    <div
                        className={`absolute inset-0 ${
                   "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-300`}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
                    </div>

                    <div 
                    onClick={() => {
                        if (item.status === "ongoing" || item.status === "finished") {  
                               router.visit(`/vote/${item.id}`) 
                        }else {
                            toast.warning(`Voting for ${item.title} is not available at the moment.`);
                            console.warn(`Voting for ${item.title} is not available at the moment.`);
                        }
                    
                    }}
                    className="relative flex flex-col space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 group-hover:bg-gradient-to-br transition-all duration-300">
                                {item.icon}
                            </div>
                            <span
                                className={cn(
                                    "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                                    "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
                                    "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20"
                                )}
                            >
                                {item.status || "Active"}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 tracking-tight text-[15px]">
                                {item.title}
                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">
                                    {item.meta}
                                </span>
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425]">
                                {item.description || "No description available."}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                {item.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/20"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <Button 
                            type="button"
                            variant={"link"}
                     onClick={() => {
                        if (item.status === "ongoing" || item.status === "finished") {  
                               router.visit(`/vote/${item.id}`) 
                        }else {
                            toast.warning(`Voting for ${item.title} is not available at the moment.`);
                            console.warn(`Voting for ${item.title} is not available at the moment.`);
                        }
                    
                    }}
                             className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                               Explore →
                            </Button>
                        </div>
                    </div>

                    <div
                        className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-gray-100/50 to-transparent dark:via-white/10 ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-300`}
                    />
                               </BlurFade>
                )
})}
        </div>
    );
}

export { BentoGrid }
