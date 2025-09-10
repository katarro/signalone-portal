<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Zona extends Model
{
    protected $fillable = [
        'name',
        'description',
        'location',
        'contact_person',
        'contact_phone',
        'contact_email',
        'notes',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Obtener las VLANs de esta zona
     */
    public function vlans(): HasMany
    {
        return $this->hasMany(Vlan::class);
    }

    /**
     * Obtener los APs de esta zona
     */
    public function aps(): HasMany
    {
        return $this->hasMany(Ap::class);
    }

    /**
     * Scope para zonas activas
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
