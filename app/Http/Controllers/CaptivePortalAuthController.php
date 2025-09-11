<?php

namespace App\Http\Controllers;

use App\Models\CaptivePortal;
use App\Models\ClientSession;
use App\Models\Vlan;
use App\Models\Ap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Inertia\Inertia;

class CaptivePortalAuthController extends Controller
{
    /**
     * Mostrar página de autenticación del portal cautivo
     */
    public function showAuth(Request $request, $portalId)
    {
        $portal = CaptivePortal::where('is_active', true)
                              ->findOrFail($portalId);

        // Obtener información del cliente
        $clientInfo = $this->getClientInfo($request);
        
        // Verificar si ya existe una sesión activa para esta MAC
        $existingSession = ClientSession::where('mac_address', $clientInfo['mac_address'])
                                       ->where('captive_portal_id', $portal->id)
                                       ->where('status', 'active')
                                       ->first();

        if ($existingSession && !$existingSession->hasExpired()) {
            // Actualizar última actividad y redirigir
            $existingSession->updateLastActivity();
            return $this->redirectAfterAuth($portal, $existingSession);
        }

        // Si la sesión existe pero ha expirado, marcarla como expirada
        if ($existingSession && $existingSession->hasExpired()) {
            $existingSession->expire();
        }

        return Inertia::render('captive-portal/auth', [
            'portal' => $portal,
            'clientInfo' => $clientInfo,
        ]);
    }

    /**
     * Procesar autenticación del portal cautivo
     */
    public function authenticate(Request $request, $portalId)
    {
        $portal = CaptivePortal::where('is_active', true)
                              ->findOrFail($portalId);

        $clientInfo = $this->getClientInfo($request);

        // Validar según el método de autenticación
        $authData = $this->validateAuthentication($request, $portal);

        if (!$authData['success']) {
            return back()->withErrors(['auth' => $authData['message']]);
        }

        // Crear nueva sesión
        $session = $this->createClientSession($portal, $clientInfo, $authData);

        Log::info('Client authenticated to captive portal', [
            'portal_id' => $portal->id,
            'session_id' => $session->session_id,
            'mac_address' => $clientInfo['mac_address'],
            'ip_address' => $clientInfo['ip_address'],
            'auth_method' => $portal->auth_method,
        ]);

        return $this->redirectAfterAuth($portal, $session);
    }

    /**
     * Logout del portal cautivo
     */
    public function logout(Request $request, $sessionId)
    {
        $session = ClientSession::where('session_id', $sessionId)
                               ->where('status', 'active')
                               ->first();

        if ($session) {
            $session->logout();
            
            Log::info('Client logged out from captive portal', [
                'session_id' => $session->session_id,
                'portal_id' => $session->captive_portal_id,
                'duration' => $session->session_duration,
            ]);
        }

        return redirect()->route('captive-portal.goodbye')
                        ->with('message', 'Has cerrado sesión correctamente.');
    }

    /**
     * Página de despedida
     */
    public function goodbye()
    {
        return Inertia::render('captive-portal/goodbye');
    }

    /**
     * Actualizar última actividad de la sesión
     */
    public function heartbeat(Request $request)
    {
        $sessionId = $request->get('session_id');
        
        if ($sessionId) {
            $session = ClientSession::where('session_id', $sessionId)
                                   ->where('status', 'active')
                                   ->first();
            
            if ($session && !$session->hasExpired()) {
                $session->updateLastActivity();
                
                // Actualizar estadísticas de uso si se proporcionan
                if ($request->has(['bytes_down', 'bytes_up'])) {
                    $session->update([
                        'bytes_downloaded' => $request->get('bytes_down', 0),
                        'bytes_uploaded' => $request->get('bytes_up', 0),
                    ]);
                }
                
                return response()->json(['status' => 'ok']);
            }
        }
        
        return response()->json(['status' => 'error'], 404);
    }

    /**
     * Obtener información del cliente
     */
    private function getClientInfo(Request $request): array
    {
        return [
            'mac_address' => $request->get('mac', $this->getMacFromRequest($request)),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'device_name' => $this->getDeviceName($request->userAgent()),
        ];
    }

    /**
     * Validar autenticación según el método configurado
     */
    private function validateAuthentication(Request $request, CaptivePortal $portal): array
    {
        switch ($portal->auth_method) {
            case 'terms_only':
                if (!$request->has('accept_terms')) {
                    return ['success' => false, 'message' => 'Debes aceptar los términos y condiciones.'];
                }
                return ['success' => true, 'data' => ['accepted_terms' => true]];

            case 'user_password':
                $request->validate([
                    'username' => 'required|string',
                    'password' => 'required|string',
                ]);
                
                // Aquí implementarías la validación real del usuario/password
                // Por ahora, aceptamos cualquier combinación
                return [
                    'success' => true, 
                    'data' => [
                        'username' => $request->get('username'),
                        'authenticated_at' => Carbon::now(),
                    ]
                ];

            case 'voucher':
                $request->validate(['voucher_code' => 'required|string']);
                
                // Aquí validarías el voucher
                $voucherCode = $request->get('voucher_code');
                return [
                    'success' => true, 
                    'data' => ['voucher_code' => $voucherCode]
                ];

            case 'social':
                // Implementar autenticación social
                return ['success' => true, 'data' => ['social_provider' => 'guest']];

            case 'sms':
                // Implementar autenticación SMS
                return ['success' => true, 'data' => ['phone_verified' => true]];

            case 'guest':
            default:
                return ['success' => true, 'data' => ['guest_access' => true]];
        }
    }

    /**
     * Crear nueva sesión de cliente
     */
    private function createClientSession(CaptivePortal $portal, array $clientInfo, array $authData): ClientSession
    {
        // Determinar VLAN y AP
        $vlan = $portal->vlans()->first(); // Simplificado, podrías tener lógica más compleja
        $ap = null; // Aquí podrías determinar el AP basado en información de red

        $sessionData = [
            'captive_portal_id' => $portal->id,
            'vlan_id' => $vlan?->id,
            'ap_id' => $ap?->id,
            'session_id' => ClientSession::generateSessionId(),
            'mac_address' => $clientInfo['mac_address'],
            'ip_address' => $clientInfo['ip_address'],
            'username' => $authData['data']['username'] ?? null,
            'device_name' => $clientInfo['device_name'],
            'user_agent' => $clientInfo['user_agent'],
            'auth_method' => $portal->auth_method,
            'auth_data' => $authData['data'],
            'login_time' => Carbon::now(),
            'last_activity' => Carbon::now(),
            'status' => 'active',
            'zona_name' => $vlan?->zona?->name,
            'ap_name' => $ap?->name,
            'ssid' => 'WiFi-Portal', // Podrías obtener esto de la configuración
        ];

        return ClientSession::create($sessionData);
    }

    /**
     * Redirigir después de la autenticación
     */
    private function redirectAfterAuth(CaptivePortal $portal, ClientSession $session)
    {
        if ($portal->auto_redirect && $portal->redirect_url) {
            return redirect($portal->redirect_url);
        }

        return Inertia::render('captive-portal/welcome', [
            'portal' => $portal,
            'session' => $session,
        ]);
    }

    /**
     * Obtener MAC address del request (simplificado)
     */
    private function getMacFromRequest(Request $request): string
    {
        // En un entorno real, esto vendría del router/AP
        // Por ahora generamos una MAC ficticia basada en la IP
        $ip = $request->ip();
        return sprintf("02:00:%02x:%02x:%02x:%02x", 
                      ...array_map('intval', explode('.', $ip)));
    }

    /**
     * Determinar tipo de dispositivo por User Agent (simplificado)
     */
    private function getDeviceName(string $userAgent): string
    {
        if (strpos($userAgent, 'Mobile') !== false) {
            return 'Dispositivo Móvil';
        } elseif (strpos($userAgent, 'Tablet') !== false) {
            return 'Tablet';
        } else {
            return 'Computadora';
        }
    }
}
