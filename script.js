var myurl = "https://pokeapi.co/api/v2/";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

document.getElementById("gen1sub").addEventListener("click", function(event) {
  event.preventDefault();
  var select = document.getElementById('gen1');
  var value = select.options[select.selectedIndex].value;
  console.log(value);
  fetch(myurl + "pokemon/" + value)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);

      /* Name and image */
      var name = json.name;
      name = capitalizeFirstLetter(name);
      var content = "<div class='pokeHead'><h2>" + "#" + json.id + " " + name + "</h2>";
      content += "<img src='" + json.sprites.front_default + "'/></div>"

      /* Type */
      content += "<div class='info'><p>Type: "
      for (let i = 0; i < json.types.length; i++) {
        var type = json.types[i].type.name;
        type = capitalizeFirstLetter(type);
        content += type;
        if (i != json.types.length - 1) {
          content += ", ";
        }
      }
      content += "</p>"

      /* Abilities */
      content += "<br/><p>Abilities:</p>"
      for (let i = 0; i < json.abilities.length; i++) {
        content += "<p>"
        if (json.abilities[i].is_hidden === true) {
          content += "Hidden ability: </p><p>";
        }
        var abilityName = json.abilities[i].ability.name;
        abilityName = capitalizeFirstLetter(abilityName);
        content += abilityName + "</p>"
      }

      /* Height and weight */
      var height = json.height;
      var weight = json.weight;
      height /= Math.pow(10, 1);
      weight /= Math.pow(10, 1);
      content += "<br/><p>Height: " + height + "m, Weight: " + weight + "kg</p>"

      /*Stats*/
      content += "<br/><p>Stats:</p>"
      for (let i = 0; i < 6; i++) {
        var statName = json.stats[i].stat.name;
        statName = capitalizeFirstLetter(statName);
        content += "<p>" + statName + ": " + json.stats[i].base_stat + "</p>"
      }
      content += "</div>"
      document.getElementById("current").innerHTML = content;
    });
});

fetch(myurl + "pokemon?limit=151")
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    var s = "";
    for (let i = 0; i < 151; i++) {
      var name = json.results[i].name;
      name = capitalizeFirstLetter(name);
      s += "<option value=" + (i + 1) + ">" + name + "</option>"
    }
    document.getElementById("gen1").innerHTML = s;
  });
