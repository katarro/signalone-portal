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
    ];

    /**
     * Obtiene las VLANs asociadas a este portal cautivo
     */
    public function vlans(): HasMany
    {
        return $this->hasMany(Vlan::class);
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
