import TemplatePage from "@/components/templates/TemplatePage";
import WaitingPageClient from "../_components/WaitingPageClient";

export const generateMetadata = async () => {

    return {
        title: `Préparer l'appel`,
    };
}
export const WaitingRoomPage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    return (
        <TemplatePage
            back
        >
            <WaitingPageClient roomId={id} />
        </TemplatePage>
    );
}

export default WaitingRoomPage;