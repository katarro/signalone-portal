<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vlan extends Model
{
    protected $fillable = [
        'vlan_id',
        'name',
        'description',
        'subnet',
        'gateway',
        'dns_primary',
        'dns_secondary',
        'dhcp_enabled',
        'dhcp_start',
        'dhcp_end',
        'zona_id',
        'captive_portal_id',
        'priority',
        'mtu',
        'is_active',
        'bandwidth_limit',
    ];

    protected $casts = [
        'dhcp_enabled' => 'boolean',
        'is_active' => 'boolean',
        'vlan_id' => 'integer',
        'mtu' => 'integer',
    ];

    /**
     * Obtener la zona a la que pertenece esta VLAN
     */
    public function zona(): BelongsTo
    {
        return $this->belongsTo(Zona::class);
    }

    /**
     * Obtener los APs que pertenecen a esta VLAN
     */
    public function aps(): HasMany
    {
        return $this->hasMany(Ap::class);
    }

    /**
     * Obtener el portal cautivo asociado a esta VLAN
     */
    public function captivePortal(): BelongsTo
    {
        return $this->belongsTo(CaptivePortal::class);
    }

    /**
     * Obtener las sesiones de clientes asociadas a esta VLAN
     */
    public function clientSessions(): HasMany
    {
        return $this->hasMany(ClientSession::class);
    }

    /**
     * Scope para VLANs activas
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope para buscar por VLAN ID
     */
    public function scopeByVlanId($query, $vlanId)
    {
        return $query->where('vlan_id', $vlanId);
    }

    /**
     * Scope para buscar por zona
     */
    public function scopeByZona($query, $zonaId)
    {
        return $query->where('zona_id', $zonaId);
    }

    /**
     * Obtener el nombre formateado de la prioridad
     */
    public function getPriorityLabel(): string
    {
        return match($this->priority) {
            'low' => 'Baja',
            'normal' => 'Normal',
            'high' => 'Alta',
            'critical' => 'Crítica',
            default => 'Normal'
        };
    }

    /**
     * Verificar si tiene portal cautivo asociado
     */
    public function hasCaptivePortal(): bool
    {
        return !is_null($this->captive_portal_id);
    }
}
