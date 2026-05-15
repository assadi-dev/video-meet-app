"use client";

import TemplatePage from "@/components/templates/TemplatePage";
import { EnumeratePresentation } from "./_components/EnumeratePresentation";
import { BannerPresentation } from "./_components/BannerOresentation";
import JoinRoomCard from "./_components/JoinRoomCard";
import CreateRoomCard from "./_components/CreateRoomCard";

const HomePage = () => {
    return (
        <TemplatePage>
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <BannerPresentation />
                    <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
                        <JoinRoomCard />
                        <CreateRoomCard />
                    </div>
                    <EnumeratePresentation />
                </div>
            </main>
        </TemplatePage>
    );
};

export default HomePage;