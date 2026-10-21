/*
 * CONFIGURAZIONE DEL SITO
 * Questo è l'unico file da modificare per nome e contatti:
 * pagine, title, anteprima WhatsApp e dati per Google si aggiornano da soli alla prossima build.
 * Finché un valore resta tra [parentesi quadre], nella pagina compare evidenziato in giallo.
 */
export const SITE = {
  nome: "[NOME LOCALE]",
  indirizzo: "[INDIRIZZO]",
  comune: "Ossona",
  provincia: "MI",
  cap: "20002",

  // Numero WhatsApp in formato internazionale, solo cifre, senza + (es. "393331234567").
  // Finché è vuoto, i pulsanti aprono WhatsApp e fanno scegliere il contatto a mano.
  whatsapp: "",
  whatsappVisibile: "[NUMERO WHATSAPP]",

  instagram: "[LINK INSTAGRAM]",
  facebook: "[LINK FACEBOOK]",

  // Testo cercato su Google Maps: mettete l'indirizzo completo.
  mappa: "Ossona, Milano",

  // Dominio definitivo (es. "https://www.nomelocale.it"): serve per l'anteprima su WhatsApp.
  dominio: "",

  capienza: 40,
};

/** true se il valore è ancora un segnaposto da completare */
export const isPlaceholder = (v) => !v || /^\[.*\]$/.test(v);

/** saluto iniziale dei messaggi WhatsApp */
export const saluto = () => (isPlaceholder(SITE.nome) ? "Ciao!" : `Ciao ${SITE.nome}!`);

/** link wa.me con il messaggio già scritto */
export const waUrl = (testo) =>
  `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(testo)}`;
