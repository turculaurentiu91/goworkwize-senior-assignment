const API_BASE = '/api';

export async function syncJamf() {
    const response = await fetch(`${API_BASE}/sync/jamf`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    return response.json();
}

export async function getAssets() {
    const response = await fetch(`${API_BASE}/assets`, {
        headers: {
            'Accept': 'application/json',
        },
    });
    return response.json();
}

export async function deleteAsset(id) {
    const response = await fetch(`${API_BASE}/assets/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    });
    return response.json();
}

export async function getEmployees() {
    const response = await fetch(`${API_BASE}/employees`, {
        headers: {
            'Accept': 'application/json',
        },
    });
    return response.json();
}

export async function deleteEmployee(id) {
    const response = await fetch(`${API_BASE}/employees/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    });
    return response.json();
}
