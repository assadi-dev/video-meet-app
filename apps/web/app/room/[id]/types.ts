

export type RoomDevice = {
    id: string
    label: string
    kind: MediaDeviceKind
    track: MediaStreamTrack | null
    enabled: boolean
}