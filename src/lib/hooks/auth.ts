import { AdminPasswordName } from "../names/localstorage";

export function useIsAuthenticated() {
    return typeof localStorage !== "undefined"
        ? !!localStorage.getItem(AdminPasswordName)
        : undefined;
}
