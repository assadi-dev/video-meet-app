"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";

export const BannerPresentation = () => {
    return (
        <>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Réunions vidéo de qualité professionnelle
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Connectez-vous instantanément avec vos équipes grâce à notre plateforme
                de visioconférence moderne et sécurisée.
            </p>
        </>
    );
};