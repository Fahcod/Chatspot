import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// the manifest file
const manifest:any ={
  registerType: "prompt",
  manifest: {
    name: "Chatspot",
    short_name: "Chatspot",
    description: "An application for realtime messaging,calls and file sharing",
    icons: [
      
      {
        src: "/logo.png",
        sizes: "65x65",
        type: "image/png",
        purpose:'icon',
      },
      
      {
        src: '/logo.png',
        sizes:'65x65',
        type:'image/png',
        purpose:'apple touch icon',
      },
      {
        src: '/logo.png',
        sizes:'65x65',
        type:'image/png',
        purpose:'maskable',
      },
    ],
    theme_color: "#181818",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),VitePWA(manifest)],
})
