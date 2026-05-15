import TemplatePage from "@/components/templates/TemplatePage";
import TemplateRoomPage from "@/components/templates/TemplateRoomPage";
import RoomClient from "./_components/RoomClient";


export const generateMetadata = async () => {

    return {
        title: `Salle de réunion`,
    };
}

type RoomPageProps = {

    id: string;

};
export const RoomPage = async ({ params }: { params: Promise<RoomPageProps> }) => {
    const { id } = await params;

    return (
        <TemplateRoomPage
            username=""
            roomId={id}
            roomTitle=""
        >
            <RoomClient roomId={id} />
        </TemplateRoomPage>
    )
}


export default RoomPage;
