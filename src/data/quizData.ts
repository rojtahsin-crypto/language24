import { Language } from "../types";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const quizData: Record<Language, QuizQuestion[]> = {
  en: [
    {
      id: "q-en-1",
      question: "Choose the correct sentence:",
      options: ["She go to school every day.", "She goes to school every day.", "She going to school every day.", "She goed to school every day."],
      correct: 1,
      explanation: "With 'she' (third person singular), add -s to the verb: 'goes'."
    },
    {
      id: "q-en-2",
      question: "Which article is correct? '___ apple a day keeps the doctor away.'",
      options: ["A", "An", "The", "—"],
      correct: 1,
      explanation: "'An' is used before vowel sounds. 'Apple' starts with a vowel sound."
    },
    {
      id: "q-en-3",
      question: "What is the past tense of 'go'?",
      options: ["goed", "gone", "went", "goes"],
      correct: 2,
      explanation: "'Go' is an irregular verb. Its past simple form is 'went'."
    },
    {
      id: "q-en-4",
      question: "Which is correct? 'She ___ not like coffee.'",
      options: ["do", "does", "did", "is"],
      correct: 1,
      explanation: "With 'she', use 'does not' for present simple negative."
    },
    {
      id: "q-en-5",
      question: "Which modal verb expresses ability?",
      options: ["must", "should", "can", "would"],
      correct: 2,
      explanation: "'Can' expresses ability (I can swim, she can speak French)."
    },
    {
      id: "q-en-6",
      question: "What is the present continuous of 'run'?",
      options: ["runing", "running", "runs", "runned"],
      correct: 1,
      explanation: "For words ending in consonant-vowel-consonant, double the last consonant: run → running."
    },
    {
      id: "q-en-7",
      question: "'___ you watching TV right now?' Choose the correct word.",
      options: ["Do", "Are", "Is", "Have"],
      correct: 1,
      explanation: "Present continuous uses 'are' with 'you': Are you watching...?"
    },
    {
      id: "q-en-8",
      question: "Which sentence uses 'the' correctly?",
      options: ["The dogs are loyal.", "I saw the dog yesterday (first mention).", "The sun rises in the east.", "She is the doctor."],
      correct: 2,
      explanation: "'The sun' is always definite because there is only one sun."
    },
  ],
  nl: [
    {
      id: "q-nl-1",
      question: "Welk lidwoord is correct? '___ boek ligt op tafel.'",
      options: ["De", "Het", "Een", "Den"],
      correct: 1,
      explanation: "'Boek' is een het-woord, dus 'het boek'."
    },
    {
      id: "q-nl-2",
      question: "Hoe wordt 'werken' vervoegd voor 'hij'?",
      options: ["hij werk", "hij werkt", "hij werken", "hij werkst"],
      correct: 1,
      explanation: "Voor hij/zij/het voeg je -t toe aan de stam: werk + t = werkt."
    },
    {
      id: "q-nl-3",
      question: "Wat is het voltooid deelwoord van 'lopen'?",
      options: ["geloopt", "gelopen", "geloopen", "loopt"],
      correct: 1,
      explanation: "'Lopen' is een onregelmatig werkwoord: gelopen."
    },
    {
      id: "q-nl-4",
      question: "'Ik ___ gisteren naar de winkel gegaan.' Welk hulpwerkwoord?",
      options: ["heb", "ben", "had", "was"],
      correct: 1,
      explanation: "'Gaan' is een bewegingswerkwoord en gebruikt 'zijn': ik ben gegaan."
    },
    {
      id: "q-nl-5",
      question: "Welke zin is correct?",
      options: ["Ik zie een grote huis.", "Ik zie een groot huis.", "Ik zie het groot huis.", "Ik zie de groot huis."],
      correct: 1,
      explanation: "'Huis' is een het-woord met 'een', dus geen -e uitgang: een groot huis."
    },
    {
      id: "q-nl-6",
      question: "Welk woord is een vraagwoord?",
      options: ["maar", "omdat", "wanneer", "en"],
      correct: 2,
      explanation: "'Wanneer' is een vraagwoord (when). De andere woorden zijn voegwoorden."
    },
    {
      id: "q-nl-7",
      question: "Wat is de meervoudsvorm van 'kind'?",
      options: ["kinds", "kinden", "kinderen", "kinds"],
      correct: 2,
      explanation: "Het meervoud van 'kind' is 'kinderen' (onregelmatig meervoud)."
    },
    {
      id: "q-nl-8",
      question: "Welk lidwoord gebruik je voor verkleinwoorden?",
      options: ["de", "het", "een", "den"],
      correct: 1,
      explanation: "Verkleinwoorden gebruiken altijd 'het': het huisje, het autootje."
    },
  ],
  fr: [
    {
      id: "q-fr-1",
      question: "Quel est l'article correct? '___ soleil brille.'",
      options: ["Un", "Une", "Le", "La"],
      correct: 2,
      explanation: "'Soleil' est masculin, donc 'le soleil'."
    },
    {
      id: "q-fr-2",
      question: "Conjuguez 'manger' à la première personne du pluriel:",
      options: ["nous mangons", "nous mangeons", "nous mangez", "nous mangiez"],
      correct: 1,
      explanation: "Les verbes en -ger prennent un 'e' avant -ons: nous mangeons."
    },
    {
      id: "q-fr-3",
      question: "Quel auxiliaire utilise-t-on avec 'aller' au passé composé?",
      options: ["avoir", "être", "faire", "aller"],
      correct: 1,
      explanation: "'Aller' utilise 'être' au passé composé: je suis allé(e)."
    },
    {
      id: "q-fr-4",
      question: "Comment dit-on 'I don't understand' en français?",
      options: ["Je comprends ne pas.", "Je ne comprends pas.", "Je ne pas comprends.", "Je comprends pas ne."],
      correct: 1,
      explanation: "La négation encadre le verbe: ne + verbe + pas."
    },
    {
      id: "q-fr-5",
      question: "Quel est le féminin de 'beau'?",
      options: ["beaux", "beaus", "belle", "belles"],
      correct: 2,
      explanation: "'Beau' est un adjectif irrégulier. Son féminin est 'belle'."
    },
    {
      id: "q-fr-6",
      question: "Complétez: 'Elle ___ une robe rouge.'",
      options: ["a", "est", "ont", "as"],
      correct: 0,
      explanation: "Avec 'elle', on utilise 'a' (avoir): elle a."
    },
    {
      id: "q-fr-7",
      question: "Quel est le participe passé de 'prendre'?",
      options: ["prendu", "pris", "prend", "prendé"],
      correct: 1,
      explanation: "'Prendre' est irrégulier: participe passé = pris."
    },
    {
      id: "q-fr-8",
      question: "Quel article partitif utilise-t-on pour 'eau' (féminin)?",
      options: ["du", "de la", "des", "de l'"],
      correct: 3,
      explanation: "'Eau' commence par une voyelle, donc on utilise 'de l'': de l'eau."
    },
  ],
  es: [
    {
      id: "q-es-1",
      question: "¿Cuál es la forma correcta? 'Yo ___ español.'",
      options: ["hablas", "hablo", "habla", "hablan"],
      correct: 1,
      explanation: "Con 'yo', los verbos -AR terminan en -o: hablo."
    },
    {
      id: "q-es-2",
      question: "¿Cuándo se usa 'estar'?",
      options: ["Para describir profesiones", "Para indicar el origen", "Para indicar ubicación", "Para características permanentes"],
      correct: 2,
      explanation: "'Estar' se usa para indicar ubicación temporal (¿Dónde estás?)."
    },
    {
      id: "q-es-3",
      question: "¿Cuál es el pretérito indefinido de 'ir' con 'ella'?",
      options: ["iba", "fue", "ido", "va"],
      correct: 1,
      explanation: "'Ir' y 'ser' tienen la misma forma en pretérito: fue."
    },
    {
      id: "q-es-4",
      question: "¿Cuál es el femenino de 'alto'?",
      options: ["altos", "alte", "alta", "altoa"],
      correct: 2,
      explanation: "Los adjetivos en -o cambian a -a en femenino: alto → alta."
    },
    {
      id: "q-es-5",
      question: "¿Qué artículo va con 'agua'?",
      options: ["la", "el", "un", "una"],
      correct: 1,
      explanation: "'Agua' es femenino pero usa 'el' en singular por eufonía: el agua."
    },
    {
      id: "q-es-6",
      question: "Completa: 'Nosotros ___ en Madrid.'",
      options: ["vivo", "vive", "vivimos", "vivís"],
      correct: 2,
      explanation: "Con 'nosotros', los verbos -IR terminan en -imos: vivimos."
    },
    {
      id: "q-es-7",
      question: "¿Qué significa 'tener' en inglés?",
      options: ["to be", "to have", "to go", "to want"],
      correct: 1,
      explanation: "'Tener' significa 'to have': Yo tengo un perro = I have a dog."
    },
    {
      id: "q-es-8",
      question: "¿Cuál es el plural de 'ciudad'?",
      options: ["ciudads", "ciudades", "ciudaes", "ciudads"],
      correct: 1,
      explanation: "Las palabras que terminan en consonante forman el plural con -es: ciudad → ciudades."
    },
  ],
  de: [
    {
      id: "q-de-1",
      question: "Welcher Artikel gehört zu 'Haus'?",
      options: ["der", "die", "das", "den"],
      correct: 2,
      explanation: "'Haus' ist neutral, deshalb: das Haus."
    },
    {
      id: "q-de-2",
      question: "Wie wird 'spielen' mit 'er' konjugiert?",
      options: ["er spiele", "er spielst", "er spielt", "er spielen"],
      correct: 2,
      explanation: "Mit er/sie/es: Stamm + t → er spielt."
    },
    {
      id: "q-de-3",
      question: "Welches Hilfsverb benutzt man mit 'gehen' im Perfekt?",
      options: ["haben", "sein", "werden", "tun"],
      correct: 1,
      explanation: "'Gehen' ist ein Bewegungsverb und bildet das Perfekt mit 'sein': ich bin gegangen."
    },
    {
      id: "q-de-4",
      question: "Was ist der Akkusativ von 'der Mann'?",
      options: ["der Mann", "die Mann", "dem Mann", "den Mann"],
      correct: 3,
      explanation: "Im Akkusativ ändert sich maskulin: der → den. Also: den Mann."
    },
    {
      id: "q-de-5",
      question: "Welches Modalverb drückt Fähigkeit aus?",
      options: ["müssen", "dürfen", "können", "sollen"],
      correct: 2,
      explanation: "'Können' drückt Fähigkeit aus: Ich kann schwimmen = I can swim."
    },
    {
      id: "q-de-6",
      question: "Was ist das Partizip II von 'essen'?",
      options: ["geesst", "gegessen", "geessen", "essen"],
      correct: 1,
      explanation: "'Essen' ist unregelmäßig: Partizip II = gegessen."
    },
    {
      id: "q-de-7",
      question: "Welcher Satz ist korrekt?",
      options: ["Ich kaufe einen Buch.", "Ich kaufe ein Buch.", "Ich kaufe eine Buch.", "Ich kaufe der Buch."],
      correct: 1,
      explanation: "'Buch' ist neutral. Der unbestimmte Artikel im Akkusativ bei Neutrum ist 'ein': ein Buch."
    },
    {
      id: "q-de-8",
      question: "Wie heißt 'she wants' auf Deutsch?",
      options: ["sie muss", "sie kann", "sie will", "sie darf"],
      correct: 2,
      explanation: "'Wollen' = to want. Mit sie: sie will."
    },
  ],
};
