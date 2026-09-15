import { defineConfig } from 'vite'
import { readFileSync } from 'fs'
import { resolve } from 'path'

function htmlInclude() {
    return {
        name: 'html-include',
        transformIndexHtml(html) {
            return html.replace(/<!--@include:\s*([^?\s]+)(?:\?(\S*))?\s*-->/g, (_, file, query) => {
                let content = readFileSync(resolve(import.meta.dirname, file), 'utf-8')
                const active = query && new URLSearchParams(query).get('active')
                if (active) {
                    content = content.replace(
                        `data-page="${active}"`,
                        `data-page="${active}" class="active"`
                    )
                }
                return content
            })
        },
        handleHotUpdate({ file, server }) {
            if (file.replace(/\\/g, '/').includes('/src/partials/')) {
                server.ws.send({ type: 'full-reload' })
                return []
            }
        },
    }
}

export default defineConfig({
    plugins: [htmlInclude()],
    build: {
        sourcemap: true,
        minify: false,
    },
})