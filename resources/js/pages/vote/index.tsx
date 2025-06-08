import { Elections } from "@/lib/schema";
import { Head, Link, usePage } from "@inertiajs/react";
// import ChromaGrid from "@/components/ui/core/vote/candidate-list";
import { type SharedData } from "@/types";
import { useState } from "react";
import { BentoGrid, type  BentoItem} from "@/components/ui/fragments/bento-grid";
interface PaginatedData {
    data: Elections[];
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



interface VoteIndexProps {
  elections: Elections[];
    pagination: PaginatedData;
    filters: {
        search: string;
        filter: string;
    };
}
import { Spotlight } from "@/components/ui/core/spotlight-new";

import {
    CheckCircle,
    Clock,
    Star,
    TrendingUp,
    Video,
    Globe,
    FileBox,
    Box,
    Package,
    SearchX,
    Search,
} from "lucide-react";


const itemsSample: BentoItem[] = [
    {
        title: "Analytics Dashboard",
        meta: "v2.4.1",
        description:
            "Real-time metrics with AI-powered insights and predictive analytics",
        icon: <TrendingUp className="w-4 h-4 text-blue-500" />,
        status: "Live",
        tags: ["Statistics", "Reports", "AI"],
        colSpan: 2,
        hasPersistentHover: true,
    },
    {
        title: "Task Manager",
        meta: "84 completed",
        description: "Automated workflow management with priority scheduling",
        icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
        status: "Updated",
        tags: ["Productivity", "Automation"],
    },

];


import { BlurFade } from "@/components/ui/core/animate/blur-fade";
import { cn } from "@/lib/utils";
import AppLogoIcon from "@/components/ui/app-logo-icon";
import { Button } from "@/components/ui/fragments/button";
import ButtonHover12 from "@/components/ui/core/vote/vote-button";

export default function VoteIndex({ elections, filters }: VoteIndexProps) {
const [AnimationComplete , setAnimationComplte] = useState(false);
console.log(elections)
  return (
    <>
      <Head title="vote">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>
      {elections.length > 0 ? (

      <section className="min-h-dvh relative space-y-18 pt-20 h-full">
           <Spotlight
        className="-top-20 left-0 md:-top-32 md:left-60"
        fill="white"
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-50 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />
        <header className="container max-w-[70em] mx-auto relative flex flex-col items-center justify-center gap-4">
          <BlurFade duration={1} direction={"up"} delay={0.5} inView>
                   <Box className="size-10  mb-2  text-accent-foreground m-auto " />
                    </BlurFade>
           <BlurFade duration={1} direction={"up"} delay={1} inView>

            <h1 className="bg-opacity-50 bg-gradient-to-b m-auto max-w-[10em] from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">Electioneering</h1>
            </BlurFade>
              <BlurFade onAnimationComplete={() => { setAnimationComplte(true)}} duration={1} direction={"up"} delay={1.5} inView>

        <p className="mx-auto max-w-lg px-10 text-center text-sm md:text-base font-normal text-muted-foreground">
      Here a list of elections that you can participate in. Please select the best candidate from the bottom of your heart.
        </p>
     
              </BlurFade>
        </header>
        { AnimationComplete &&  <BentoGrid items={elections} />}

      </section>
      ) : (
            <div className="relative px-5 flex h-dvh w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
                  "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
                )}
              />
         
              <Spotlight
                className="-top-40 left-0 md:-top-20 md:left-60"
                fill="white"
              />
              <div className="relative z-10 content-center mx-auto w-full max-w-7xl p-4 ">
                    
          <BlurFade duration={1} direction={"up"} delay={0.5} inView>
                   <Search className="size-14  mb-6  text-accent-foreground/80 m-auto " />
                    </BlurFade>
                <BlurFade duration={1} direction={"up"} delay={1} inView className=' '>
                    
                <h1 className="bg-opacity-50 bg-gradient-to-b pb-2  from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent ">
                Empty  Electioneering
                </h1>
                </BlurFade>
                     <BlurFade duration={1}direction={"up"} delay={1.5} inView>
                     <p className="mx-auto mt-4 max-w-lg pb-2 text-center text-sm md:text-base font-normal text-neutral-300">
              There are currently no elections available. You can create a new one or return to the homepage to explore other options.
                     </p>
             </BlurFade>
            <div className=" mt-5 md:flex-row gap-4 w-full flex flex-col items-center justify-center pt-2">
           <BlurFade duration={1}direction={"up"} delay={2} inView  className=' md:w-[10em] w-full  max-w-xs '>  

            <Link href={'/'} className=' w-full' >
            <Button className=" px-6 py-3 cursor-pointer  w-full bg-clip bg-opacity-50 bg-gradient-to-b font-bold from-neutral-50 to-neutral-400 transition-colors">
            Go Back
                </Button>
            </Link>
           </BlurFade>
           <BlurFade duration={1}direction={"up"} delay={2} inView className=' md:w-[10em]  max-w-xs w-full'>

            <Link href={route('dashboard.admind.index')}  className=' w-full' >
            <ButtonHover12 className='' > 
                Start election
                </ButtonHover12>
            </Link>
           </BlurFade>
     </div>
              </div>
            </div>
      )}
    </>
  );
}
