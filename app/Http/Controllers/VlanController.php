<?php

namespace App\Http\Controllers;

use App\Models\Vlan;
use App\Models\Zona;
use App\Models\CaptivePortal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class VlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vlans = Vlan::with('zona')
            ->orderBy('vlan_id')
            ->paginate(15);

        return Inertia::render('vlans/index', [
            'vlans' => $vlans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $zonas = Zona::active()->orderBy('name')->get();
        $captivePortals = CaptivePortal::active()->orderBy('name')->get();

        return Inertia::render('create-vlan', [
            'zonas' => $zonas,
            'captivePortals' => $captivePortals,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Primero validamos los datos básicos de la VLAN
        $validated = $request->validate([
            'vlan_id' => ['required', 'integer', 'min:1', 'max:4094', 'unique:vlans,vlan_id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'subnet' => ['required', 'string', 'regex:/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/[0-9]{1,2}$/'],
            'gateway' => ['required', 'ip'],
            'dns_primary' => ['required', 'ip'],
            'dns_secondary' => ['nullable', 'ip'],
            'dhcp_enabled' => ['required', 'boolean'],
            'dhcp_start' => ['nullable', 'ip', 'required_if:dhcp_enabled,true'],
            'dhcp_end' => ['nullable', 'ip', 'required_if:dhcp_enabled,true'],
            'zona_id' => ['required', 'exists:zonas,id'],
            'priority' => ['required', Rule::in(['low', 'normal', 'high', 'critical'])],
            'mtu' => ['required', 'integer', 'min:68', 'max:9000'],
            // Campos del portal cautivo
            'captive_portal_option' => ['required', 'in:none,existing,new'],
            'captive_portal_id' => ['nullable', 'exists:captive_portals,id', 'required_if:captive_portal_option,existing'],
            // Campos para crear nuevo portal cautivo
            'new_portal_name' => ['nullable', 'string', 'max:255', 'required_if:captive_portal_option,new'],
            'new_portal_auth_method' => ['nullable', 'in:user_password,voucher,social,sms,terms_only', 'required_if:captive_portal_option,new'],
        ], [
            'vlan_id.unique' => 'Este VLAN ID ya está en uso.',
            'vlan_id.required' => 'El VLAN ID es obligatorio.',
            'vlan_id.min' => 'El VLAN ID debe ser mayor a 0.',
            'vlan_id.max' => 'El VLAN ID debe ser menor a 4095.',
            'name.required' => 'El nombre es obligatorio.',
            'subnet.required' => 'La subred es obligatoria.',
            'subnet.regex' => 'La subred debe tener formato CIDR válido (ej: 192.168.1.0/24).',
            'gateway.required' => 'El gateway es obligatorio.',
            'gateway.ip' => 'El gateway debe ser una IP válida.',
            'dns_primary.required' => 'El DNS primario es obligatorio.',
            'dns_primary.ip' => 'El DNS primario debe ser una IP válida.',
            'dns_secondary.ip' => 'El DNS secundario debe ser una IP válida.',
            'dhcp_start.required_if' => 'La IP de inicio DHCP es obligatoria cuando DHCP está habilitado.',
            'dhcp_end.required_if' => 'La IP final DHCP es obligatoria cuando DHCP está habilitado.',
            'zona_id.required' => 'Debe seleccionar una zona.',
            'zona_id.exists' => 'La zona seleccionada no existe.',
            'captive_portal_id.required_if' => 'Debe seleccionar un portal cautivo existente.',
            'new_portal_name.required_if' => 'El nombre del portal cautivo es obligatorio.',
            'new_portal_auth_method.required_if' => 'El método de autenticación es obligatorio.',
        ]);

        // Manejar la creación del portal cautivo si es necesario
        $captivePortalId = null;
        
        if ($validated['captive_portal_option'] === 'existing') {
            $captivePortalId = $validated['captive_portal_id'];
        } elseif ($validated['captive_portal_option'] === 'new') {
            // Crear nuevo portal cautivo con configuración básica
            $captivePortal = CaptivePortal::create([
                'name' => $validated['new_portal_name'],
                'description' => 'Portal creado automáticamente para VLAN: ' . $validated['name'],
                'auth_method' => $validated['new_portal_auth_method'],
                'login_page_title' => 'Acceso WiFi - ' . $validated['new_portal_name'],
                'auto_redirect' => true,
                'require_terms' => true,
                'session_timeout' => 480,
                'idle_timeout' => 30,
                'background_color' => '#ffffff',
                'primary_color' => '#007bff',
                'enable_logging' => true,
                'log_failed_attempts' => true,
                'is_active' => true,
            ]);
            $captivePortalId = $captivePortal->id;
        }

        // Agregar el ID del portal cautivo a los datos validados
        $validated['captive_portal_id'] = $captivePortalId;

        // Remover campos que no pertenecen a la tabla vlans
        unset($validated['captive_portal_option'], $validated['new_portal_name'], $validated['new_portal_auth_method']);

        $vlan = Vlan::create($validated);

        return redirect()->route('vlans.index')->with('success', 'VLAN creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Vlan $vlan)
    {
        $vlan->load('zona');

        return Inertia::render('vlans/show', [
            'vlan' => $vlan,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vlan $vlan)
    {
        $zonas = Zona::active()->orderBy('name')->get();
        $captivePortals = CaptivePortal::active()->orderBy('name')->get();

        return Inertia::render('vlans/edit', [
            'vlan' => $vlan->load('captivePortal'),
            'zonas' => $zonas,
            'captivePortals' => $captivePortals,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vlan $vlan)
    {
        $validated = $request->validate([
            'vlan_id' => ['required', 'integer', 'min:1', 'max:4094', Rule::unique('vlans', 'vlan_id')->ignore($vlan)],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'subnet' => ['required', 'string', 'regex:/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/[0-9]{1,2}$/'],
            'gateway' => ['required', 'ip'],
            'dns_primary' => ['required', 'ip'],
            'dns_secondary' => ['nullable', 'ip'],
            'dhcp_enabled' => ['required', 'boolean'],
            'dhcp_start' => ['nullable', 'ip', 'required_if:dhcp_enabled,true'],
            'dhcp_end' => ['nullable', 'ip', 'required_if:dhcp_enabled,true'],
            'zona_id' => ['required', 'exists:zonas,id'],
            'priority' => ['required', Rule::in(['low', 'normal', 'high', 'critical'])],
            'mtu' => ['required', 'integer', 'min:68', 'max:9000'],
        ]);

        $vlan->update($validated);

        return redirect()->route('vlans.index')->with('success', 'VLAN actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vlan $vlan)
    {
        $vlan->delete();

        return redirect()->route('vlans.index')->with('success', 'VLAN eliminada exitosamente.');
    }
}
