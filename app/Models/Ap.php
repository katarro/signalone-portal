<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ap extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'ssid',
        'ip_address',
        'mac_address',
        'description',
        'vlan_id',
        'zona_id',
        'location',
        'frequency_band',
        'security_type',
        'password',
        'max_clients',
        'current_clients',
        'status',
        'last_ping',
        'ping_response_time',
        'is_active',
        'performance_metrics',
        'packet_loss',
        'packets_received',
        'status_text',
    ];

    protected $casts = [
        'last_ping' => 'datetime',
        'performance_metrics' => 'array',
        'is_active' => 'boolean',
        'ping_response_time' => 'integer',
        'max_clients' => 'integer',
        'current_clients' => 'integer',
        'packet_loss' => 'integer',
        'packets_received' => 'integer',
    ];

    /**
     * Relación con VLAN
     */
    public function vlan(): BelongsTo
    {
        return $this->belongsTo(Vlan::class);
    }

    /**
     * Relación con Zona
     */
    public function zona(): BelongsTo
    {
        return $this->belongsTo(Zona::class);
    }

    /**
     * Verificar si el AP está online
     */
    public function isOnline(): bool
    {
        return $this->status === 'online';
    }

    /**
     * Verificar si el AP está offline
     */
    public function isOffline(): bool
    {
        return $this->status === 'offline';
    }

    /**
     * Verificar si el AP tiene errores
     */
    public function hasError(): bool
    {
        return $this->status === 'error';
    }

    /**
     * Actualizar el estado del ping
     */
    public function updatePingStatus(bool $success, ?int $responseTime = null): void
    {
        $this->update([
            'status' => $success ? 'online' : 'offline',
            'last_ping' => now(),
            'ping_response_time' => $responseTime,
        ]);
    }

    /**
     * Obtener el color del semáforo basado en el estado
     */
    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            'online' => 'green',
            'offline' => 'red',
            'error' => 'red',
            'maintenance' => 'yellow',
            default => 'gray',
        };
    }

    /**
     * Obtener el texto del estado
     */
    public function getStatusTextAttribute(): string
    {
        return match ($this->status) {
            'online' => 'En línea',
            'offline' => 'Fuera de línea',
            'error' => 'Error',
            'maintenance' => 'Mantenimiento',
            default => 'Desconocido',
        };
    }

    /**
     * Scopes
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOnline($query)
    {
        return $query->where('status', 'online');
    }

    public function scopeOffline($query)
    {
        return $query->where('status', 'offline');
    }
}
