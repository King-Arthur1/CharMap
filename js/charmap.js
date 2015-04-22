var CharMap;
(function (CharMap) {
    ;
    ;
    function makeSingleChar(data) {
        if (data.name === "<control>") {
            return { preview: "", text: data.code.toString(16) + " - " + data.altName + "(control)" };
        }
        else {
            return { preview: "&#x" + data.code.toString(16) + ";", text: data.code.toString(16) + " - " + data.name.replace("<", "&lt;").replace(">", "&gt;") };
        }
    }
    function createBlock(blockIndex) {
        var block = unicode.blocks[blockIndex];
        // undone: block.name
        var data = [];
        // unicode.data has code points, but you can't assume that index==code due to gaps and unfilled parts
        // making unicode.data have all code points (including empty ones) would be pretty memory inneficient.
        //
        var index = 0;
        while (index < unicode.data.length - 1 && unicode.data[index].code < block.start) {
            index++;
        }
        for (var currentCode = block.start; currentCode <= block.end; currentCode++) {
            if (unicode.data[index].code !== currentCode) {
                // This just means there isn't an explicit entry in the data table, not neccessarily
                // that there isn't a defined character (CJK unified ideographs, for example)
                //
                data.push({
                    preview: "",
                    text: currentCode.toString(16) + " - &lt;not present&gt;"
                });
            }
            else {
                data.push(makeSingleChar(unicode.data[index]));
            }
            while (index < unicode.data.length - 1 && unicode.data[index].code <= currentCode) {
                index++;
            }
        }
        return data;
    }
    CharMap.createBlock = createBlock;
    ;
})(CharMap || (CharMap = {}));
