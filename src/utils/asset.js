// Resolve caminhos de arquivos da pasta `public` respeitando o `base` do Vite.
//
// O site é publicado num subdiretório (GitHub Pages: /LadingPage-Viagens/), então
// um caminho escrito como '/imagens/foto.jpg' apontaria para a raiz do domínio e
// daria 404. Esta função normaliza o caminho e prefixa a base correta, aceitando
// tanto '/imagens/foto.jpg' quanto 'imagens/foto.jpg'.
export function asset(path) {
  if (!path) return path
  // URLs absolutas (http, https, data:) passam direto
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
