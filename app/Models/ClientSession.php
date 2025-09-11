<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class ClientSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'captive_portal_id',
        'vlan_id',
        'ap_id',
        'session_id',
        'mac_address',
        'ip_address',
        'username',
        'device_name',
        'user_agent',
        'auth_method',
        'auth_data',
        'login_time',
        'logout_time',
        'last_activity',
        'session_duration',
        'status',
        'bytes_downloaded',
        'bytes_uploaded',
        'packets_downloaded',
        'packets_uploaded',
        'zona_name',
        'ap_name',
        'ssid',
        'signal_strength',
        'metadata',
        'termination_reason',
    ];

    protected $casts = [
        'auth_data' => 'array',
        'metadata' => 'array',
        'login_time' => 'datetime',
        'logout_time' => 'datetime',
        'last_activity' => 'datetime',
        'bytes_downloaded' => 'integer',
        'bytes_uploaded' => 'integer',
        'packets_downloaded' => 'integer',
        'packets_uploaded' => 'integer',
        'session_duration' => 'integer',
        'signal_strength' => 'integer',
    ];

    /**
     * Relación con el portal cautivo
     */
    public function captivePortal(): BelongsTo
    {
        return $this->belongsTo(CaptivePortal::class);
    }

    /**
     * Relación con la VLAN
     */
    public function vlan(): BelongsTo
    {
        return $this->belongsTo(Vlan::class);
    }

    /**
     * Relación con el Access Point
     */
    public function ap(): BelongsTo
    {
        return $this->belongsTo(Ap::class);
    }

    /**
     * Scopes para filtrar sesiones
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByPortal($query, $portalId)
    {
        return $query->where('captive_portal_id', $portalId);
    }

    public function scopeByMac($query, $macAddress)
    {
        return $query->where('mac_address', $macAddress);
    }

    public function scopeToday($query)
    {
        return $query->whereDate('login_time', Carbon::today());
    }

    public function scopeLastDays($query, $days = 7)
    {
        return $query->where('login_time', '>=', Carbon::now()->subDays($days));
    }

    /**
     * Métodos de utilidad
     */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function hasExpired(): bool
    {
        if (!$this->isActive()) {
            return false;
        }

        $portal = $this->captivePortal;
        if (!$portal) {
            return false;
        }

        // Verificar expiración por tiempo de sesión
        if ($portal->session_timeout > 0) {
            $sessionExpiry = $this->login_time->addMinutes($portal->session_timeout);
            if (Carbon::now()->gt($sessionExpiry)) {
                return true;
            }
        }

        // Verificar expiración por inactividad
        if ($portal->idle_timeout > 0) {
            $idleExpiry = $this->last_activity->addMinutes($portal->idle_timeout);
            if (Carbon::now()->gt($idleExpiry)) {
                return true;
            }
        }

        return false;
    }

    public function updateLastActivity(): void
    {
        $this->update(['last_activity' => Carbon::now()]);
    }

    public function calculateDuration(): int
    {
        $end = $this->logout_time ?? Carbon::now();
        return $this->login_time->diffInSeconds($end);
    }

    public function terminate(string $reason = null): void
    {
        $this->update([
            'status' => 'terminated',
            'logout_time' => Carbon::now(),
            'session_duration' => $this->calculateDuration(),
            'termination_reason' => $reason,
        ]);
    }

    public function logout(): void
    {
        $this->update([
            'status' => 'logout',
            'logout_time' => Carbon::now(),
            'session_duration' => $this->calculateDuration(),
        ]);
    }

    public function expire(): void
    {
        $this->update([
            'status' => 'expired',
            'logout_time' => Carbon::now(),
            'session_duration' => $this->calculateDuration(),
            'termination_reason' => 'Session expired',
        ]);
    }

    /**
     * Formatear bytes para mostrar
     */
    public function getFormattedBytesDownloadedAttribute(): string
    {
        return $this->formatBytes($this->bytes_downloaded);
    }

    public function getFormattedBytesUploadedAttribute(): string
    {
        return $this->formatBytes($this->bytes_uploaded);
    }

    public function getTotalBytesAttribute(): int
    {
        return $this->bytes_downloaded + $this->bytes_uploaded;
    }

    public function getFormattedTotalBytesAttribute(): string
    {
        return $this->formatBytes($this->total_bytes);
    }

    private function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }

    /**
     * Generar ID de sesión único
     */
    public static function generateSessionId(): string
    {
        return 'sess_' . uniqid() . '_' . bin2hex(random_bytes(8));
    }
}
