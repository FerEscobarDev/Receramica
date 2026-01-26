# Plan de Implementación - Recerámica

## Resumen del Proyecto
Sitio web de cerámica de autor para Ricardo Escobar. Experiencia inmersiva con exposición fullscreen inicial, landing page completa y modal de detalle de piezas.

---

## Análisis del Diseño

### Paleta de Colores (Variables del diseño .pen)
| Variable | Color | Uso |
|----------|-------|-----|
| `bg-earth` | `#1A1512` | Fondo principal oscuro |
| `bg-clay` | `#2A241F` | Fondo de secciones |
| `bg-warm` | `#3D352D` | Fondo cálido/cards |
| `cream` | `#E8DFD5` | Texto principal claro |
| `terracotta` | `#C9725A` | Acentos principales |
| `terracotta-dark` | `#8B4D3A` | Terracota oscuro |
| `gold-earth` | `#B8956D` | Dorado tierra |
| `sand` | `#B8A898` | Arena |
| `text-primary` | `#F5EDE5` | Texto primario |
| `text-secondary` | `#A89888` | Texto secundario |
| `text-muted` | `#6E6058` | Texto atenuado |

### Tipografías
- **Cormorant Garamond**: Títulos (300, 500, 600)
- **Inter**: Texto de cuerpo (400, 500)

### Componentes Principales
1. **Exposición Fullscreen** - Grid de tiles con overlay oscuro
2. **Landing Page** - Secciones: Header, Hero, Gallery, Artist, Innovation, Workshop, Essence, CTA, Footer
3. **Modal Detalle Pieza** - Galería de imágenes + información detallada

---

## Fases de Implementación

### FASE 1: Configuración Base ✅
- [x] 1.1 Configurar variables CSS con colores del diseño
- [x] 1.2 Configurar fuentes Google (Cormorant Garamond + Inter)
- [x] 1.3 Configurar Next.js para imágenes remotas (API)
- [x] 1.4 Configurar estructura de carpetas del proyecto
- [x] 1.5 Crear tipos TypeScript para datos de API
- [x] 1.6 Configurar environment variables seguras

### FASE 2: Internacionalización (i18n) ✅
- [x] 2.1 Instalar y configurar next-intl
- [x] 2.2 Crear estructura de archivos de traducción (en/es)
- [x] 2.3 Configurar inglés como idioma por defecto
- [x] 2.4 Configurar middleware y routing de idiomas
- [x] 2.5 Implementar selector de idioma

### FASE 3: API y Caché de Imágenes ✅
- [x] 3.1 Crear servicio de API para consumo de piezas
- [x] 3.2 Implementar caché de imágenes en servidor (ISR)
- [x] 3.3 Crear API route para revalidación
- [x] 3.4 Optimizar carga con next/image y blur placeholder
- [x] 3.5 Implementar prefetch de imágenes críticas

### FASE 4: Componentes Base
- [ ] 4.1 Crear componente Header con navegación
- [ ] 4.2 Crear componente Footer
- [ ] 4.3 Crear componente Button (variantes: primary, outline)
- [ ] 4.4 Crear componente IconButton (navegación carrusel)
- [ ] 4.5 Crear componente SectionTitle (label + title + description)

### FASE 5: Landing Page - Secciones
- [ ] 5.1 Implementar Hero Section con gradiente radial
- [ ] 5.2 Implementar Gallery Section con carrusel 3D oval
- [ ] 5.3 Implementar Artist Section (imagen + contenido)
- [ ] 5.4 Implementar Innovation Section (3 feature cards)
- [ ] 5.5 Implementar Workshop Section (contenido + imagen)
- [ ] 5.6 Implementar Essence Section (3 materiales circulares)
- [ ] 5.7 Implementar CTA Section con botones
- [ ] 5.8 Integrar todas las secciones en página principal

### FASE 6: Carrusel 3D de Galería
- [ ] 6.1 Crear hook useCarousel para estado del carrusel
- [ ] 6.2 Implementar efecto de profundidad 3D (escala, opacidad)
- [ ] 6.3 Implementar navegación con flechas
- [ ] 6.4 Implementar indicadores de puntos (dots)
- [ ] 6.5 Agregar animaciones de transición suaves
- [ ] 6.6 Implementar swipe para móvil

### FASE 7: Exposición Fullscreen
- [ ] 7.1 Crear componente ExpositionGrid (masonry layout)
- [ ] 7.2 Implementar overlay con gradiente radial
- [ ] 7.3 Crear botón de cierre flotante animado
- [ ] 7.4 Implementar título overlay con animación de entrada
- [ ] 7.5 Crear animación de apertura/cierre (fade + scale)
- [ ] 7.6 Implementar scroll de tiles con efecto parallax
- [ ] 7.7 Manejar estado de visibilidad (localStorage para no repetir)

### FASE 8: Modal Detalle Pieza
- [ ] 8.1 Crear estructura del modal (2 columnas)
- [ ] 8.2 Implementar galería de imágenes con thumbnails
- [ ] 8.3 Implementar navegación de imágenes (prev/next)
- [ ] 8.4 Crear sección de información de pieza
- [ ] 8.5 Implementar scroll de descripción con indicador
- [ ] 8.6 Agregar botón WhatsApp con deep link
- [ ] 8.7 Implementar animación de entrada/salida
- [ ] 8.8 Manejar cierre con ESC y click fuera

### FASE 9: Estados y Animaciones Globales
- [ ] 9.1 Crear contexto global para estado de UI (modals, exposition)
- [ ] 9.2 Implementar transiciones de página suaves
- [ ] 9.3 Agregar animaciones de scroll (intersection observer)
- [ ] 9.4 Implementar skeleton loaders para imágenes
- [ ] 9.5 Agregar efectos hover en elementos interactivos
- [ ] 9.6 Optimizar animaciones para performance (will-change, transform)

### FASE 10: SEO y Performance
- [ ] 10.1 Configurar metadata dinámica por página
- [ ] 10.2 Implementar Open Graph y Twitter Cards
- [ ] 10.3 Crear sitemap.xml dinámico
- [ ] 10.4 Crear robots.txt
- [ ] 10.5 Implementar JSON-LD (ArtGallery, Artist, Product schemas)
- [ ] 10.6 Optimizar Core Web Vitals (LCP, FID, CLS)
- [ ] 10.7 Configurar preconnect para recursos externos
- [ ] 10.8 Implementar lazy loading inteligente

### FASE 11: Testing y Pulido Final
- [ ] 11.1 Revisar responsive en todos los breakpoints
- [ ] 11.2 Verificar accesibilidad (ARIA, keyboard nav)
- [ ] 11.3 Testear en diferentes navegadores
- [ ] 11.4 Optimizar bundle size
- [ ] 11.5 Verificar rendimiento en móvil
- [ ] 11.6 Documentar componentes principales

---

## Estructura de Carpetas

```
receramica/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx              # Landing page principal
│   │   └── layout.tsx            # Layout con i18n
│   ├── api/
│   │   ├── pieces/route.ts       # API de piezas
│   │   └── images/[...path]/route.ts  # Proxy de imágenes
│   ├── globals.css
│   ├── layout.tsx
│   └── sitemap.ts
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── IconButton.tsx
│   │   └── SectionTitle.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── ArtistSection.tsx
│   │   ├── InnovationSection.tsx
│   │   ├── WorkshopSection.tsx
│   │   ├── EssenceSection.tsx
│   │   └── CTASection.tsx
│   ├── gallery/
│   │   ├── Carousel3D.tsx
│   │   ├── CarouselSlide.tsx
│   │   └── CarouselDots.tsx
│   ├── exposition/
│   │   ├── ExpositionFullscreen.tsx
│   │   ├── ExpositionGrid.tsx
│   │   └── ExpositionTile.tsx
│   └── modal/
│       ├── PieceModal.tsx
│       ├── ImageGallery.tsx
│       └── PieceInfo.tsx
├── hooks/
│   ├── useCarousel.ts
│   ├── usePieces.ts
│   ├── useModal.ts
│   └── useExposition.ts
├── lib/
│   ├── api.ts                    # Cliente API
│   ├── constants.ts              # Constantes
│   └── utils.ts                  # Utilidades
├── types/
│   ├── piece.ts                  # Tipos de piezas
│   └── api.ts                    # Tipos de respuestas API
├── i18n/
│   ├── config.ts
│   └── messages/
│       ├── en.json
│       └── es.json
├── context/
│   └── UIContext.tsx             # Estado global UI
└── public/
    └── Images/
        ├── logoHorizontalBlanco.png
        ├── ricardo.jpg
        ├── taller.jpg
        ├── tecnica.jpg
        └── barro.jpg
```

---

## Flujo de Usuario

```
┌─────────────────────────────────────────────────────────┐
│                    CARGA INICIAL                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │         EXPOSICIÓN FULLSCREEN                      │  │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐         │  │
│  │  │Tile │ │Tile │ │Tile │ │Tile │ │Tile │         │  │
│  │  └──┬──┘ └─────┘ └─────┘ └─────┘ └─────┘         │  │
│  │     │         [X] Cerrar                          │  │
│  │     │                                             │  │
│  │     ▼ Click en pieza                              │  │
│  └───────────────────────────────────────────────────┘  │
│         │                    │                          │
│         │                    ▼                          │
│         │      ┌─────────────────────────┐              │
│         │      │   MODAL DETALLE PIEZA   │              │
│         │      │  ┌─────────┐ ┌────────┐ │              │
│         │      │  │ Galería │ │  Info  │ │              │
│         │      │  └─────────┘ └────────┘ │              │
│         │      │        [WhatsApp]       │              │
│         │      └─────────────────────────┘              │
│         │                                               │
│         ▼ Cerrar Exposición                             │
│  ┌───────────────────────────────────────────────────┐  │
│  │              LANDING PAGE                          │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │ Header                                       │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │ Hero: Ricardo Escobar                        │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │ Gallery: Carrusel 3D ──────► Modal Pieza    │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │ Artist Section                               │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │ Innovation Section                           │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │ Workshop Section                             │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │ Essence Section                              │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │ CTA Section                                  │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │ Footer                                       │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Detalles Técnicos

### Caché de Imágenes (Estrategia)
1. **Primera carga**:
   - API route hace fetch a `ricardo-admin.receramica.com/storage/`
   - Guarda imagen en cache de Next.js (ISR)
   - Retorna imagen optimizada

2. **Cargas subsecuentes**:
   - Sirve desde cache local de Next.js
   - Revalidación en background cada 24h

3. **Blur placeholder**:
   - Generar base64 blur hash en servidor
   - Mostrar mientras carga imagen full

### Animaciones Clave

| Componente | Animación | Duración |
|------------|-----------|----------|
| Exposición entrada | Fade in + tiles stagger | 800ms |
| Exposición cierre | Fade out + scale down | 500ms |
| Modal entrada | Fade + slide up | 400ms |
| Modal cierre | Fade + slide down | 300ms |
| Carrusel transición | Spring animation | 600ms |
| Hover cards | Scale 1.02 + shadow | 200ms |
| Scroll reveal | Fade up | 600ms |

### SEO Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "ArtGallery",
  "name": "Recerámica - Ricardo Escobar",
  "description": "Cerámica de autor",
  "artist": {
    "@type": "Person",
    "name": "Ricardo Escobar"
  },
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "VisualArtwork",
        "name": "Vasija del Fénix",
        "artMedium": "Cerámica esmaltada"
      }
    }
  ]
}
```

---

## Dependencias a Instalar

```bash
npm install next-intl framer-motion
npm install -D @types/node
```

- **next-intl**: Internacionalización
- **framer-motion**: Animaciones fluidas

---

## Variables de Entorno

```env
# .env.local
NEXT_PUBLIC_API_URL=https://ricardo-admin.receramica.com
API_AUTH_TOKEN=Bearer BC4agMG15lM7Nv1qyNkjg51DVOFilg9hGPNPS90hd707065d
NEXT_PUBLIC_SITE_URL=https://receramica.com
```

---

## Notas de Implementación

### Prioridades
1. **Performance first**: Carga rápida es crítica para la experiencia
2. **Mobile first**: Diseñar responsive desde móvil
3. **Accesibilidad**: Navegación por teclado, ARIA labels
4. **SEO**: Cada pieza debe ser indexable

### Patrones de Código
- **Server Components** por defecto
- **Client Components** solo donde sea necesario (interactividad)
- **Composición sobre herencia**
- **Custom hooks** para lógica reutilizable
- **Context** solo para estado verdaderamente global

### Consideraciones de UX
- La exposición fullscreen solo se muestra en primera visita (localStorage)
- El modal debe bloquear scroll del body
- Transiciones suaves entre estados
- Feedback visual en todas las interacciones

---

## Progreso

**Fase actual**: Fase 4 - Componentes Base
**Completado**: 25% (16/64 tareas)
**Última actualización**: 2026-01-25

### Archivos creados en Fase 3:
- `app/api/pieces/route.ts` - API de listado de piezas con caché ISR
- `app/api/pieces/[id]/route.ts` - API de detalle de pieza
- `app/api/revalidate/route.ts` - API de revalidación de caché
- `components/ui/OptimizedImage.tsx` - Imagen con blur placeholder y loading
- `components/ui/Skeleton.tsx` - Skeletons para loading states
- `hooks/useImagePrefetch.ts` - Hooks para prefetch de imágenes

### Archivos creados en Fase 2:
- `i18n/config.ts` - Configuración de locales (en, es)
- `i18n/request.ts` - Configuración para server components
- `i18n/messages/en.json` - Traducciones en inglés
- `i18n/messages/es.json` - Traducciones en español
- `middleware.ts` - Middleware para routing de idiomas
- `app/[locale]/layout.tsx` - Layout con i18n y UIProvider
- `app/[locale]/page.tsx` - Página principal con locale
- `components/ui/LanguageSwitcher.tsx` - Selector de idioma

### Archivos creados en Fase 1:
- `app/globals.css` - Variables CSS y estilos base
- `app/layout.tsx` - Configuración de fuentes y metadata SEO
- `next.config.ts` - Configuración de imágenes y headers
- `types/piece.ts` - Tipos de piezas cerámicas
- `types/api.ts` - Tipos de respuestas API
- `lib/constants.ts` - Constantes de la aplicación
- `lib/utils.ts` - Funciones utilitarias
- `lib/api.ts` - Cliente API
- `lib/env.ts` - Variables de entorno tipadas
- `context/UIContext.tsx` - Contexto global de UI
- `hooks/useCarousel.ts` - Hook para carrusel
- `hooks/usePieces.ts` - Hook para piezas
- `hooks/useModal.ts` - Hook para modals
- `.env.local` - Variables de entorno
