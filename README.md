# Musikkoje

Eine App für die Familie: **Geigenpult** (Noten, Mikro, MIDI, Lehrplan), **Riffkoje** (zu YouTube mitspielen, aufnehmen, Tabs) und **Musiktheorie** (drei Stufen: Entdecker, Schulkind, Anfänger).
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

## Akkorde (Gitarre)
Eigener Bereich „Akkorde“ in der Leiste. Alle Texte und Griffbilder sind eigens für die App geschrieben, nichts stammt aus einem Buch.
- **Lernpfad** mit 9 Lektionen: Saiten und Griffbilder lesen, Em und Am, E und A, D und Dm, C und G, Siebener-Akkorde, Barré (F, Bm), Powerchords für Rock und Metal (mit Hinweis auf Drop C), Akkordfolgen und Schlagmuster.
- **Akkordbuch** mit 23 Griffen als Bild, mit Klang (gezupfte Saiten) und Griffbeschreibung. „Ich kann ihn“ merkt sich, was du schon sauber greifst.
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
