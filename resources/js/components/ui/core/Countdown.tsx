import React, { useState, useEffect } from 'react';
import { SlidingNumber } from '../fragments/sliding-number';
import { EllipsisVertical } from 'lucide-react';

interface type {
    targetDate: string
}

const Countdown = ({ targetDate  } : type) => {
 const calculateTimeLeft = () => {
 const difference = +new Date(targetDate) - +new Date();
 let timeLeft  = {};
if (difference > 0) {
 timeLeft = {
 days: Math.floor(difference / (1000 * 60 * 60 * 24)),
 hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
 minutes: Math.floor((difference / 1000 / 60) % 60),
 seconds: Math.floor((difference / 1000) % 60)
 };
 }
return timeLeft;
 };
const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
useEffect(() => {
 const timer = setTimeout(() => {
 setTimeLeft(calculateTimeLeft());
 }, 1000);
return () => clearTimeout(timer);
 });
const timerComponents  = [];
Object.keys(timeLeft).forEach((interval) => {
 if (!timeLeft[interval]) {
 return;
 }
timerComponents.push(
    <div className=" flex  content-start items-start flex-row ">

    <div className='  flex-col flex  items-center'>
     <SlidingNumber key={interval} value={timeLeft[interval]} padStart={true} />
 {/* {interval} */}

  <span className=' text-muted-foreground text-sm lg:text-base'>
 {interval}
    </span>
    </div>
    {interval != "seconds" && (

      <EllipsisVertical  className='text-zinc-400 size-7 mt-4 mx-2  h-fit'/>
 )}
    
    </div>
 );
 });
return (
 <div>
 {timerComponents.length ?  (
    <div className='flex text-[3.5em]  relative  justify-center items-center gap-0.5 font-mono'>  
        {timerComponents}

    </div>
 ) : <span>Time's up!</span>}
 </div>
 );
};
export default Countdown;