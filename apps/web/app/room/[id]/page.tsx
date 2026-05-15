import TemplatePage from "@/components/templates/TemplatePage";


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
        <TemplatePage
            back
        >
            <p>Room {id}</p>
        </TemplatePage>
    )
}


export default RoomPage;
