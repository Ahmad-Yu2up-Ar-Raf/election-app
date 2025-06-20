import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import Echo from 'laravel-echo';
import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/fragments/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/fragments/card"
import { CalonType, Elections, votes } from "@/lib/schema";
import { LucideIcon, PersonStanding, UsersRound } from "lucide-react";


interface DataProps { 
      calon?: CalonType[];
 
    votes?:votes[];
   elections?: Elections[];
}


export function SectionCards({  votes, calon, elections } : DataProps) {

 const Votes_count = votes?.length || 0;
  const Calon_count = calon?.length || 0;
   const Elections_count = calon?.length || 0;



interface DataCard { 
  title: string;
  description: string;
  value: number;
  icon: LucideIcon;
 label?: string;

}




  const dataCards: DataCard[] = [ 
    {
      title: "Vote",
      description: "Total votes casted in the election",
      value: Votes_count,
      icon: PersonStanding,
      label: "Voters"
    },
    {
      title: "Candidates",
      description: "Total candidates running in the election", 
      value: Calon_count,
      icon: UsersRound,
      label: "Candidates"
    },
    {
      title: "Elections",
      description: "Total elections conducted",
      value: elections?.length || 0,
      icon: IconTrendingUp,
      label: "Elections"
    }
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
     {dataCards.map((card, index) => ( 

      <Card key={index} className="@container/card">
        <CardHeader>
          <CardDescription>{card.title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {card.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
          <card.icon className="size-4" />
              {card.label || "Votes"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
           Increase up this month <card.icon className="size-4" />
          </div>
          <div className="text-muted-foreground">
   {card.description}
          </div>
        </CardFooter>
      </Card>
     )) }
    
    </div>
  )
}
