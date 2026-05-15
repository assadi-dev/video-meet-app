"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Calendar } from "lucide-react";
import { Button } from "@ui/button";
import { useNavigateRoom } from "@hooks/useNavigateRoom";

const CreateRoomCard = () => {
  const { createRoom } = useNavigateRoom();


  return (
    <Card className="border-border bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <Calendar className="h-6 w-6 mr-2 text-accent" />
          Créer une réunion
        </CardTitle>
        <CardDescription>
          Démarrez une nouvelle réunion instantanément
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={createRoom}
          className="w-full bg-gradient-accent hover:opacity-90"
        >
          Nouvelle réunion
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateRoomCard;
