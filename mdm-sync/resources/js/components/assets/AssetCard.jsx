import { Loader2 } from 'lucide-react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useDeleteAsset } from '@/hooks/useAssets';
import { useToast } from '@/hooks/use-toast';

export default function AssetCard({ asset }) {
    const { toast } = useToast();
    const { mutate: deleteAsset, isPending } = useDeleteAsset();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this asset?')) {
            deleteAsset(asset.id, {
                onSuccess: () => {
                    toast({
                        title: 'Asset deleted',
                        description: `${asset.device_name} has been deleted.`,
                    });
                },
                onError: (error) => {
                    toast({
                        variant: 'destructive',
                        title: 'Delete failed',
                        description: error.message || 'Failed to delete asset',
                    });
                },
            });
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                    {asset.device_name}
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
                        <span className="font-medium">Serial:</span> {asset.serial_code}
                    </p>
                    <p className="text-sm">
                        <span className="font-medium">Assigned To:</span>{' '}
                        {asset.employee?.name || asset.employee?.email || 'Unknown'}
                    </p>
                    {asset.attributes && (
                        <>
                            <Separator className="my-3" />
                            <div className="flex flex-wrap gap-2">
                                {asset.attributes.model && (
                                    <Badge variant="secondary">{asset.attributes.model}</Badge>
                                )}
                                {asset.attributes.processor && (
                                    <Badge variant="secondary">{asset.attributes.processor}</Badge>
                                )}
                                {asset.attributes.cores && (
                                    <Badge variant="outline">{asset.attributes.cores} cores</Badge>
                                )}
                                {asset.attributes.ram_gb && (
                                    <Badge variant="outline">{asset.attributes.ram_gb} GB RAM</Badge>
                                )}
                                {asset.attributes.battery && (
                                    <Badge variant="outline">{asset.attributes.battery}% battery</Badge>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
