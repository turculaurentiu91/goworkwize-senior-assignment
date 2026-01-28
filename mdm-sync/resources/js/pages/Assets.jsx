import { useState, useEffect } from 'react';
import { getAssets, deleteAsset } from '../api';
import AssetCard from '../components/AssetCard';
import SyncButton from '../components/SyncButton';

export default function Assets() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAssets = async () => {
        setLoading(true);
        try {
            const data = await getAssets();
            setAssets(data);
        } catch (error) {
            console.error('Failed to fetch assets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteAsset(id);
            setAssets(assets.filter(asset => asset.id !== id));
        } catch (error) {
            console.error('Failed to delete asset:', error);
        }
    };

    const handleSyncComplete = () => {
        fetchAssets();
    };

    if (loading) {
        return <div className="page"><p>Loading...</p></div>;
    }

    return (
        <div className="page">
            <div className="page-header">
                <h1>Assets</h1>
                <SyncButton onSyncComplete={handleSyncComplete} />
            </div>
            {assets.length === 0 ? (
                <p>No assets found. Click "Sync Now" to import devices from Jamf.</p>
            ) : (
                <div className="card-grid">
                    {assets.map(asset => (
                        <AssetCard key={asset.id} asset={asset} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}
