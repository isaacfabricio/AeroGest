/* global process */
/**
 * Arquivo de configuração do Next.js
 * 
 * Este arquivo permite personalizar o comportamento padrão do Next.js.
 * Você pode configurar opções como:
 * - redirecionamentos
 * - reescritas de URL
 * - variáveis de ambiente
 * - configurações de build
 * - entre outras
 * 
 * Para mais informações, consulte a documentação oficial:
 * https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

const nextConfig = {
  reactStrictMode: true, // Ativa o modo estrito do React para ajudar a identificar problemas
  swcMinify: true,       // Usa o compilador SWC para minificar o código, melhorando a performance
  // Configuração corrigida da variável de ambiente pública para a URL da API
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  // Exemplo de configuração de redirecionamento
  async redirects() {
    return [
      {
        source: '/antiga-rota',
        destination: '/nova-rota',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
