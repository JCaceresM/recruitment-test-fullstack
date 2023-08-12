import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths';
import envCompatible from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [react(), tsConfigPaths()],
        define:{
            'process.env': JSON.stringify(process.env)
        }
    })
}
