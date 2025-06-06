<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
             $perPage = $request->input('perPage', 10);
        $search = $request->input('search');
        $filter = $request->input('filter');

    $query = User::query()->where('team_id', Auth::id())->orderBy('created_at', 'desc');

    if ($search) {
        $query->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
        }

        if ($filter) {
            $query->where('status', $filter);
        }

        $users = $query->paginate($perPage);

        return Inertia::render('dashboard/users', [
            'users' => $users->items(),
            'pagination' => [
                'currentPage' => $users->currentPage(),
                'perPage' => $users->perPage(),
                'lastPage' => $users->lastPage(),
                'total' => $users->total(),
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
        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            
            'password' => ['required', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
             'team_id' => Auth::id()
        ]);

      

      return redirect()->route('dashboard.users.index')->with('success', 'Created successfully');
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
    public function update(Request $request, User $user)
    {



                $validated =  $request->validate([
            'name' => 'required|string|max:255'  . $user->id,
            'role' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|' ,
           
        ]);



    $user->update([
            ...$validated,
               'team_id' => Auth::id()
    ]);

  
    return redirect()->route('dashboard.users.index')->with('success', 'users updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
 public function destroy(string $id)
    {
   
     $user = User::findOrFail($id);

    

        $user->delete();


        return redirect()->route('dashboard.users.index')->with('success', 'Data deleted successfully!');
    }
}
