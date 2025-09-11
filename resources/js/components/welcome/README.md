# Welcome Page Components

Este directorio contiene todos los componentes de la página de bienvenida, divididos siguiendo el principio de responsabilidad única.

## Estructura de Componentes

### 📄 `SEOHead.tsx`
**Responsabilidad**: Manejo de metadatos SEO y structured data
- Meta tags para SEO
- Open Graph y Twitter Cards
- Structured data (Organization, Software, FAQ)
- Estilos CSS personalizados

### 🧭 `Header.tsx`
**Responsabilidad**: Navegación principal
- Logo de SignalOne
- Enlaces de navegación
- Botones de login/registro
- Estado de autenticación

### 🎬 `HeroSection.tsx`
**Responsabilidad**: Sección principal de presentación
- Imagen de fondo con overlay
- Título principal y descripción
- Botones CTA principales
- Estadísticas destacadas
- Elementos flotantes decorativos

### ⚡ `FeaturesSection.tsx`
**Responsabilidad**: Presentación de características principales
- Grid de características
- Iconos y descripciones
- Efectos hover y animaciones

### 🏢 `UseCasesSection.tsx`
**Responsabilidad**: Casos de uso específicos por industria
- Casos de uso por tipo de negocio
- Información localizada (Chile)
- Cards con gradientes y efectos

### ✅ `BenefitsSection.tsx`
**Responsabilidad**: Beneficios y ventajas competitivas
- Lista de beneficios con checks
- Métricas visuales
- Elementos decorativos

### 📢 `CTASection.tsx`
**Responsabilidad**: Llamada a la acción principal
- Mensaje de conversión
- Botón de registro
- Fondo branded

### ❓ `FAQSection.tsx`
**Responsabilidad**: Preguntas frecuentes
- Lista de FAQs sobre portal cautivo
- Respuestas optimizadas para SEO
- CTA secundario

### 🦶 `Footer.tsx`
**Responsabilidad**: Pie de página
- Información de la empresa
- Enlaces de navegación
- Copyright y legal

## Tipos de Datos

### Feature
```typescript
interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}
```

### Stat
```typescript
interface Stat {
    number: string;
    label: string;
}
```

### Benefit
```typescript
interface Benefit {
    title: string;
    description: string;
}
```

## Uso

```tsx
import {
    Header,
    HeroSection,
    FeaturesSection,
    // ... otros componentes
} from '@/components/welcome';

// O importar individualmente
import Header from '@/components/welcome/Header';
```

## Principios Aplicados

1. **Single Responsibility Principle**: Cada componente tiene una única responsabilidad
2. **Reusabilidad**: Componentes configurables mediante props
3. **Mantenibilidad**: Código organizado y fácil de encontrar
4. **Testabilidad**: Componentes aislados y fáciles de testear
5. **Performance**: Componentes optimizados individualmente

## Beneficios de la Refactorización

- ✅ Código más organizado y mantenible
- ✅ Componentes reutilizables
- ✅ Fácil testing individual
- ✅ Mejor separación de responsabilidades
- ✅ Carga más eficiente (tree shaking)
- ✅ Desarrollo colaborativo más fácil
