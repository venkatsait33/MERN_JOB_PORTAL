import { useEffect, useState } from 'react'
import useNetworkStatus from '../utils/UseNetworkStatus';

const NetworkMessage = () => {
    const isOnline = useNetworkStatus();
    const [showBanner, setShowBanner] = useState(false);
    const [bannerMessage, setBannerMessage] = useState("");
    const [bannerColor, setBannerColor] = useState("");
    const [wasOffline, setWasOffline] = useState(false);

    useEffect(() => {
        if (!isOnline) {
            // User went offline
            setWasOffline(true);
            setBannerMessage("🚫 No Internet Connection");
            setBannerColor("bg-red-600");
            setShowBanner(true);
        } else if (wasOffline && isOnline) {
            // User reconnected after being offline
            setBannerMessage("✅ Internet Connected");
            setBannerColor("bg-green-600");
            setShowBanner(true);

            // Hide the "Internet Connected" banner after 3 seconds
            const timer = setTimeout(() => {
                setShowBanner(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOnline, wasOffline]);

    return (
        <div>
            {showBanner && (
                <div
                    className={`text-center p-2  text-white ${bannerColor} transition-all duration-500`}
                >
                    {bannerMessage}
                </div>
            )}
        </div>
    )
}

export default NetworkMessage