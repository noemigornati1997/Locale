# [NOME LOCALE] · Sito bozza

Sito di una sala in affitto per feste e ritrovi nel centro di Ossona (MI).
Fatto con [Astro](https://astro.build): genera un sito statico (solo HTML, CSS e un piccolo script), senza backend.

## Avvio

Serve Node.js 22.22 o successivo.

```bash
npm install
npm run dev
```

Il sito si apre su `http://localhost:4321` e si aggiorna da solo a ogni modifica.

Per la pubblicazione:

```bash
npm run build
```

Il sito finito è nella cartella `dist/`: si carica su qualsiasi hosting statico.
Netlify e Vercel lo riconoscono da soli (comando di build `npm run build`, cartella `dist`).
Con `npm run preview` si vede in locale la versione pubblicata.

## Struttura dei file

```
spazio-ossona/
├── src/
│   ├── config.mjs               ← NOME, CONTATTI, LINK: l'unico file da compilare
│   ├── data/occasioni.mjs       Testi, foto e messaggi WhatsApp delle 6 occasioni
│   ├── pages/
│   │   ├── index.astro          Pagina principale (one-page con ancore)
│   │   └── corsi-e-riunioni.astro  Pagina per professionisti e associazioni
│   ├── layouts/Base.astro       <head> (title, SEO, Open Graph, dati per Google), header, footer
│   ├── components/              Logo, header, footer, selettore occasioni, galleria, form…
│   ├── assets/foto/             Foto originali in JPG (Astro le converte in WebP)
│   ├── styles/global.css        Tutti gli stili (colori in cima al file)
│   └── scripts/main.js          Interazioni: menu, occasioni, galleria, form → WhatsApp
├── public/                      File copiati così come sono: favicon, immagine di anteprima
├── astro.config.mjs
├── CREDITS.md                   Autori e licenze delle foto
└── README.md
```

## Dove cambiare nome e contatti

Tutto in **`src/config.mjs`**: nome, indirizzo, CAP, numero WhatsApp, Instagram, Facebook, testo per la mappa e dominio.
Il valore si aggiorna ovunque: testi, menu, footer, title, description, anteprima WhatsApp, dati strutturati per Google,
messaggi WhatsApp precompilati. Finché un valore resta tra `[parentesi quadre]` nella pagina compare evidenziato in giallo.

- `whatsapp`: solo cifre con prefisso, senza `+` (es. `393331234567`). È il numero a cui arrivano i messaggi.
  Finché è vuoto i pulsanti aprono WhatsApp e fanno scegliere il contatto a mano.
- `whatsappVisibile`: come mostrarlo nella pagina (es. `333 123 4567`).
- `dominio`: l'indirizzo definitivo (es. `https://www.nomelocale.it`). Serve perché WhatsApp e Google
  vedano l'immagine di anteprima e l'indirizzo canonico.

**Logo**: è un segnaposto disegnato in SVG in `src/components/Logo.astro` (usato in header e footer)
e in `public/favicon.svg`. Sostituite l'`<svg>` con il logo definitivo.

**Testi delle occasioni**: in `src/data/occasioni.mjs`. Regole della casa, dotazioni e FAQ sono in cima a `src/pages/index.astro`.

## Dove cambiare i colori

In cima a `src/styles/global.css`, nel blocco `:root`:

| Variabile | Colore | Uso |
|---|---|---|
| `--crema` | `#FFF8EF` | Sfondo principale |
| `--pesca` | `#FBE6D2` | Sezioni alternate |
| `--terracotta` | `#B44A24` | Pulsanti e accenti |
| `--salvia` | `#3F7566` | Secondo accento |
| `--senape` | `#E3B04B` | Dettagli decorativi (non per testi: contrasto basso) |
| `--testo` | `#3B2A22` | Testo |
| `--whatsapp` | `#1A7A43` | Pulsanti WhatsApp (verde scurito per il contrasto AA) |

Font: Fraunces (titoli) e DM Sans (testi) da Google Fonts, caricati in `src/layouts/Base.astro`.

## Come sostituire le foto

Le foto originali sono in `src/assets/foto/` in JPG. Astro le converte da solo in WebP alle misure giuste.

1. Preparate la foto vera in formato orizzontale 3:2, almeno 1600 px di larghezza.
2. Salvatela in JPG con lo **stesso nome** del file da sostituire (es. `spazio-tavolata-01.jpg`).
3. Sovrascrivete il file. Non serve toccare il codice.
4. Aggiornate il testo alternativo (`alt`) se la foto mostra altro: è accanto all'import della foto
   (in `src/data/occasioni.mjs`, `src/components/Galleria.astro` o nella pagina).
5. Togliete la riga «Foto indicative…» in `src/components/Galleria.astro` e aggiornate `CREDITS.md`.

| Nome file | Cosa dovrebbe mostrare la foto vera |
|---|---|
| `hero-tavolata-pizza-01` | Foto grande in alto: tavolata di famiglie con pizze e bambini |
| `spazio-sala-01` | La sala vuota e allestita |
| `compleanno-tavola-01`, `compleanno-torta-01`, `compleanno-torta-02` | Una festa di compleanno |
| `pizzette-01`, `panini-festa-01` | Il rinfresco: pizzette, panini, patatine |
| `amici-pizza-01` | Pizze d'asporto sul tavolo |
| `partita-tavola-01` | Amici seduti a tavola davanti alla partita |
| `bimbi-angolo-01`, `bimbi-costruzioni-01` | L'angolo bimbi (tappeti, giochi, libri) |
| `famiglia-ricorrenze-01` | Un ritrovo di famiglia |
| `squadra-pallavolo-01` | La pizzata di una squadra (classe, pallavolo, calcio) |
| `corsi-yoga-01`, `corsi-gruppo-01`, `corsi-lettura-01` | Un corso o un gruppo in cerchio |

L'immagine di anteprima per WhatsApp è `public/og-image.jpg` (1200×630): sostituitela a parte.

Regola per le foto vere: niente loghi o marchi, bambini di spalle o solo mani e giochi, consenso dei genitori.

## Come funzionano i form

Nessun dato viene salvato o inviato a un server. Il form compone un messaggio e apre
`https://wa.me/<numero>?text=<messaggio>`: l'utente lo vede in WhatsApp e decide lui se inviarlo.
I testi dei messaggi del form sono in `src/scripts/main.js` (oggetto `componi`);
quelli dei pulsanti delle occasioni in `src/data/occasioni.mjs` (campo `wa`).

## Accessibilità e prestazioni

- Contrasti AA su tutti i testi, focus visibile, link «Vai al contenuto», navigazione da tastiera
  (frecce sinistra/destra nel selettore delle occasioni e nello slider della galleria, Esc e frecce nella foto ingrandita).
- Le animazioni si disattivano con «riduci movimento» attivo nel sistema.
- Immagini WebP con più misure e lazy loading, CSS dentro la pagina, font che non bloccano il caricamento,
  mappa di Google caricata solo al clic.
