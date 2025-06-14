import AppLogoIcon from '@/components/ui/app-logo-icon';
import { BlurFade } from '@/components/ui/core/animate/blur-fade';
import { Spotlight } from '@/components/ui/core/spotlight-new';
import ButtonHover12 from '@/components/ui/core/vote/vote-button';
import { Button } from '@/components/ui/fragments/button';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Box, FileBox, Package } from 'lucide-react';




export default function Welcome( { }) {
    // const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
    <div className="relative px-5 content-center flex h-dvh w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none  absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />
 
      <Spotlight
        className="-top-40   -left-20 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative h-full content-center z-10 mx-auto w-full max-w-7xl p-4 md:pt-0">
            
  <BlurFade duration={1} direction={"up"} delay={0.5} inView>
           <Package className="size-20  mb-5   text-accent-foreground/80 m-auto " />
            </BlurFade>
        <BlurFade duration={1} direction={"up"} delay={1} inView className=' '>
            
        <h1 className="bg-opacity-50 bg-gradient-to-b pb-2    from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
            Electioneering
        </h1>
        </BlurFade>
             <BlurFade duration={1}direction={"up"} delay={1.5} inView>
             <p className="mx-auto mt-4 max-w-lg pb-2 text-center text-sm md:text-base font-normal text-neutral-300">
          Welcome to the voting platform! Here you can find all the candidates for the election. please give your best vote.
             </p>
     </BlurFade>
     <div className=" mt-5 md:flex-row gap-4 w-full flex flex-col items-center justify-center pt-2">
           <BlurFade duration={1}direction={"up"} delay={2} inView  className=' md:w-[10em] w-full  max-w-xs '>  

            <Link href={route('vote.index')} className=' w-full' >
            <Button className=" px-6 py-3 cursor-pointer  w-full bg-clip bg-opacity-50 bg-gradient-to-b font-bold from-neutral-50 to-neutral-400 transition-colors">
                Start Voting
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


        </>
    );
}
