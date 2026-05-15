"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import JoinRoomForm from "./JoinRoomForm";
import { Users } from "lucide-react";

const JoinRoomCard = () => {
  return (
    <Card className="border-border bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <Users className="h-6 w-6 mr-2 text-primary" />
          Rejoindre une réunion
        </CardTitle>
        <CardDescription>
          Entrez l'ID de la salle pour rejoindre une réunion existante
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <JoinRoomForm />
      </CardContent>
    </Card>
  );
};

export default JoinRoomCard;
