# MDM Device Sync

A Laravel application for synchronizing device data from Mobile Device Management (MDM) providers. The architecture supports multiple MDM providers through an extensible contract-based design.

## Architecture

### Directory Structure

```
app/
├── Contracts/
│   └── MdmProviderInterface.php       # Contract for all MDM providers
├── DTOs/
│   ├── DeviceDTO.php                  # Normalized device data
│   ├── EmployeeDTO.php                # Normalized employee data
│   ├── SyncResultDTO.php              # Sync operation results
│   └── DeviceAttributesDTO.php        # Hardware attributes
├── Services/
│   └── Sync/
│       ├── MdmSyncService.php         # Orchestrator service
│       ├── MdmProviderRegistry.php    # Provider registration/resolution
│       └── Providers/
│           ├── AbstractMdmProvider.php    # Base class with shared logic
│           └── JamfProvider.php           # Jamf implementation
└── Providers/
    └── MdmServiceProvider.php         # Service provider registration
```

### Key Components

**DTOs (Data Transfer Objects)**
- `EmployeeDTO` - Normalized employee data (email, name, phone)
- `DeviceAttributesDTO` - Hardware attributes (model, processor, cores, RAM, battery)
- `DeviceDTO` - Complete device with employee and attributes
- `SyncResultDTO` - Sync operation results with counts and errors

**Contracts**
- `MdmProviderInterface` - Defines the contract all MDM providers must implement:
  - `getIdentifier()` - Unique provider ID (e.g., 'jamf')
  - `getName()` - Human-readable name
  - `fetchDevices()` - Returns iterable of DeviceDTO objects
  - `isConfigured()` - Checks if provider is properly configured

**Services**
- `AbstractMdmProvider` - Base class with shared validation (email, serial normalization)
- `JamfProvider` - Jamf MDM implementation using file-based data source
- `MdmProviderRegistry` - Manages provider registration and lookup
- `MdmSyncService` - Orchestrates sync: fetches from provider, persists to database

## API

### Sync Devices

```
POST /api/sync/{provider}
```

Triggers a sync from the specified MDM provider.

**Parameters:**
- `provider` - The MDM provider identifier (e.g., `jamf`)

**Response:**
```json
{
  "provider": "jamf",
  "created_assets": 5,
  "updated_assets": 10,
  "created_employees": 3,
  "skipped_unassigned": 2,
  "skipped_missing_serial": 1,
  "errors": []
}
```

**Error Response (404):**
```json
{
  "error": "Unknown MDM provider: unknown",
  "available_providers": ["jamf"]
}
```

### Other Endpoints

- `GET /api/assets` - List all assets
- `DELETE /api/assets/{id}` - Delete an asset
- `GET /api/employees` - List all employees
- `DELETE /api/employees/{id}` - Delete an employee

## Adding a New MDM Provider

To add support for a new MDM provider (e.g., Kandji):

1. **Create the provider class:**

```php
// app/Services/Sync/Providers/KandjiProvider.php
<?php

namespace App\Services\Sync\Providers;

use App\DTOs\DeviceAttributesDTO;
use App\DTOs\DeviceDTO;
use App\DTOs\EmployeeDTO;
use Generator;

final class KandjiProvider extends AbstractMdmProvider
{
    public function __construct(
        private readonly string $apiKey,
        private readonly string $baseUrl
    ) {}

    public function getIdentifier(): string
    {
        return 'kandji';
    }

    public function getName(): string
    {
        return 'Kandji MDM';
    }

    public function isConfigured(): bool
    {
        return !empty($this->apiKey) && !empty($this->baseUrl);
    }

    public function fetchDevices(): Generator
    {
        $devices = $this->fetchFromApi();

        foreach ($devices as $device) {
            $serial = $this->normalizeSerial($device['serial_number']);
            if ($serial === null) {
                continue;
            }

            $email = $this->normalizeEmail($device['user']['email'] ?? null);
            if ($email === null) {
                continue;
            }

            yield new DeviceDTO(
                serialNumber: $serial,
                deviceName: $device['device_name'] ?? 'Unknown',
                employee: new EmployeeDTO(
                    email: $email,
                    name: $device['user']['name'] ?? null,
                ),
                attributes: new DeviceAttributesDTO(
                    model: $device['model'] ?? null,
                ),
            );
        }
    }

    private function fetchFromApi(): array
    {
        // Implement API call to Kandji
    }
}
```

2. **Register the provider in `MdmServiceProvider`:**

```php
// app/Providers/MdmServiceProvider.php
$this->app->singleton(MdmProviderRegistry::class, function ($app) {
    $registry = new MdmProviderRegistry();

    $registry->register(new JamfProvider(
        base_path('files/api-mock-response.json')
    ));

    $registry->register(new KandjiProvider(
        config('services.kandji.api_key'),
        config('services.kandji.base_url')
    ));

    return $registry;
});
```

3. **Use the new provider:**

```
POST /api/sync/kandji
```

## Setup

```bash
# Install dependencies
composer install
npm install

# Configure environment
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate

# Start development server
php artisan serve
npm run dev
```

## Testing

```bash
# Run PHP tests
php artisan test

# Test sync endpoint
curl -X POST http://localhost:8000/api/sync/jamf
```
