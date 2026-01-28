import { Loader2 } from 'lucide-react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDeleteEmployee } from '@/hooks/useEmployees';
import { useToast } from '@/hooks/use-toast';

export default function EmployeeCard({ employee }) {
    const { toast } = useToast();
    const { mutate: deleteEmployee, isPending } = useDeleteEmployee();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this employee? This will also delete their assets.')) {
            deleteEmployee(employee.id, {
                onSuccess: () => {
                    toast({
                        title: 'Employee deleted',
                        description: `${employee.name || employee.email} and their assets have been deleted.`,
                    });
                },
                onError: (error) => {
                    toast({
                        variant: 'destructive',
                        title: 'Delete failed',
                        description: error.message || 'Failed to delete employee',
                    });
                },
            });
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                    {employee.name || 'Unknown'}
                </CardTitle>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isPending}
                >
                    {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        'Delete'
                    )}
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p className="text-sm">
                        <span className="font-medium">Email:</span> {employee.email}
                    </p>
                    {employee.phone && (
                        <p className="text-sm">
                            <span className="font-medium">Phone:</span> {employee.phone}
                        </p>
                    )}
                    <div className="pt-2">
                        <Badge variant="secondary">
                            {employee.assets_count} {employee.assets_count === 1 ? 'asset' : 'assets'}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
