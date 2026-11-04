// Guarda o app no aparelho para abrir sem internet. Versão muda a cada geração.
const CACHE = "emprestimo-94bf6a6a9c";
const ARQUIVOS = ["./", "index.html", "manifest.webmanifest", "icone-192.png", "icone-512.png",
  "icone-maskable-512.png", "apple-touch-icon.png"];
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())));
self.addEventListener("activate", (e) => e.waitUntil(caches.keys()
  .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request)));
});
