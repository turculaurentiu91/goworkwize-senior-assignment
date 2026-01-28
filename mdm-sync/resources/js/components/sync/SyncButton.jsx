import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSyncJamf } from '@/hooks/useSync';
import { useToast } from '@/hooks/use-toast';

export default function SyncButton() {
    const { toast } = useToast();
    const { mutate: sync, isPending, data } = useSyncJamf();

    const handleSync = () => {
        sync(undefined, {
            onSuccess: (result) => {
                toast({
                    title: 'Sync completed',
                    description: `Created ${result.created_assets} assets, ${result.created_employees} employees. Updated ${result.updated_assets} assets.`,
                });
            },
            onError: (error) => {
                toast({
                    variant: 'destructive',
                    title: 'Sync failed',
                    description: error.message || 'An error occurred during sync',
                });
            },
        });
    };

    return (
        <div className="flex flex-col items-start gap-2">
            <Button onClick={handleSync} disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Syncing...
                    </>
                ) : (
                    'Sync Now'
                )}
            </Button>
            {data && !isPending && (
                <div className="bg-green-100 text-green-800 px-4 py-3 rounded text-sm">
                    <p>Created: {data.created_assets} assets, {data.created_employees} employees</p>
                    <p>Updated: {data.updated_assets} assets</p>
                </div>
            )}
        </div>
    );
}
