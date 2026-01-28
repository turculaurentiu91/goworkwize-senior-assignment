import SyncButton from '../components/SyncButton';

export default function Home() {
    return (
        <div className="page">
            <h1>MDM Device Sync</h1>
            <p>Welcome to the MDM Device Sync application. Use this tool to sync assigned devices from Jamf MDM.</p>
            <SyncButton />
        </div>
    );
}
