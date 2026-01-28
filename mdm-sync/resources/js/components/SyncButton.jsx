import { useState } from 'react';
import { syncJamf } from '../api';

export default function SyncButton({ onSyncComplete }) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSync = async () => {
        setLoading(true);
        setResult(null);
        try {
            const data = await syncJamf();
            setResult(data);
            if (onSyncComplete) {
                onSyncComplete(data);
            }
        } catch (error) {
            setResult({ error: 'Sync failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sync-button-container">
            <button
                className="sync-button"
                onClick={handleSync}
                disabled={loading}
            >
                {loading ? 'Syncing...' : 'Sync Now'}
            </button>
            {result && !result.error && (
                <div className="sync-result">
                    <p>Created: {result.created_assets} assets, {result.created_employees} employees</p>
                    <p>Updated: {result.updated_assets} assets</p>
                </div>
            )}
            {result?.error && (
                <div className="sync-error">{result.error}</div>
            )}
        </div>
    );
}
