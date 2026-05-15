import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { getInitials } from '@/lib/format'


type FallbackParticipantVideoProps = {
    name: string
    index: number
}
const FallbackParticipantVideo = ({ name, index }: FallbackParticipantVideoProps) => {
    return (
        <Avatar className="h-20 w-20">
            <AvatarFallback
                className="text-2xl font-semibold"
                style={{
                    backgroundColor:
                        index % 3 === 0
                            ? "hsl(var(--primary))"
                            : index % 3 === 1
                                ? "hsl(var(--accent))"
                                : "hsl(var(--secondary))",
                    color: "white",
                }}
            >
                {getInitials(name)}
            </AvatarFallback>
        </Avatar>
    )
}

export default FallbackParticipantVideo