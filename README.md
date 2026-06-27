# Lexicon — Diccionario latino-español de Raimundo de Miguel

Edición digital, en curso, del *Nuevo diccionario latino-español etimológico* de
Raimundo de Miguel y el Marqués de Morante (Madrid, A. Jubera, 1878). Sitio
estático: no necesita servidor ni base de datos; se sirve tal cual en GitHub Pages.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Web pública de consulta (búsqueda por lema + índice navegable). |
| `editor.html` | Formulario para transcribir entradas y exportar el `entries.json`. |
| `entries.json` | **La fuente de verdad.** Todas las entradas, como lista de objetos. |
| `lexicon.js` | Normalización de búsqueda y renderizado, compartidos. |
| `styles.css` | Identidad visual. |

## Publicar en GitHub Pages

1. Crea un repositorio (p. ej. `lexicon`) y sube estos archivos a la raíz.
2. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   rama `main`, carpeta `/ (root)`. Guarda.
3. A los pocos minutos tendrás `https://TU-USUARIO.github.io/lexicon/`.

> El JSON se carga con `fetch`, así que **no funciona abriendo `index.html` con doble
> clic** desde el disco (el navegador lo bloquea). Para probar en local:
> `python3 -m http.server` en esta carpeta y abre `http://localhost:8000`.

## Flujo para ir añadiendo entradas

1. Abre `editor.html` (en local o en el sitio publicado).
2. **Carga primero tu `entries.json` actual** con el selector de archivo, para
   trabajar sobre lo ya hecho.
3. Transcribe la entrada. La vista previa muestra cómo quedará; el panel de JSON,
   el objeto generado.
4. Pulsa **«Añadir entrada a la lista»**. Repite con cuantas quieras.
5. Pulsa **«Descargar entries.json»**: obtienes el fichero completo (lo cargado + lo nuevo).
6. Reemplaza el `entries.json` del repositorio por el descargado y haz commit.
   GitHub Pages se actualiza solo.

El editor genera el `id` y la clave de búsqueda (`search`) automáticamente, así que
no tienes que tocarlos.

## Esquema de una entrada

```json
{
  "id": "adaeque",                 // identificador único (auto)
  "lemma": "adæque",               // titular, con æ y cantidades
  "variants": ["Adadus"],          // titulares alternativos (opcional)
  "search": "adaeque",             // clave normalizada (auto)
  "register": "†",                 // † baja latinidad · ? dudoso (opcional)
  "morph": "as, āvi, ātum, āre",   // flexión / partes principales
  "grammar": "adv.",               // categoría: a. n. f. m. adv. part. p. de…
  "etym": "de ad y æque = …",      // contenido del corchete [ … ]
  "senses": ["…"],                 // acepciones (una por elemento)
  "citations": [                   // ejemplos clásicos
    { "la": "Nulla est adæque…", "au": "Plaut.", "es": "imposible infierno…" }
  ],
  "eq": ["Æque", "peræque"],       // equivalentes tras «= Eq.»
  "note": "…",                     // nota del transcriptor (opcional)
  "source": "De Miguel–Morante 1878",
  "page": "33"
}
```

Solo `id`, `lemma` y `search` son imprescindibles; el resto se omite si no aplica.

## Búsqueda

Normaliza `æ→ae`, `œ→oe` y elimina cantidades/acentos, de modo que `adaeque`
encuentra *adæque* y `acheruns` encuentra *Achĕruns*. De momento busca **por lema**
(y variantes), con prioridad a los que empiezan por lo tecleado.

## Pendiente / ideas

- Buscar también dentro de definiciones y citas (basta ampliar `searchKey`).
- Filtrar por autor citado o por étimo (los datos ya están estructurados para ello).
- Reutilizar `entries.json` como fuente de la app de etimología.
- Paginar el índice cuando haya miles de lemas.

## Licencia y procedencia

El texto del diccionario es de dominio público (obra de 1867/1878). Conviene citar
la fuente y, si procede, el facsímil de partida (Internet Archive / latinonline.es).
La transcripción es trabajo propio y revisable: cada entrada conserva su `source`.
