# Musikkoje

Eine App für die Familie: **Geigenpult** (Noten, Mikro, MIDI, Lehrplan), **Riffkoje** (zu YouTube mitspielen, aufnehmen, Tabs), **Akkorde**, **Tabulatur**, **Low Whistle** und **Musiktheorie** (fünf Stufen bis „Musiker-Wissen“).
Jede Person hat ein eigenes Profil mit eigenem Fortschritt, eigenen Stücken und eigenen Aufnahmen (Wechsel oben rechts). Alles bleibt im Browser des jeweiligen Geräts.

## Neu in dieser Version
- **Hell, Dunkel oder automatisch:** Knopf oben in der Leiste (🌓/☀️/🌙) oder unter ⚙ Einstellungen. Gilt für alle Bereiche. Auf kleinen Handys steckt der Schalter nur unter ⚙.
- **Sicherung:** ⚙ → „Alles sichern“ lädt eine Datei mit allen Profilen und Fortschritten herunter, „Sicherung einspielen“ stellt sie wieder her. Einzelne Profile exportierst du unter Profil bearbeiten und liest sie unter ⚙ als neues Profil ein (praktisch für das Handy deiner Frau). Nicht enthalten: Gemini-Schlüssel und Riffkoje-Aufnahmen. Die Startseite erinnert nach 14 Tagen an eine Sicherung.
- **Geigenpult in drei Bereichen:** Üben (Heute, Plan, Lehrplan), Spielen (Stück laden, Noten, Mitspielen), Werkzeuge (Bordun, MIDI, Coach, KI, Abzeichen).
- **Griffbrett:** Zeigt für den aktuellen und den nächsten Ton Saite und Finger (erste Lage).
- **Töne, die dir schwerfallen** (Werkzeuge): Aus „Mitspielen“ und „Warten auf mich“ gesammelt, mit Tendenz zu hoch oder zu tief.
- **„Takt üben“:** Ein Knopf legt eine Schleife über den aktuellen und den nächsten Takt und startet den Tempo-Trainer bei 60 %.
- **Pads und Regler frei belegbar** (MIDI-Karte): Funktion wählen, „Zuweisen“, Pad drücken. Ein Drehregler kann das Tempo steuern. Ob die Vorgabe zu deinem Akai passt, siehst du an der „Letzten Meldung“.
- **Stücke:** Stille Nacht liegt jetzt klar gekennzeichnet als Urfassung von 1818 vor. Mit „Stimmt?“ markierst du Stücke, die du gegengehört hast. Eigene Noten (Foto) bleiben der sichere Weg für die Fassung, die ihr zuhause singt.
- **Neue Lektionen:** Metal-Galopp, Tritonus-Riff, Jig, Reel, Weihnachtslied (jetzt 27).
- **Xylophon** (Theorie, Entdecker): Farbige Klangstäbe, freies Spiel und vier Lieder zum Nachspielen für die Zwillinge.
- **Adventskalender** auf der Startseite vom 1. bis 24. Dezember. Zum Ausprobieren: `index.html?advent=12` anhängen.

## Neu: Noten lernen (Geige)
Neue Seite `noten.html` (Geige → „Noten lernen“, auch als Kachel auf der Startseite). Sie stammt aus deinem Notenlern-Programm und ist jetzt Teil der App:
- **Üben:** Eine Note erscheint im Notensystem, du findest sie auf dem Griffbrett (Klick) oder spielst sie auf der Geige (Mikrofon).
- **Entdecken:** Tippe auf das Griffbrett und sieh Note und Notenname. **Tonleitern:** zwölf Tonleitern, vorspielen oder selbst spielen.
- **Lagen:** erste bis dritte Lage; Saiten und Schreibweise (♯ oder ♭) wählbar.
- **Mikrofon:** Es nutzt dieselbe Erkennung und dieselben Einstellungen wie die übrige App (Eingang, Empfindlichkeit, Kammerton). Es zeigt, welche Quelle benutzt wird, und ob du zu hoch oder zu tief bist. „Oktavfehler erlauben“ ist standardmäßig an, weil Mikrofone bei Geigentönen manchmal eine Oktave daneben liegen. Fehlt die Freigabe (z. B. in einer Vorschau), steht eine verständliche Meldung dort.
- Treffer, Serie und Übetage werden pro Profil gespeichert und mit dem Geräte-Abgleich synchronisiert.
- Das Notensystem mit Hinweis und Mikrofon-Anzeige bleibt beim Scrollen oben stehen, damit du Note und Griffbrett gleichzeitig siehst.

## Neu: Lektionen zu Tonleitern und Lagen
- **Dur- und Moll-Bauplan:** „Dur-Tonleiter: der Bauplan“ (Ganz-/Halbtonschritte, C-Dur), „Moll-Tonleiter: Bauplan und Parallele“ (e-Moll) und „d-Moll und h-Moll“.
- **Lagen:** „die erste Lage“ (G-Dur), „die dritte Lage“ (D-Dur über zwei Oktaven, Gleitfinger) und „Tonleitern über zwei Oktaven“ (in Achteln).
- **Vollbild-Pult:** Der Knopf sitzt jetzt direkt über dem Notenblatt.

## Neu: faireres Bewerten beim langsamen Spielen
Der Nachklang des vorigen Tons und die ersten 0,3 Sekunden nach einem Tonwechsel zählen nicht mehr als Fehler (vorher waren die ersten Töne nach einem Saitenwechsel oft orange). Im Modus „Warten auf mich“ gilt ein Ton nur noch als Fehlversuch, wenn du dauerhaft (über eine halbe Sekunde) daneben liegst und den Ton noch nicht getroffen hattest. Das Suchen und Reinrutschen beim langsamen Spielen zählt nicht mehr dagegen. Beim Mitspielen reicht jetzt ein Viertel der Zeit auf dem richtigen Ton.

## Neu: Lektionen mit Ziel, Vollbild-Pult repariert
- **Ziel pro Übung:** Jede Lektions-Übung zeigt jetzt „Aufgabe: … 1 2 3“. Ein Durchgang zählt, wenn mindestens die Hälfte der Töne gleich beim ersten Mal richtig ist. Nach 3 gezählten Durchgängen ist die Lektion geschafft, dann erscheint der Knopf „Nächste Lektion“. Das Quiz ist freiwillig.
- **Vollbild-Pult:** Die Steuerleiste verdeckt die letzte Notenzeile nicht mehr (Seitenaufteilung richtet sich nach der Höhe der Leiste). Das Notenblatt war seit der Aufteilung in Üben/Spielen/Werkzeuge im Vollbild unsichtbar. Jetzt füllt es Hoch- und Querformat, und die Hinweisbox verdeckt „Pult verlassen“ nicht mehr.

## Neu: Farbstil wie die Knotenpunkt-Praxis
Alle Bereiche und die Navigationsleiste nutzen jetzt die Farben der Praxis-App: Marineblau, warmes Sandweiß, gedämpftes Grün; im Dunkelmodus Blaugrau mit hellblauem Akzent.

## Neu: Einstellungen und Live-Anzeige beim Üben
- **Einstellungen:** ⚙ oben rechts → eigene Seite `einstellungen.html`. Dort stehen Mikrofon-Quelle (Auswahlliste aller Eingänge, mit Hinweis, welche Quelle gerade wirklich benutzt wird), ein Mikrofon-Test mit Pegelanzeige, erkanntem Ton und Cent-Nadel, Empfindlichkeit, Kammerton (A4), Hell/Dunkel, Sicherung/Geräte-Abgleich und Profile.
- **Mikrofon-Test:** „Test starten“, einen Ton spielen oder singen. Die Seite zeigt Notenname, „zu hoch“/„zu tief“ in Cent und die aktive Quelle. Beim Tablet-Mikro bitte die Auswahl „Eingebautes Mikrofon“ probieren, falls der Standard nicht reagiert.
- **Live-Anzeige im Notenblatt (Geigenpult):** Beim Mitspielen erscheint am Cursor eine kleine Blase mit deinem gespielten Ton und „▲ zu hoch“, „▼ zu tief“ oder „✓ sauber“. Spielst du einen anderen Ton als den gesuchten, steht dort „gesucht: …“. Abschaltbar unter Einstellungen („Live-Anzeige“).
- Die Einstellungen gelten für alle Bereiche (Geigenpult, Riffkoje, Low Whistle) pro Gerät.

## Neu: Abgleich zwischen Geräten
⚙ → „Geräte-Abgleich“ hält den Fortschritt auf Handy, Tablet und Computer gleich, über eine Sync-Datei in einem Cloud-Ordner (Google Drive, iCloud, Nextcloud, Dropbox). Die App hat keinen eigenen Server, deshalb liegt die Datei bei dir.
- **Chrome/Edge am Computer (und teils Android):** „Neue Sync-Datei anlegen“, Cloud-Ordner wählen, fertig. Danach „Jetzt abgleichen“ (die Startseite erinnert nach 12 Stunden).
- **Handy und andere Browser:** „Mit Sync-Datei abgleichen“: Datei aus der Cloud wählen, die App führt sie mit dem Gerät zusammen und bietet die neue Datei zum Speichern an. In denselben Ordner speichern und die alte ersetzen. Beim ersten Mal gibt es noch keine Datei: Auswahl abbrechen, die Datei wird erzeugt.
- **Zusammenführen statt überschreiben:** Zahlen: größerer Wert, Bestzeiten: kleinerer Wert, Tage, Sterne, Lektionen und Listen: Vereinigung. Nichts geht verloren, aber ein „Als offen markieren“ kann durch den anderen Stand zurückkommen.
- **Freunde:** Jede Person nutzt ihre eigene Sync-Datei. Profile werden über eine zufällige Kennung erkannt, notfalls über den Namen.
- Nicht enthalten: Gemini-Schlüssel, Pad-Belegung und Riffkoje-Aufnahmen.

## Stand v28: Eigene Übungen in den Lehrpfaden
- **Intonationsanzeige** (Nadel in Cent, grüner Bereich, Halten bis der Ton sauber sitzt, Referenzton): in den Pfaden Geige (D-Dur, G-Dur), Whistle (D–E–Fis, D-Dur, zweite Oktave) und Gitarre (Stimmung prüfen, ±10 Cent). Oktave egal.
- **Tonhalte-Trainer** (gleichmäßig halten, Wackler setzen die Zeit zurück): Whistle (8 und 12 s) und Geige (Bogenstrich, 8 s).
- **Verzierungen zum Anhören** (Whistle, Stufe 6): Cut, Tap und Roll langsam und im Tempo. Die genauen Griffe zeigt die Whistle-Seite.
- Neue Aufgabentypen in `pfad-stufen.js`: `inton`, `hold`, `hear`.

## Stand v27: Lehrpfade, Theorie Pro, Gehörtraining
- **Gemeinsamer Kern** `pfad.js` (Theorie-Bausteine mit korrekter Notenschreibweise, Töne, Mikrofon-Erkennung, Notenzeile, Klaviatur), `pfad-quiz.js` (Quiz-Seite mit Kapiteln, Sternen, Schwachstellen-Training) und `pfad-stufen.js` (Stufenpfade mit Abhaken, Zähler, Mikrofon-Prüfung, Griffbrett-Trainer).
- **Gehörtraining** (`gehoer.html`, 42 Lektionen, 9 Kapitel): höher/tiefer, Intervalle, Dur/Moll, Akkorde (auch Septakkorde und Umkehrungen), Nachspielen per Bildschirm/MIDI/Mikrofon, Rhythmus nachklatschen, Harmonie (Stufen, Kadenzen, Akkordfolgen), Tonleitern und Modi, Stufen hören. Aufgaben werden zufällig erzeugt. Falsch beantwortete Lektionen bietet die App als Schwachstellen-Training an.
- **Theorie Pro** (`harmonie.html`, 43 Lektionen, 7 Kapitel): Tonarten und Quintenzirkel, Intervalle (Notenbild, bauen, Umkehrung), Tonleitern und Modi bauen, Akkorde und Symbole, Stufenakkorde, Funktionen, Kadenzen, Zwischendominanten, Notenwerte, Tempo/Dynamik, Formen, Stimmungen, Transponieren, Kapo. Antworten werden berechnet, nicht von Hand getippt.
- **Lehrpfade je Instrument** (`pfad-gitarre.html`, `pfad-geige.html`, `pfad-whistle.html`): je acht Stufen mit Zielen und Aufgaben, verknüpft mit den vorhandenen Übungsseiten. Gitarre mit Akkordwechsel-Zähler (60 Sekunden), Griffbrett-Trainer und Pentatonik-Prüfung. Geige und Whistle mit Tonleiter-Prüfung per Mikrofon. Die Pfade bleiben getrennt, nur Aufbau und Gestaltung sind gleich.
- Navigation: Unterleisten für Geige, Gitarre, Whistle und Theorie. Mentor-Bericht kennt jetzt Gehör, Theorie Pro und Lehrpfade.

## Stand v26: Klavier – Mikrofon und großer Lehrgang
- **Mikrofon-Erkennung** (Button „Mikrofon“ auf der Klavierseite): erkennt einzelne Töne (Autokorrelation) und Klatschen/Anschläge. Empfindlichkeit einstellbar, Pegelanzeige mit Schwelle. Mit Mikrofon bleiben App-Töne und Metronom-Klicks stumm, damit sie nicht fälschlich gehört werden. „Oktave egal“ gilt auch hier. Akkorde werden mit Mikrofon nacheinander gespielt.
- **62 Lektionen in 7 Kapiteln:** Erste Töne, Lieder (8), Linke Hand mit Bassschlüssel, Rhythmus (9, mit Vorzähler und Treffer-Auswertung), Schwarze Tasten und Tonleitern (Dur/Moll mit Vorzeichen, Halb-/Ganzton, Für Elise), Intervalle (gesuchter Ton ist erst versteckt), Akkorde (Dreiklänge, Kadenz, Pop-Folge).
- Notation mit Notenlängen (Viertel, halbe, ganze, Achtel, Punkt), Vorzeichen, Pausen, Hilfslinien und Akkorden. Info-Text je Lektion, „Weiter“-Knopf, Kapitel mit Sternen.
- Die Lieder ohne sichere Notenlängen zeigen nur Tonhöhen und sind so benannt.

## Stand v25: Klavier lernen
- Neue Seite `klavier.html` (Kachel auf der Startseite, im Menü „Klavier“). Die nächste Note erscheint auf der Notenzeile, der Name groß daneben, und die passende Taste auf der Klaviatur leuchtet in derselben Farbe. Das Programm wartet, bis die richtige Taste gespielt wird (kein Zeitdruck, keine Strafe).
- Acht Lektionen: C–D–E, fünf Töne, eine Oktave, dazu Hot Cross Buns, Morgen kommt der Weihnachtsmann, Alle meine Entchen, Hänschen klein, Ode an die Freude. Sterne pro Lektion, pro Profil gespeichert. Zählt in der Übungszeit mit („Klavier“).
- **Kindermodus:** große Tasten, jede mit Namen, bunte Noten, Note vorlesen (Sprachausgabe des Geräts), Nachfrage nach drei Fehlern. Der Modus ist bei Kita-Profilen von Anfang an an.
- Eingabe über Bildschirmtasten oder USB-MIDI-Keyboard (Web-MIDI, Android Chrome/Edge). „Oktave egal“ ist an, damit das Kind auf einem großen Keyboard in irgendeiner Oktave spielen darf.
- Noch nicht dabei: Mikrofon-Erkennung, Rhythmus/Notenlängen, schwarze Tasten in den Lektionen.

## Stand v24: Karte „Dein Stand“ im Mentor-Bericht
- Oben auf `mentor.html` steht jetzt eine lesbare Auswertung ohne KI: Übungszeit, Tonhöhe, Stimmung (zu tief/zu hoch), Verlauf, Rhythmus, Noten lernen, Lehrplan. Den Chat-Text gibt es weiterhin darunter.

## Stand v23: Mentor-Bericht
- Neue Seite `mentor.html` (Kachel auf der Startseite, im Geige-Untermenü). Sie baut aus den Daten des gewählten Profils einen Text: Übungszeit der letzten 28 Tage, Lektionen, Bestwerte, schwächste Töne aus „Noten lernen“, die letzten Aufnahme-Auswertungen, Gitarre/Whistle/Theorie, dazu die Lieder in der App und eine Aufgabe (Plan, Lieder, Schwächen, Aufnahmen, freie Frage).
- Den Text kopierst du in einen Chat mit Claude. Nichts wird automatisch verschickt, Aufnahmen sind nicht enthalten. Optionales Feld „Über dich“ (Ziele, Geschmack, Zeit) wird pro Profil gespeichert.

## Stand v22: Aufnahmen speichern
- Nach jeder Auswertung (aufgenommen oder geladen) kannst du die Aufnahme anhören, benennen und speichern. Unten auf der Seite steht „Meine Aufnahmen“: anhören, umbenennen, als WAV herunterladen, löschen (mit Rückfrage).
- Gespeichert wird nur auf dem Gerät (im Browser, IndexedDB), getrennt pro Profil. Eine Minute ist ca. 1,3 MB groß. Die Aufnahmen sind **nicht** in der Geräte-Sicherung und beim Abgleich zwischen Geräten enthalten. Wichtige Aufnahmen daher herunterladen. Löschst du die Browserdaten, sind sie weg.

## Stand v21: Aufnahme auswerten, Heute üben, Wochenverlauf, Verknüpfungen
- **Aufnahme auswerten (analyse.html, Geige → 🎙):** Du nimmst dein Spiel mit dem Mikrofon auf (Eingang wie in den Einstellungen) oder lädst eine Audiodatei. Die Seite zeigt pro Ton die Abweichung in Cent (gerechnet ab deiner eigenen Grundstimmung), die Schwankung, Tempo, Gleichmäßigkeit, Pausen und ein Tonhöhen-Diagramm. Dazu kurze Hinweise. Der Verlauf der letzten Auswertungen vergleicht mit dem letzten Mal. Aufnahmezeit zählt wie Übungszeit. Alles läuft auf dem Gerät.
  - Erkennung: Autokorrelation mit Oktavprüfung über die Obertöne (Handy-Mikrofone haben oft kaum Grundton). Wiederholte gleiche Töne werden über Lautstärkeeinbrüche getrennt. Die Werte sind Schätzungen mit wenigen Cent Unsicherheit.
- **Heute üben:** Neue Karte oben auf der Startseite. „Los geht’s“ öffnet den 10-Minuten-Plan im Geigenpult.
- **Diese Woche:** Balken der Übeminuten der letzten sieben Tage, geübte Tage und Trefferquote aus Noten lernen.
- **Verknüpfungen:** Die Lektionen „Lagen“ (1–3) und „Tonleitern“ haben einen Knopf „In Noten lernen üben“ (springt mit der passenden Lage). In Noten lernen führt ein Link zurück zur Lektion. Übungszeit aus Noten lernen zählt im Geigen-Protokoll (Min. Geige heute, Serie).
- **Noten lernen merkt sich:** Lage, Namen, Ton, Oktavfehler, Saiten, Schreibweise und Tonleiter. Mit `?lage=2` oder `?mode=s` lässt sich die Seite direkt in eine Lage oder Tonleiter-Ansicht öffnen.
- Tippflächen: Knöpfe und Auswahlfelder sind mindestens 44 px hoch (kleine Knöpfe 40 px).
- Bibliotheken für die Notenanzeige (Tone, OSMD) werden nach dem ersten Laden im Zwischenspeicher gehalten und funktionieren danach auch ohne Netz.

## Alle Lagen in „Noten lernen“ (Stand v20)
- Beim Start zeigt die Seite die 1. bis 5. Lage auf einem Griffbrett (16 Halbtonschritte, bis zum hohen G auf der E-Saite). Gestrichelte Linien zeigen, wo die jeweilige Lage endet. Die Zeilenbeschriftung nennt die Lage. Höher als die 5. Lage kommen die meisten Hobby-Geiger selten.
- Oben lassen sich einzelne Lagen wählen (1. bis 5. Lage).
- Tonleitern: Bei einer einzelnen Lage siehst du die Tonleiter mit Fingernummern genau in dieser Lage. Bei „Alle Lagen“ leuchten alle Stellen der Tonleiter auf dem ganzen Griffbrett mit dem Notennamen auf.
- Übungen, Entdecken, Mikrofon und die Schwächen-Ringe arbeiten mit der gewählten Auswahl.

## Einheitliche Optik, Wischen, 10-Minuten-Plan, Schwächen (Stand v18)
- Alle Seiten haben jetzt dieselbe Schrift (Systemschrift), dieselben Überschriften mit Symbol, gleiche Kartenrundung (14 px) und gleiche Knopfformen (10 px). Die Geigenpult-Seite lädt keine Google-Schriften mehr, sie funktioniert also auch offline gleich.
- Geigenpult, Vollbild-Pult: mit dem Finger nach links wischen = nächste Seite, nach rechts = zurück. Kurze oder schräge Wischer zählen nicht, damit Tippen auf eine Note weiter funktioniert.
- Tagesplan: neuer Knopf „⏱ 10-Minuten-Plan“ (Aufwärmen, Tonleiter oder neue Lektion, Noten lernen, ein Stück). Der normale Plan enthält jetzt auch „Noten lernen: schwache Töne“, das die Seite „Noten lernen“ öffnet.
- Noten lernen merkt sich pro Ton Treffer und Fehler. Fehler verblassen mit jedem Treffer. Schwache Töne werden öfter gefragt (abschaltbar mit „Schwache Töne öfter fragen“). Im Griffbrett zeigen Ringe, was wackelt (rot), fast sitzt (gelb) und sitzt (grün). Unter dem Griffbrett steht die Liste „Deine Schwächen“ mit Zurücksetzen. Bei Mikrofon-Übungen zählt ein Ton, der länger als 12 Sekunden dauert, als halber Fehler.
- Fehler behoben: Ab dem 15. November stürzte das Geigenpult beim ersten Öffnen eines neuen Tages ab, weil der Tagesplan die Liederliste noch nicht kannte. Der Plan wird jetzt erst nach der Liederliste aufgebaut.

## Aufgeräumt
- Leiste oben: Start, Geige, Riff, **Gitarre** (Akkorde und Tabulatur mit eigener Unterleiste), Whistle, Theorie. Passt auf dem Handy in eine Zeile.
- Startseite nach Instrumenten gegliedert, mit „Weitermachen“-Karte für die zuletzt geöffnete Seite.

## Neu: mehr Gitarre, Low Whistle, Musiker-Wissen
- **Akkorde:** jetzt 57 Griffe und 14 Lektionen. Neu: sus2/sus4/7sus4, Maj7 (auch H), Maj9, Moll7, m9, Add9, Sexten, Neuner, Barré (H, Fm, Gm, Cm), vermindert, übermäßig. Dazu ein **Rhythmus-Trainer** (Üben): 10 Schlagmuster mit Auf-/Abschlag-Pfeilen, Einzähl-Takt, Klick, Akkord oder Folge, optional Tempo-Steigerung.
- **Tabulatur** (`tabs.html`): 8 Lektionen (Tab lesen, Bundzahlen, Finger, Arpeggios, Rhythmus, Techniken h/p/Slide/Bending/PM, Pentatonik, Metal-Riffs), 10 Übungen zum Hören und Mitspielen mit laufendem Cursor, Tempo, Klick und Wiederholen, plus Tab-Quiz.
- **Low Whistle** (`whistle.html`): Annahme Low D. 9 Lektionen, Griffbilder für 15 Töne, Tune-Trainer mit Griffanzeige (Haste to the Wedding, St. Patrick’s Day, Drowsy Maggie, Weihnachtslieder und Übungen), **Finger-Trainer** (Ton genannt, Löcher antippen, Zeit und Bestzeit), „Warte auf mich“ per Mikrofon, Stimmgerät, Quiz. Das Mikrofon kannst du im Stimmgerät direkt auswählen. Alle Melodien liegen in der Low-D-Lage. Nicht getestet mit deiner echten Whistle.
- **Theorie:** neue Stufe **Musiker-Wissen** mit 14 Lektionen (Quintenzirkel, Paralleltonarten, Stufenakkorde, Kadenzen, Septakkorde, sus/add9, Intervalle, Pentatonik und Blues, Rhythmus, Transponieren, Vortragszeichen, Form, Gehör, Üben).

## Akkorde (Gitarre)
Eigener Bereich „Akkorde“ in der Leiste. Alle Texte und Griffbilder sind eigens für die App geschrieben, nichts stammt aus einem Buch.
- **Lernpfad** mit 14 Lektionen (inklusive sus, maj7, Farbakkorde, Rhythmus): Saiten und Griffbilder lesen, Em und Am, E und A, D und Dm, C und G, Siebener-Akkorde, Barré (F, Bm), Powerchords für Rock und Metal (mit Hinweis auf Drop C), Akkordfolgen und Schlagmuster.
- **Akkordbuch** mit 57 Griffen als Bild, mit Klang (gezupfte Saiten) und Griffbeschreibung. „Ich kann ihn“ merkt sich, was du schon sauber greifst.
- **Üben:** Wechsel-Trainer mit Metronom und Minuten-Zähler (Bestwert), sieben Akkordfolgen zum Mitspielen (unter anderem Andalusisch und ein Powerchord-Riff) und ein Quiz (Griffbild erkennen, Dur oder Moll hören).
- Nicht enthalten: Erkennung, ob dein Griff sauber klingt (die App hört deine Gitarre dabei nicht ab). Die Griffe gelten für Standardstimmung.

## Online stellen (GitHub Pages)
1. Am einfachsten im bestehenden Repo `Riffkoje` arbeiten: Dateien dort ersetzen. Dann bleibt die Adresse `https://feuerfuchs89.github.io/Riffkoje/` und die vorhandenen Riffkoje-Daten im Browser bleiben erhalten.
2. Alle Dateien aus diesem Ordner direkt hochladen (es gibt keine Unterordner; alte Dateien überschreiben). Den früheren Ordner `icons` im Repo kannst du löschen.
3. Settings → Pages → Branch `main`, Ordner `/ (root)`.
4. Nach ca. 1 Minute läuft die App. Auf Handy/Tablet „Zum Startbildschirm hinzufügen“.

## Profile
- Das erste Profil („Micha“) übernimmt alle bisherigen Daten von Geigenpult und Riffkoje.
- Neue Profile (z. B. für die Kinder) bekommen Name, Symbol und Stufe. Die Stufe bestimmt, welche Theorie-Stufe zuerst geöffnet wird.
- Profile lassen sich bearbeiten und löschen. Löschen entfernt die Daten dieses Profils auf diesem Gerät.

## Geigenpult
- Foto-Erkennung, Tagesplan und Coach laufen über die Gemini-API. Schlüssel kostenlos in Google AI Studio erstellen und im Bereich „KI-Zugang“ eintragen. Er gilt pro Profil.
- **Stücke** (Karte „Stücke“ im Bereich Laden): Weihnachten: Stille Nacht, O Tannenbaum, O du fröhliche. Irisch: Haste to the Wedding, St. Patrick's Day, Drowsy Maggie. Die Weihnachtslieder stammen aus freien Notensammlungen (Stille Nacht aus zwei Quellen abgeglichen; O Tannenbaum und O du fröhliche aus der Essener Volksliedsammlung) und können von der Version abweichen, die ihr kennt. Bitte kurz gegenhören. Die irischen Melodien sind aus O'Neill's (gemeinfrei).
- Neue Lektionen: Dorisch, Mixolydisch, Phrygisch und Polska-Übung. Die Polska-Übung ist im Stil erzeugt und keine echte Volksmelodie.
- Ab 15. November schlägt der Tagesplan ein Weihnachtslied vor.
- MIDI-Keyboard (Chrome/Edge am Computer oder Android), Bordun, Lehrplan, Abzeichen siehe App.

## Musiktheorie
- **Entdecker** (ab ca. 4 Jahren, mit Erwachsenem): Hoch/tief, laut/leise, schnell/langsam, lang/kurz, Treppen, fröhlich/traurig, Klatsch-Rhythmus. Fragen lassen sich vorlesen. Jede Lektion hat einen Tipp zum Mitmachen ohne Bildschirm.
- **Schulkind** (ca. 6 bis 10): Notensystem, Notennamen C bis H, Notenwerte, Takt, Rhythmus nachklatschen, Lautstärkezeichen, Tonleiter und Dur/Moll hören.
- **Anfänger** (Jugendliche, Erwachsene): Vorzeichen, Notenwerte, Intervalle, Dur und Tonarten, Dreiklänge, Moll-Formen.
- **Stilwelten** (🤘, für Erwachsene): Moll und Powerchords (Metal), Kirchentonarten Dorisch/Mixolydisch/Phrygisch, irische Tanzformen (Jig, Reel, Hornpipe), Verzierungen, schwedische Polska (Dreiertakt mit betontem 2. Schlag), Galopp-Rhythmus, Tritonus. Mit Hör- und Klatschaufgaben.
- Sterne und XP pro Lektion, Serie in Tagen. Kein Ranking mit anderen.

## Riffkoje
Funktioniert wie bisher (siehe die Hinweise in der App). Takes und Songs liegen pro Profil getrennt.

## v29: Umbau Startseite und Bedienung
- Startseite: farbige Begrüßung mit Zahlen, Instrument-Weiche (Geige, Klavier, Gitarre, Whistle, Wissen) merkt sich die letzte Wahl, Lehrpfade als „Empfohlen“ mit Fortschrittsbalken, Wochenübersicht nach unten.
- Navigation einzeilig und scrollbar auf dem Handy, Profilwechsel bleibt sichtbar.
- Lernseiten: weichere Karten, Fokus-Rahmen, ruhigere Animationen (respektiert „weniger Bewegung“).

## v30: Gesang
- Neuer Lehrpfad pfad-gesang.html (Key pf.ges, 8 Stufen, 33 Aufgaben): Atem, erster Ton, C-Dur, Intervalle, Umfang, Lieder, Ausdruck, Auftritt. Mikrofon-Intonation (Oktave egal), Tonhalte, Hörbeispiele.
- Startseite: sechster Reiter „Gesang“; Navigation und Cache ergänzt.

## v31: Mehr Gesang
- Neue Seite gesangslehre.html (Key pf.gl, 12 Lektionen in 6 Kapiteln): Stimmlippen, Atmung, Stimmlagen, Register, Aufwärmen und Stimmpflege, Haltung, Vokale, Dynamik und Vibrato, Intonation inkl. Hörübung (höher/tiefer/sauber), Chor, Mikrofon.
- Lehrpfad Gesang: jetzt 10 Stufen, 50 Aufgaben (a-Moll, Pentatonik, Ode an die Freude, Kuckuck, Sprünge, Moll-Dreiklang, Pop/Mikrofon). Verknüpfung zur Gesangslehre.
