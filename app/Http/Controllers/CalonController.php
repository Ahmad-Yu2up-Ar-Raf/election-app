<?php

namespace App\Http\Controllers;

use App\Models\Calon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CalonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        
        $query = Calon::where('user_id', Auth::id());

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('kelas', 'like', "%{$search}%");
            });
        }

        $calon = $query->orderBy('created_at', 'desc')
            ->with(['votes' => function($query) {
                $query->orderBy('created_at', 'desc');
            }])
            ->withCount('votes')
            ->with('elections')
            ->paginate($perPage);

        if (request()->has('filter') && request('filter') !== 'all') {
            $calon->where('status', request('filter') === 'active' ? 'active' : 'inactive');
        }

        $calon->through(function($item) {
            return [
                ...$item->toArray(),
                'picture' => $item->picture ? url($item->picture) : null
            ];
        });

        // Get votes only for calon owned by current user
        $votes = \App\Models\Vote::whereIn('calon_id', function($query) {
            $query->select('id')
                  ->from('calon')
                  ->where('user_id', Auth::id());
        })
        ->with('calon')
        ->orderBy('created_at', 'desc')
        ->get();




        $elections = \App\Models\Election::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->with('candidates')
            ->withCount('candidates')
            ->paginate($perPage);

        $elections->through(function($item) { 
            return [
                ...$item->toArray(),
                'start_date' => $item->start_date ? $item->start_date->format('Y-m-d H:i:s') : null,
                'end_date' => $item->end_date ? $item->end_date->format('Y-m-d H:i:s') : null,
            ];
        });

        
        return Inertia::render('dashboard/calon', [
            'calon' => $calon->items() ?? [],
            'votes' => $votes,
            'elections' => $elections->items() ?? [],
            'filters' => [
                'search' => request('search', ''),
                'filter' => request('filter', 'all'),
            ],
            'pagination' => [
                'data' => $calon->toArray(),
                'total' => $calon->total(),
                'currentPage' => $calon->currentPage(),
                'perPage' => $calon->perPage(),
                'lastPage' => $calon->lastPage(),
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(){
        // Implementation for create form if needed
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|unique:calon,nama|max:255|string',
            'gender' => 'required|string',
            'status' => 'required|string',
            'kelas' => 'required|string|max:255',
            'visi' => 'nullable|string|max:1000',
            'misi' => 'nullable|string|max:1000',
            'picture' => 'required|image|mimes:jpeg,png,jpg,svg,gif|max:2048',
            'election_id' => 'required|exists:elections,id',
        ]);

        $picturePath = null;
        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('uploads', $filename, 'public');
            $picturePath = 'storage/' . $path;
        }

        Calon::create([
            ...$validated,
            'picture' => $picturePath,
            'user_id' => Auth::id()
        ]);

        return redirect()->route('dashboard.calon.index')->with('success', 'Calon created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Calon $calon)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Calon $calon)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Calon $calon)
    {
        // Debug: Log semua data yang diterima
        Log::info('Update request data:', $request->all());
        Log::info('Files received:', $request->allFiles());
        
        // Pastikan user hanya bisa update calon miliknya sendiri
        if ($calon->user_id !== Auth::id()) {
            return redirect()->route('dashboard.calon.index')->with('error', 'Unauthorized access');
        }

        // Validasi dengan rules yang lebih fleksibel untuk update
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:calon,nama,' . $calon->id,
            'gender' => 'required|string|in:male,female',
            'status' => 'required|string',
            'kelas' => 'required|string|max:255',
            'visi' => 'nullable|string|max:1000',
            'misi' => 'nullable|string|max:1000',
            'picture' => 'nullable|image|mimes:jpeg,png,jpg,svg,gif|max:2048',
            'election_id' => 'required|exists:elections,id',
        ]);

        Log::info('Validated data:', $validated);

        // Siapkan data untuk update
        $updateData = [
            'nama' => $validated['nama'],
            'gender' => $validated['gender'],
            'status' => $validated['status'],
            'kelas' => $validated['kelas'],
            'visi' => $validated['visi'] ?? '',
            'misi' => $validated['misi'] ?? '',
            'election_id' => $validated['election_id'],
        ];
        
        // Handle picture upload jika ada file baru
        if ($request->hasFile('picture')) {
            Log::info('New picture file detected');
            
            // Hapus gambar lama jika ada
            if ($calon->picture && Storage::disk('public')->exists(str_replace('storage/', '', $calon->picture))) {
                Storage::disk('public')->delete(str_replace('storage/', '', $calon->picture));
                Log::info('Old picture deleted: ' . $calon->picture);
            }
            
            // Upload gambar baru
            $file = $request->file('picture');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('uploads', $filename, 'public');
            $updateData['picture'] = 'storage/' . $path;
            
            Log::info('New picture uploaded: ' . $updateData['picture']);
        } else {
            Log::info('No new picture file, keeping existing picture');
            // Jika tidak ada file baru, pertahankan gambar yang sudah ada
            // Tidak perlu menambahkan 'picture' ke updateData agar tidak mengganti dengan null
        }

        Log::info('Final update data:', $updateData);

        // Update data
        $calon->update($updateData);

        Log::info('Calon updated successfully');

        return redirect()->route('dashboard.calon.index')->with('success', 'Calon updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $calon = Calon::findOrFail($id);
        
        // Pastikan user hanya bisa delete calon miliknya sendiri
        if ($calon->user_id !== Auth::id()) {
            return redirect()->route('dashboard.calon.index')->with('error', 'Unauthorized access');
        }

        // Hapus gambar jika ada
        if ($calon->picture && Storage::disk('public')->exists(str_replace('storage/', '', $calon->picture))) {
            Storage::disk('public')->delete(str_replace('storage/', '', $calon->picture));
        }

        $calon->delete();
        return redirect()->route('dashboard.calon.index')->with('success', 'Data deleted successfully!');
    }
}