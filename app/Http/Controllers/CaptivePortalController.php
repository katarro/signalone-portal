<?php

namespace App\Http\Controllers;

use App\Models\CaptivePortal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CaptivePortalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $captivePortals = CaptivePortal::with('vlans')
            ->orderBy('name')
            ->paginate(10);

        return Inertia::render('CaptivePortals/Index', [
            'captivePortals' => $captivePortals,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('CaptivePortals/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:captive_portals',
            'description' => 'nullable|string',
            'auth_method' => 'required|in:user_password,voucher,social,sms,terms_only',
            'login_page_title' => 'required|string|max:255',
            'welcome_message' => 'nullable|string',
            'redirect_url' => 'nullable|url',
            'auto_redirect' => 'boolean',
            'require_terms' => 'boolean',
            'terms_content' => 'nullable|string',
            'terms_url' => 'nullable|url',
            'session_timeout' => 'required|integer|min:1|max:1440',
            'idle_timeout' => 'required|integer|min:1|max:120',
            'bandwidth_limit_down' => 'nullable|integer|min:1',
            'bandwidth_limit_up' => 'nullable|integer|min:1',
            'social_auth_config' => 'nullable|array',
            'sms_provider' => 'nullable|string',
            'sms_config' => 'nullable|array',
            'logo_url' => 'nullable|url',
            'background_color' => ['required', 'string', 'regex:/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/'],
            'primary_color' => ['required', 'string', 'regex:/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/'],
            'custom_css' => 'nullable|string',
            'enable_logging' => 'boolean',
            'log_failed_attempts' => 'boolean',
            'is_active' => 'boolean',
        ]);

        CaptivePortal::create($validated);

        return redirect()->route('captive-portals.index')
            ->with('message', 'Portal cautivo creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CaptivePortal $captivePortal): Response
    {
        $captivePortal->load('vlans.zona');

        return Inertia::render('CaptivePortals/Show', [
            'captivePortal' => $captivePortal,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CaptivePortal $captivePortal): Response
    {
        return Inertia::render('CaptivePortals/Edit', [
            'captivePortal' => $captivePortal,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CaptivePortal $captivePortal): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:captive_portals,name,' . $captivePortal->id,
            'description' => 'nullable|string',
            'auth_method' => 'required|in:user_password,voucher,social,sms,terms_only',
            'login_page_title' => 'required|string|max:255',
            'welcome_message' => 'nullable|string',
            'redirect_url' => 'nullable|url',
            'auto_redirect' => 'boolean',
            'require_terms' => 'boolean',
            'terms_content' => 'nullable|string',
            'terms_url' => 'nullable|url',
            'session_timeout' => 'required|integer|min:1|max:1440',
            'idle_timeout' => 'required|integer|min:1|max:120',
            'bandwidth_limit_down' => 'nullable|integer|min:1',
            'bandwidth_limit_up' => 'nullable|integer|min:1',
            'social_auth_config' => 'nullable|array',
            'sms_provider' => 'nullable|string',
            'sms_config' => 'nullable|array',
            'logo_url' => 'nullable|url',
            'background_color' => ['required', 'string', 'regex:/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/'],
            'primary_color' => ['required', 'string', 'regex:/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/'],
            'custom_css' => 'nullable|string',
            'enable_logging' => 'boolean',
            'log_failed_attempts' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $captivePortal->update($validated);

        return redirect()->route('captive-portals.index')
            ->with('message', 'Portal cautivo actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CaptivePortal $captivePortal): RedirectResponse
    {
        // Verificar si hay VLANs asociadas
        if ($captivePortal->vlans()->count() > 0) {
            return redirect()->back()
                ->withErrors(['error' => 'No se puede eliminar el portal cautivo porque tiene VLANs asociadas.']);
        }

        $captivePortal->delete();

        return redirect()->route('captive-portals.index')
            ->with('message', 'Portal cautivo eliminado exitosamente.');
    }
}
