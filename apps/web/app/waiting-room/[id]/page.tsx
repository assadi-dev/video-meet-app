
export default async function WaitingRoomPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    return (
        <div>
            <h1>Waiting Room {id}</h1>
        </div>
    );
}