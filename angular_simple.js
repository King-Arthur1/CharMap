angular.module('charmapApp', ['ngSanitize'])
    .controller('CharMapController', function() {
    var charmap = this;

    charmap.data = global_data;

    charmap.makeSingleChar = function(data) {
        if (data.name === "<control>") {
            return { preview: "", text : data.code.toString(16) + " - " + data.altName + "(control)" };
        }
        else {
            return { preview: "&#x" + data.code.toString(16) + ";", text: data.code.toString(16) + " - " + data.name.replace("<", "&lt;").replace(">", "&gt;") };
        }
    }

    charmap.remaining = function() {
      var count = charmap.data.length;
      return count;
    };

    charmap.archive = function() {
        // UNDONE
    };
});
