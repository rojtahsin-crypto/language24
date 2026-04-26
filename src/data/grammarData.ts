import { Language } from "../types";

export interface GrammarLesson {
  id: string;
  title: string;
  explanation: string;
  examples: { sentence: string; translation: string }[];
  rules: string[];
}

export const grammarData: Record<Language, GrammarLesson[]> = {
  en: [
    {
      id: "en-1",
      title: "Present Simple",
      explanation: "The present simple is used to describe habits, facts, and general truths. It is one of the most common tenses in English.",
      rules: [
        "For I/You/We/They: use the base verb (e.g., I eat, they go)",
        "For He/She/It: add -s or -es (e.g., she eats, he goes)",
        "Negative: use do not / does not + base verb",
        "Question: Do/Does + subject + base verb?",
      ],
      examples: [
        { sentence: "She reads a book every evening.", translation: "Zij leest elke avond een boek." },
        { sentence: "They don't like spicy food.", translation: "Ze houden niet van pittig eten." },
        { sentence: "Does he work on Sundays?", translation: "Werkt hij op zondag?" },
        { sentence: "Water boils at 100°C.", translation: "Water kookt bij 100°C." },
      ],
    },
    {
      id: "en-2",
      title: "Past Simple",
      explanation: "The past simple describes completed actions in the past. Regular verbs add -ed, while irregular verbs have unique past forms.",
      rules: [
        "Regular verbs: add -ed (e.g., walked, talked, played)",
        "Irregular verbs: unique forms (go→went, eat→ate, have→had)",
        "Negative: did not + base verb",
        "Question: Did + subject + base verb?",
      ],
      examples: [
        { sentence: "I visited Paris last summer.", translation: "Ik bezocht Parijs afgelopen zomer." },
        { sentence: "She didn't come to the party.", translation: "Ze kwam niet naar het feest." },
        { sentence: "Did you see the movie?", translation: "Heb jij de film gezien?" },
        { sentence: "He went to school by bike.", translation: "Hij ging met de fiets naar school." },
      ],
    },
    {
      id: "en-3",
      title: "Present Continuous",
      explanation: "The present continuous (or present progressive) is used for actions happening right now or temporary situations.",
      rules: [
        "Form: am/is/are + verb-ing",
        "I am, He/She/It is, We/You/They are",
        "Add -ing to the base verb (run→running, make→making)",
        "Negative: am/is/are + not + verb-ing",
      ],
      examples: [
        { sentence: "She is studying for her exam.", translation: "Zij studeert voor haar examen." },
        { sentence: "They are playing football.", translation: "Ze spelen voetbal." },
        { sentence: "I am not watching TV right now.", translation: "Ik kijk nu geen TV." },
        { sentence: "What are you doing?", translation: "Wat ben jij aan het doen?" },
      ],
    },
    {
      id: "en-4",
      title: "Articles: a, an, the",
      explanation: "English has two types of articles: indefinite (a/an) and definite (the). Correct usage is essential.",
      rules: [
        "Use 'a' before consonant sounds: a cat, a book",
        "Use 'an' before vowel sounds: an apple, an hour",
        "Use 'the' for specific/known nouns: the sun, the president",
        "No article for general plural nouns: Dogs are loyal.",
      ],
      examples: [
        { sentence: "I saw a dog in the park.", translation: "Ik zag een hond in het park." },
        { sentence: "An elephant is a large animal.", translation: "Een olifant is een groot dier." },
        { sentence: "The moon is bright tonight.", translation: "De maan is vanavond helder." },
        { sentence: "She is a doctor.", translation: "Ze is arts." },
      ],
    },
    {
      id: "en-5",
      title: "Modal Verbs",
      explanation: "Modal verbs express ability, possibility, permission, or obligation. They are followed by the base form of the verb.",
      rules: [
        "Can: ability / permission (I can swim)",
        "Must: strong obligation (You must stop)",
        "Should: advice (You should eat more vegetables)",
        "May/Might: possibility (It may rain today)",
        "Would: conditional / politeness (Would you like some tea?)",
      ],
      examples: [
        { sentence: "She can speak three languages.", translation: "Ze kan drie talen spreken." },
        { sentence: "You must wear a seatbelt.", translation: "Je moet een gordel dragen." },
        { sentence: "It might snow tomorrow.", translation: "Het kan morgen sneeuwen." },
        { sentence: "Would you like some coffee?", translation: "Wil je wat koffie?" },
      ],
    },
  ],
  nl: [
    {
      id: "nl-1",
      title: "De/Het – Lidwoorden",
      explanation: "In het Nederlands zijn er twee bepaalde lidwoorden: 'de' en 'het'. 'De' wordt gebruikt voor de-woorden (mannelijk en vrouwelijk), 'het' voor het-woorden (onzijdig).",
      rules: [
        "'de' voor mannelijke en vrouwelijke woorden: de man, de vrouw, de tafel",
        "'het' voor onzijdige woorden: het kind, het huis, het boek",
        "Verkleinwoorden hebben altijd 'het': het huisje, het autootje",
        "Meervoud: altijd 'de': de mannen, de huizen",
      ],
      examples: [
        { sentence: "De man loopt door de straat.", translation: "The man walks through the street." },
        { sentence: "Het kind speelt in de tuin.", translation: "The child plays in the garden." },
        { sentence: "De vrouw koopt een boek.", translation: "The woman buys a book." },
        { sentence: "Het water is koud.", translation: "The water is cold." },
      ],
    },
    {
      id: "nl-2",
      title: "Werkwoordsvervoegingen (Tegenwoordige Tijd)",
      explanation: "Nederlandse werkwoorden worden vervoegd op basis van het onderwerp. De stam is de infinitief min -en.",
      rules: [
        "Stam: infinitief minus -en (werken → werk)",
        "ik: stam (ik werk)",
        "jij/hij/zij/het: stam + t (jij werkt)",
        "wij/jullie/zij: infinitief (wij werken)",
        "Uitzondering: t-koppel regel – geen t na d, t, k, f, s, ch, p",
      ],
      examples: [
        { sentence: "Ik woon in Amsterdam.", translation: "I live in Amsterdam." },
        { sentence: "Hij werkt elke dag.", translation: "He works every day." },
        { sentence: "Wij eten samen.", translation: "We eat together." },
        { sentence: "Jij spreekt goed Nederlands.", translation: "You speak Dutch well." },
      ],
    },
    {
      id: "nl-3",
      title: "Perfectum (Voltooid Deelwoord)",
      explanation: "Het perfectum beschrijft voltooide handelingen. Het wordt gevormd met 'hebben' of 'zijn' + voltooid deelwoord.",
      rules: [
        "Gebruik 'hebben' voor de meeste werkwoorden",
        "Gebruik 'zijn' voor bewegingswerkwoorden (gaan, komen, rijden)",
        "Voltooid deelwoord: ge + stam + t/d (werken → gewerkt)",
        "Onregelmatige werkwoorden: zien→gezien, gaan→gegaan, zijn→geweest",
      ],
      examples: [
        { sentence: "Ik heb gegeten.", translation: "I have eaten." },
        { sentence: "Zij is naar school gegaan.", translation: "She went to school." },
        { sentence: "We hebben een film gekeken.", translation: "We watched a movie." },
        { sentence: "Hij is ziek geweest.", translation: "He has been sick." },
      ],
    },
    {
      id: "nl-4",
      title: "Bijvoeglijke Naamwoorden",
      explanation: "Bijvoeglijke naamwoorden krijgen een -e uitgang wanneer ze voor een zelfstandig naamwoord staan met een lidwoord.",
      rules: [
        "De/een de-woord: altijd -e (de grote man, een grote man)",
        "Het-woord + het: altijd -e (het grote huis)",
        "Het-woord + een: geen -e (een groot huis)",
        "Predicatief (na zijn): geen uitgang (het huis is groot)",
      ],
      examples: [
        { sentence: "De oude man loopt langzaam.", translation: "The old man walks slowly." },
        { sentence: "Ik zie een groot gebouw.", translation: "I see a big building." },
        { sentence: "Het is een mooi dag.", translation: "It is a beautiful day." },
        { sentence: "De bloemen zijn kleurrijk.", translation: "The flowers are colorful." },
      ],
    },
    {
      id: "nl-5",
      title: "Vraagzinnen",
      explanation: "In Nederlandse vraagzinnen staat het werkwoord voor het onderwerp (inversie).",
      rules: [
        "Ja/nee vragen: werkwoord + onderwerp (Ga jij mee?)",
        "W-vragen: vraagwoord + werkwoord + onderwerp (Waar woon jij?)",
        "Vraagwoorden: wie, wat, waar, wanneer, hoe, waarom, welk",
        "Let op: 'jij' wordt 'je' na inversie (Ga je mee?)",
      ],
      examples: [
        { sentence: "Waar woon je?", translation: "Where do you live?" },
        { sentence: "Wat eet jij graag?", translation: "What do you like to eat?" },
        { sentence: "Ga jij morgen naar school?", translation: "Are you going to school tomorrow?" },
        { sentence: "Hoe oud ben je?", translation: "How old are you?" },
      ],
    },
  ],
  fr: [
    {
      id: "fr-1",
      title: "Les Articles (Définis et Indéfinis)",
      explanation: "En français, les articles s'accordent en genre (masculin/féminin) et en nombre (singulier/pluriel).",
      rules: [
        "Articles définis: le (masc.), la (fém.), les (pluriel), l' (devant voyelle)",
        "Articles indéfinis: un (masc.), une (fém.), des (pluriel)",
        "Articles partitifs: du, de la, de l' (pour des quantités indéfinies)",
        "Après une négation: de/d' (Je n'ai pas de lait)",
      ],
      examples: [
        { sentence: "Le chat dort sur la chaise.", translation: "The cat sleeps on the chair." },
        { sentence: "J'ai un frère et une sœur.", translation: "I have a brother and a sister." },
        { sentence: "Je bois du café le matin.", translation: "I drink coffee in the morning." },
        { sentence: "L'école est fermée.", translation: "The school is closed." },
      ],
    },
    {
      id: "fr-2",
      title: "Le Présent de l'Indicatif",
      explanation: "Le présent de l'indicatif exprime des actions actuelles, habituelles ou des vérités générales.",
      rules: [
        "Verbes en -er: je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent",
        "Verbes en -ir: je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent",
        "Être: je suis, tu es, il est, nous sommes, vous êtes, ils sont",
        "Avoir: j'ai, tu as, il a, nous avons, vous avez, ils ont",
      ],
      examples: [
        { sentence: "Je parle français tous les jours.", translation: "I speak French every day." },
        { sentence: "Elle finit son travail à 17h.", translation: "She finishes her work at 5pm." },
        { sentence: "Nous sommes étudiants.", translation: "We are students." },
        { sentence: "Ils ont une grande maison.", translation: "They have a big house." },
      ],
    },
    {
      id: "fr-3",
      title: "Le Passé Composé",
      explanation: "Le passé composé exprime des actions passées et terminées. Il se forme avec avoir ou être + participe passé.",
      rules: [
        "Avec avoir: j'ai mangé, tu as parlé, il a fini",
        "Avec être: verbes de mouvement et verbes pronominaux (je suis allé, elle est venue)",
        "Accord du participe passé avec être: il est allé / elle est allée",
        "Participes irréguliers: faire→fait, voir→vu, prendre→pris, avoir→eu, être→été",
      ],
      examples: [
        { sentence: "J'ai mangé une pizza hier soir.", translation: "I ate a pizza last night." },
        { sentence: "Elle est allée au cinéma.", translation: "She went to the cinema." },
        { sentence: "Nous avons vu un beau film.", translation: "We saw a beautiful film." },
        { sentence: "Ils se sont levés tôt.", translation: "They got up early." },
      ],
    },
    {
      id: "fr-4",
      title: "Les Adjectifs",
      explanation: "Les adjectifs français s'accordent en genre et en nombre avec le nom qu'ils qualifient.",
      rules: [
        "Féminin: ajoutez -e (grand→grande, petit→petite)",
        "Pluriel: ajoutez -s (grand→grands, grande→grandes)",
        "Adjectifs irréguliers: beau/belle, nouveau/nouvelle, vieux/vieille",
        "Certains adjectifs précèdent le nom: beau, bon, grand, gros, jeune, joli, nouveau, petit, vieux",
      ],
      examples: [
        { sentence: "Un grand homme / une grande femme.", translation: "A tall man / a tall woman." },
        { sentence: "C'est un beau livre.", translation: "It's a beautiful book." },
        { sentence: "Elle a les yeux bleus.", translation: "She has blue eyes." },
        { sentence: "Ils habitent une vieille maison.", translation: "They live in an old house." },
      ],
    },
    {
      id: "fr-5",
      title: "La Négation",
      explanation: "La négation française utilise généralement deux éléments qui encadrent le verbe: ne...pas.",
      rules: [
        "Ne...pas: Je ne mange pas (I don't eat)",
        "Ne...plus: Je ne fume plus (I no longer smoke)",
        "Ne...jamais: Elle ne ment jamais (She never lies)",
        "Ne...rien: Il ne fait rien (He does nothing)",
        "Ne...personne: Je ne vois personne (I see nobody)",
      ],
      examples: [
        { sentence: "Je ne comprends pas.", translation: "I don't understand." },
        { sentence: "Elle ne mange jamais de viande.", translation: "She never eats meat." },
        { sentence: "Nous n'avons plus de pain.", translation: "We have no more bread." },
        { sentence: "Il ne dit rien.", translation: "He says nothing." },
      ],
    },
  ],
  es: [
    {
      id: "es-1",
      title: "El Presente de Indicativo",
      explanation: "El presente de indicativo describe acciones habituales, hechos generales y situaciones actuales.",
      rules: [
        "Verbos -AR: hablo, hablas, habla, hablamos, habláis, hablan",
        "Verbos -ER: como, comes, come, comemos, coméis, comen",
        "Verbos -IR: vivo, vives, vive, vivimos, vivís, viven",
        "Verbos irregulares: ser (soy, eres, es), estar (estoy, estás, está), tener (tengo, tienes, tiene)",
      ],
      examples: [
        { sentence: "Yo hablo español todos los días.", translation: "I speak Spanish every day." },
        { sentence: "Ella come en casa.", translation: "She eats at home." },
        { sentence: "Nosotros vivimos en Madrid.", translation: "We live in Madrid." },
        { sentence: "¿Tienes un momento?", translation: "Do you have a moment?" },
      ],
    },
    {
      id: "es-2",
      title: "Ser vs. Estar",
      explanation: "El español tiene dos verbos para 'to be': ser (características permanentes) y estar (estados temporales y ubicación).",
      rules: [
        "SER: origen, profesión, características permanentes (Soy español, Es médico)",
        "ESTAR: ubicación, estados de ánimo, condiciones temporales (Estoy en casa, Está cansado)",
        "SER + adjetivo: características esenciales (Ella es inteligente)",
        "ESTAR + adjetivo: estados temporales (Ella está enferma)",
      ],
      examples: [
        { sentence: "Yo soy estudiante.", translation: "I am a student." },
        { sentence: "Él está muy cansado hoy.", translation: "He is very tired today." },
        { sentence: "La mesa es de madera.", translation: "The table is made of wood." },
        { sentence: "¿Dónde está el baño?", translation: "Where is the bathroom?" },
      ],
    },
    {
      id: "es-3",
      title: "El Pretérito Indefinido",
      explanation: "El pretérito indefinido describe acciones completadas en el pasado con tiempo definido.",
      rules: [
        "Verbos -AR: hablé, hablaste, habló, hablamos, hablasteis, hablaron",
        "Verbos -ER/-IR: comí, comiste, comió, comimos, comisteis, comieron",
        "Irregulares: ser/ir → fui, fuiste, fue; tener → tuve; hacer → hice",
        "Indicadores: ayer, la semana pasada, en 2020, hace tres días",
      ],
      examples: [
        { sentence: "Ayer comí paella.", translation: "Yesterday I ate paella." },
        { sentence: "Ella fue al cine el sábado.", translation: "She went to the cinema on Saturday." },
        { sentence: "Nosotros hablamos con el profesor.", translation: "We spoke with the teacher." },
        { sentence: "¿Dónde estuviste anoche?", translation: "Where were you last night?" },
      ],
    },
    {
      id: "es-4",
      title: "Los Artículos",
      explanation: "Los artículos en español concuerdan en género y número con el sustantivo.",
      rules: [
        "Artículos definidos: el (masc. sing.), la (fem. sing.), los (masc. pl.), las (fem. pl.)",
        "Artículos indefinidos: un (masc. sing.), una (fem. sing.), unos (masc. pl.), unas (fem. pl.)",
        "Excepción: el agua (femenino pero usa 'el' por eufonía)",
        "Sin artículo: profesiones sin ser (Soy médico), países en general",
      ],
      examples: [
        { sentence: "El perro está en el jardín.", translation: "The dog is in the garden." },
        { sentence: "Tengo un coche nuevo.", translation: "I have a new car." },
        { sentence: "Las flores son bonitas.", translation: "The flowers are beautiful." },
        { sentence: "Necesito una silla.", translation: "I need a chair." },
      ],
    },
    {
      id: "es-5",
      title: "Los Adjetivos y la Concordancia",
      explanation: "Los adjetivos en español concuerdan en género y número con el sustantivo al que modifican.",
      rules: [
        "Masculino → Femenino: -o → -a (alto → alta)",
        "Adjetivos en -e o consonante: sin cambio de género (grande, fácil)",
        "Plurales: añadir -s (vocales) o -es (consonantes)",
        "Posición: generalmente después del sustantivo (libro interesante)",
      ],
      examples: [
        { sentence: "Un hombre alto / una mujer alta.", translation: "A tall man / a tall woman." },
        { sentence: "Tengo un coche rojo.", translation: "I have a red car." },
        { sentence: "Es una clase muy interesante.", translation: "It's a very interesting class." },
        { sentence: "Los niños son inteligentes.", translation: "The children are intelligent." },
      ],
    },
  ],
  de: [
    {
      id: "de-1",
      title: "Der/Die/Das – Artikel",
      explanation: "Im Deutschen gibt es drei bestimmte Artikel: der (maskulin), die (feminin) und das (neutrum). Der Artikel richtet sich nach dem Genus des Substantivs.",
      rules: [
        "'der' für maskuline Nomen: der Mann, der Hund, der Tisch",
        "'die' für feminine Nomen: die Frau, die Katze, die Sonne",
        "'das' für neutrale Nomen: das Kind, das Haus, das Buch",
        "Plural: immer 'die': die Männer, die Frauen, die Kinder",
        "Unbestimmte Artikel: ein (mask./neut.), eine (fem.)",
      ],
      examples: [
        { sentence: "Der Mann liest ein Buch.", translation: "The man is reading a book." },
        { sentence: "Die Frau kauft eine Tasche.", translation: "The woman is buying a bag." },
        { sentence: "Das Kind spielt im Garten.", translation: "The child is playing in the garden." },
        { sentence: "Die Hunde laufen im Park.", translation: "The dogs are running in the park." },
      ],
    },
    {
      id: "de-2",
      title: "Verben im Präsens",
      explanation: "Das Präsens beschreibt gegenwärtige Handlungen und allgemeine Wahrheiten. Regelmäßige Verben werden nach einem festen Muster konjugiert.",
      rules: [
        "ich: Stamm + e (ich spiele, ich lerne)",
        "du: Stamm + st (du spielst, du lernst)",
        "er/sie/es: Stamm + t (er spielt, sie lernt)",
        "wir/Sie/sie: Infinitiv (wir spielen, sie lernen)",
        "ihr: Stamm + t (ihr spielt, ihr lernt)",
      ],
      examples: [
        { sentence: "Ich lerne Deutsch.", translation: "I am learning German." },
        { sentence: "Du spielst Fußball.", translation: "You play football." },
        { sentence: "Er wohnt in Berlin.", translation: "He lives in Berlin." },
        { sentence: "Wir essen zusammen.", translation: "We eat together." },
      ],
    },
    {
      id: "de-3",
      title: "Das Perfekt (Vergangenheit)",
      explanation: "Das Perfekt wird für abgeschlossene Handlungen in der Vergangenheit verwendet. Es wird mit 'haben' oder 'sein' + Partizip II gebildet.",
      rules: [
        "Mit 'haben': die meisten Verben (ich habe gegessen, du hast gespielt)",
        "Mit 'sein': Bewegungsverben und Zustandsänderungen (ich bin gegangen, er ist geworden)",
        "Partizip II: ge- + Stamm + -t (spielen → gespielt) oder -en (fahren → gefahren)",
        "Unregelmäßige Verben: gehen→gegangen, essen→gegessen, sehen→gesehen",
      ],
      examples: [
        { sentence: "Ich habe das Buch gelesen.", translation: "I have read the book." },
        { sentence: "Sie ist nach Hause gegangen.", translation: "She went home." },
        { sentence: "Wir haben Pizza gegessen.", translation: "We ate pizza." },
        { sentence: "Er ist früh aufgestanden.", translation: "He got up early." },
      ],
    },
    {
      id: "de-4",
      title: "Kasus: Nominativ und Akkusativ",
      explanation: "Im Deutschen ändern sich Artikel und Pronomen je nach grammatischer Funktion (Kasus). Nominativ ist das Subjekt, Akkusativ ist das direkte Objekt.",
      rules: [
        "Nominativ (Wer/Was?): der Mann, die Frau, das Kind",
        "Akkusativ (Wen/Was?): den Mann, die Frau, das Kind",
        "Nur maskulin ändert sich: der → den im Akkusativ",
        "Unbestimmt: ein → einen (mask. Akkusativ), eine bleibt",
      ],
      examples: [
        { sentence: "Der Mann sieht den Hund.", translation: "The man sees the dog." },
        { sentence: "Ich kaufe einen Apfel.", translation: "I am buying an apple." },
        { sentence: "Sie liebt das Kind.", translation: "She loves the child." },
        { sentence: "Er trinkt einen Kaffee.", translation: "He is drinking a coffee." },
      ],
    },
    {
      id: "de-5",
      title: "Modalverben",
      explanation: "Modalverben drücken Möglichkeit, Fähigkeit, Erlaubnis oder Notwendigkeit aus. Sie stehen mit dem Infinitiv am Satzende.",
      rules: [
        "können: Fähigkeit (Ich kann schwimmen – I can swim)",
        "müssen: Notwendigkeit (Du musst lernen – You must study)",
        "wollen: Wunsch (Er will schlafen – He wants to sleep)",
        "dürfen: Erlaubnis (Wir dürfen spielen – We are allowed to play)",
        "sollen: Auftrag (Sie soll kommen – She is supposed to come)",
      ],
      examples: [
        { sentence: "Ich kann Deutsch sprechen.", translation: "I can speak German." },
        { sentence: "Du musst jetzt schlafen.", translation: "You must sleep now." },
        { sentence: "Er will ein Auto kaufen.", translation: "He wants to buy a car." },
        { sentence: "Darf ich das Fenster öffnen?", translation: "May I open the window?" },
      ],
    },
  ],
};
