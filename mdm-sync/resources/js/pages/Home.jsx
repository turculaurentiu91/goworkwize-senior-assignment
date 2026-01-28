import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SyncButton from '@/components/sync/SyncButton';

export default function Home() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">MDM Device Sync</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                    Welcome to the MDM Device Sync application. Use this tool to sync assigned devices from Jamf MDM.
                </p>
                <SyncButton />
            </CardContent>
        </Card>
    );
}
