(() => {
  // Container und Konva Stage initialisieren
  const container = document.getElementById("stageContainer");

  const stage = new Konva.Stage({
    container: "stageContainer",
    width: container.clientWidth,
    height: container.clientHeight
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  const transformer = new Konva.Transformer({
    rotateEnabled: true,
    ignoreStroke: true
  })
  layer.add(transformer);

  // Counter für einzigartige Objektnamen
  let c = 0;
  const newName = () => {
    c += 1;
    return c
  }

  // Zähler damit neue Shapes nicht exakt übereinander liegen
  let n = 0;
  const nextPos = () => {
    n += 1;
    return { x: 40 + (n * 15) % 400, y: 40 + (n * 12) % 300 };
  };

  // Funktionen
  // ---Objekt-Aktionen---
  function getNodeWidth(node) {
    return node.width() * node.scaleX();
  }

  function getNodeHeight(node) {
    return node.height() * node.scaleY();
  }


  function updateObjectInput(node){
  const widthInput = document.getElementById("objectWidth");
  const lengthInput = document.getElementById("objectLength");
  const faceInput = document.getElementById("objectFace");
  const nameInput = document.getElementById("objectName");

  if (!node){
    widthInput.value = "";
    lengthInput.value = "";
    faceInput.value = "";
    nameInput.value = "";
  }
  const name = node.name();

  if (name.startsWith("Rect")){
    const width = getNodeWidth(node);
    const height = getNodeHeight(node);
    const face = width * height;

    widthInput.value = Math.round(width * 100) / 100;
    lengthInput.value = Math.round(height * 100) / 100;
    faceInput.value = Math.round(face * 100) / 100;

  }

  nameInput.value = name;

}

  function activateObject(node){
  if(!node) return
  deactivateObject;

  node.shadowColor('black');
  node.shadowBlur(10);
  node.shadowOffset({ x: 4, y: 4 });
  node.shadowOpacity(0.4);
  node.shadowEnabled(true);

  transformer.nodes([node]);
  updateObjectInput(node);

  layer.draw();
}

function deactivateObject(){
  if(globalThis.currentNode){
    globalThis.currentNode.shadowEnabled(false);
    transformer.nodes([]);
    updateObjectInput(null);
  }
}

  stage.on('click', function (e) {
    if (e.target === stage) {
      deactivateObject();
      globalThis.currentNode = null;
      return;
    }
    globalThis.currentNode = e.target;
    activateObject(globalThis.currentNode);
  });

  function addRect() {
    const { x, y } = nextPos();
    const c = newName();
    const rect = new Konva.Rect({
      x, y,
      width: 140,
      height: 90,
      stroke: "black",
      draggable: true,
      name: "Rect-" + c
    });

    layer.add(rect);
    layer.draw();
  }

  function addTree(){
    Konva.Image.fromURL('openRain/images/tree.png', (imageNode) => {
  layer.add(imageNode);
  imageNode.setAttrs({
    width: 50,
    height: 50,
  });
});

  }

  function delObj(node) {
    node.destroy();
    layer.draw();
  }

  function setPolyPoint(){
    
  }

  function addPoly() {

  }

  // ---Daten-Aktionen---
  // Projekt speichern
  async function saveProj() {
    const projectName = document.getElementById("fileName").value.trim();

    if(!projectName) {
      alert("Bitte Projektnamen eingeben");
      return;
    }

    const projectData = stage.toJSON();
    
    const formData = new URLSearchParams();
    formData.append("projectName", projectName);
    formData.append("projectData", projectData);

        try {
        const response = await fetch("/openRain/control/createProject", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        });

        const text = await response.text();
        console.log(text);

        alert("Projekt gespeichert.");
        window.location.reload();
    } catch (err) {
        console.error("Fehler beim Speichern:", err);
        alert("Speichern fehlgeschlagen.");
    }

  }

  // Stage exportieren
  async function exportStage() {
    const dataURL = stage.toDataURL({
      mimeType: 'image/jpeg',
      quality: 0.8
    });

    const response = await fetch(dataURL);
    const blob = await response.blob();

    const handle = await window.showSaveFilePicker({
      suggestedName: "stage.jpg",
      types: [{
        description: "JPEG Image",
        accept: { "image/jpeg": [".jpg"] }
      }]
    });

    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
  }

  // Daten aus Zwischenspeicher laden und anzeigen

  function loadStage(stageData) {
    stage.destroyChildren();
    const data = stageData;
    if (data) {
      const stage = Konva.Node.create(data, 'stageContainer');
      const transformer = new Konva.Transformer({
        rotateEnabled: true,
        ignoreStroke: true
      })
      layer.add(transformer);

      stage.draw();
      layer.draw();
    }
   };


  // Eventlistener Buttons
  document.getElementById("createObject").addEventListener("click", addRect);
  document.getElementById("deleteObject").addEventListener("click", delObj);
  document.getElementById("saveFile").addEventListener("click", saveProj);
  document.getElementById("exportFile").addEventListener("click", exportStage);
  document.getElementById("createTree").addEventListener("click", addTree);

  // Eventlistener 
  window.addEventListener("stageDataChanged", (event) => {
    const stageData = event.detail;
    console.log("StageData updated:", stageData);

    loadStage(stageData);
  });

  transformer.on("transform", function () {
    if (globalThis.currentNode) {
      updateObjectInput(globalThis.currentNode);
    }
  });

  // Stage bei Resize anpassen
  window.addEventListener("resize", () => {
    const container = document.getElementById("stageContainer");
    const w = container.clientWidth;
    stage.width(w);
    layer.draw();
  });

  
})();