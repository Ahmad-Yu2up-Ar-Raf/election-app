<?php

namespace App\Http\Controllers;

use App\Models\Election;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ElectionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search');
        $filter = $request->input('filter');
         $user = Auth::User();
        $query = Election::query()
            ->where('user_id', Auth::id())->orWhere('user_id',  $user->team_id)
           
            ->with('candidates')
            ->withCount('candidates')
            ->with('voters')
            ->withCount('voters')
            ->orderBy('created_at', 'desc');

        if ($search) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        if ($filter) {
            $query->where('status', $filter);
        }

        $elections = $query->paginate($perPage);

        // Update status untuk setiap election sebelum menampilkan
        $elections->getCollection()->each(function ($election) {
            $election->updateStatusBasedOnDate();
        });

        return Inertia::render('dashboard/elections', [
            'elections' => $elections->items(),
            'pagination' => [
                'currentPage' => $elections->currentPage(),
                'perPage' => $elections->perPage(),
                'lastPage' => $elections->lastPage(),
                'total' => $elections->total(),
            ],
            'filters' => [
                'search' => $search,
                'filter' => $filter,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $validated = $request->validate([
            'title' => 'required|unique:elections,title|max:255|string',
            'description' => 'nullable|string|max:1000',
          
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'capacity' => 'required|integer|min:1',
        ]);

                 $user = Auth::User();
      if (isset($user->team_id)) {
             $election = Election::create([
            ...$validated,
             'user_id' => $user->team_id
        ]);
      }else{
                      $election = Election::create([
            ...$validated,
            'user_id' => Auth::id()
        ]);
      }

        // Update status berdasarkan tanggal saat ini
        $election->updateStatusBasedOnDate();

        return redirect()->route('dashboard.elections.index')->with('success', 'Elections created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $election = Election::findOrFail($id);
        
        // Pastikan user hanya bisa melihat elections miliknya
        if ($election->user_id !== Auth::id()) {
            return redirect()->route('dashboard.elections.index')->with('error', 'Unauthorized access');
        }

        // Update status sebelum menampilkan
        $election->updateStatusBasedOnDate();

        return Inertia::render('dashboard/elections/show', [
            'election' => $election->load(['candidates', 'voters'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $election = Election::findOrFail($id);
        
        if ($election->user_id !== Auth::id()) {
            return redirect()->route('dashboard.elections.index')->with('error', 'Unauthorized access');
        }

        // Update status sebelum menampilkan form edit
        $election->updateStatusBasedOnDate();

        return Inertia::render('dashboard/elections/edit', [
            'election' => $election
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Election $election)
    {
        // Validasi akses
        if ($election->user_id !== Auth::id()) {
            return redirect()->route('dashboard.elections.index')->with('error', 'Unauthorized access');
        }

        // Validasi input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            // 'status' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'capacity' => 'required|integer|min:1',
        ]);

        $election->update([
            ...$validated,
            'user_id' => Auth::id()
        ]);

        // Update status berdasarkan tanggal baru
        $election->updateStatusBasedOnDate();

        return redirect()->route('dashboard.elections.index')->with('success', 'Elections updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $election = Election::findOrFail($id);
        
        // Pastikan user hanya bisa delete elections miliknya sendiri
        if ($election->user_id !== Auth::id()) {
            return redirect()->route('dashboard.elections.index')->with('error', 'Unauthorized access');
        }

        $election->delete();
        return redirect()->route('dashboard.elections.index')->with('success', 'Data deleted successfully!');
    }

    /**
     * Manual refresh status untuk semua elections user
     */
    public function refreshStatus()
    {
              $user = Auth::User();
        $elections = Election::where('user_id', Auth::id())->orWhere('user_id',  $user->team_id)->orWhere('team_id',  Auth::id())->get();
        
        $updatedCount = 0;
        foreach ($elections as $election) {
            $oldStatus = $election->status;
            $election->updateStatusBasedOnDate();
            
            if ($oldStatus !== $election->status) {
                $updatedCount++;
            }
        }

        return redirect()->route('dashboard.elections.index')
            ->with('success', "Status updated for {$updatedCount} elections");
    }
}