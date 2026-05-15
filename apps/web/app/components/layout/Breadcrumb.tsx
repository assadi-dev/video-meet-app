import { ROOM_NAVIGATION } from "@/core/constants";
import useRouterNavigation from "@/hooks/useRefreshRouter";

export const Breadcrumb = () => {
    const { back, push } = useRouterNavigation()
    const HOME_NAVIGATION = ROOM_NAVIGATION.HOME;
    return (
        <div>
            <Button></Button>
        </div>
    )
}