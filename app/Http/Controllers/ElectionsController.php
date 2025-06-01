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

    $query = Election::query()->where('user_id', Auth::id())->with('candidates')
            ->withCount('candidates')->with('voters')->withCount('voters')->orderBy('created_at', 'desc');

    if ($search) {
        $query->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        }

        if ($filter) {
            $query->where('status', $filter);
        }

        $elections = $query->paginate($perPage);

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
            'title' => 'required|unique:elections,nama|max:255|string',
            'description' => 'nullable|string|max:1000',
            'status' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
          'capacity' => 'required|integer|min:1',

        
            
        ]);

           Election::create([
            ...$validated,
    
            'user_id' => Auth::id()
        ]);

          return redirect()->route('dashboard.elections.index')->with('success', 'Elections created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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

    // Perbaiki validasi - sesuaikan nama field
    $validated = $request->validate([
        'title' => 'required|string|max:255',  // Hapus unique karena ini update
        'description' => 'nullable|string|max:1000',
        'status' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date',
        'capacity' => 'required|integer|min:1',
    ]);



    $election->update([
            ...$validated,
           'user_id' =>  Auth::id()
    ]);

    // Return dengan data yang lengkap
    return redirect()->route('dashboard.elections.index')->with('success', 'Elections updated successfully');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
   $elections = Election::findOrFail($id);
        
        // Pastikan user hanya bisa delete elections miliknya sendiri
        if ($elections->user_id !== Auth::id()) {
            return redirect()->route('dashboard.elections.index')->with('error', 'Unauthorized access');
        }


     

        $elections->delete();
        return redirect()->route('dashboard.elections.index')->with('success', 'Data deleted successfully!');
    }
}
