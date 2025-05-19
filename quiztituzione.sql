-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 20, 2025 alle 01:43
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiztituzione`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `categoria` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dump dei dati per la tabella `categoria`
--

INSERT INTO `categoria` (`id`, `categoria`) VALUES
(1, 'Costituzione'),
(2, 'Cultura Generale'),
(3, 'Informazioni Costituzione'),
(4, 'Suddivisione Camere'),
(5, 'Elezioni'),
(6, 'Votazioni'),
(7, 'Cittadinanza'),
(8, 'Storia'),
(9, 'Grammatica'),
(10, 'Letteratura');

-- --------------------------------------------------------

--
-- Struttura della tabella `domande`
--

CREATE TABLE `domande` (
  `id` int(11) NOT NULL,
  `categoria` int(11) NOT NULL,
  `sottocategoria` int(11) NOT NULL,
  `testo` varchar(256) NOT NULL,
  `risposta` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dump dei dati per la tabella `domande`
--

INSERT INTO `domande` (`id`, `categoria`, `sottocategoria`, `testo`, `risposta`) VALUES
(1, 2, 8, 'L\'Italia è diventata una nazione unita nel 1861.', 1),
(2, 2, 8, 'Giuseppe Garibaldi fu uno dei principali protagonisti dell\'Unità d\'Italia.', 1),
(3, 2, 8, 'L\'Impero Romano crollò nel 476 d.C. con la deposizione di Romolo Augustolo.', 1),
(4, 2, 8, 'L\'Italia partecipò alla Seconda Guerra Mondiale come alleato della Germania nazista.', 1),
(5, 2, 8, 'Il Fascismo in Italia fu guidato da Benito Mussolini dal 1919 al 1945.', 0),
(6, 2, 8, 'La Repubblica Italiana fu proclamata il 2 giugno 1946.', 1),
(7, 2, 8, 'La Costituzione italiana è entrata in vigore nel 1948.', 1),
(8, 2, 8, 'Dante Alighieri fu un grande condottiero del Medioevo italiano.', 0),
(9, 2, 8, 'Il Rinascimento è nato in Italia nel XVI secolo.', 0),
(10, 2, 8, 'Il Regno delle Due Sicilie era uno Stato preunitario situato interamente nel nord Italia.', 0),
(11, 2, 8, 'La presa di Porta Pia avvenne nel 1810, segnando la fine dello Stato Pontificio.', 0),
(12, 2, 8, 'L\'Italia fu una monarchia fino al 1922.', 0),
(13, 2, 8, 'Il primo re d\'Italia fu Napoleone Bonaparte.', 0),
(14, 2, 8, 'L’Italia non ha fatto parte dei Paesi fondatori dell’Unione Europea.', 0),
(15, 2, 9, 'Gli aggettivi qualificativi concordano in genere e numero con il nome che accompagnano.', 1),
(16, 2, 9, 'Gli articoli determinativi sono: il, lo, la, i, gli, le.', 1),
(17, 2, 9, 'L\'indicativo è un modo verbale finito.', 1),
(18, 2, 9, 'I pronomi personali possono sostituire il nome.', 1),
(19, 2, 9, '\'Che\' può essere usato come pronome, congiunzione e avverbio.', 1),
(20, 2, 9, 'La frase \'Paolo ha letto il libro\' è attiva.', 1),
(21, 2, 9, 'Le congiunzioni possono essere coordinanti o subordinanti.', 1),
(22, 2, 9, 'I tempi semplici si formano con un solo verbo.', 1),
(23, 2, 9, 'Il soggetto è sempre espresso in ogni frase italiana.', 0),
(24, 2, 9, '\'Si lava le mani\' è un esempio di forma passiva.', 0),
(25, 2, 9, 'Il verbo \'essere\' è sempre un ausiliare.', 0),
(26, 2, 9, '\'Loro hanno mangiato\' è un esempio di tempo futuro.', 0),
(27, 2, 9, 'La parola \'bellissimo\' è un esempio di superlativo relativo.', 0),
(28, 2, 9, '\'Qualche\' richiede il sostantivo al plurale.', 0),
(29, 2, 10, 'Dante Alighieri è l’autore della \'Divina Commedia\'', 1),
(30, 2, 10, 'Alessandro Manzoni ha scritto \'I Promessi Sposi\'', 1),
(31, 2, 10, 'Giovanni Boccaccio è noto per il \'Decameron\'', 1),
(32, 2, 10, 'Giacomo Leopardi è considerato uno dei maggiori poeti del Romanticismo italiano.', 1),
(33, 2, 10, 'Luigi Pirandello ha vinto il Premio Nobel per la Letteratura.', 1),
(34, 2, 10, 'Eugenio Montale è stato un importante poeta del Novecento italiano.', 1),
(35, 2, 10, 'Italo Svevo è famoso per \'La coscienza di Zeno\'.', 1),
(36, 2, 10, '\'Il Principe\' è un’opera di Niccolò Machiavelli.', 1),
(37, 2, 10, 'Ugo Foscolo è noto per il poema \'I Sepolcri\'', 1),
(38, 2, 10, 'Gabriele D’Annunzio è associato al Decadentismo.', 1),
(39, 2, 10, '\'L’Inferno\' è il titolo del primo canto della Divina Commedia.', 0),
(40, 2, 10, '\'Se questo è un uomo\' è un romanzo di Italo Calvino.', 0),
(41, 2, 10, 'Dante ha scritto \'L’Orlando Furioso\'', 0),
(42, 2, 10, 'Dante scrisse \'La Divina Commedia\' in latino.', 0),
(43, 2, 10, '\'La Metamorfosi\' è un’opera di un autore italiano.', 0),
(44, 1, 3, 'L\'articolo 1 della Costituzione italiana afferma che l\'Italia è una repubblica parlamentare.', 0),
(45, 1, 3, 'L\'articolo 11 consente la guerra per risolvere controversie internazionali.', 0),
(46, 1, 3, 'L\'articolo 31 si occupa del diritto alla proprietà privata.', 0),
(47, 1, 3, 'L\'articolo 48 obbliga i cittadini a votare.', 0),
(48, 1, 3, 'L\'articolo 3 garantisce l\'uguaglianza di tutti i cittadini senza distinzione di sesso, razza, lingua, religione o opinioni politiche.', 1),
(49, 1, 3, 'L\'articolo 5 sancisce l\'unità indivisibile della Repubblica e promuove le autonomie locali.', 1),
(50, 1, 3, 'L\'articolo 7 disciplina i rapporti tra Stato e Chiesa cattolica.', 1),
(51, 1, 3, 'L\'articolo 21 tutela la libertà di stampa e di espressione.', 1),
(52, 1, 3, 'L\'articolo 32 protegge la salute come diritto fondamentale dell\'individuo.', 1),
(53, 1, 3, 'L\'articolo 33 garantisce la libertà di insegnamento.', 1),
(54, 1, 4, 'Il Parlamento italiano è composto dalla Camera dei deputati e dal Senato della Repubblica.', 1),
(55, 1, 4, 'Il Senato è composto da senatori eletti su base regionale.', 1),
(56, 1, 4, 'Gli ex Presidenti della Repubblica sono membri di diritto del Senato.', 1),
(57, 1, 4, 'La Camera dei deputati e il Senato hanno identiche funzioni legislative.', 1),
(58, 1, 4, 'I senatori a vita sono nominati dal Presidente della Repubblica.', 1),
(59, 1, 4, 'Il Senato ha un numero massimo di 200 senatori eletti.', 1),
(60, 1, 4, 'La Camera dei deputati ha un numero di membri fisso a 630.', 0),
(61, 1, 4, 'I deputati devono avere almeno 30 anni per essere eletti.', 0),
(62, 1, 4, 'La Camera dei deputati rappresenta gli enti territoriali.', 0),
(63, 1, 4, 'Le due camere si riuniscono separatamente per eleggere il Presidente della Repubblica.', 0),
(64, 1, 5, 'Le elezioni politiche in Italia si svolgono ogni 4 anni.', 0),
(65, 1, 5, 'Gli elettori possono votare fuori dal proprio comune di residenza senza giustificazioni.', 0),
(66, 1, 5, 'È obbligatorio votare per i cittadini italiani.', 0),
(67, 1, 5, 'Le elezioni politiche prevedono un sistema elettorale unicamente proporzionale.', 0),
(68, 1, 5, 'Le elezioni regionali sono organizzate dal governo centrale.', 0),
(69, 1, 5, 'Il voto in Italia è segreto.', 1),
(70, 1, 5, 'Le elezioni sono regolate dalla Costituzione e da leggi ordinarie.', 1),
(71, 1, 5, 'Gli italiani all\'estero possono votare alle elezioni politiche.', 1),
(72, 1, 5, 'Non è possibile candidarsi se si hanno meno di 18 anni.', 1),
(73, 1, 5, 'Durante le elezioni, è vietato pubblicare sondaggi nei 15 giorni precedenti.', 1),
(74, 1, 6, 'Si può votare per la Camera dei deputati a partire dai 18 anni.', 1),
(75, 1, 6, 'Si può votare per il Senato della Repubblica a partire dai 18 anni.', 1),
(76, 1, 6, 'I cittadini italiani all’estero votano nelle stesse condizioni di chi vive in Italia.', 1),
(77, 1, 6, 'Il diritto di voto è sospeso per chi è sottoposto a misure restrittive di libertà personale.', 1),
(78, 1, 6, 'Chi compie 18 anni il giorno delle elezioni può votare.', 1),
(79, 1, 6, 'Per votare alle elezioni amministrative è necessario avere almeno 16 anni.', 0),
(80, 1, 6, 'Il diritto di voto non è legato alla cittadinanza.', 0),
(81, 1, 6, 'I diciassettenni possono votare per il referendum.', 0),
(82, 1, 6, 'L’età minima per votare varia in base al tipo di elezione.', 0),
(83, 1, 6, 'L’età di voto in Italia è tra le più alte d’Europa.', 0),
(84, 1, 7, 'Si può richiedere la cittadinanza dopo 5 anni di residenza regolare in Italia, se si è cittadini di un Paese non UE.', 0),
(85, 1, 7, 'Il matrimonio con un cittadino italiano dà diritto automatico alla cittadinanza.', 0),
(86, 1, 7, 'L\'ottenimento della cittadinanza italiana è regolato dalla Costituzione.', 0),
(87, 1, 7, 'Gli stranieri possono perdere la cittadinanza italiana se non rispettano le leggi italiane.', 0),
(88, 1, 7, 'La cittadinanza italiana si acquisisce automaticamente se si nasce da almeno un genitore italiano.', 1),
(89, 1, 7, 'È possibile perdere la cittadinanza italiana.', 1),
(90, 1, 7, 'I minorenni acquisiscono automaticamente la cittadinanza se adottati da un cittadino italiano.', 1),
(91, 1, 7, 'La cittadinanza può essere concessa per meriti eccezionali.', 1),
(92, 1, 7, 'La cittadinanza italiana si può ottenere dopo 4 anni di residenza per cittadini UE.', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `id` int(11) NOT NULL,
  `nome` varchar(256) NOT NULL,
  `cognome` varchar(256) NOT NULL,
  `mail` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `certificato` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`id`, `nome`, `cognome`, `mail`, `password`, `certificato`) VALUES
(1, 'user1', 'user1', 'user1@gmail.com', '7c87df91bb0609fe971577b56e6a184e5ad7cfe7', 1),
(3, 'user2', 'user2', 'user2@gmail.com', '7c87df91bb0609fe971577b56e6a184e5ad7cfe7', 1),
(4, 'user3', 'user3', 'user3@gmail.com', '7c87df91bb0609fe971577b56e6a184e5ad7cfe7', 0),
(5, 'user5', 'user5', 'user5@gmail.com', 'c888c7291882517101db77ccc8eaf1a589da3772', 0),
(6, 'user4', 'user4', 'user4@gmail.com', 'c888c7291882517101db77ccc8eaf1a589da3772', 0),
(7, 'user6', 'user6', 'user6@gmail.com', 'c888c7291882517101db77ccc8eaf1a589da3772', 0),
(22, 'user9', 'user9', 'user9@gmail.com', '7c87df91bb0609fe971577b56e6a184e5ad7cfe7', 0);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `domande`
--
ALTER TABLE `domande`
  ADD PRIMARY KEY (`id`),
  ADD KEY `macrocategoria` (`categoria`),
  ADD KEY `sottocategoria` (`sottocategoria`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `e-mail` (`mail`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT per la tabella `domande`
--
ALTER TABLE `domande`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT per la tabella `utente`
--
ALTER TABLE `utente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `domande`
--
ALTER TABLE `domande`
  ADD CONSTRAINT `macrocategoria` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`id`),
  ADD CONSTRAINT `sottocategoria` FOREIGN KEY (`sottocategoria`) REFERENCES `categoria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
