<?php

namespace App\Http\Controllers;

use App\Events\VoteCreatedEvent;
use App\Models\Vote;
use App\Models\Calon;
use App\Models\Election;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $query = Election::query()
            ->with(['candidates' => function($query) {
                $query->withCount('votes');
            }])
            ->withCount('candidates')
            ->withCount('voters')
      
;

        // Search functionality
        if ($request->has('search') && $request->input('search') !== '') {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if (request()->has('filter') && request('filter') !== 'all') {
            $query->where('status', request('filter') === 'ongoing' ? 'ongoing' : (request('filter') === 'finished' ? 'finished' : 'upcoming'));
        }

        $elections = $query->orderBy('voters_count', 'desc')
            ->paginate($perPage);

        $elections->through(function($item) { 
            return [
                ...$item->toArray(),
                'start_date' => $item->start_date ? $item->start_date->format('Y-m-d H:i:s') : null,
                'end_date' => $item->end_date ? $item->end_date->format('Y-m-d H:i:s') : null,
            ];
        });
  
        

        
        return Inertia::render('vote/index', [
            'elections' => $elections->items() ?? [],
            'filters' => [
                'search' => request('search', ''),
                'filter' => request('filter', 'all'),
            ],
            'pagination' => [
                'data' => $elections->toArray(),
                'total' => $elections->total(),
                'currentPage' => $elections->currentPage(),
                'perPage' => $elections->perPage(),
                'lastPage' => $elections->lastPage(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
     public function store(Request $request, Election $election)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'calon_id' => 'required|exists:calon,id',
                'election_id' => 'required|exists:elections,id'
            ]);

    

            // Pastikan calon_id belongs to this election
            $calon = Calon::where('id', $validated['calon_id'])
                         ->where('election_id', $election->id)
                         ->first();
            
            if (!$calon) {
                return response()->json([
                    'message' => 'Kandidat tidak valid untuk pemilihan ini'
                ], 422);
            }

   

            // Create vote
          $vote =  Vote::create([
                'calon_id' => $validated['calon_id'],
                'election_id' => $validated['election_id'],
                // 'user_id' => Auth::id(), // Uncomment jika menggunakan user authentication
            ]);
 $vote->load('calon');
        // broadcast(new VoteCreatedEvent($vote))->toOthers();
        event(new VoteCreatedEvent($vote));
             return redirect()->route('vote.index')->with('success', 'Data Insert successfully!');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Data tidak valid',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            // \Log::error('Vote creation failed: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan vote'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Election $election)
    {
        // Load candidates with votes count and election data
        $election->load(['candidates' => function($query) {
            $query->withCount('votes')->with('votes');
        }]);


        
        $candidate = $election->candidates->map(fn($candidate) => [
                'id' => $candidate->id,
                'nama' => $candidate->nama,
                'kelas' => $candidate->kelas,
                'picture' => $candidate->picture,
                'visi' => $candidate->visi,
                'misi' => $candidate->misi,
                'votes_count' => $candidate->votes_count,
                   'votes' => $election->votes,
        ]);
        return Inertia::render('vote/[id]', [
            'election' => [
                'id' => $election->id,
                'title' => $election->title,
                'description' => $election->description,
                'start_date' => $election->start_date?->format('Y-m-d H:i:s'),
                'end_date' => $election->end_date?->format('Y-m-d H:i:s'),
                'status' => $election->status,
                'votes' => $election->voters,
              
            ],
            'votes' => $candidate->join('votes'),
            'largest' => $candidate->max('votes_count'),
            'candidates' =>  $candidate
        ]);
    }
}