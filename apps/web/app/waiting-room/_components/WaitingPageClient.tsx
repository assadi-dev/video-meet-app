"use client"

import ConfigurationForm from "./ConfigurationForm";
import PreviewDevices from "./PreviewDevices";



type WaitingRoomPageProps = {
    roomId: string;
};
const WaitingPageClient = ({ roomId }: WaitingRoomPageProps) => {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Aperçu vidéo */}
                    <PreviewDevices />

                    {/* Configuration */}
                    <ConfigurationForm />
                </div>
            </div>
        </main>
    )
}

export default WaitingPageClient