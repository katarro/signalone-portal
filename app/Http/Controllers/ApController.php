<?php

namespace App\Http\Controllers;

use App\Models\Ap;
use App\Models\Vlan;
use App\Models\Zona;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;

class ApController extends Controller
{
    /**
     * Mostrar lista de APs
     */
    public function index(): Response
    {
        $aps = Ap::with(['vlan', 'zona'])
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('aps/index', [
            'aps' => $aps,
        ]);
    }

    /**
     * Mostrar formulario de creación de AP
     */
    public function create(): Response
    {
        $vlans = Vlan::active()->with('zona')->get();
        $zonas = Zona::active()->get();

        return Inertia::render('create-ap', [
            'vlans' => $vlans,
            'zonas' => $zonas,
        ]);
    }

    /**
     * Guardar nuevo AP
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'ssid' => 'required|string|max:32',
            'ip_address' => [
                'required', 
                'ip', 
                Rule::unique('aps', 'ip_address')
            ],
            'mac_address' => [
                'required',
                'regex:/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/',
                Rule::unique('aps', 'mac_address')
            ],
            'description' => 'nullable|string',
            'vlan_id' => 'nullable|exists:vlans,id',
            'zona_id' => 'nullable|exists:zonas,id',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        // Establecer valores por defecto
        $validated['status'] = 'offline';
        $validated['current_clients'] = 0;
        $validated['frequency_band'] = 'dual';
        $validated['security_type'] = 'WPA3';
        $validated['max_clients'] = 50;
        $validated['is_active'] = $validated['is_active'] ?? true;

        Ap::create($validated);

        return redirect()->route('aps.index')
            ->with('success', 'Access Point creado exitosamente.');
    }

    /**
     * Mostrar AP específico
     */
    public function show(Ap $ap): Response
    {
        $ap->load(['vlan.zona', 'zona']);

        return Inertia::render('aps/show', [
            'ap' => $ap,
        ]);
    }

    /**
     * Mostrar formulario de edición
     */
    public function edit(Ap $ap): Response
    {
        $vlans = Vlan::active()->with('zona')->get();
        $zonas = Zona::active()->get();

        return Inertia::render('aps/edit', [
            'ap' => $ap,
            'vlans' => $vlans,
            'zonas' => $zonas,
        ]);
    }

    /**
     * Actualizar AP
     */
    public function update(Request $request, Ap $ap): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'ssid' => 'required|string|max:32',
            'ip_address' => [
                'required', 
                'ip', 
                Rule::unique('aps', 'ip_address')->ignore($ap->id)
            ],
            'mac_address' => [
                'required',
                'regex:/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/',
                Rule::unique('aps', 'mac_address')->ignore($ap->id)
            ],
            'description' => 'nullable|string',
            'vlan_id' => 'nullable|exists:vlans,id',
            'zona_id' => 'nullable|exists:zonas,id',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $ap->update($validated);

        return redirect()->route('aps.index')
            ->with('success', 'Access Point actualizado exitosamente.');
    }

    /**
     * Eliminar AP
     */
    public function destroy(Ap $ap): RedirectResponse
    {
        $ap->delete();

        return redirect()->route('aps.index')
            ->with('success', 'Access Point eliminado exitosamente.');
    }

    /**
     * Realizar ping manual a un AP
     */
    public function ping(Ap $ap): RedirectResponse
    {
        $startTime = microtime(true);
        
        // Ejecutar ping usando exec
        $output = [];
        $return_var = 0;
        exec("ping -c 1 -W 3 {$ap->ip_address}", $output, $return_var);
        
        $endTime = microtime(true);
        $responseTime = ($endTime - $startTime) * 1000; // Convertir a milisegundos
        
        $success = $return_var === 0;
        
        $ap->updatePingStatus($success, $success ? round($responseTime) : null);

        $message = $success 
            ? "Ping exitoso: {$ap->ip_address} respondió en " . round($responseTime) . "ms"
            : "Ping fallido: {$ap->ip_address} no responde";

        return back()->with($success ? 'success' : 'error', $message);
    }

    /**
     * Alternar estado activo/inactivo
     */
    public function toggleStatus(Ap $ap): RedirectResponse
    {
        $ap->update(['is_active' => !$ap->is_active]);

        $status = $ap->is_active ? 'activado' : 'desactivado';
        
        return back()->with('success', "AP {$status} exitosamente.");
    }
}
