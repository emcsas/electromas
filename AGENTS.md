# Electromás: instrucciones para Codex

## Alcance del proyecto

- Sitio estático en HTML, CSS y JavaScript nativo.
- Datos y autenticación mediante Supabase.
- Publicación mediante GitHub Pages y dominio propio.
- No convertir el proyecto a React, Next.js, Vue, Angular ni otro framework.
- No agregar Node.js, npm, bundlers, librerías o servicios externos sin autorización expresa.

## Archivos principales

- `index.html`: página principal, catálogo, filtros, búsqueda y detalle de producto.
- `categoria.html`: listado filtrado por categoría, subcategoría, ofertas o combos.
- `editor.html`: editor administrativo conectado a Supabase.
- `config.js`: configuración pública de Supabase.
- `motion.js`: animaciones con Motion para JavaScript.
- `motion.css`: estilos auxiliares y accesibilidad de movimiento.
- `sw.js`: service worker y caché de la PWA.
- `manifest.json`: manifiesto de instalación.

## Reglas obligatorias

1. Leer por completo el archivo que vaya a modificar y revisar sus scripts relacionados.
2. Mantener nombres de archivos, rutas, tablas de Supabase, campos, parámetros URL y estructura existente.
3. No borrar, resumir, dividir ni reescribir bloques existentes salvo que la tarea lo requiera explícitamente.
4. Evitar duplicar listeners, funciones, estilos o scripts ya existentes.
5. Conservar la identidad visual: azul `#142b52`, naranja `#ffa500`, tipografías Anton y Manrope, logotipo e imágenes actuales.
6. Mantener diseño responsive y compatibilidad móvil.
7. Respetar `prefers-reduced-motion` en cualquier animación nueva.
8. No exponer claves privadas. La clave de `config.js` debe seguir siendo únicamente una clave pública/anónima compatible con políticas RLS.
9. No modificar políticas, tablas o datos de Supabase sin una instrucción específica.
10. Antes de finalizar, comprobar sintaxis JavaScript, referencias de archivos, etiquetas HTML y consola del navegador.

## Validación mínima

- Abrir `index.html`, `categoria.html` y `editor.html` sin errores de consola.
- Confirmar que Supabase carga categorías y productos.
- Probar búsqueda, filtros, modal de producto y enlaces de WhatsApp.
- Probar inicio de sesión y edición en `editor.html` sin alterar datos reales durante una revisión visual.
- Comprobar vista móvil en 390 px, tableta en 768 px y escritorio en 1440 px.
- Confirmar que el service worker sigue registrándose y que la PWA conserva sus rutas.

## Forma de entregar cambios

- Explicar archivos modificados.
- Mostrar el diff antes de aplicar cambios amplios.
- No hacer commit, push ni despliegue sin autorización expresa.
