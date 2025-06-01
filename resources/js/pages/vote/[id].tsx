import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { CalonType } from '@/lib/schema';
import { Elections } from '@/lib/schema';
import { Spotlight } from '@/components/ui/core/spotlight-new';
import { cn } from '@/lib/utils';
import { BlurFade } from '@/components/ui/core/animate/blur-fade';
import CandidateCard from '@/components/ui/core/vote/list-card';
import React from 'react';
interface VoteDetailProps {
  election: Elections;
  candidates: CalonType[];
}
import TabelBatang from '@/components/ui/core/data/bar-chart';
import PieChart from '@/components/ui/core/data/pie-chart';
export default function VoteDetail({ election, candidates }: VoteDetailProps) {
  console.log("Election Data:", election);
  console.log("Candidates Data:", candidates);
 const [isFinnished, setIsFinished] = React.useState(false);
 const [isFinnishedScroll, setIsFinishedScroll] = React.useState(false);
  return (
    <>
      <Head title={`Vote - ${election.title}`}>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
   <section className="relative content-center flex-col flex min-h-screen w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-50 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />
 
      <Spotlight
        className="-top-20 left-0 md:-top-72 md:left-60"
        fill="white"
      />


      <section className="relative min-h-screen container content-center z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
         <BlurFade duration={1} direction={"up"} delay={1} inView>

        <h1 className="bg-opacity-50 bg-gradient-to-b m-auto max-w-[10em] from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          {election.title}
        </h1>
         </BlurFade>
              <BlurFade duration={1} direction={"up"} delay={1.5} inView 
              
              
              >
        <p className="mx-auto mt-4 max-w-lg text-center text-sm md:text-base font-normal text-neutral-300">
      {election.description || 'Welcome to the voting platform! Here you can find all the candidates for the election. please give your best vote.'}
        </p>
</BlurFade>
{  !isFinnished && ( 
   <BlurFade duration={1 } delay={3} direction={"up"} inView  className=" flex hover:bg-muted-foreground/25 justify-center border-2 border-accent-foreground/30  pt-1.5  rounded-full  transform -translate-x-1/2 left-1/2  absolute  bottom-7" >

  <a href='#candidate' >

    <ChevronDown className='animate-bounce text-2xl  text-accent-foreground/90 mx-auto mt-4' />
  </a>
   </BlurFade>
)}
      </section>
      
            <section id='candidate' className='min-h-screen mt-30 py-30   h-full'>
        <main className='container gap-15 md:gap-17 max-w-[70em] mx-auto relative  flex flex-col items-center justify-center '>
 <header className='flex space-y-3  flex-col items-center justify-center px-4 py-2'>
    <BlurFade duration={1} direction={"up"} delay={0.5} inView>
    <h1 className=' bg-opacity-50 bg-gradient-to-b m-auto max-w-[10em] from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl '>The Candidate</h1>
    </BlurFade>
     <BlurFade duration={1} onAnimationComplete={() => setIsFinished(true)} direction={"up"} delay={0.7} inView>

    <p className='  px-10 text-center   text-muted-foreground'>Pls select the best choise , from the bottom of your heart </p>
     </BlurFade>
 </header>
 {isFinnished && ( 

 <section className={cn('w-full  grid grid-cols-1 md:grid-cols-2 lg:gap-6  gap-20 px-4'


, candidates.length > 2 ? ' lg:grid-cols-3' : 'lg:grid-cols-2'
 



 )}>
 {candidates.length > 0  && candidates.map((candidate, i) => (
<BlurFade key={i} duration={1} direction={"up"} delay={i * 0.8} onAnimationComplete={() => i === candidates.length - 1 && setIsFinishedScroll(true)} inView>
        <CandidateCard  election={election}   Calon={candidate} />
        </BlurFade> 
    ))}
    </section>
 )}
      
        </main>
      </section>
 {election.status === 'finished' && (
    <section id='candidate' className='min-h-screen mt-30 py-30   h-full'>
        <main className='container gap-15 md:gap-17  mx-auto relative  flex flex-col items-center justify-center '>
 <header className='flex space-y-3  flex-col items-center justify-center px-4 py-2'>
    <BlurFade duration={1} direction={"up"} delay={0.5} inView>
    <h1 className=' bg-opacity-50 bg-gradient-to-b m-auto max-w-[10em] from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl '>The Result</h1>
    </BlurFade>
     <BlurFade duration={1}  direction={"up"} delay={0.7} inView>

    <p className='  px-10 text-center   text-muted-foreground'> This is the final result from the elections </p>
     </BlurFade>
 </header>

  <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
    <BlurFade duration={1} direction={"up"} delay={1} inView>
      <PieChart calon={candidates}/>
      </BlurFade>
         <BlurFade duration={1} direction={"up"} delay={1.5} inView>

      <TabelBatang calon={candidates} />
         </BlurFade>
  </div>
        </main>
      </section>
 )}
    </section>


    </>
  );
}
