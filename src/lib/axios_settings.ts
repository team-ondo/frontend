import { create } from "middleware-axios/dist";

const api = create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

api.use(async (config, next, defaults) => {
    const token = sessionStorage.getItem("ondo-token");
    if (token != null) {
        config.headers = {
            "Authorization": `Bearer ${token}`
        };
    }

    await next(config);
});

export default api;
