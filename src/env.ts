import { z } from 'zod';
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

// 读取并扩展环境变量
expand(config())

const EnvSchema = z.object({
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().default(3000),
    DB_FILE_URL: z.string().default('./src/db/dev.db'),
    // OSS
    OSS_ACCESS_KEY_ID: z.string(),
    OSS_ACCESS_KEY_SECRET: z.string(),
    OSS_BUCKET: z.string(),
    OSS_REGION: z.string(),
    // JWT
    JWT_ADMIN_SECRET: z.string(),
    JWT_ADMIN_EXPIRES_IN_SECONDS: z.coerce.number().int().min(60).default(60 * 60 * 24),
    JWT_CLIENT_SECRET: z.string().optional(),
    JWT_CLIENT_EXPIRES_IN_SECONDS: z.coerce.number().int().min(60).optional(),
});

// 根据 EnvSchema 里面的属性接口自动生成一个 TS 类型
export type Env = z.infer<typeof EnvSchema>;

let env: Env;
try {
    const parsed = EnvSchema.parse(process.env);
    env = {
        ...parsed,
        JWT_CLIENT_SECRET: parsed.JWT_CLIENT_SECRET ?? parsed.JWT_ADMIN_SECRET,
        JWT_CLIENT_EXPIRES_IN_SECONDS: parsed.JWT_CLIENT_EXPIRES_IN_SECONDS ?? parsed.JWT_ADMIN_EXPIRES_IN_SECONDS,
    };
} catch (e) {
    const error = e as z.ZodError;
    console.error('❌ Invalid environment variables:');
    console.error(error.flatten().fieldErrors);
    process.exit(1);
}

export default env;
