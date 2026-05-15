
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import useRouterNavigation from "@/hooks/useRefreshRouter";


const BackButton = () => {
  const { back } = useRouterNavigation();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={back}
      className="text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Retour
    </Button>
  );
};

export default BackButton;
