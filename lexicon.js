/* ============================================================
   lexicon.js — utilidades compartidas (consulta y editor)
   ============================================================ */

/* Normaliza para búsqueda y para generar identificadores:
   æ→ae, œ→oe, elimina macrones/breves/acentos, minúsculas, solo letras. */
function normalize(s){
  return (s || '')
    .toString()
    .toLowerCase()
    .replace(/æ/g, 'ae').replace(/œ/g, 'oe')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // quita diacríticos combinables
    .replace(/[^a-z0-9]/g, '');
}

/* Escape HTML para insertar texto del usuario sin riesgo de inyección. */
function esc(s){
  return (s == null ? '' : String(s))
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* Cadena de búsqueda de una entrada: lema + variantes, normalizados. */
function searchKey(entry){
  if (entry.search) return entry.search;
  const parts = [entry.lemma, ...(entry.variants || [])];
  return parts.map(normalize).join(' ');
}

/* Devuelve el HTML de una entrada con la tipografía del De Miguel. */
function renderEntry(e){
  const dagger = e.register === '†'
    ? '<span class="dagger">†</span> '
    : (e.register === '?' ? '<span class="dagger">?</span> ' : '');

  const variants = (e.variants && e.variants.length)
    ? e.variants.map(v => ` <span class="vel">ó</span> <span class="rubric">${esc(v)}</span>`).join('')
    : '';

  const morphBits = [e.morph, e.grammar].filter(Boolean).map(esc).join(', ');
  const morph = morphBits ? `<span class="entry__morph">${morphBits}.</span>` : '';

  const etym = e.etym
    ? `<p class="entry__etym"><span class="br">[</span>${esc(e.etym)}<span class="br">]</span></p>`
    : '';

  const senses = (e.senses && e.senses.length > 1)
    ? `<ol class="entry__senses">${e.senses.map(s => `<li>${esc(s)}</li>`).join('')}</ol>`
    : ((e.senses && e.senses.length === 1)
        ? `<p class="entry__sense">${esc(e.senses[0])}</p>`
        : '');

  const cites = (e.citations && e.citations.length)
    ? `<ul class="entry__cites">${e.citations.map(c => {
        const la = c.la ? `<span class="la">${esc(c.la)}</span>` : '';
        const au = c.au ? `, <span class="au">${esc(c.au)}</span>` : '';
        const sep = (la || au) && c.es ? ', ' : '';
        const es = c.es ? `${sep}<span class="es">${esc(c.es)}</span>` : '';
        return `<li>${la}${au}${es}</li>`;
      }).join('')}</ul>`
    : '';

  const eq = (e.eq && e.eq.length)
    ? `<p class="entry__eq"><span class="mark">= Eq.</span> <em>${e.eq.map(esc).join(', ')}</em>.</p>`
    : '';

  const note = e.note ? `<p class="entry__note">${esc(e.note)}</p>` : '';

  const src = [e.source, e.page ? `p. ${esc(e.page)}` : '']
    .filter(Boolean).map(esc).join(' · ');
  const footer = src ? `<footer class="entry__src">${src}</footer>` : '';

  return `<article class="entry">
    <header class="entry__head">
      <h2 class="entry__lemma">${dagger}<span class="rubric">${esc(e.lemma)}</span>${variants}</h2>${morph}
    </header>
    ${etym}${senses}${cites}${eq}${note}${footer}
  </article>`;
}
