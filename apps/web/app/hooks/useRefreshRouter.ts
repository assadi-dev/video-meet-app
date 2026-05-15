import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const useRouterNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  const setQueryParams = (
    params: Record<string, string | number | boolean>
  ) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    for (const [k, v] of Object.entries(params)) {
      if (v) updatedSearchParams.set(k, String(v));
    }
    return updatedSearchParams;
  };

  const push = (
    path: string,
    query?: Record<string, string | number | boolean>
  ) => {
    if (query) {
      const searchParams = setQueryParams(query);
      const newPath = `${path}?${searchParams.toString()}`;
      router.push(newPath);
      router.refresh();
    } else {
      router.push(path);
      router.refresh();
    }
  };
  const replace = (
    path: string,
    query?: Record<string, string | number | boolean>
  ) => {
    if (query) {
      const searchParams = setQueryParams(query);
      const newPath = `${path}?${searchParams.toString()}`;
      router.replace(newPath);
      router.refresh();
    } else {
      router.replace(path);
      router.refresh();
    }
  };

  const back = () => {
    router.back();
  };
  return {
    params,
    router,
    pathname,
    searchParams,
    push,
    replace,
    back,
    setQueryParams,
  };
};

export default useRouterNavigation;
