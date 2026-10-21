import compleanno from "../assets/foto/compleanno-torta-01.jpg";
import amici from "../assets/foto/amici-pizza-01.jpg";
import partita from "../assets/foto/partita-tavola-01.jpg";
import famiglia from "../assets/foto/famiglia-ricorrenze-01.jpg";
import classi from "../assets/foto/squadra-pallavolo-01.jpg";
import corsi from "../assets/foto/corsi-yoga-01.jpg";

/*
 * Le 6 occasioni del selettore «Cosa potete organizzare».
 * chip: testo breve usato nelle chip dell'hero.
 * wa: messaggio WhatsApp precompilato (il saluto «Ciao [nome]!» viene aggiunto da solo).
 */
export const OCCASIONI = [
  {
    id: "compleanno",
    icona: "🎂",
    tab: "Compleanno dei bimbi",
    chip: "Compleanno",
    titolo: "La festa che volete, senza pulire casa.",
    testo: "Spazio per giocare e un tavolo per i genitori. La torta e gli invitati li scegliete voi, a riordinare pensiamo noi.",
    punti: ["Angolo bimbi con tappeti, giochi e libri", "Tavoli e sedie anche per i genitori", "Frigorifero per torta e bibite", "Pulizia finale compresa"],
    foto: compleanno,
    alt: "Torta di compleanno rosa con zuccherini colorati e candeline accese.",
    cta: "Chiedi per un compleanno",
    wa: "Vorrei organizzare il compleanno di mio figlio/mia figlia. Mi dite le date libere e i prezzi?",
  },
  {
    id: "amici",
    icona: "🍕",
    tab: "Serata tra amici",
    chip: "Serata tra amici",
    titolo: "Voi a tavola, i bimbi a giocare lì accanto.",
    testo: "Pizze d’asporto e chiacchiere senza fretta. Nessuno deve ospitare e nessuno resta a riordinare fino a tardi.",
    punti: ["Un’unica grande tavolata", "Angolo bimbi sempre a vista", "Fornetto per scaldare le pizze", "Frigorifero per le bibite"],
    foto: amici,
    alt: "Tranci di pizza d’asporto su un tagliere, pronti da dividere.",
    cta: "Chiedi per una serata",
    wa: "Vorrei organizzare una serata tra amici, con qualche bambino. Mi dite le date libere e i prezzi?",
  },
  {
    id: "partita",
    icona: "⚽",
    tab: "Partita",
    chip: "Partita",
    titolo: "La partita insieme, comodi e tra voi.",
    testo: "Una TV grande, un posto a sedere per tutti e gli snack che preferite. Esultate quanto volete, senza bar affollato.",
    punti: ["TV grande per le partite", "Tavoli e sedie per tutto il gruppo", "Frigorifero per le bevande", "Fornetto per scaldare"],
    foto: partita,
    alt: "Amici seduti a una lunga tavolata esultano davanti alla partita sulla TV grande, con birre e pizze.",
    cta: "Chiedi per la partita",
    wa: "Vorremmo vederci per guardare una partita insieme. Mi dite le date libere e i prezzi?",
  },
  {
    id: "famiglia",
    icona: "👵",
    tab: "Famiglia e ricorrenze",
    chip: "Famiglia",
    titolo: "Quando a casa non ci state più tutti.",
    testo: "Il pranzo con figli e nipoti, un anniversario, un piccolo rinfresco. Sedie comode per i nonni e spazio per i più piccoli.",
    punti: ["Fino a 30-40 persone sedute", "Ambiente caldo anche d’inverno", "Angolo bimbi per i nipoti", "Bagno interno"],
    foto: famiglia,
    alt: "Tre generazioni di una famiglia sorridono attorno al tavolo: il nonno, i figli e una nipotina.",
    cta: "Chiedi per la famiglia",
    wa: "Vorrei organizzare un ritrovo di famiglia. Mi dite le date libere e i prezzi?",
  },
  {
    id: "classi",
    icona: "🏫",
    tab: "Classi e squadre",
    chip: "Classi e squadre",
    titolo: "Tutti insieme, in un posto solo.",
    testo: "La festa di fine anno della classe, la cena di squadra, l’incontro dell’associazione. Voi pensate alle persone, noi allo spazio.",
    punti: ["Spazio per 30-40 persone", "Tavoli per un buffet condiviso", "Angolo bimbi per i fratellini", "Pulizia finale compresa"],
    foto: classi,
    alt: "Una squadra di pallavolo di ragazze festeggia a tavola con pizze, allenatori e genitori.",
    cta: "Chiedi per classe o squadra",
    wa: "Sono rappresentante di una classe/squadra e vorrei organizzare una festa. Mi dite le date libere e i prezzi?",
  },
  {
    id: "corsi",
    icona: "🧘",
    tab: "Corsi e riunioni",
    chip: "Corsi e riunioni",
    titolo: "Una sala accogliente, solo quando vi serve.",
    testo: "Per corsi, laboratori, riunioni e gruppi del paese. Si affitta a ore, di giorno e nei giorni feriali.",
    punti: ["Affitto a ore, anche ricorrente", "Tavoli e sedie per lavorare seduti", "TV grande per video e presentazioni", "Bagno interno"],
    foto: corsi,
    alt: "Un piccolo gruppo seduto sui tappetini durante una lezione di yoga in una sala luminosa.",
    cta: "Chiedi per un corso",
    wa: "Vorrei affittare la sala per un corso o una riunione. Mi dite disponibilità e prezzi?",
    link: { href: "/corsi-e-riunioni/", testo: "Tutto su corsi e riunioni →" },
  },
];
