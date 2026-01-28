import { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../api';
import EmployeeCard from '../components/EmployeeCard';
import SyncButton from '../components/SyncButton';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            setEmployees(employees.filter(emp => emp.id !== id));
        } catch (error) {
            console.error('Failed to delete employee:', error);
        }
    };

    const handleSyncComplete = () => {
        fetchEmployees();
    };

    if (loading) {
        return <div className="page"><p>Loading...</p></div>;
    }

    return (
        <div className="page">
            <div className="page-header">
                <h1>Employees</h1>
                <SyncButton onSyncComplete={handleSyncComplete} />
            </div>
            {employees.length === 0 ? (
                <p>No employees found. Click "Sync Now" to import data from Jamf.</p>
            ) : (
                <div className="card-grid">
                    {employees.map(employee => (
                        <EmployeeCard key={employee.id} employee={employee} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}
