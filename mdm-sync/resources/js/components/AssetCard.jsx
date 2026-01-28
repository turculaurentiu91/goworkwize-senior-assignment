export default function AssetCard({ asset, onDelete }) {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this asset?')) {
            onDelete(asset.id);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">{asset.device_name}</h3>
                <button className="delete-button" onClick={handleDelete}>Delete</button>
            </div>
            <div className="card-body">
                <p><strong>Serial:</strong> {asset.serial_code}</p>
                <p><strong>Assigned To:</strong> {asset.employee?.name || asset.employee?.email || 'Unknown'}</p>
                {asset.attributes && (
                    <div className="attributes">
                        {asset.attributes.model && <p><strong>Model:</strong> {asset.attributes.model}</p>}
                        {asset.attributes.processor && <p><strong>Processor:</strong> {asset.attributes.processor}</p>}
                        {asset.attributes.cores && <p><strong>Cores:</strong> {asset.attributes.cores}</p>}
                        {asset.attributes.ram_gb && <p><strong>RAM:</strong> {asset.attributes.ram_gb} GB</p>}
                        {asset.attributes.battery && <p><strong>Battery:</strong> {asset.attributes.battery}%</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
