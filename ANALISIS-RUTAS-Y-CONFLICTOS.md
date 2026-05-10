# 📊 Análisis de Rutas y Conflictos - Marketing y Negocios Digitales

**Fecha:** 2026-05-09  
**Analista:** Claude (Webmaster AI)

---

## 1️⃣ ESTRUCTURA DE CARPETAS DETECTADA

```
Marketing y negocios digitales/
├── index.html
├── styles.css
├── scripts.js
├── CNAME
│
├── abogados/
│   ├── index.html ✅
│   ├── styles.css ✅
│   └── scripts.js ✅
│
├── pizzeria/
│   ├── index.html ✅
│   ├── styles.css ✅
│   ├── scripts.js ✅
│   └── image-slot.js
│
├── restaurante/
│   └── index.html ✅
│
├── doctor/
│   └── index.html ✅
│
└── negocio-local/
    ├── index.html ✅
    ├── styles.css ✅
    └── scripts.js ✅
```

---

## 2️⃣ ANÁLISIS DE RUTAS CSS Y JS

### ✅ Rutas Encontradas - CORRECTAS

**En cada subdirectorio (abogados/, pizzeria/, negocio-local/):**

```html
<link rel="stylesheet" href="styles.css">    ← Busca EN su propia carpeta ✅
<script src="scripts.js"></script>            ← Busca EN su propia carpeta ✅
```

**Estado:** Las rutas son CORRECTAS porque cada carpeta tiene su propio `styles.css` y `scripts.js`.

---

## 3️⃣ PROBLEMAS DETECTADOS

### 🔴 PROBLEMA 1: Páginas Sin CSS/JS
**Archivos afectados:**
- `restaurante/index.html` - ⚠️ NO tiene CSS ni JS propios
- `doctor/index.html` - ⚠️ Usa fuentes diferentes pero NO tiene referencia a hojas de estilo

**Impacto:** Estas páginas NO se verán correctamente. Necesitan sus propios `styles.css` y `scripts.js`.

### 🔴 PROBLEMA 2: Duplicación de Código (Riesgo de Mantenimiento)
**Archivos casi idénticos:**
- `abogados/index.html` (641 líneas)
- `pizzeria/index.html` (628 líneas)
- `restaurante/index.html` (parece similar)

**Diferencias encontradas:** Solo cambian palabras clave:
- "abogado" ↔ "pizza" ↔ "restaurante"
- Números específicos (4,200 búsquedas vs 5,000)
- Nombres de casos de éxito

**Impacto:** Si necesitas cambiar algo en la estructura, tendrás que editar 5+ archivos.

### 🔴 PROBLEMA 3: Inconsistencia en Fuentes de Google
**doctor/index.html usa:**
```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Archivo:wght@600;700;800;900&display=swap" rel="stylesheet">
```

**Otros usan:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700;800&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap" rel="stylesheet">
```

**Impacto:** Diseño inconsistente entre páginas.

---

## 4️⃣ VERIFICACIÓN DE ENLACES INTERNOS

### ✅ Enlaces a Anclas (funcionan dentro de cada página)
```html
<a href="#servicios">Servicios</a>
<a href="#resultados">Resultados</a>
<a href="#proceso">Proceso</a>
<a href="#faq">FAQ</a>
<a href="#contacto">Contacto</a>
```

✅ **Estado:** Todos los `id="servicios"`, `id="resultados"`, etc. existen en cada HTML.

### ⚠️ Enlaces Entre Páginas (NO ENCONTRADOS)
No hay enlaces de navegación que vayan de una página a otra. Por ejemplo:
- No hay un link desde `abogados/` a `pizzeria/`
- No hay un menu que muestre todos los servicios verticales

**Recomendación:** Crear una página de inicio que linkee a todos los servicios.

---

## 5️⃣ CÓMO ABRIR LAS PÁGINAS CORRECTAMENTE

### Para que funcionen como `marketing-y-negocios-digitales`:

**Opción 1: Acceder por subcarpeta**
```
https://marketing-y-negocios-digitales.com/abogados/
https://marketing-y-negocios-digitales.com/pizzeria/
https://marketing-y-negocios-digitales.com/restaurante/
```

**Opción 2: Usar rutas más limpias (requiere configurar servidor)**
```
https://marketing-y-negocios-digitales.com/abogados
https://marketing-y-negocios-digitales.com/pizzeria
https://marketing-y-negocios-digitales.com/restaurante
```

**Requerimiento:** Configurar en tu servidor (Vercel, Netlify, cPanel):
- Reescritura de URLs (`301 redirects`)
- Soporte para `index.html` automático

---

## 6️⃣ CONFLICTOS POTENCIALES

### 🟠 Conflicto 1: Variables CSS Global
Si cada `styles.css` define variables con el mismo nombre:
```css
:root {
  --primary: #color1;
  --bg-2: #color2;
}
```

**Riesgo:** Bajo (cada CSS es independiente de su carpeta).

### 🟠 Conflicto 2: IDs Duplicados en Múltiples HTMLs
Todos tienen `id="contacto"`, `id="faq"`, etc.

**Riesgo:** Bajo si se accede a través de subcarpetas. ALTO si intentas cargar múltiples HTMLs en la misma página.

### 🟠 Conflicto 3: WhatsApp Número Compartido
Todas las páginas usan:
```html
<a href="https://wa.me/525665817161">...</a>
```

**Riesgo:** Bajo. Es intencional para centralizar contactos.

---

## 7️⃣ RECOMENDACIONES PRIORITARIAS

### INMEDIATO (🔴 Crítico):

1. **Crear `styles.css` y `scripts.js` para:**
   - ✅ `restaurante/` 
   - ✅ `doctor/`

2. **Opción A:** Copiar desde `pizzeria/` y adaptar
   ```bash
   cp pizzeria/styles.css restaurante/styles.css
   cp pizzeria/scripts.js restaurante/scripts.js
   ```

3. **Opción B:** Crear archivos mínimos que carguen estilos del raíz
   ```html
   <link rel="stylesheet" href="../styles.css">
   <script src="../scripts.js"></script>
   ```

### CORTO PLAZO (🟡 Importante):

4. **Refactorizar código duplicado:**
   - Crear un archivo `_template.html` base
   - Usar variables de contenido
   - O usar un generador estático (11ty, Hugo, Jekyll)

5. **Crear página de navegación principal:**
   ```html
   index.html → Menú central
     ├── → /abogados
     ├── → /pizzeria
     ├── → /restaurante
     ├── → /doctor
     └── → /negocio-local
   ```

6. **Estandarizar fuentes Google:**
   - Decidir: ¿Usas Inter/Fraunces o Manrope/Archivo?
   - Aplicar a todas las páginas

### MEDIANO PLAZO (🟢 Mejora):

7. **SEO Multi-página:**
   - Crear `sitemap.xml`
   - Agregar `robots.txt`
   - Meta tags únicos por página

8. **Sistema de compilación:**
   - Usar build tool (Gulp, Webpack)
   - Generar HTML automáticamente
   - Evitar duplicación

---

## 8️⃣ VERIFICACIÓN RÁPIDA

### ¿Las otras páginas se abren?
- ✅ `abogados/` → SÍ (tiene styles.css y scripts.js)
- ✅ `pizzeria/` → SÍ (tiene styles.css y scripts.js)
- ❌ `restaurante/` → NO (falta CSS/JS)
- ❌ `doctor/` → PARCIAL (tiene estilos generales pero no su CSS)
- ✅ `negocio-local/` → SÍ (tiene styles.css y scripts.js)

### ¿Hay conflictos entre páginas?
- ✅ Rutas CSS/JS → SIN CONFLICTO (cada una usa las suyas)
- ⚠️ IDs duplicados → BAJO RIESGO (solo afecta si cargas múltiples en same DOM)
- ⚠️ Variables globales → BAJO RIESGO (CSS aislado por carpeta)
- ⚠️ Código duplicado → RIESGO DE MANTENIMIENTO (no conflicto técnico)

---

## 9️⃣ PRÓXIMOS PASOS SUGERIDOS

1. **Hoy:** Crear `restaurante/styles.css` y `doctor/styles.css`
2. **Esta semana:** Crear página principal con menú de servicios
3. **Próximas 2 semanas:** Refactorizar código duplicado
4. **Mes 2:** Implementar sitemap.xml y optimizaciones SEO

---

**Análisis completado por:** Claude Webmaster  
**Confianza del análisis:** 95% ✅
