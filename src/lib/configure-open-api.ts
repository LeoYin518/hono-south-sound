import type { AppOpenAPI } from "./types.js";
import packageJSON from '../../package.json' with { type: "json" };
import { Scalar } from "@scalar/hono-api-reference";

export function configureOpenAPI(app: AppOpenAPI) {
    app.doc("/doc", {
        openapi: "3.0.0",
        info: {
            version: packageJSON.version,
            title: "南声社区OpenAPI",
            description: "Hono App API Documentation",
        },
    })

    app.get('/scalar', Scalar({
        url: '/doc',
        theme: 'kepler',
        defaultHttpClient: {
            targetKey: 'js',
            clientKey: 'fetch'
        }
    }));
}  