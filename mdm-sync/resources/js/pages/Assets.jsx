import { AlertCircle, Package } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AssetCard from '@/components/assets/AssetCard';
import SyncButton from '@/components/sync/SyncButton';
import { useAssets } from '@/hooks/useAssets';

function AssetCardSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-16" />
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-40" />
                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                </div>
            </CardContent>
        </Card>
    );
}

export default function Assets() {
    const { data: assets, isLoading, isError, error } = useAssets();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h1 className="text-2xl font-bold text-foreground">Assets</h1>
                    <Skeleton className="h-10 w-24" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <AssetCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h1 className="text-2xl font-bold text-foreground">Assets</h1>
                    <SyncButton />
                </div>
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error?.message || 'Failed to load assets. Please try again.'}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h1 className="text-2xl font-bold text-foreground">Assets</h1>
                <SyncButton />
            </div>
            {assets?.length === 0 ? (
                <Alert>
                    <Package className="h-4 w-4" />
                    <AlertTitle>No assets found</AlertTitle>
                    <AlertDescription>
                        Click "Sync Now" to import devices from Jamf.
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assets?.map((asset) => (
                        <AssetCard key={asset.id} asset={asset} />
                    ))}
                </div>
            )}
        </div>
    );
}
