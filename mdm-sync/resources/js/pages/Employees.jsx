import { AlertCircle, Users } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import EmployeeCard from '@/components/employees/EmployeeCard';
import SyncButton from '@/components/sync/SyncButton';
import { useEmployees } from '@/hooks/useEmployees';

function EmployeeCardSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-16" />
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-16 mt-2" />
            </CardContent>
        </Card>
    );
}

export default function Employees() {
    const { data: employees, isLoading, isError, error } = useEmployees();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h1 className="text-2xl font-bold text-foreground">Employees</h1>
                    <Skeleton className="h-10 w-24" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <EmployeeCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h1 className="text-2xl font-bold text-foreground">Employees</h1>
                    <SyncButton />
                </div>
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error?.message || 'Failed to load employees. Please try again.'}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h1 className="text-2xl font-bold text-foreground">Employees</h1>
                <SyncButton />
            </div>
            {employees?.length === 0 ? (
                <Alert>
                    <Users className="h-4 w-4" />
                    <AlertTitle>No employees found</AlertTitle>
                    <AlertDescription>
                        Click "Sync Now" to import data from Jamf.
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {employees?.map((employee) => (
                        <EmployeeCard key={employee.id} employee={employee} />
                    ))}
                </div>
            )}
        </div>
    );
}
