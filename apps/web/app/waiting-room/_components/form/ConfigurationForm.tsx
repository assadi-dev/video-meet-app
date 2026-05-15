"use client"

import { Form } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Settings } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import SpinnerLoader from "@/components/ui/SpinnerLoader"
import { useTransition } from "react"
import { ConfigurationFormSchema, ConfigurationFormType } from "../../schema"
import FormFieldInput from "@/components/forms/FormFieldInput"
import SelectedVideoSource from "./SelectedVideoSource"
import SelectedAudioSource from "./SelectedAudioSource"
import { saveUserPreference } from "@/store/userPreferenceStore"
import useRouterNavigation from "@/hooks/useRefreshRouter"

interface ConfigurationFormProps {
    defaultValues: Partial<ConfigurationFormType>;

}
const ConfigurationForm = ({ defaultValues }: ConfigurationFormProps) => {

    const [isPending, startTransition] = useTransition();
    const { router, params } = useRouterNavigation();

    const form = useForm<ConfigurationFormType>({
        resolver: zodResolver(ConfigurationFormSchema),
        defaultValues: {
            ...defaultValues
        },
    });





    const submit = (data: ConfigurationFormType) => {
        startTransition(async () => {
            try {

                saveUserPreference({
                    displayName: data.displayName,
                    devices: {
                        video: {
                            deviceId: data.videoSource,

                        },
                        audio: {
                            deviceId: data.audioSource,

                        },
                    },
                })

                router.push(`/room/${params.id}`);
            } catch (error) {
                console.error(error);
            }
        });
    };


    const displayNameObserver = form.watch("displayName");

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submit)}
                className="space-y-6"
            >
                {/* Informations personnelles */}
                <Card className="border-border bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Vos informations</CardTitle>
                        <CardDescription>
                            Comment souhaitez-vous apparaître dans la réunion ?
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <FormFieldInput
                                name="displayName"
                                control={form.control}
                                label="Nom d'affichage"
                                placeholder="Entrez votre nom"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Paramètres audio/vidéo */}
                <Card className="border-border bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Settings className="h-5 w-5 mr-2" />
                            Paramètres des périphériques
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <SelectedVideoSource />
                        </div>

                        <div>
                            <div>
                                <SelectedAudioSource


                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bouton de participation */}
                <Card className="border-border bg-card/80 backdrop-blur-sm">
                    <CardContent className="pt-6">
                        <Button
                            className="w-full bg-gradient-primary hover:opacity-90 h-12 text-lg"
                            disabled={!displayNameObserver || isPending}
                        >
                            {isPending ? (
                                <SpinnerLoader />
                            ) : (
                                <CheckCircle className="h-5 w-5 mr-2" />
                            )}
                            {isPending ? (
                                <span className="animate animate-pulse">
                                    Connexion en cours
                                </span>
                            ) : (
                                "  Rejoindre la réunion"
                            )}
                        </Button>

                        {!displayNameObserver && (
                            <p className="text-sm text-muted-foreground text-center mt-2">
                                Veuillez entrer votre nom pour continuer
                            </p>
                        )}
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}

export default ConfigurationForm