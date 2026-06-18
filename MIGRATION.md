# ZARIX — MIGRATION PRESERVATION GUIDE

> **Regla número uno:** El diseño visual puede cambiar completamente.
> El SEO, los tracking IDs, los schemas, las URLs y las integraciones NO pueden perderse.
> Este archivo es la fuente de verdad durante toda la reconstrucción.

---

## 1. URLS — NUNCA CAMBIAR

Estas 11 URLs deben devolver HTTP 200 en el nuevo sitio.
Si alguna desaparece o cambia, se pierde el equity SEO acumulado.

```
https://zarix.site/
https://zarix.site/criacao-websites-aveiro
https://zarix.site/websites-para-restaurantes
https://zarix.site/suporte-it-aveiro
https://zarix.site/suporte-it-restaurantes-aveiro
https://zarix.site/redes-wifi-empresas-aveiro
https://zarix.site/ciberseguranca-pme
https://zarix.site/chatbots-ia-whatsapp
https://zarix.site/manutencao-informatica-aveiro
https://zarix.site/blog
https://zarix.site/blog-website-vs-instagram-restaurante
```

Si en la nueva arquitectura alguna página se consolida o mueve,
añadir un redirect 301 **antes** de hacer deploy.

---

## 2. GOOGLE ANALYTICS 4

**ID:** `G-WL0GVH0WDH`

Debe estar en el `<head>` de **todas** las páginas, como **primer script**.

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-WL0GVH0WDH"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-WL0GVH0WDH');
</script>
```

---

## 3. MICROSOFT CLARITY

**ID:** `x6dfcd3uz9`

Actualmente solo está en `index.html`. En la reconstrucción debe estar en **todas** las páginas.

```html
<script>
  window.addEventListener('load', function() {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r); t.async=1;
      t.src='https://www.clarity.ms/tag/'+i;
      y=l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t,y);
    })(window,document,'clarity','script','x6dfcd3uz9');
  });
</script>
```

---

## 4. FORMSPREE — FORMULARIO DE CONTACTO

**Endpoint:** `https://formspree.io/f/xaqvedjq`

El formulario debe tener estos campos con exactamente estos atributos:

```html
<form id="cForm" action="https://formspree.io/f/xaqvedjq" method="POST">
  <input type="text"  name="name"    autocomplete="name"  required>
  <input type="email" name="email"   autocomplete="email" required>
  <input type="tel"   name="phone"   autocomplete="tel">
  <select name="service">
    <option value="">-- Selecionar serviço --</option>
    <option>Diagnóstico IT gratuito</option>
    <option>Montagem e Upgrade de PCs</option>
    <option>Manutenção e Reparação de Equipamentos</option>
    <option>Redes e Wi-Fi para Negócios</option>
    <option>Cibersegurança e Proteção de Dados (RGPD)</option>
    <option>Chatbots e Automação com IA</option>
    <option>Suporte IT Mensal (Subscrição)</option>
    <option>Outro / Não sei ainda</option>
  </select>
  <textarea name="message" required></textarea>
  <input type="checkbox" name="gdpr" required>
  <!-- GDPR consent checkbox — OBRIGATÓRIO -->
</form>
```

Al enviar el formulario con éxito, disparar el evento GA4:

```javascript
gtag('event', 'generate_lead', {
  event_category: 'contact',
  event_label: 'form_submit'
});
```

---

## 5. WHATSAPP

**Número:** `+351 967 608 772`
**Enlace:** `https://wa.me/351967608772`

Debe aparecer en:
- Botón flotante (FAB) en todas las páginas
- Sección de contacto en homepage
- Footer (enlace social)
- CTAs de páginas de servicio donde aplique

El FAB debe disparar el evento GA4 al hacer clic:

```javascript
gtag('event', 'whatsapp_click', {
  event_category: 'contact',
  event_label: 'whatsapp'
});
```

---

## 6. EVENTOS GA4 — TRACKING COMPLETO

Todos estos eventos deben seguir funcionando en el nuevo sitio:

| Evento | Trigger | Categoría | Label |
|--------|---------|-----------|-------|
| `generate_lead` | Form enviado con éxito | contact | form_submit |
| `phone_call` | Click en enlace `tel:` | contact | tel_click |
| `cta_click` | Click en botones CTA | contact | texto del botón |
| `whatsapp_click` | Click en enlace WhatsApp | contact | whatsapp |

---

## 7. CONTACTO — DATOS EXACTOS

Estos datos aparecen en schema markup, formularios y texto. No cambiar.

```
Teléfono:  +351 967 608 772
Email:     info@zarix.site
Dirección: Aveiro, Portugal
Geo:       40.6405, -8.6538
Horario:   Lunes–Viernes 09:00–18:00
Instagram: https://www.instagram.com/zarix_it/
WhatsApp:  https://wa.me/351967608772
```

---

## 8. META TAGS — CADA PÁGINA

Copiar exactamente en cada página del nuevo sitio.

### Homepage `/`
```html
<title>Zarix — Suporte IT e Websites para PMEs em Aveiro</title>
<meta name="description" content="Zarix — Suporte IT e criação de websites para restaurantes e PMEs em Aveiro. Redes Wi-Fi, cibersegurança, chatbots com IA. Diagnóstico gratuito.">
<link rel="canonical" href="https://zarix.site/">
<link rel="alternate" hreflang="pt-PT"    href="https://zarix.site/">
<link rel="alternate" hreflang="x-default" href="https://zarix.site/">
<meta property="og:type"        content="website">
<meta property="og:url"         content="https://zarix.site/">
<meta property="og:title"       content="Zarix — Suporte IT e Websites para PMEs em Aveiro">
<meta property="og:description" content="Suporte IT e criação de websites para restaurantes e PMEs em Aveiro. Redes Wi-Fi, cibersegurança, chatbots com IA. Diagnóstico gratuito.">
<meta property="og:image"       content="https://zarix.site/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale"      content="pt_PT">
<meta property="twitter:card"   content="summary_large_image">
<meta property="twitter:image"  content="https://zarix.site/og-image.png">
```

### `/criacao-websites-aveiro`
```html
<title>Criação de Websites em Aveiro | Zarix</title>
<meta name="description" content="Websites profissionais para restaurantes e PMEs em Aveiro. Rápidos, modernos e optimizados para Google. Orçamento gratuito — Zarix IT.">
<link rel="canonical" href="https://zarix.site/criacao-websites-aveiro">
<link rel="alternate" hreflang="pt-PT"    href="https://zarix.site/criacao-websites-aveiro">
<link rel="alternate" hreflang="x-default" href="https://zarix.site/criacao-websites-aveiro">
<meta property="og:type"        content="website">
<meta property="og:title"       content="Criação de Websites em Aveiro | Zarix">
<meta property="og:description" content="Websites profissionais para restaurantes e PMEs em Aveiro. Rápidos, modernos e optimizados para Google. Orçamento gratuito — Zarix IT.">
<meta property="og:image"       content="https://zarix.site/og-image.png">
<meta property="og:locale"      content="pt_PT">
<meta property="twitter:card"   content="summary_large_image">
<meta property="twitter:image"  content="https://zarix.site/og-image.png">
```

### `/websites-para-restaurantes`
```html
<title>Website para Restaurante | Aveiro e Portugal | Zarix</title>
<meta name="description" content="Website profissional para o teu restaurante: menu online, reservas, Google Maps integrado e optimizado para pesquisas locais. Zarix — Aveiro.">
<link rel="canonical" href="https://zarix.site/websites-para-restaurantes">
<link rel="alternate" hreflang="pt-PT"    href="https://zarix.site/websites-para-restaurantes">
<link rel="alternate" hreflang="x-default" href="https://zarix.site/websites-para-restaurantes">
<meta property="og:type"        content="website">
<meta property="og:title"       content="Website para Restaurante | Aveiro e Portugal | Zarix">
<meta property="og:description" content="Website profissional para o teu restaurante: menu online, reservas, Google Maps integrado e optimizado para pesquisas locais. Zarix — Aveiro.">
<meta property="og:image"       content="https://zarix.site/og-image.png">
<meta property="og:locale"      content="pt_PT">
<meta property="twitter:card"   content="summary_large_image">
<meta property="twitter:image"  content="https://zarix.site/og-image.png">
```

### `/suporte-it-aveiro`
```html
<title>Suporte IT em Aveiro | Empresas e PMEs | Zarix</title>
<meta name="description" content="Suporte informático para empresas e PMEs em Aveiro. Manutenção, redes, segurança e assistência presencial. Resposta em 24h. Zarix IT.">
<link rel="canonical" href="https://zarix.site/suporte-it-aveiro">
<link rel="alternate" hreflang="pt-PT"    href="https://zarix.site/suporte-it-aveiro">
<link rel="alternate" hreflang="x-default" href="https://zarix.site/suporte-it-aveiro">
<meta property="og:type"        content="website">
<meta property="og:title"       content="Suporte IT em Aveiro | Empresas e PMEs | Zarix">
<meta property="og:description" content="Suporte informático para empresas e PMEs em Aveiro. Manutenção, redes, segurança e assistência presencial. Resposta em 24h. Zarix IT.">
<meta property="og:image"       content="https://zarix.site/og-image.png">
<meta property="og:locale"      content="pt_PT">
<meta property="twitter:card"   content="summary_large_image">
<meta property="twitter:image"  content="https://zarix.site/og-image.png">
```

### `/suporte-it-restaurantes-aveiro`
```html
<title>Suporte IT para Restaurantes em Aveiro | Zarix</title>
<meta name="description" content="Suporte informático dedicado a restaurantes em Aveiro. Wi-Fi, TPAs, caixas, sistemas de gestão e backups. Resposta rápida. Zarix IT.">
<link rel="canonical" href="https://zarix.site/suporte-it-restaurantes-aveiro">
<link rel="alternate" hreflang="pt-PT"    href="https://zarix.site/suporte-it-restaurantes-aveiro">
<link rel="alternate" hreflang="x-default" href="https://zarix.site/suporte-it-restaurantes-aveiro">
<meta property="og:type"        content="website">
<meta property="og:title"       content="Suporte IT para Restaurantes em Aveiro | Zarix">
<meta property="og:description" content="Suporte informático dedicado a restaurantes em Aveiro. Wi-Fi, TPAs, caixas, sistemas de gestão e backups. Resposta rápida. Zarix IT.">
<meta property="og:image"       content="https://zarix.site/og-image.png">
<meta property="og:locale"      content="pt_PT">
<meta property="twitter:card"   content="summary_large_image">
<meta property="twitter:image"  content="https://zarix.site/og-image.png">
```

### `/redes-wifi-empresas-aveiro`
```html
<title>Redes Wi-Fi para Empresas em Aveiro | Zarix</title>
<meta name="description" content="Instalação e configuração de redes Wi-Fi profissionais para empresas em Aveiro. Rede separada para clientes e staff, VPN e monitorização. Zarix IT.">
<link rel="canonical" href="https://zarix.site/redes-wifi-empresas-aveiro">
<link rel="alternate" hreflang="pt-PT"    href="https://zarix.site/redes-wifi-empresas-aveiro">
<link rel="alternate" hreflang="x-default" href="https://zarix.site/redes-wifi-empresas-aveiro">
<meta property="og:type"        content="website">
<meta property="og:title"       content="Redes Wi-Fi para Empresas em Aveiro | Zarix">
<meta property="og:description" content="Instalação e configuração de redes Wi-Fi profissionais para empresas em Aveiro. Rede separada para clientes e staff, VPN e monitorização. Zarix IT.">
<meta property="og:image"       content="https://zarix.site/og-image.png">
<meta property="og:locale"      content="pt_PT">
<meta property="twitter:card"   content="summary_large_image">
<meta property="twitter:image"  content="https://zarix.site/og-image.png">
```

### `/ciberseguranca-pme`
```html
<title>Cibersegurança para PMEs | Portugal | Zarix</title>
<meta name="description" content="Proteção cibernética para pequenas e médias empresas em Portugal. Antivírus gerido, backups, RGPD e formação de colaboradores. Zarix IT — Aveiro.">
<link rel="canonical" href="https://zarix.site/ciberseguranca-pme">
<link rel="alternate" hreflang="pt-PT"    href="https://zarix.site/ciberseguranca-pme">
<link rel="alternate" hreflang="x-default" href="https://zarix.site/ciberseguranca-pme">
<meta property="og:type"        content="website">
<meta property="og:title"       content="Cibersegurança para PMEs | Portugal | Zarix">
<meta property="og:description" content="Proteção cibernética para pequenas e médias empresas em Portugal. Antivírus gerido, backups, RGPD e formação de colaboradores. Zarix IT — Aveiro.">
<meta property="og:image"       content="https://zarix.site/og-image.png">
<meta property="og:locale"      content="pt_PT">
<meta property="twitter:card"   content="summary_large_image">
<meta property="twitter:image"  content="https://zarix.site/og-image.png">
```

### `/chatbots-ia-whatsapp`
```html
<title>Chatbot WhatsApp para Restaurantes | Zarix</title>
<meta name="description" content="Chatbot WhatsApp para restaurantes e PMEs: reservas automáticas, respostas 24h, menu digital integrado. Sem perder clientes fora de horário. Zarix IT.">
<link rel="canonical" href="https://zarix.site/chatbots-ia-whatsapp">
<link rel="alternate" hreflang="pt-PT"    href="https://zarix.site/chatbots-ia-whatsapp">
<link rel="alternate" hreflang="x-default" href="https://zarix.site/chatbots-ia-whatsapp">
<meta property="og:type"        content="website">
<meta property="og:title"       content="Chatbot WhatsApp para Restaurantes | Zarix">
<meta property="og:description" content="Chatbot WhatsApp para restaurantes e PMEs: reservas automáticas, respostas 24h, menu digital integrado. Sem perder clientes fora de horário. Zarix IT.">
<meta property="og:image"       content="https://zarix.site/og-image.png">
<meta property="og:locale"      content="pt_PT">
<meta property="twitter:card"   content="summary_large_image">
<meta property="twitter:image"  content="https://zarix.site/og-image.png">
```

### `/manutencao-informatica-aveiro`
```html
<title>Manutenção Informática em Aveiro | Zarix</title>
<meta name="description" content="Manutenção e reparação informática para empresas em Aveiro. Diagnóstico, reparação de PCs e portáteis, remoção de vírus e upgrades. Zarix IT.">
<link rel="canonical" href="https://zarix.site/manutencao-informatica-aveiro">
<link rel="alternate" hreflang="pt-PT"    href="https://zarix.site/manutencao-informatica-aveiro">
<link rel="alternate" hreflang="x-default" href="https://zarix.site/manutencao-informatica-aveiro">
<meta property="og:type"        content="website">
<meta property="og:title"       content="Manutenção Informática em Aveiro | Zarix">
<meta property="og:description" content="Manutenção e reparação informática para empresas em Aveiro. Diagnóstico, reparação de PCs e portáteis, remoção de vírus e upgrades. Zarix IT.">
<meta property="og:image"       content="https://zarix.site/og-image.png">
<meta property="og:locale"      content="pt_PT">
<meta property="twitter:card"   content="summary_large_image">
<meta property="twitter:image"  content="https://zarix.site/og-image.png">
```

### `/blog`
```html
<title>Blog Zarix — Dicas de IT, Websites e Tecnologia para PMEs em Aveiro</title>
<meta name="description" content="Artigos práticos sobre websites, suporte IT, cibersegurança e chatbots para restaurantes e PMEs em Aveiro. Publicados pela equipa Zarix.">
<link rel="canonical" href="https://zarix.site/blog">
<link rel="alternate" hreflang="pt-PT"    href="https://zarix.site/blog">
<link rel="alternate" hreflang="x-default" href="https://zarix.site/blog">
<meta property="og:type"        content="website">
<meta property="og:url"         content="https://zarix.site/blog">
<meta property="og:title"       content="Blog Zarix — Dicas de IT e Tecnologia para PMEs">
<meta property="og:description" content="Artigos práticos sobre websites, suporte IT, cibersegurança e chatbots para restaurantes e PMEs em Aveiro.">
<meta property="og:image"       content="https://zarix.site/og-image.png">
<meta property="og:locale"      content="pt_PT">
<meta property="twitter:card"   content="summary_large_image">
<meta property="twitter:image"  content="https://zarix.site/og-image.png">
```

### `/blog-website-vs-instagram-restaurante`
```html
<title>Website ou Instagram para o teu restaurante? | Zarix Blog</title>
<meta name="description" content="Website vs Instagram restaurante: o que escolher? Descobre o que cada plataforma faz pelo teu negócio e por que a maioria dos restaurantes precisa das duas.">
<link rel="canonical" href="https://zarix.site/blog-website-vs-instagram-restaurante">
<link rel="alternate" hreflang="pt-PT"    href="https://zarix.site/blog-website-vs-instagram-restaurante">
<link rel="alternate" hreflang="x-default" href="https://zarix.site/blog-website-vs-instagram-restaurante">
<meta property="og:type"        content="article">
<meta property="og:title"       content="Website ou Instagram para o teu restaurante? | Zarix Blog">
<meta property="og:description" content="Website vs Instagram restaurante: o que escolher? Descobre o que cada plataforma faz pelo teu negócio e por que a maioria dos restaurantes precisa das duas.">
<meta property="og:image"       content="https://zarix.site/og-image.png">
<meta property="og:locale"      content="pt_PT">
<meta property="article:published_time" content="2026-05-28T00:00:00+01:00">
<meta property="twitter:card"   content="summary_large_image">
<meta property="twitter:image"  content="https://zarix.site/og-image.png">
```

---

## 9. SCHEMA MARKUP — BLOQUES JSON-LD

Estos bloques deben copiarse exactamente en el nuevo sitio.

### LocalBusiness (todas las páginas)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://zarix.site/#business",
  "name": "Zarix",
  "alternateName": "Zarix — Suporte IT e Websites para Negócios",
  "description": "Suporte IT e criação de websites para restaurantes e PMEs em Aveiro. Redes Wi-Fi, cibersegurança, chatbots com IA, manutenção informática e websites profissionais. Diagnóstico gratuito sem compromisso.",
  "url": "https://zarix.site/",
  "logo": "https://zarix.site/favicon-192.png",
  "image": "https://zarix.site/og-image.png",
  "telephone": "+351967608772",
  "email": "info@zarix.site",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Aveiro",
    "addressRegion": "Aveiro",
    "addressCountry": "PT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.6405,
    "longitude": -8.6538
  },
  "areaServed": [
    { "@type": "City", "name": "Aveiro" },
    { "@type": "AdministrativeArea", "name": "Distrito de Aveiro" }
  ],
  "priceRange": "€€",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "9",
    "bestRating": "5",
    "worstRating": "1"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }],
  "sameAs": [
    "https://www.instagram.com/zarix_it/",
    "https://wa.me/351967608772"
  ]
}
```

### WebSite (homepage únicamente)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://zarix.site/",
  "inLanguage": "pt-PT",
  "publisher": { "@id": "https://zarix.site/#business" }
}
```

### BreadcrumbList (todas las páginas de servicio y blog)

Patrón — adaptar `name` e `item` a cada página:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://zarix.site/" },
    { "@type": "ListItem", "position": 2, "name": "[NOMBRE DE LA PÁGINA]", "item": "https://zarix.site/[slug]" }
  ]
}
```

### FAQPage (páginas de servicio — cada una con sus propias preguntas)

Las preguntas de cada página están documentadas en los archivos HTML originales.
No inventar nuevas preguntas — copiar las existentes exactamente.

| Página | Nº de Q&As |
|--------|-----------|
| criacao-websites-aveiro | 5 |
| websites-para-restaurantes | 5 |
| suporte-it-aveiro | 5+ |
| suporte-it-restaurantes-aveiro | 5+ |
| redes-wifi-empresas-aveiro | 5+ |
| ciberseguranca-pme | 5+ |
| chatbots-ia-whatsapp | 5+ |
| manutencao-informatica-aveiro | 5+ |
| index (homepage) | 5 |

### Blog schema (`/blog`)

```json
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog Zarix",
  "url": "https://zarix.site/blog",
  "description": "Dicas de IT, websites e tecnologia para PMEs em Aveiro",
  "publisher": {
    "@type": "Organization",
    "name": "Zarix",
    "url": "https://zarix.site",
    "logo": {
      "@type": "ImageObject",
      "url": "https://zarix.site/favicon-192.png"
    }
  }
}
```

### BlogPosting (`/blog-website-vs-instagram-restaurante`)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Website ou Instagram: o que faz mais sentido para o teu restaurante?",
  "description": "Website vs Instagram restaurante: o que escolher? Descobre o que cada plataforma faz pelo teu negócio e por que a maioria dos restaurantes precisa das duas.",
  "author": { "@type": "Organization", "name": "Zarix", "url": "https://zarix.site" },
  "publisher": {
    "@type": "Organization",
    "name": "Zarix",
    "logo": { "@type": "ImageObject", "url": "https://zarix.site/favicon-192.png" }
  },
  "datePublished": "2026-05-28",
  "dateModified": "2026-05-28",
  "url": "https://zarix.site/blog-website-vs-instagram-restaurante",
  "mainEntityOfPage": "https://zarix.site/blog-website-vs-instagram-restaurante"
}
```

---

## 10. HEADINGS H1 — UNO POR PÁGINA, EXACTO

| Página | H1 |
|--------|----|
| `/` | `Zarix — Suporte IT e Websites para PMEs em Aveiro` |
| `/criacao-websites-aveiro` | `Criação de Websites Profissionais em Aveiro` |
| `/websites-para-restaurantes` | `Website Profissional para o Teu Restaurante` |
| `/suporte-it-aveiro` | `Suporte Informático para Empresas em Aveiro` |
| `/suporte-it-restaurantes-aveiro` | `Suporte IT Especializado para Restaurantes em Aveiro` |
| `/redes-wifi-empresas-aveiro` | `Instalação de Redes Wi-Fi para Empresas em Aveiro` |
| `/ciberseguranca-pme` | `Cibersegurança para Pequenas e Médias Empresas` |
| `/chatbots-ia-whatsapp` | `Chatbots e Automação com IA para o Teu Negócio` |
| `/manutencao-informatica-aveiro` | `Manutenção e Reparação Informática em Aveiro` |
| `/blog` | `Dicas de IT e Tecnologia para a tua PME` |
| `/blog-website-vs-instagram-restaurante` | `Website ou Instagram: o que faz mais sentido para o teu restaurante?` |

Regla: exactamente **un H1 por página**, con el texto arriba.
El diseño puede presentarlo de forma diferente visualmente, pero el texto del H1 no cambia.

---

## 11. ASSETS — ARCHIVOS QUE DEBEN EXISTIR EN LA RAÍZ

```
/favicon.ico              → favicon estándar
/favicon-32.png           → 32×32 px
/favicon-192.png          → 192×192 px (también usado en schema como logo)
/apple-touch-icon.png     → 180×180 px
/og-image.png             → 1200×630 px (imagen Open Graph de todo el sitio)
```

Todos los tags `<link rel="icon">` y `<link rel="apple-touch-icon">` deben apuntar a estas rutas exactas.
El `og:image` de todas las páginas apunta a `https://zarix.site/og-image.png` — no cambiar la ruta.

---

## 12. ROBOTS.TXT — PRESERVAR INTACTO

```
User-agent: *
Allow: /
Disallow: /*.json$
Disallow: /node_modules/
Disallow: /.git/
Sitemap: https://zarix.site/sitemap.xml
```

---

## 13. SITEMAP.XML — PRESERVAR TODAS LAS URLS

Si se añaden páginas nuevas, añadir entradas al sitemap.
Si se cambia algún slug (no hacer esto), actualizar la entrada correspondiente.
Las 11 URLs existentes deben permanecer en el sitemap con sus prioridades actuales.

Después de cada deploy: re-enviar el sitemap en Google Search Console.

---

## 14. .HTACCESS — REGLAS DE REDIRECT (NO BORRAR)

```apache
Options -MultiViews
RewriteEngine On
RewriteBase /

# www → non-www (canónico)
RewriteCond %{HTTP_HOST} ^www\.zarix\.site [NC]
RewriteRule ^ https://zarix.site%{REQUEST_URI} [R=301,L,NE]

# .html → URL limpia (301 SEO)
RewriteCond %{THE_REQUEST} \s/([^.]+)\.html[\s?] [NC]
RewriteRule ^ /%1 [R=301,L,NE]

# Trailing slash → sin slash (301)
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)/$ /$1 [R=301,L,NE]

# Sirve .html para URLs limpias (transparente, sin redirect)
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^ %{REQUEST_URI}.html [L]
```

Si el nuevo sitio usa un servidor diferente (Nginx, Vercel, Netlify), estas reglas deben replicarse en el formato correspondiente.

---

## 15. NAVEGACIÓN — ESTRUCTURA OBLIGATORIA

Estos enlaces deben estar accesibles en todas las páginas (header o footer).
Su presencia garantiza que Google pueda rastrear todo el sitio desde cualquier página.

```
/                              → Homepage
/criacao-websites-aveiro       → Websites
/suporte-it-restaurantes-aveiro → Restaurantes
/blog                          → Blog
/#contact                      → Contacto / CTA principal
https://www.instagram.com/zarix_it/   → Instagram (footer)
https://wa.me/351967608772            → WhatsApp (footer + FAB)
```

---

## 16. MODAL DE PRIVACIDAD

Debe existir en todas las páginas. Puede rediseñarse visualmente pero debe:
- Ser accesible desde el footer (botón "Política de Privacidade")
- Ser accesible desde el checkbox GDPR del formulario
- Contener el texto de la política vigente (7 secciones RGPD)
- No usar una URL propia (funciona como overlay/modal)

---

## 17. CHECKLIST FINAL PRE-DEPLOY

Ejecutar esto antes de publicar el nuevo sitio:

### URLs
- [ ] Las 11 URLs devuelven HTTP 200
- [ ] `www.zarix.site` redirige a `zarix.site` con 301
- [ ] URLs con `.html` redirigen a URL limpia con 301
- [ ] URLs con trailing slash redirigen sin slash con 301

### SEO en página
- [ ] Cada página tiene exactamente un H1 (ver sección 10)
- [ ] Cada página tiene `<title>` exacto (ver sección 8)
- [ ] Cada página tiene `<meta name="description">` exacto (ver sección 8)
- [ ] Cada página tiene `<link rel="canonical">` correcto
- [ ] Cada página tiene hreflang pt-PT y x-default
- [ ] Cada página tiene OG tags completos
- [ ] Cada página tiene `twitter:card` y `twitter:image`

### Schema
- [ ] Validar JSON-LD en https://validator.schema.org para las 11 páginas
- [ ] LocalBusiness presente en todas las páginas
- [ ] FAQPage presente en todas las páginas de servicio
- [ ] BreadcrumbList presente en todas las páginas excepto homepage
- [ ] BlogPosting presente en el artículo de blog
- [ ] WebSite presente en homepage

### Analytics
- [ ] GA4 (`G-WL0GVH0WDH`) disparando en todas las páginas — verificar en Realtime
- [ ] Clarity (`x6dfcd3uz9`) activo en todas las páginas — verificar en dashboard
- [ ] Evento `generate_lead` se dispara al enviar el formulario
- [ ] Evento `whatsapp_click` se dispara al pulsar WhatsApp FAB
- [ ] Evento `phone_call` se dispara al pulsar el teléfono

### Integraciones
- [ ] Formulario Formspree (`xaqvedjq`) envía correctamente
- [ ] WhatsApp FAB visible y funcional en todas las páginas
- [ ] Modal de privacidad abre desde footer y desde formulario

### Assets
- [ ] `/favicon.ico` accesible
- [ ] `/favicon-32.png` accesible
- [ ] `/favicon-192.png` accesible
- [ ] `/apple-touch-icon.png` accesible
- [ ] `/og-image.png` accesible y con dimensiones 1200×630

### Post-deploy
- [ ] Re-enviar `sitemap.xml` en Google Search Console
- [ ] Solicitar indexación de la homepage en GSC
- [ ] Verificar que no hay errores de cobertura en GSC (48h después del deploy)
- [ ] Confirmar que no hay caída de sesiones en GA4 (7 días después del deploy)

---

*Última actualización del audit: 2026-06-18*
*Basado en análisis completo del repositorio ZarixNew2*
