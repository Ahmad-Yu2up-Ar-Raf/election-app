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

export default function VoteIndex({ elections, filters }: VoteIndexProps) {
const [AnimationComplete , setAnimationComplte] = useState(false);
  return (
    <>
      <Head title="Welcome">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>
      <section className="min-h-screen relative space-y-18 pt-20 h-full">
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
                   <AppLogoIcon className="size-10 fill-current mb-2  text-accent-foreground m-auto " />
                    </BlurFade>
           <BlurFade duration={1} direction={"up"} delay={1} inView>

            <h1 className="bg-opacity-50 bg-gradient-to-b m-auto max-w-[10em] from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">The elections</h1>
            </BlurFade>
              <BlurFade onAnimationComplete={() => { setAnimationComplte(true)}} duration={1} direction={"up"} delay={1.5} inView>

        <p className="mx-auto max-w-lg px-10 text-center text-sm md:text-base font-normal text-muted-foreground">
      Here a list of elections that you can participate in. Please select the best candidate from the bottom of your heart.
        </p>
     
              </BlurFade>
        </header>
        { AnimationComplete &&  <BentoGrid items={elections} />}

      </section>
    </>
  );
}
