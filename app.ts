interface UnicodeData {
    data: UnicodeChar[];
    blocks: {
        start: number; end: number; name: string
    }[];
};
interface UnicodeChar {
    code: number;
    name: string;
    altName: string
};
declare var unicode: UnicodeData;

function makeSingleChar(data: UnicodeChar): string {
    if (data.name === "<control>") {
        return "<div class='container'>" + data.code.toString(16) + " - " + data.altName + "(control)</div>";
    }
    else {
        return "<div class='container'><div class='letter'>&#x" + data.code.toString(16) +";</div>" + data.code.toString(16) + " - " + data.name.replace("<", "&lt;").replace(">", "&gt;") + "</div>";
    }
}
function createBlock(blockIndex: number): string {
    var block = unicode.blocks[blockIndex];
    var html = "<div class='name'>" + block.name + "</div>";
    html += "<div class='blockList'>";
    // unicode.data has code points, but you can't assume that index==code due to gaps and unfilled parts
    // making unicode.data have all code points (including empty ones) would be pretty memory inneficient.
    //
    var index = 0;
    while (index < unicode.data.length-1 && unicode.data[index].code < block.start) {
        index++;
    }
    for (var currentCode = block.start; currentCode <= block.end; currentCode++) {
        if (unicode.data[index].code !== currentCode) {
            // This just means there isn't an explicit entry in the data table, not neccessarily
            // that there isn't a defined character (CJK unified ideographs, for example)
            //
            
            html += "<div class='container'>" + currentCode.toString(16) +" - &lt;not present&gt;</div>";
        }
        else {
            html += makeSingleChar(unicode.data[index]);
        }

        // advance to next location in the data (<= will advance to one past currentCode)
        //
        while (index < unicode.data.length-1 && unicode.data[index].code <= currentCode) {
            index++;
        }
    }
    html += "</div>";
    return html;
};

function testData() {
    var i: number;
    for (i = 0; i < unicode.blocks.length; i++) {
        try {
            createBlock(i);
        }
        catch (e) {
            var msg = "Failed to display block #" + i + " - " + unicode.blocks[i].name;
            throw msg;
        }
    }
}

// This validates we can generate the content for every page
// testData();

function update() {
    var content = document.getElementById('content');
    var blockSlider = <HTMLInputElement>(document.getElementById('blockSlider'));
    var blockIndex = +blockSlider.value;
    content.innerHTML = createBlock(blockIndex);
}

window.onload = () => {
    var blockSlider = <HTMLInputElement>(document.getElementById('blockSlider'));
    blockSlider.max = "" + (unicode.blocks.length-1);
    blockSlider.addEventListener("change", update);
    update();
};

