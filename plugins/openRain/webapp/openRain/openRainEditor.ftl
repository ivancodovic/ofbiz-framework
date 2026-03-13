<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <title>openRain – Konva Editor</title>
  <style>
    body { font-family: sans-serif; margin: 16px; }
    .toolbar { display: stretch; gap: 8px; margin-bottom: 12px; border: 0px solid #ccc; height: 50px; }
    button { padding: 8px 12px; cursor: pointer; }
    #fileName { border-radius: 20px; text-align: center; width: auto;}
    #mainContainer { display: grid; grid-template-columns: 70% 30%; column-gap: 10px;}
    #stageContainer { height: 600px; border: 1px solid #ccc; }
    #sideContainer {width: 100%;}
    #actionsContainer { height: 40px; border: 0px solid #ccc; }
    #propertyContainer { width: 25%; }
    #projectsContainer { width: 100%; height: 400px; border: 0px solid #ccc; }
  </style>
</head>
<body>

  <h2>Konva Editor (MVP)</h2>

  <div class="toolbar">
    <button id=createObject type="button">Rechteck erstellen</button>
    <button id=createObject type="button">Freihand zeichnen</button>
    <button id=createTree type="button">Baum platzieren</button>
  </div>
  
  <div id="mainContainer">
      <div id="stageContainer"></div>
      <div id="sideContainer">
          <div id="actionsContainer">
                  <input id="fileName" type="text" name="fileName" tooltip="Test">
                  <button id="loadFile" type="button">Projekt erstellen</button>
                  <button id="exportFile" type="button">Export</button>
                  <button id="saveFile" type="button">Speichern</button>
          </div>
          <div id="projectsContainer">
            ${sections.render("projectListSection")}
          </div>
      </div>
    </div>
    <div id="propertyContainer">
        <table>
            <thead>
                <th>Name</th>
                <th>Länge</th>
                <th>Breite</th>
                <th>Fläche</th>
                <th>Löschen</th>
            </thead>
            <tbody>
                <td><input id="objectName" type="text"></td>
                <td><input id="objectLength" type="number" step="0.01"></td>
                <td><input id="objectWidth" type="number" step="0.01"></td>
                <td><input id="objectFace" type="number" step="0.01" disabled></td>
                <td><button id="deleteObject" type="button">Löschen</button></td>
            </tbody>
        </table>
      </div>
    </div>

  <!-- Lokale JS-Dateien aus der Webapp -->
  <script src="/openRain/js/konva.min.js"></script>
  <script src="/openRain/js/editor.js"></script>

</body>
</html>
