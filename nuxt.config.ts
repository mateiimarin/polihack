// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@nuxtjs/google-fonts'],
  runtimeConfig: {
    openAiApiKey: process.env.NUXT_OPEN_AI_API_KEY,
  },
  googleFonts: {
    preconnect: true,
    families: {
      Inter: '300..600',
    }
  },
  components: [
    {
      path: '~/components/utils',
      pathPrefix: false,
    },
    '~/components'
  ],
  colorMode: {
    preference: 'light'
  },
  css: ['~/assets/css/flat-icon.css', '~/assets/css/style.css'],
  app: {
    head: {
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js', 
          integrity: 'sha384-hIoBPJpTUs74ddyc4bFZSM1TVlQDA60VBbJS0oA934VSz82sBx1X7kSx2ATBDIyd', 
          crossorigin: 'anonymous',
          defer: true,
        }
      ],
      link: [
        { rel: 'stylesheet', 
          href: 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css', 
          integrity: 'sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww', crossorigin: 'anonymous' 
        }
      ],
    }
  }
})