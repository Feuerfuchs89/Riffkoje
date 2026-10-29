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
- **Neue Lektionen:** Metal-Galopp, Tritonus-Riff, Jig, Reel, Weihnachtslied (jetzt 21).
- **Xylophon** (Theorie, Entdecker): Farbige Klangstäbe, freies Spiel und vier Lieder zum Nachspielen für die Zwillinge.
- **Adventskalender** auf der Startseite vom 1. bis 24. Dezember. Zum Ausprobieren: `index.html?advent=12` anhängen.

## Neu: Abgleich zwischen Geräten
⚙ → „Geräte-Abgleich“ hält den Fortschritt auf Handy, Tablet und Computer gleich, über eine Sync-Datei in einem Cloud-Ordner (Google Drive, iCloud, Nextcloud, Dropbox). Die App hat keinen eigenen Server, deshalb liegt die Datei bei dir.
- **Chrome/Edge am Computer (und teils Android):** „Neue Sync-Datei anlegen“, Cloud-Ordner wählen, fertig. Danach „Jetzt abgleichen“ (die Startseite erinnert nach 12 Stunden).
- **Handy und andere Browser:** „Mit Sync-Datei abgleichen“: Datei aus der Cloud wählen, die App führt sie mit dem Gerät zusammen und bietet die neue Datei zum Speichern an. In denselben Ordner speichern und die alte ersetzen. Beim ersten Mal gibt es noch keine Datei: Auswahl abbrechen, die Datei wird erzeugt.
- **Zusammenführen statt überschreiben:** Zahlen: größerer Wert, Bestzeiten: kleinerer Wert, Tage, Sterne, Lektionen und Listen: Vereinigung. Nichts geht verloren, aber ein „Als offen markieren“ kann durch den anderen Stand zurückkommen.
- **Freunde:** Jede Person nutzt ihre eigene Sync-Datei. Profile werden über eine zufällige Kennung erkannt, notfalls über den Namen.
- Nicht enthalten: Gemini-Schlüssel, Pad-Belegung und Riffkoje-Aufnahmen.

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
