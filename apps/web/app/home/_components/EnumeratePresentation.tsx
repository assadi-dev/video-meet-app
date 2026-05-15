import { Video, Users, Settings } from "lucide-react";

export const EnumeratePresentation = () => {
    return (
        <>
            <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Video className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Qualité HD</h3>
                    <p className="text-sm text-muted-foreground">
                        Vidéo et audio haute définition pour une communication claire
                    </p>
                </div>
                <div className="p-6">
                    <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Users className="h-6 w-6 text-warning" />
                    </div>
                    <h3 className="font-semibold mb-2">Jusqu'à 100 participants</h3>
                    <p className="text-sm text-muted-foreground">
                        Organisez des réunions avec de grandes équipes
                    </p>
                </div>
                <div className="p-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Sécurisé</h3>
                    <p className="text-sm text-muted-foreground">
                        Chiffrement de bout en bout pour vos conversations
                    </p>
                </div>
            </div>
        </>
    );
};
