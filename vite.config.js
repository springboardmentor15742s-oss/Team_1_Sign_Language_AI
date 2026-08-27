import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync } from 'fs'

const pagesDir = resolve(__dirname, 'pages')
const pages = readdirSync(pagesDir).filter(f => f.endsWith('.html'))

const input = { main: resolve(__dirname, 'index.html') }
for (const page of pages) {
  const name = page.replace('.html', '')
  input[name] = resolve(pagesDir, page)
}

export default defineConfig({
  build: {
    rollupOptions: { input }
  }
})
