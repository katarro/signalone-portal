<?php

namespace App\Http\Controllers;

use App\Models\Zona;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ZonaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $zonas = Zona::active()
            ->withCount('vlans')
            ->orderBy('name')
            ->paginate(10);

        return Inertia::render('zonas/index', [
            'zonas' => $zonas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('create-zona');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:zonas,name',
            'description' => 'nullable|string|max:500',
            'location' => 'nullable|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'contact_phone' => 'nullable|string|max:20',
            'contact_email' => 'nullable|email|max:255',
            'notes' => 'nullable|string|max:1000',
        ], [
            'name.required' => 'El nombre de la zona es obligatorio.',
            'name.unique' => 'Ya existe una zona con este nombre.',
            'name.max' => 'El nombre no puede tener más de 255 caracteres.',
            'description.max' => 'La descripción no puede tener más de 500 caracteres.',
            'location.max' => 'La ubicación no puede tener más de 255 caracteres.',
            'contact_person.max' => 'El nombre del contacto no puede tener más de 255 caracteres.',
            'contact_phone.max' => 'El teléfono no puede tener más de 20 caracteres.',
            'contact_email.email' => 'El email debe tener un formato válido.',
            'contact_email.max' => 'El email no puede tener más de 255 caracteres.',
            'notes.max' => 'Las notas no pueden tener más de 1000 caracteres.',
        ]);

        Zona::create($validated);

        return redirect()->route('zonas.index')
            ->with('success', 'Zona creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Zona $zona)
    {
        return Inertia::render('zonas/show', [
            'zona' => $zona->load('vlans')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Zona $zona = null)
    {
        // Si se llama desde la ruta edit-zona con query parameter
        if ($request->has('id') && !$zona) {
            $zona = Zona::findOrFail($request->get('id'));
        }
        
        // Si se llama desde resource route
        if (!$zona) {
            abort(404);
        }

        return Inertia::render('edit-zona', [
            'zona' => $zona->loadCount('vlans')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Zona $zona)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:zonas,name,' . $zona->id,
            'description' => 'nullable|string|max:500',
            'location' => 'nullable|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'contact_phone' => 'nullable|string|max:20',
            'contact_email' => 'nullable|email|max:255',
            'notes' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
        ], [
            'name.required' => 'El nombre de la zona es obligatorio.',
            'name.unique' => 'Ya existe una zona con este nombre.',
            'name.max' => 'El nombre no puede tener más de 255 caracteres.',
            'description.max' => 'La descripción no puede tener más de 500 caracteres.',
            'location.max' => 'La ubicación no puede tener más de 255 caracteres.',
            'contact_person.max' => 'El nombre del contacto no puede tener más de 255 caracteres.',
            'contact_phone.max' => 'El teléfono no puede tener más de 20 caracteres.',
            'contact_email.email' => 'El email debe tener un formato válido.',
            'contact_email.max' => 'El email no puede tener más de 255 caracteres.',
            'notes.max' => 'Las notas no pueden tener más de 1000 caracteres.',
        ]);

        $zona->update($validated);

        return redirect()->route('zonas.index')
            ->with('success', 'Zona actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zona $zona)
    {
        // Verificar si la zona tiene VLANs asociadas
        if ($zona->vlans()->count() > 0) {
            return back()->with('error', 'No se puede eliminar la zona porque tiene VLANs asociadas.');
        }

        $zona->delete();

        return redirect()->route('zonas.index')
            ->with('success', 'Zona eliminada exitosamente.');
    }
}
