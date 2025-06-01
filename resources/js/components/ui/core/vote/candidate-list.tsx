import React, { useState, useMemo } from 'react';
import { ChevronsRight, Heart } from 'lucide-react';
import { CalonType } from '@/lib/schema';
import ButtonHover12 from './vote-button';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

// Array warna yang bisa digunakan
const COLORS = [
  { primary: "#262626", gradient: "linear-gradient(145deg, #262626, #171717)", text: "#FFFFFF" }, // Nearly Black to Deep Black
  { primary: "#171717", gradient: "linear-gradient(145deg, #171717, #000000)", text: "#FFFFFF" }  // Deep Black to Pure Black
];

interface IndexProps { 
    Calon: CalonType;
    electionId: number;  // Tambahkan prop electionId
}

function CandidateCard({ Calon, electionId }: IndexProps) {
  const [isVoting, setIsVoting] = useState(false);
  
  // Menggunakan ID calon untuk memilih warna agar konsisten
  const colorIndex = useMemo(() => {
    return Math.abs(Calon.id) % COLORS.length;
  }, [Calon.id]);

  const color = COLORS[colorIndex];

  const handleVote = () => { 
    setIsVoting(true);
    
    // Debug log untuk memastikan data yang dikirim
    console.log('Voting for:', {
      calon_id: Calon.id,
      election_id: electionId,
      route: route('vote.store', electionId)
    });
    
    router.post(route('vote.store', electionId), {
      calon_id: Calon.id,
      election_id: electionId
    }, {
      preserveScroll: true,
      onSuccess: (page) => {
        console.log('Vote success response:', page);
        toast.success('Vote berhasil!');
        // Redirect ke halaman index setelah sukses
        router.visit(route('vote.index'));
      },
      onError: (errors) => {
        console.error('Vote error:', errors);
        toast.error(errors.message || 'Gagal melakukan vote');
        setIsVoting(false);
      },
      onFinish: () => {
        console.log('Vote request finished');
        setIsVoting(false);
      }
    });
  }

  return (
    <>
      <div 
        className='relative w-full max-w-xs h-[370px] overflow-hidden group mx-auto dark:bg-black bg-white dark:border-0 border rounded-lg dark:text-white text-black flex flex-col'
        style={{ borderColor: color.primary }}
      >
        <div className='w-full h-full'>
          <img
            src={`/${Calon.picture}`}
            alt={Calon.nama}
            width={400}
            height={500}
            className='h-full w-full grayscale-100 group-hover:grayscale-0 scale-105 group-hover:scale-100 object-cover transition-all duration-300 rounded-md'
          />
        </div>
        <article 
          className='p-8 w-full h-full z-10 absolute top-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300'
          style={{ 
            background: `${color.primary}` 
          }}
        >
          <div className='translate-y-10 group-hover:translate-y-0 transition-all duration-300 space-y-2'>
            <h1 className='md:text-2xl font-semibold'>Vision & Mission</h1>
            <p className='text-accent-foreground/90 text-sm mb-7 leading-5.5'>
              {Calon.visi}
            </p>
            <ButtonHover12 
              onClick={handleVote} 
              disabled={isVoting}
            >
              {isVoting ? 'Processing...' : 'Vote Now'}
            </ButtonHover12>
          </div>
        </article>
        <article className='p-4 w-full h-[40%] flex flex-col justify-end overflow-hidden absolute bottom-0 rounded-b-md bg-gradient-to-t from-black opacity-100 group-hover:opacity-0 group-hover:-bottom-4 transition-all duration-300'>
          <h1 className='md:text-2xl font-semibold'>{Calon.nama}</h1>
          <p className='sm:text-base text-sm'>{Calon.kelas}</p>
        </article>
      </div>
    </>
  );
}

export default CandidateCard;