export default function EmployeeCard({ employee, onDelete }) {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this employee? This will also delete their assets.')) {
            onDelete(employee.id);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">{employee.name || 'Unknown'}</h3>
                <button className="delete-button" onClick={handleDelete}>Delete</button>
            </div>
            <div className="card-body">
                <p><strong>Email:</strong> {employee.email}</p>
                {employee.phone && <p><strong>Phone:</strong> {employee.phone}</p>}
                <p><strong>Assets:</strong> {employee.assets_count}</p>
            </div>
        </div>
    );
}
