AFRAME.registerComponent("createmodels", {
  init: async function () {
      var model = await this.getModels();
      var barcodes = Object.keys(model);

      barcodes.map(
          barcode => {
              var modelData = compounds[barcode];
              this.createAtoms(modelData)
          }
      )

  },
  getModels: function () {
      return fetch("js/modelList.json").then(res => res.json()).then(data => data)
  },

  createAtoms: async function (model) {
      var modelName = model.element_name;
      var barcodeValue = model.barcode_value;
      var modelUrl = model.model_url;

      var scene = document.querySelector("a-scene");

      var marker = document.createElement("a-marker");
      marker.setAttribute("id", `marker-${barcodeValue}`);
      marker.setAttribute("type", "barcode");
      marker.setAttribute("model_name", modelName);
      marker.setAttribute("value", barcodeValue);
      scene.appendChild(marker);

      if(barcodeValue === 0) {
        var modelEl = document.createElement("a-entity");
        modelEl.setAttribute("id", `${modelName}`);
        modelEl.setAttribute("geometry", { primitive: "box", width: model.width, height: model.height })
        modelEl.setAttribute("material", { src: "./assets/atom_cards/card_" + elementName + ".png" });
        modelEl.setAttribute("position", model.position)
        modelEl.setAttribute("rotation", model.rotation)
        modelEl.setAttribute("material", {
            color: model.color
        });
        marker.appendChild(modelEl);
      } else {
        var modelEl = document.createElement("a-entity");
        modelEl.setAttribute("id", `${modelName}`);
        modelEl.setAttribute("gltf-model", `url(${modelName})`)
        modelEl.setAttribute("scale", model.scale);
        modelEl.setAttribute("position", model.position)
        modelEl.setAttribute("rotation", model.rotation)
        marker.appendChild(modelEl);
      }
    //   var atom = document.createElement("a-entity");
    //   atom.setAttribute("id", `${modelName}-${barcodeValue}`)
    //   marker.appendChild(atom);

    //   var card = document.createElement("a-entity");
    //   card.setAttribute("id", `card-${elementName}`);
    //   card.setAttribute("geometry", { primitive: "plane", width: 1, height: 1 })
    //   card.setAttribute("material", { src: "./assets/atom_cards/card_" + elementName + ".png" });
    //   card.setAttribute("position", { x: 0, y: 0, z: 0 })
    //   card.setAttribute("rotation", { x: -90, y: 0, z: 0 })

    //   atom.appendChild(card);

    //   var nucleus = document.createElement("a-entity");
    //   nucleus.setAttribute("id", `nucleus-${elementName}`);
    //   nucleus.setAttribute("geometry", { primitive: "sphere", radius: 0.14 })
    //   nucleus.setAttribute("material", "color", colors[elementName]);
    //   nucleus.setAttribute("position", { x: 0, y: 1, z: 0 })
    //   nucleus.setAttribute("rotation", { x: 0, y: 0, z: 0 })

    //   var nucleusName = document.createElement("a-entity");
    //   nucleusName.setAttribute("id", `nucleus-name-${elementName}`);
    //   nucleusName.setAttribute("position", { x: 0.34, y: 0, z: 0.03 })
    //   nucleusName.setAttribute("rotation", { x: -90, y: 0, z: 0 })
    //   nucleusName.setAttribute("text", {
    //       font: "monoid",
    //       width: 3,
    //       color: "black",
    //       align: "center",
    //       value: elementName
    //   })

    //   nucleus.appendChild(nucleusName)
    //   atom.appendChild(nucleus)
  }
});
