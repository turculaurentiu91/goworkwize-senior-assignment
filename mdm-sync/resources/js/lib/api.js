const API_BASE = '/api';

class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

async function handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
        throw new ApiError(
            data.message || 'An error occurred',
            response.status,
            data
        );
    }

    return data;
}

export async function syncJamf() {
    const response = await fetch(`${API_BASE}/sync/jamf`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    return handleResponse(response);
}

export async function getAssets() {
    const response = await fetch(`${API_BASE}/assets`, {
        headers: {
            Accept: 'application/json',
        },
    });
    return handleResponse(response);
}

export async function deleteAsset(id) {
    const response = await fetch(`${API_BASE}/assets/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
        },
    });
    return handleResponse(response);
}

export async function getEmployees() {
    const response = await fetch(`${API_BASE}/employees`, {
        headers: {
            Accept: 'application/json',
        },
    });
    return handleResponse(response);
}

export async function deleteEmployee(id) {
    const response = await fetch(`${API_BASE}/employees/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
        },
    });
    return handleResponse(response);
}
