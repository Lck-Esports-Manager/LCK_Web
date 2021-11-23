import { token } from "./cookies.js";

export const header = {
    headers: {
        Authorization: `jwt ${token()}`,
    },
};