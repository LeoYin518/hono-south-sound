import { z } from 'zod';
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

// 读取并扩展环境变量
expand(config())

const EnvSchema = z.object({
    NODE_ENV: z.string().default('development'),
    PORT: z.coerce.number().default(3000),
    DB_FILE_URL: z.string().default('./src/db/dev.db'),
});

// 根据 EnvSchema 里面的属性接口自动生成一个 TS 类型
export type Env = z.infer<typeof EnvSchema>;

let env: Env;
try {
    env = EnvSchema.parse(process.env);
} catch (e) {
    const error = e as z.ZodError;
    console.error('❌ Invalid environment variables:');
    console.error(error.flatten().fieldErrors);
    process.exit(1);
}

export default env;