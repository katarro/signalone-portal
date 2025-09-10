<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ap;
use App\Models\Vlan;
use App\Models\Zona;

class ApSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Obtener algunas VLANs y zonas existentes
        $vlans = Vlan::all();
        $zonas = Zona::all();

        $aps = [
            [
                'name' => 'AP-Plaza-Armas-01',
                'ssid' => 'WiFi-Municipal-Armas',
                'ip_address' => '192.168.1.100',
                'mac_address' => 'AA:BB:CC:DD:EE:01',
                'description' => 'Access Point principal en Plaza de Armas',
                'location' => 'Plaza de Armas - Esquina norte',
                'frequency_band' => 'dual',
                'security_type' => 'WPA3',
                'password' => 'municipal2024',
                'max_clients' => 100,
                'current_clients' => 0,
                'status' => 'offline',
                'is_active' => true,
                'vlan_id' => $vlans->first()?->id,
                'zona_id' => $zonas->where('name', 'Plaza de Armas')->first()?->id,
            ],
            [
                'name' => 'AP-Plaza-Coya-01',
                'ssid' => 'WiFi-Municipal-Coya',
                'ip_address' => '192.168.1.101',
                'mac_address' => 'AA:BB:CC:DD:EE:02',
                'description' => 'Access Point en Plaza Coya',
                'location' => 'Plaza Coya - Centro',
                'frequency_band' => 'dual',
                'security_type' => 'WPA3',
                'password' => 'municipal2024',
                'max_clients' => 75,
                'current_clients' => 0,
                'status' => 'offline',
                'is_active' => true,
                'vlan_id' => $vlans->skip(1)->first()?->id,
                'zona_id' => $zonas->where('name', 'Plaza Coya')->first()?->id,
            ],
            [
                'name' => 'AP-Plaza-BioBio-01',
                'ssid' => 'WiFi-Municipal-BioBio',
                'ip_address' => '192.168.1.102',
                'mac_address' => 'AA:BB:CC:DD:EE:03',
                'description' => 'Access Point en Plaza Bio Bio',
                'location' => 'Plaza Bio Bio - Área principal',
                'frequency_band' => '5GHz',
                'security_type' => 'WPA2',
                'password' => 'municipal2024',
                'max_clients' => 50,
                'current_clients' => 0,
                'status' => 'offline',
                'is_active' => true,
                'vlan_id' => $vlans->first()?->id,
                'zona_id' => $zonas->where('name', 'Plaza Bio Bio')->first()?->id,
            ],
            [
                'name' => 'AP-Consultorio-01',
                'ssid' => 'WiFi-Consultorio',
                'ip_address' => '8.8.8.8', // IP que responde a ping para testing
                'mac_address' => 'AA:BB:CC:DD:EE:04',
                'description' => 'Access Point en Consultorio Municipal',
                'location' => 'Consultorio - Recepción',
                'frequency_band' => 'dual',
                'security_type' => 'WPA3',
                'password' => 'consultorio2024',
                'max_clients' => 30,
                'current_clients' => 0,
                'status' => 'offline',
                'is_active' => true,
                'vlan_id' => $vlans->skip(2)->first()?->id,
                'zona_id' => $zonas->where('name', 'Plaza Consultorio')->first()?->id,
            ],
        ];

        foreach ($aps as $apData) {
            Ap::create($apData);
        }

        $this->command->info('Se han creado ' . count($aps) . ' Access Points de ejemplo.');
    }
}
