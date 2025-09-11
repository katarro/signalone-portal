<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CaptivePortal extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'auth_method',
        'login_page_title',
        'welcome_message',
        'redirect_url',
        'auto_redirect',
        'require_terms',
        'terms_content',
        'terms_url',
        'session_timeout',
        'idle_timeout',
        'bandwidth_limit_down',
        'bandwidth_limit_up',
        'social_auth_config',
        'sms_provider',
        'sms_config',
        'logo_url',
        'background_color',
        'primary_color',
        'custom_css',
        'enable_logging',
        'log_failed_attempts',
        'is_active',
        // Campos adicionales
        'listening_port',
        'max_clients',
        'force_https',
        'enable_mac_auth',
        'block_social_media',
        'enable_bandwidth_log',
        'enable_device_fingerprint',
        'log_retention_days',
        'max_login_attempts',
        'lockout_duration',
        'firewall_rules',
        'enable_dos_protection',
        'enable_ssl_enforcement',
        'webhook_url',
        'radius_server',
        'radius_secret',
        'api_integrations',
        'enable_analytics',
        'enable_push_notifications',
        'enable_api_access',
    ];

    protected $casts = [
        'auto_redirect' => 'boolean',
        'require_terms' => 'boolean',
        'enable_logging' => 'boolean',
        'log_failed_attempts' => 'boolean',
        'is_active' => 'boolean',
        'social_auth_config' => 'array',
        'sms_config' => 'array',
        'session_timeout' => 'integer',
        'idle_timeout' => 'integer',
        'bandwidth_limit_down' => 'integer',
        'bandwidth_limit_up' => 'integer',
        // Campos adicionales
        'listening_port' => 'integer',
        'max_clients' => 'integer',
        'force_https' => 'boolean',
        'enable_mac_auth' => 'boolean',
        'block_social_media' => 'boolean',
        'enable_bandwidth_log' => 'boolean',
        'enable_device_fingerprint' => 'boolean',
        'log_retention_days' => 'integer',
        'max_login_attempts' => 'integer',
        'lockout_duration' => 'integer',
        'enable_dos_protection' => 'boolean',
        'enable_ssl_enforcement' => 'boolean',
        'enable_analytics' => 'boolean',
        'enable_push_notifications' => 'boolean',
        'enable_api_access' => 'boolean',
    ];

    /**
     * Obtiene las VLANs asociadas a este portal cautivo
     */
    public function vlans(): HasMany
    {
        return $this->hasMany(Vlan::class);
    }

    /**
     * Obtiene las sesiones de clientes asociadas a este portal
     */
    public function clientSessions(): HasMany
    {
        return $this->hasMany(ClientSession::class);
    }

    /**
     * Obtiene las sesiones activas
     */
    public function activeSessions(): HasMany
    {
        return $this->clientSessions()->where('status', 'active');
    }

    /**
     * Scope para portales activos
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Verifica si tiene autenticación social configurada
     */
    public function hasSocialAuth(): bool
    {
        return $this->auth_method === 'social' && !empty($this->social_auth_config);
    }

    /**
     * Verifica si tiene autenticación SMS configurada
     */
    public function hasSmsAuth(): bool
    {
        return $this->auth_method === 'sms' && !empty($this->sms_provider);
    }

    /**
     * Obtiene la configuración de límites de ancho de banda
     */
    public function getBandwidthLimits(): array
    {
        return [
            'download' => $this->bandwidth_limit_down,
            'upload' => $this->bandwidth_limit_up,
        ];
    }

    /**
     * Verifica si tiene límites de ancho de banda configurados
     */
    public function hasBandwidthLimits(): bool
    {
        return !is_null($this->bandwidth_limit_down) || !is_null($this->bandwidth_limit_up);
    }
}
