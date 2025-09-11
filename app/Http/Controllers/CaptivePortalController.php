<?php

namespace App\Http\Controllers;

use App\Models\CaptivePortal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

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
        // Log para debugging
        \Log::info('CaptivePortal Update Request', [
            'portal_id' => $captivePortal->id,
            'request_data' => $request->all(),
            'request_method' => $request->method(),
            'request_url' => $request->url(),
        ]);

        try {
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
                'bandwidth_limit_down' => 'nullable|integer|min:0',
                'bandwidth_limit_up' => 'nullable|integer|min:0',
                'social_auth_config' => 'nullable|array',
                'sms_provider' => 'nullable|string',
                'sms_config' => 'nullable|array',
                'logo_url' => 'nullable|string',
                'background_color' => ['required', 'string', 'regex:/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/'],
                'primary_color' => ['required', 'string', 'regex:/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/'],
                'custom_css' => 'nullable|string',
                'enable_logging' => 'boolean',
                'log_failed_attempts' => 'boolean',
                'is_active' => 'boolean',
                // Campos adicionales del formulario
                'listening_port' => 'nullable|integer|min:1|max:65535',
                'max_clients' => 'nullable|integer|min:0',
                'force_https' => 'boolean',
                'enable_mac_auth' => 'boolean',
                'block_social_media' => 'boolean',
                'enable_bandwidth_log' => 'boolean',
                'enable_device_fingerprint' => 'boolean',
                'log_retention_days' => 'nullable|integer|min:1|max:365',
                'max_login_attempts' => 'nullable|integer|min:1|max:10',
                'lockout_duration' => 'nullable|integer|min:1|max:1440',
                'firewall_rules' => 'nullable|string',
                'enable_dos_protection' => 'boolean',
                'enable_ssl_enforcement' => 'boolean',
                'webhook_url' => 'nullable|url',
                'radius_server' => 'nullable|string',
                'radius_secret' => 'nullable|string',
                'api_integrations' => 'nullable|string',
                'enable_analytics' => 'boolean',
                'enable_push_notifications' => 'boolean',
                'enable_api_access' => 'boolean',
            ]);

            \Log::info('CaptivePortal Validation Successful', [
                'portal_id' => $captivePortal->id,
                'validated_data' => $validated,
            ]);

            // Transformar datos especiales: convertir nulls a 0 para ciertos campos numéricos
            if (is_null($validated['bandwidth_limit_down'])) {
                $validated['bandwidth_limit_down'] = 0;
            }
            if (is_null($validated['bandwidth_limit_up'])) {
                $validated['bandwidth_limit_up'] = 0;
            }
            if (is_null($validated['max_clients'])) {
                $validated['max_clients'] = 0;
            }

            \Log::info('CaptivePortal Data After Transformation', [
                'portal_id' => $captivePortal->id,
                'final_data' => $validated,
            ]);

            // Guardar los datos originales para comparar
            $originalData = $captivePortal->toArray();

            $captivePortal->update($validated);

            // Log de los cambios realizados
            \Log::info('CaptivePortal Updated Successfully', [
                'portal_id' => $captivePortal->id,
                'original_data' => $originalData,
                'new_data' => $captivePortal->fresh()->toArray(),
                'changes' => $captivePortal->getChanges(),
            ]);

            return redirect()->route('captive-portals.index')
                ->with('message', 'Portal cautivo actualizado exitosamente.');
                
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('CaptivePortal Validation Failed', [
                'portal_id' => $captivePortal->id,
                'errors' => $e->errors(),
                'request_data' => $request->all(),
            ]);
            
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
                
        } catch (\Exception $e) {
            \Log::error('CaptivePortal Update Exception', [
                'portal_id' => $captivePortal->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all(),
            ]);
            
            return redirect()->back()
                ->withErrors(['error' => 'Error al actualizar el portal cautivo: ' . $e->getMessage()])
                ->withInput();
        }
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

    /**
     * Upload logo image for captive portal
     */
    public function uploadLogo(Request $request): JsonResponse
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        try {
            $file = $request->file('logo');
            $filename = time() . '_' . $file->getClientOriginalName();
            
            // Guardar en el directorio public/storage/captive-portals/logos
            $path = $file->storeAs('captive-portals/logos', $filename, 'public');
            
            // Generar URL completa
            $url = Storage::url($path);
            
            return response()->json([
                'success' => true,
                'url' => $url,
                'message' => 'Logo subido exitosamente'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al subir el logo: ' . $e->getMessage()
            ], 500);
        }
    }
}
