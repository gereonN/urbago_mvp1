# Beispiel-Ausgaben für die "Beet planen"-Funktion

## Übersicht

Dieses Dokument enthält Beispiel-Ausgaben für die "Beet planen"-Funktion der Urbago-Anwendung. Die Beispiele zeigen, wie die Ergebnisse des Algorithmus für verschiedene Szenarien aussehen würden und dienen als Referenz für das Entwicklungsteam, die Projektleitung und die UX-Designerin.

## Beispiel 1: Kleines Gemüsebeet (2,5m × 1,2m)

### Eingabeparameter

**Ausgewählte Pflanzen:**
- Tomate (Solanum lycopersicum)
- Basilikum (Ocimum basilicum)
- Karotte (Daucus carota)
- Salat (Lactuca sativa)

**Beetmaße:**
- Länge: 2,5 Meter
- Breite: 1,2 Meter
- Gesamtfläche: 3,0 Quadratmeter

### HTML-Ausgabe

```html
<div class="bed-plan">
  <h2>📋 Übersicht des Bepflanzungsplans</h2>
  <p>Hier ist dein optimierter Bepflanzungsplan für ein Beet mit 2,5m × 1,2m (3,0m²). Der Plan kombiniert 4 Pflanzenarten in einer harmonischen Mischkultur, die sowohl Platz als auch Pflanzenkompatibilität optimal nutzt.</p>
  
  <div class="plan-summary">
    <ul>
      <li><strong>Gesamtanzahl Pflanzen:</strong> 28</li>
      <li><strong>Pflanzenarten:</strong> 4</li>
      <li><strong>Besonderheiten:</strong> Vertikale Schichtung, optimierte Mischkultur, kontinuierliche Ernte</li>
    </ul>
  </div>

  <h2>🌱 Pflanzenverteilung</h2>
  <table class="plant-distribution">
    <tr>
      <th>Pflanze</th>
      <th>Anzahl</th>
      <th>Position im Beet</th>
      <th>Begründung</th>
    </tr>
    <tr>
      <td>Tomate</td>
      <td>5</td>
      <td>Nördliche Zone</td>
      <td>Hochwachsend, bietet Schatten für andere Pflanzen</td>
    </tr>
    <tr>
      <td>Basilikum</td>
      <td>8</td>
      <td>Mittlere Zone, nahe Tomaten</td>
      <td>Verbessert Tomatengeschmack, hält Schädlinge fern</td>
    </tr>
    <tr>
      <td>Karotte</td>
      <td>10</td>
      <td>Mittlere Zone, zwischen Basilikum</td>
      <td>Nutzt Platz unter Basilikum, lockert Boden</td>
    </tr>
    <tr>
      <td>Salat</td>
      <td>5</td>
      <td>Südliche Zone</td>
      <td>Profitiert vom leichten Schatten der Tomaten</td>
    </tr>
  </table>

  <h3>Optimale Pflanzzeit</h3>
  <ul>
    <li><strong>Tomaten:</strong> Mitte April bis Mitte Mai</li>
    <li><strong>Basilikum:</strong> Mitte Mai bis Juni</li>
    <li><strong>Karotten:</strong> März bis Juli (gestaffelt für kontinuierliche Ernte)</li>
    <li><strong>Salat:</strong> März bis August (gestaffelt für kontinuierliche Ernte)</li>
  </ul>

  <h2>🗺️ Visueller Beetplan</h2>
  <div class="visual-plan">
    <pre>
┌─────────────────────────────────────────┐
│                  NORDEN                  │
├─────────────────────────────────────────┤
│ T     T     T     T     T               │
│                                         │
│ B  C  B  C  B  C  B  C  B  C  B  C  B  C│
│                                         │
│ L     L     L     L     L               │
├─────────────────────────────────────────┤
│                  SÜDEN                   │
└─────────────────────────────────────────┘

Legende:
T = Tomate
B = Basilikum
C = Karotte
L = Salat
    </pre>
  </div>

  <p><strong>Empfohlene Ausrichtung:</strong> Nord-Süd, mit Tomaten im Norden, damit sie kleinere Pflanzen nicht beschatten.</p>

  <h2>💧 Pflege- und Bewässerungshinweise</h2>
  
  <h3>Bewässerungszonen</h3>
  <ul>
    <li><strong>Zone 1 (mittlerer Wasserbedarf):</strong> Tomaten und Basilikum</li>
    <li><strong>Zone 2 (höherer Wasserbedarf):</strong> Salat</li>
    <li><strong>Zone 3 (gleichmäßiger Wasserbedarf):</strong> Karotten</li>
  </ul>

  <h3>Bewässerungsempfehlungen</h3>
  <ul>
    <li><strong>Frühjahr:</strong> Alle 2-3 Tage, morgens</li>
    <li><strong>Sommer:</strong> Täglich bei Hitze, vorzugsweise abends</li>
    <li><strong>Herbst:</strong> Alle 3-4 Tage, je nach Witterung</li>
  </ul>

  <p>Für optimale Wassernutzung empfehle ich Tropfbewässerung oder Gießen direkt an der Wurzel. Mulchen hilft, die Feuchtigkeit im Boden zu halten.</p>

  <h3>Besondere Pflegehinweise</h3>
  <ul>
    <li><strong>Tomaten:</strong> Regelmäßig ausgeizen und aufbinden</li>
    <li><strong>Basilikum:</strong> Regelmäßig ernten, um buschiges Wachstum zu fördern</li>
    <li><strong>Karotten:</strong> Nach dem Auflaufen auf ca. 5 cm Abstand vereinzeln</li>
    <li><strong>Salat:</strong> Bei Hitze zusätzlich schattieren</li>
  </ul>

  <h2>🌞 Saisonale Empfehlungen</h2>
  
  <h3>Aussaat- und Pflanzkalender</h3>
  <table class="seasonal-calendar">
    <tr>
      <th>Monat</th>
      <th>Aktivitäten</th>
    </tr>
    <tr>
      <td>März</td>
      <td>Tomaten vorziehen, erste Karotten und Salat säen</td>
    </tr>
    <tr>
      <td>April</td>
      <td>Basilikum vorziehen, weitere Karotten säen</td>
    </tr>
    <tr>
      <td>Mai</td>
      <td>Tomaten und Basilikum auspflanzen, Salat nachsäen</td>
    </tr>
    <tr>
      <td>Juni</td>
      <td>Letzte Karotten säen, Salat nachsäen</td>
    </tr>
    <tr>
      <td>Juli-August</td>
      <td>Kontinuierliche Ernte, Salat nachsäen</td>
    </tr>
    <tr>
      <td>September-Oktober</td>
      <td>Haupterntezeit, Beet für Winter vorbereiten</td>
    </tr>
  </table>

  <h3>Nachpflanzungen/Fruchtwechsel</h3>
  <p>Nach der Ernte von Salat kannst du Feldsalat oder Spinat nachsäen. Im nächsten Jahr solltest du die Tomaten an eine andere Stelle setzen und stattdessen z.B. Erbsen oder Bohnen pflanzen (Fruchtwechsel).</p>

  <h2>💡 Praktische Tipps für urbane Gärtner</h2>
  <ol>
    <li><strong>Vertikales Gärtnern:</strong> Nutze Rankgitter für die Tomaten, um Platz zu sparen und die Ernte zu erleichtern.</li>
    <li><strong>Gestaffelte Aussaat:</strong> Säe Salat und Karotten alle 2-3 Wochen neu aus, um kontinuierlich ernten zu können.</li>
    <li><strong>Mulchen:</strong> Bedecke den Boden zwischen den Pflanzen mit Mulch (z.B. Grasschnitt oder Stroh), um Wasser zu sparen und Unkraut zu unterdrücken.</li>
    <li><strong>Mischkultur-Vorteile:</strong> Basilikum zwischen den Tomaten verbessert nicht nur den Geschmack, sondern hält auch Schädlinge fern.</li>
    <li><strong>Platzsparende Ernte:</strong> Ernte bei Salat zunächst nur die äußeren Blätter, damit die Pflanze weiterwächst.</li>
  </ol>

  <h3>Mögliche Herausforderungen</h3>
  <ul>
    <li><strong>Tomaten können viel Platz beanspruchen:</strong> Wähle kompakte Sorten wie 'Balkonstar' oder 'Tiny Tim' für kleine Beete.</li>
    <li><strong>Bewässerung bei Abwesenheit:</strong> Installiere ein einfaches Tropfbewässerungssystem mit Timer.</li>
    <li><strong>Begrenzte Sonneneinstrahlung:</strong> Achte auf die Ausrichtung und wähle schattentolerante Sorten, wenn dein Beet weniger als 6 Stunden direkte Sonne erhält.</li>
  </ul>
</div>
```

### Visuelle Darstellung

![Beispiel eines Beetplans](https://example.com/beetplan_visualization.png)

*Hinweis: Dies ist eine Beispieldarstellung. In der tatsächlichen Implementierung würde hier eine dynamisch generierte Visualisierung basierend auf dem Algorithmus-Output erscheinen.*

## Beispiel 2: Kräuterbeet für Balkon (1,0m × 0,4m)

### Eingabeparameter

**Ausgewählte Pflanzen:**
- Basilikum (Ocimum basilicum)
- Petersilie (Petroselinum crispum)
- Schnittlauch (Allium schoenoprasum)
- Thymian (Thymus vulgaris)
- Rosmarin (Rosmarinus officinalis)

**Beetmaße:**
- Länge: 1,0 Meter
- Breite: 0,4 Meter
- Gesamtfläche: 0,4 Quadratmeter

### HTML-Ausgabe

```html
<div class="bed-plan">
  <h2>📋 Übersicht des Bepflanzungsplans</h2>
  <p>Hier ist dein optimierter Bepflanzungsplan für ein Kräuterbeet mit 1,0m × 0,4m (0,4m²). Der Plan kombiniert 5 Kräuterarten in einer kompakten Anordnung, die sowohl Wuchshöhe als auch Wasserbedarf berücksichtigt.</p>
  
  <div class="plan-summary">
    <ul>
      <li><strong>Gesamtanzahl Pflanzen:</strong> 11</li>
      <li><strong>Pflanzenarten:</strong> 5</li>
      <li><strong>Besonderheiten:</strong> Kompakte Balkonanordnung, nach Wasserbedarf gruppiert</li>
    </ul>
  </div>

  <h2>🌱 Pflanzenverteilung</h2>
  <table class="plant-distribution">
    <tr>
      <th>Pflanze</th>
      <th>Anzahl</th>
      <th>Position im Beet</th>
      <th>Begründung</th>
    </tr>
    <tr>
      <td>Rosmarin</td>
      <td>1</td>
      <td>Westliche Ecke</td>
      <td>Höchste Pflanze, benötigt am wenigsten Wasser</td>
    </tr>
    <tr>
      <td>Thymian</td>
      <td>2</td>
      <td>Westliche Zone</td>
      <td>Niedrig wachsend, geringer Wasserbedarf</td>
    </tr>
    <tr>
      <td>Basilikum</td>
      <td>3</td>
      <td>Mittlere Zone</td>
      <td>Mittlere Höhe, mittlerer Wasserbedarf</td>
    </tr>
    <tr>
      <td>Petersilie</td>
      <td>2</td>
      <td>Östliche Zone</td>
      <td>Mittlere Höhe, höherer Wasserbedarf</td>
    </tr>
    <tr>
      <td>Schnittlauch</td>
      <td>3</td>
      <td>Östliche Zone</td>
      <td>Niedrig wachsend, höherer Wasserbedarf</td>
    </tr>
  </table>

  <h3>Optimale Pflanzzeit</h3>
  <ul>
    <li><strong>Rosmarin & Thymian:</strong> April bis Mai</li>
    <li><strong>Basilikum:</strong> Mitte Mai bis Juni (nach den Eisheiligen)</li>
    <li><strong>Petersilie:</strong> März bis Juni</li>
    <li><strong>Schnittlauch:</strong> März bis Mai</li>
  </ul>

  <h2>🗺️ Visueller Beetplan</h2>
  <div class="visual-plan">
    <pre>
┌───────────────────────┐
│        WESTEN         │
├───────────────────────┤
│ R   T   T   B   B   B │
│                       │
│         P   P   S   S │
│                     S │
├───────────────────────┤
│        OSTEN          │
└───────────────────────┘

Legende:
R = Rosmarin
T = Thymian
B = Basilikum
P = Petersilie
S = Schnittlauch
    </pre>
  </div>

  <p><strong>Empfohlene Ausrichtung:</strong> Ost-West, mit Rosmarin im Westen, da er am höchsten wächst.</p>

  <h2>💧 Pflege- und Bewässerungshinweise</h2>
  
  <h3>Bewässerungszonen</h3>
  <ul>
    <li><strong>Zone 1 (geringer Wasserbedarf):</strong> Rosmarin und Thymian</li>
    <li><strong>Zone 2 (mittlerer Wasserbedarf):</strong> Basilikum</li>
    <li><strong>Zone 3 (höherer Wasserbedarf):</strong> Petersilie und Schnittlauch</li>
  </ul>

  <h3>Bewässerungsempfehlungen</h3>
  <ul>
    <li><strong>Zone 1:</strong> Alle 3-4 Tage, Boden zwischen Wassergaben antrocknen lassen</li>
    <li><strong>Zone 2:</strong> Alle 1-2 Tage, Boden leicht feucht halten</li>
    <li><strong>Zone 3:</strong> Täglich bei Hitze, Boden gleichmäßig feucht halten</li>
  </ul>

  <p>Für Balkongefäße empfehle ich Untersetzer zu verwenden, aber überschüssiges Wasser nach 30 Minuten abzugießen, um Staunässe zu vermeiden.</p>

  <h3>Besondere Pflegehinweise</h3>
  <ul>
    <li><strong>Rosmarin:</strong> Benötigt gute Drainage, verträgt Trockenheit</li>
    <li><strong>Basilikum:</strong> Regelmäßig ernten, um buschiges Wachstum zu fördern</li>
    <li><strong>Schnittlauch:</strong> Blüten entfernen, wenn nicht gewünscht</li>
    <li><strong>Alle Kräuter:</strong> Regelmäßig ernten fördert neues Wachstum</li>
  </ul>

  <h2>🌞 Saisonale Empfehlungen</h2>
  
  <h3>Aussaat- und Pflanzkalender</h3>
  <table class="seasonal-calendar">
    <tr>
      <th>Monat</th>
      <th>Aktivitäten</th>
    </tr>
    <tr>
      <td>März</td>
      <td>Petersilie und Schnittlauch pflanzen</td>
    </tr>
    <tr>
      <td>April</td>
      <td>Rosmarin und Thymian pflanzen</td>
    </tr>
    <tr>
      <td>Mai</td>
      <td>Basilikum nach den Eisheiligen pflanzen</td>
    </tr>
    <tr>
      <td>Juni-August</td>
      <td>Regelmäßige Ernte aller Kräuter</td>
    </tr>
    <tr>
      <td>September</td>
      <td>Letzte große Ernte vor dem Winter</td>
    </tr>
    <tr>
      <td>Oktober-Februar</td>
      <td>Winterschutz für mehrjährige Kräuter</td>
    </tr>
  </table>

  <h3>Überwinterung</h3>
  <p>Rosmarin und Thymian sind mehrjährig, aber in kalten Regionen frostempfindlich. Stelle sie im Winter an einen geschützten Ort oder wickle den Topf mit Vlies ein. Basilikum, Petersilie und Schnittlauch werden meist einjährig kultiviert, können aber drinnen überwintert werden.</p>

  <h2>💡 Praktische Tipps für urbane Gärtner</h2>
  <ol>
    <li><strong>Gefäßwahl:</strong> Verwende einen länglichen Balkonkasten mit guter Drainage für alle Kräuter gemeinsam.</li>
    <li><strong>Substrat:</strong> Mische normales Pflanzsubstrat mit etwas Sand für bessere Drainage, besonders wichtig für Rosmarin und Thymian.</li>
    <li><strong>Erntestrategie:</strong> Ernte regelmäßig kleine Mengen statt selten große Mengen, das fördert neues Wachstum.</li>
    <li><strong>Platzoptimierung:</strong> Nutze die verschiedenen Wuchshöhen - niedrige Kräuter wie Thymian können als Bodendecker dienen.</li>
    <li><strong>Konservierung:</strong> Überschüssige Kräuter trocknen oder einfrieren für Wintervorrat.</li>
  </ol>

  <h3>Mögliche Herausforderungen</h3>
  <ul>
    <li><strong>Unterschiedliche Wasserbedürfnisse:</strong> Die Anordnung nach Wasserbedarf hilft, aber achte trotzdem auf individuelle Bedürfnisse.</li>
    <li><strong>Basilikum ist kälteempfindlich:</strong> Bei Temperaturen unter 10°C ins Haus holen.</li>
    <li><strong>Platzkonkurrenz:</strong> Regelmäßiger Rückschnitt verhindert, dass sich einzelne Kräuter zu stark ausbreiten.</li>
  </ul>
</div>
```

## Beispiel 3: Großes Gemüsebeet mit vielen Pflanzen (4,0m × 2,0m)

### Eingabeparameter

**Ausgewählte Pflanzen:**
- Tomate (Solanum lycopersicum)
- Gurke (Cucumis sativus)
- Zucchini (Cucurbita pepo)
- Paprika (Capsicum annuum)
- Zwiebel (Allium cepa)
- Knoblauch (Allium sativum)
- Karotte (Daucus carota)
- Salat (Lactuca sativa)
- Radieschen (Raphanus sativus)
- Spinat (Spinacia oleracea)

**Beetmaße:**
- Länge: 4,0 Meter
- Breite: 2,0 Meter
- Gesamtfläche: 8,0 Quadratmeter

### HTML-Ausgabe (gekürzt)

```html
<div class="bed-plan">
  <h2>📋 Übersicht des Bepflanzungsplans</h2>
  <p>Hier ist dein optimierter Bepflanzungsplan für ein großes Gemüsebeet mit 4,0m × 2,0m (8,0m²). Der Plan kombiniert 10 verschiedene Gemüsearten in einer durchdachten Mischkultur, die Kompatibilität, Wuchshöhe und Nährstoffbedarf berücksichtigt.</p>
  
  <div class="plan-summary">
    <ul>
      <li><strong>Gesamtanzahl Pflanzen:</strong> 72</li>
      <li><strong>Pflanzenarten:</strong> 10</li>
      <li><strong>Besonderheiten:</strong> Zonierung nach Pflanzengruppen, optimierte Mischkultur, gestaffelte Ernte</li>
    </ul>
  </div>

  <!-- Weitere Inhalte wie im vorherigen Beispiel, aber mit 10 Pflanzenarten und komplexerer Zonierung -->
</div>
```

## Beispiel 4: Fehlerbehebung bei inkompatiblen Pflanzen

### Eingabeparameter

**Ausgewählte Pflanzen:**
- Tomate (Solanum lycopersicum)
- Kartoffel (Solanum tuberosum)
- Fenchel (Foeniculum vulgare)
- Bohne (Phaseolus vulgaris)

**Beetmaße:**
- Länge: 2,0 Meter
- Breite: 1,0 Meter
- Gesamtfläche: 2,0 Quadratmeter

### HTML-Ausgabe (gekürzt)

```html
<div class="bed-plan">
  <h2>📋 Übersicht des Bepflanzungsplans</h2>
  <p>Ich habe einen optimierten Bepflanzungsplan für dein Beet mit 2,0m × 1,0m (2,0m²) erstellt. Dabei musste ich einige Anpassungen vornehmen, da einige der ausgewählten Pflanzen nicht gut miteinander harmonieren.</p>
  
  <div class="compatibility-warning">
    <h3>⚠️ Kompatibilitätshinweis</h3>
    <p>Folgende Pflanzenpaare sind nicht gut kompatibel:</p>
    <ul>
      <li><strong>Tomate und Kartoffel:</strong> Beide gehören zur Familie der Nachtschattengewächse und sind anfällig für die gleichen Krankheiten, insbesondere Kraut- und Knollenfäule.</li>
      <li><strong>Fenchel und Bohne:</strong> Fenchel hemmt das Wachstum vieler Pflanzen, darunter auch Bohnen.</li>
    </ul>
    <p>Ich habe daher das Beet in zwei getrennte Zonen aufgeteilt und empfehle, entweder auf Kartoffeln oder auf Fenchel zu verzichten.</p>
  </div>

  <!-- Weitere Inhalte mit Lösungsvorschlägen für die Inkompatibilität -->
</div>
```

## Beispiel 5: Zu viele Pflanzen für die Beetgröße

### Eingabeparameter

**Ausgewählte Pflanzen:**
- Tomate (Solanum lycopersicum) - 10 Stück
- Gurke (Cucumis sativus) - 8 Stück
- Zucchini (Cucurbita pepo) - 6 Stück
- Kürbis (Cucurbita maxima) - 4 Stück

**Beetmaße:**
- Länge: 2,0 Meter
- Breite: 1,0 Meter
- Gesamtfläche: 2,0 Quadratmeter

### HTML-Ausgabe (gekürzt)

```html
<div class="bed-plan">
  <h2>📋 Übersicht des Bepflanzungsplans</h2>
  <p>Ich habe einen optimierten Bepflanzungsplan für dein Beet mit 2,0m × 1,0m (2,0m²) erstellt. Allerdings musste ich die Anzahl der Pflanzen reduzieren, da die gewünschte Menge den verfügbaren Platz deutlich übersteigt.</p>
  
  <div class="space-warning">
    <h3>⚠️ Platzhinweis</h3>
    <p>Die von dir gewählten Pflanzen benötigen mehr Platz als verfügbar ist:</p>
    <ul>
      <li><strong>Gewünschte Pflanzen:</strong> 10 Tomaten, 8 Gurken, 6 Zucchini, 4 Kürbisse</li>
      <li><strong>Benötigter Platz:</strong> ca. 28m² (10 × 0,5m² + 8 × 0,6m² + 6 × 1m² + 4 × 2m²)</li>
      <li><strong>Verfügbarer Platz:</strong> 2m²</li>
    </ul>
    <p>Ich habe die Anzahl der Pflanzen reduziert und priorisiert basierend auf Kompatibilität und optimaler Flächennutzung.</p>
  </div>

  <!-- Weitere Inhalte mit reduziertem Pflanzplan -->
</div>
```

## Fazit

Die gezeigten Beispiel-Ausgaben demonstrieren, wie die "Beet planen"-Funktion in verschiedenen Szenarien funktionieren würde. Sie bieten:

1. **Klare Struktur**: Jede Ausgabe folgt einem konsistenten Format mit Übersicht, Pflanzenverteilung, visuellem Plan, Pflege- und Bewässerungshinweisen, saisonalen Empfehlungen und praktischen Tipps.

2. **Visuelle Darstellung**: Der ASCII-basierte Beetplan gibt einen schnellen Überblick über die Anordnung der Pflanzen.

3. **Praktische Informationen**: Neben der reinen Platzierung werden auch Pflege-, Bewässerungs- und Erntehinweise gegeben.

4. **Fehlerbehandlung**: Die Beispiele zeigen, wie mit Herausforderungen wie inkompatiblen Pflanzen oder Platzmangel umgegangen wird.

5. **Responsives Design**: Die HTML-Struktur ermöglicht eine ansprechende Darstellung auf verschiedenen Geräten.

Diese Beispiele können als Referenz für das Entwicklungsteam, die Projektleitung und die UX-Designerin dienen, um ein gemeinsames Verständnis der erwarteten Funktionalität und des Ausgabeformats zu entwickeln.
