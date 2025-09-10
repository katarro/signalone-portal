<?php

namespace Database\Seeders;

use App\Models\Zona;
use Illuminate\Database\Seeder;

class ZonaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Eliminar zonas existentes
        Zona::truncate();

        $zonas = [
            [
                'name' => 'Plaza de Armas',
                'description' => 'Zona central - Plaza de Armas',
                'location' => 'Centro histórico',
                'is_active' => true,
            ],
            [
                'name' => 'Plaza Coya',
                'description' => 'Zona Plaza Coya',
                'location' => 'Sector Coya',
                'is_active' => true,
            ],
            [
                'name' => 'Plaza Bio Bio',
                'description' => 'Zona Plaza Bio Bio',
                'location' => 'Sector Bio Bio',
                'is_active' => true,
            ],
            [
                'name' => 'Plaza Temuco',
                'description' => 'Zona Plaza Temuco',
                'location' => 'Sector Temuco',
                'is_active' => true,
            ],
            [
                'name' => 'Plaza Vergara',
                'description' => 'Zona Plaza Vergara',
                'location' => 'Sector Vergara',
                'is_active' => true,
            ],
            [
                'name' => 'Plaza Toconado',
                'description' => 'Zona Plaza Toconado',
                'location' => 'Sector Toconado',
                'is_active' => true,
            ],
            [
                'name' => 'Plaza Consultorio',
                'description' => 'Zona Plaza Consultorio',
                'location' => 'Sector Consultorio',
                'is_active' => true,
            ],
        ];

        foreach ($zonas as $zona) {
            Zona::create($zona);
        }
    }
}
