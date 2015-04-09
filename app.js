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
;
function testData() {
    var i;
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
    var blockSlider = (document.getElementById('blockSlider'));
    var blockIndex = +blockSlider.value;
    var data = new WinJS.Binding.List(createBlock(blockIndex));
    content.winControl.itemDataSource = data.dataSource;
}
window.onload = function () {
    var root = document.getElementById('root');
    WinJS.UI.processAll(root).then(function () {
        return temp_data;
        // return WinJS.xhr({ url: "ucd.js" }).then(function (result) {
        //     return JSON.parse(result.responseText);
        // });
    }).then(function (data) {
        unicode = data;
        var title = document.getElementById('title');
        title.textContent = "CharMap";
        var blockSlider = (document.getElementById('blockSlider'));
        blockSlider.max = "" + (unicode.blocks.length - 1);
        blockSlider.addEventListener("change", update);
        update();
    });
};
var temp_data = {
    "blocks": [
        {
            "start": 0,
            "end": 127,
            "name": "Basic Latin"
        },
        {
            "start": 128,
            "end": 255,
            "name": "Latin-1 Supplement"
        },
        {
            "start": 128512,
            "end": 128591,
            "name": "Emoticons"
        },
        {
            "start": 128592,
            "end": 128639,
            "name": "Ornamental Dingbats"
        },
        {
            "start": 128640,
            "end": 128767,
            "name": "Transport and Map Symbols"
        }
    ],
    "data": [
        {
            "code": 0,
            "name": "<control>",
            "altName": "NULL"
        },
        {
            "code": 1,
            "name": "<control>",
            "altName": "START OF HEADING"
        },
        {
            "code": 2,
            "name": "<control>",
            "altName": "START OF TEXT"
        },
        {
            "code": 3,
            "name": "<control>",
            "altName": "END OF TEXT"
        },
        {
            "code": 4,
            "name": "<control>",
            "altName": "END OF TRANSMISSION"
        },
        {
            "code": 5,
            "name": "<control>",
            "altName": "ENQUIRY"
        },
        {
            "code": 6,
            "name": "<control>",
            "altName": "ACKNOWLEDGE"
        },
        {
            "code": 7,
            "name": "<control>",
            "altName": "BELL"
        },
        {
            "code": 8,
            "name": "<control>",
            "altName": "BACKSPACE"
        },
        {
            "code": 9,
            "name": "<control>",
            "altName": "CHARACTER TABULATION"
        },
        {
            "code": 10,
            "name": "<control>",
            "altName": "LINE FEED (LF)"
        },
        {
            "code": 11,
            "name": "<control>",
            "altName": "LINE TABULATION"
        },
        {
            "code": 12,
            "name": "<control>",
            "altName": "FORM FEED (FF)"
        },
        {
            "code": 13,
            "name": "<control>",
            "altName": "CARRIAGE RETURN (CR)"
        },
        {
            "code": 14,
            "name": "<control>",
            "altName": "SHIFT OUT"
        },
        {
            "code": 15,
            "name": "<control>",
            "altName": "SHIFT IN"
        },
        {
            "code": 16,
            "name": "<control>",
            "altName": "DATA LINK ESCAPE"
        },
        {
            "code": 17,
            "name": "<control>",
            "altName": "DEVICE CONTROL ONE"
        },
        {
            "code": 18,
            "name": "<control>",
            "altName": "DEVICE CONTROL TWO"
        },
        {
            "code": 19,
            "name": "<control>",
            "altName": "DEVICE CONTROL THREE"
        },
        {
            "code": 20,
            "name": "<control>",
            "altName": "DEVICE CONTROL FOUR"
        },
        {
            "code": 21,
            "name": "<control>",
            "altName": "NEGATIVE ACKNOWLEDGE"
        },
        {
            "code": 22,
            "name": "<control>",
            "altName": "SYNCHRONOUS IDLE"
        },
        {
            "code": 23,
            "name": "<control>",
            "altName": "END OF TRANSMISSION BLOCK"
        },
        {
            "code": 24,
            "name": "<control>",
            "altName": "CANCEL"
        },
        {
            "code": 25,
            "name": "<control>",
            "altName": "END OF MEDIUM"
        },
        {
            "code": 26,
            "name": "<control>",
            "altName": "SUBSTITUTE"
        },
        {
            "code": 27,
            "name": "<control>",
            "altName": "ESCAPE"
        },
        {
            "code": 28,
            "name": "<control>",
            "altName": "INFORMATION SEPARATOR FOUR"
        },
        {
            "code": 29,
            "name": "<control>",
            "altName": "INFORMATION SEPARATOR THREE"
        },
        {
            "code": 30,
            "name": "<control>",
            "altName": "INFORMATION SEPARATOR TWO"
        },
        {
            "code": 31,
            "name": "<control>",
            "altName": "INFORMATION SEPARATOR ONE"
        },
        {
            "code": 32,
            "name": "SPACE"
        },
        {
            "code": 33,
            "name": "EXCLAMATION MARK"
        },
        {
            "code": 34,
            "name": "QUOTATION MARK"
        },
        {
            "code": 35,
            "name": "NUMBER SIGN"
        },
        {
            "code": 36,
            "name": "DOLLAR SIGN"
        },
        {
            "code": 37,
            "name": "PERCENT SIGN"
        },
        {
            "code": 38,
            "name": "AMPERSAND"
        },
        {
            "code": 39,
            "name": "APOSTROPHE",
            "altName": "APOSTROPHE-QUOTE"
        },
        {
            "code": 40,
            "name": "LEFT PARENTHESIS",
            "altName": "OPENING PARENTHESIS"
        },
        {
            "code": 41,
            "name": "RIGHT PARENTHESIS",
            "altName": "CLOSING PARENTHESIS"
        },
        {
            "code": 42,
            "name": "ASTERISK"
        },
        {
            "code": 43,
            "name": "PLUS SIGN"
        },
        {
            "code": 44,
            "name": "COMMA"
        },
        {
            "code": 45,
            "name": "HYPHEN-MINUS"
        },
        {
            "code": 46,
            "name": "FULL STOP",
            "altName": "PERIOD"
        },
        {
            "code": 47,
            "name": "SOLIDUS",
            "altName": "SLASH"
        },
        {
            "code": 48,
            "name": "DIGIT ZERO"
        },
        {
            "code": 49,
            "name": "DIGIT ONE"
        },
        {
            "code": 50,
            "name": "DIGIT TWO"
        },
        {
            "code": 51,
            "name": "DIGIT THREE"
        },
        {
            "code": 52,
            "name": "DIGIT FOUR"
        },
        {
            "code": 53,
            "name": "DIGIT FIVE"
        },
        {
            "code": 54,
            "name": "DIGIT SIX"
        },
        {
            "code": 55,
            "name": "DIGIT SEVEN"
        },
        {
            "code": 56,
            "name": "DIGIT EIGHT"
        },
        {
            "code": 57,
            "name": "DIGIT NINE"
        },
        {
            "code": 58,
            "name": "COLON"
        },
        {
            "code": 59,
            "name": "SEMICOLON"
        },
        {
            "code": 60,
            "name": "LESS-THAN SIGN"
        },
        {
            "code": 61,
            "name": "EQUALS SIGN"
        },
        {
            "code": 62,
            "name": "GREATER-THAN SIGN"
        },
        {
            "code": 63,
            "name": "QUESTION MARK"
        },
        {
            "code": 64,
            "name": "COMMERCIAL AT"
        },
        {
            "code": 65,
            "name": "LATIN CAPITAL LETTER A"
        },
        {
            "code": 66,
            "name": "LATIN CAPITAL LETTER B"
        },
        {
            "code": 67,
            "name": "LATIN CAPITAL LETTER C"
        },
        {
            "code": 68,
            "name": "LATIN CAPITAL LETTER D"
        },
        {
            "code": 69,
            "name": "LATIN CAPITAL LETTER E"
        },
        {
            "code": 70,
            "name": "LATIN CAPITAL LETTER F"
        },
        {
            "code": 71,
            "name": "LATIN CAPITAL LETTER G"
        },
        {
            "code": 72,
            "name": "LATIN CAPITAL LETTER H"
        },
        {
            "code": 73,
            "name": "LATIN CAPITAL LETTER I"
        },
        {
            "code": 74,
            "name": "LATIN CAPITAL LETTER J"
        },
        {
            "code": 75,
            "name": "LATIN CAPITAL LETTER K"
        },
        {
            "code": 76,
            "name": "LATIN CAPITAL LETTER L"
        },
        {
            "code": 77,
            "name": "LATIN CAPITAL LETTER M"
        },
        {
            "code": 78,
            "name": "LATIN CAPITAL LETTER N"
        },
        {
            "code": 79,
            "name": "LATIN CAPITAL LETTER O"
        },
        {
            "code": 80,
            "name": "LATIN CAPITAL LETTER P"
        },
        {
            "code": 81,
            "name": "LATIN CAPITAL LETTER Q"
        },
        {
            "code": 82,
            "name": "LATIN CAPITAL LETTER R"
        },
        {
            "code": 83,
            "name": "LATIN CAPITAL LETTER S"
        },
        {
            "code": 84,
            "name": "LATIN CAPITAL LETTER T"
        },
        {
            "code": 85,
            "name": "LATIN CAPITAL LETTER U"
        },
        {
            "code": 86,
            "name": "LATIN CAPITAL LETTER V"
        },
        {
            "code": 87,
            "name": "LATIN CAPITAL LETTER W"
        },
        {
            "code": 88,
            "name": "LATIN CAPITAL LETTER X"
        },
        {
            "code": 89,
            "name": "LATIN CAPITAL LETTER Y"
        },
        {
            "code": 90,
            "name": "LATIN CAPITAL LETTER Z"
        },
        {
            "code": 91,
            "name": "LEFT SQUARE BRACKET",
            "altName": "OPENING SQUARE BRACKET"
        },
        {
            "code": 92,
            "name": "REVERSE SOLIDUS",
            "altName": "BACKSLASH"
        },
        {
            "code": 93,
            "name": "RIGHT SQUARE BRACKET",
            "altName": "CLOSING SQUARE BRACKET"
        },
        {
            "code": 94,
            "name": "CIRCUMFLEX ACCENT",
            "altName": "SPACING CIRCUMFLEX"
        },
        {
            "code": 95,
            "name": "LOW LINE",
            "altName": "SPACING UNDERSCORE"
        },
        {
            "code": 96,
            "name": "GRAVE ACCENT",
            "altName": "SPACING GRAVE"
        },
        {
            "code": 97,
            "name": "LATIN SMALL LETTER A"
        },
        {
            "code": 98,
            "name": "LATIN SMALL LETTER B"
        },
        {
            "code": 99,
            "name": "LATIN SMALL LETTER C"
        },
        {
            "code": 100,
            "name": "LATIN SMALL LETTER D"
        },
        {
            "code": 101,
            "name": "LATIN SMALL LETTER E"
        },
        {
            "code": 102,
            "name": "LATIN SMALL LETTER F"
        },
        {
            "code": 103,
            "name": "LATIN SMALL LETTER G"
        },
        {
            "code": 104,
            "name": "LATIN SMALL LETTER H"
        },
        {
            "code": 105,
            "name": "LATIN SMALL LETTER I"
        },
        {
            "code": 106,
            "name": "LATIN SMALL LETTER J"
        },
        {
            "code": 107,
            "name": "LATIN SMALL LETTER K"
        },
        {
            "code": 108,
            "name": "LATIN SMALL LETTER L"
        },
        {
            "code": 109,
            "name": "LATIN SMALL LETTER M"
        },
        {
            "code": 110,
            "name": "LATIN SMALL LETTER N"
        },
        {
            "code": 111,
            "name": "LATIN SMALL LETTER O"
        },
        {
            "code": 112,
            "name": "LATIN SMALL LETTER P"
        },
        {
            "code": 113,
            "name": "LATIN SMALL LETTER Q"
        },
        {
            "code": 114,
            "name": "LATIN SMALL LETTER R"
        },
        {
            "code": 115,
            "name": "LATIN SMALL LETTER S"
        },
        {
            "code": 116,
            "name": "LATIN SMALL LETTER T"
        },
        {
            "code": 117,
            "name": "LATIN SMALL LETTER U"
        },
        {
            "code": 118,
            "name": "LATIN SMALL LETTER V"
        },
        {
            "code": 119,
            "name": "LATIN SMALL LETTER W"
        },
        {
            "code": 120,
            "name": "LATIN SMALL LETTER X"
        },
        {
            "code": 121,
            "name": "LATIN SMALL LETTER Y"
        },
        {
            "code": 122,
            "name": "LATIN SMALL LETTER Z"
        },
        {
            "code": 123,
            "name": "LEFT CURLY BRACKET",
            "altName": "OPENING CURLY BRACKET"
        },
        {
            "code": 124,
            "name": "VERTICAL LINE",
            "altName": "VERTICAL BAR"
        },
        {
            "code": 125,
            "name": "RIGHT CURLY BRACKET",
            "altName": "CLOSING CURLY BRACKET"
        },
        {
            "code": 126,
            "name": "TILDE"
        },
        {
            "code": 127,
            "name": "<control>",
            "altName": "DELETE"
        },
        {
            "code": 128,
            "name": "<control>"
        },
        {
            "code": 129,
            "name": "<control>"
        },
        {
            "code": 130,
            "name": "<control>",
            "altName": "BREAK PERMITTED HERE"
        },
        {
            "code": 131,
            "name": "<control>",
            "altName": "NO BREAK HERE"
        },
        {
            "code": 132,
            "name": "<control>"
        },
        {
            "code": 133,
            "name": "<control>",
            "altName": "NEXT LINE (NEL)"
        },
        {
            "code": 134,
            "name": "<control>",
            "altName": "START OF SELECTED AREA"
        },
        {
            "code": 135,
            "name": "<control>",
            "altName": "END OF SELECTED AREA"
        },
        {
            "code": 136,
            "name": "<control>",
            "altName": "CHARACTER TABULATION SET"
        },
        {
            "code": 137,
            "name": "<control>",
            "altName": "CHARACTER TABULATION WITH JUSTIFICATION"
        },
        {
            "code": 138,
            "name": "<control>",
            "altName": "LINE TABULATION SET"
        },
        {
            "code": 139,
            "name": "<control>",
            "altName": "PARTIAL LINE FORWARD"
        },
        {
            "code": 140,
            "name": "<control>",
            "altName": "PARTIAL LINE BACKWARD"
        },
        {
            "code": 141,
            "name": "<control>",
            "altName": "REVERSE LINE FEED"
        },
        {
            "code": 142,
            "name": "<control>",
            "altName": "SINGLE SHIFT TWO"
        },
        {
            "code": 143,
            "name": "<control>",
            "altName": "SINGLE SHIFT THREE"
        },
        {
            "code": 144,
            "name": "<control>",
            "altName": "DEVICE CONTROL STRING"
        },
        {
            "code": 145,
            "name": "<control>",
            "altName": "PRIVATE USE ONE"
        },
        {
            "code": 146,
            "name": "<control>",
            "altName": "PRIVATE USE TWO"
        },
        {
            "code": 147,
            "name": "<control>",
            "altName": "SET TRANSMIT STATE"
        },
        {
            "code": 148,
            "name": "<control>",
            "altName": "CANCEL CHARACTER"
        },
        {
            "code": 149,
            "name": "<control>",
            "altName": "MESSAGE WAITING"
        },
        {
            "code": 150,
            "name": "<control>",
            "altName": "START OF GUARDED AREA"
        },
        {
            "code": 151,
            "name": "<control>",
            "altName": "END OF GUARDED AREA"
        },
        {
            "code": 152,
            "name": "<control>",
            "altName": "START OF STRING"
        },
        {
            "code": 153,
            "name": "<control>"
        },
        {
            "code": 154,
            "name": "<control>",
            "altName": "SINGLE CHARACTER INTRODUCER"
        },
        {
            "code": 155,
            "name": "<control>",
            "altName": "CONTROL SEQUENCE INTRODUCER"
        },
        {
            "code": 156,
            "name": "<control>",
            "altName": "STRING TERMINATOR"
        },
        {
            "code": 157,
            "name": "<control>",
            "altName": "OPERATING SYSTEM COMMAND"
        },
        {
            "code": 158,
            "name": "<control>",
            "altName": "PRIVACY MESSAGE"
        },
        {
            "code": 159,
            "name": "<control>",
            "altName": "APPLICATION PROGRAM COMMAND"
        },
        {
            "code": 160,
            "name": "NO-BREAK SPACE",
            "altName": "NON-BREAKING SPACE"
        },
        {
            "code": 161,
            "name": "INVERTED EXCLAMATION MARK"
        },
        {
            "code": 162,
            "name": "CENT SIGN"
        },
        {
            "code": 163,
            "name": "POUND SIGN"
        },
        {
            "code": 164,
            "name": "CURRENCY SIGN"
        },
        {
            "code": 165,
            "name": "YEN SIGN"
        },
        {
            "code": 166,
            "name": "BROKEN BAR",
            "altName": "BROKEN VERTICAL BAR"
        },
        {
            "code": 167,
            "name": "SECTION SIGN"
        },
        {
            "code": 168,
            "name": "DIAERESIS",
            "altName": "SPACING DIAERESIS"
        },
        {
            "code": 169,
            "name": "COPYRIGHT SIGN"
        },
        {
            "code": 170,
            "name": "FEMININE ORDINAL INDICATOR"
        },
        {
            "code": 171,
            "name": "LEFT-POINTING DOUBLE ANGLE QUOTATION MARK",
            "altName": "LEFT POINTING GUILLEMET"
        },
        {
            "code": 172,
            "name": "NOT SIGN"
        },
        {
            "code": 173,
            "name": "SOFT HYPHEN"
        },
        {
            "code": 174,
            "name": "REGISTERED SIGN",
            "altName": "REGISTERED TRADE MARK SIGN"
        },
        {
            "code": 175,
            "name": "MACRON",
            "altName": "SPACING MACRON"
        },
        {
            "code": 176,
            "name": "DEGREE SIGN"
        },
        {
            "code": 177,
            "name": "PLUS-MINUS SIGN",
            "altName": "PLUS-OR-MINUS SIGN"
        },
        {
            "code": 178,
            "name": "SUPERSCRIPT TWO",
            "altName": "SUPERSCRIPT DIGIT TWO"
        },
        {
            "code": 179,
            "name": "SUPERSCRIPT THREE",
            "altName": "SUPERSCRIPT DIGIT THREE"
        },
        {
            "code": 180,
            "name": "ACUTE ACCENT",
            "altName": "SPACING ACUTE"
        },
        {
            "code": 181,
            "name": "MICRO SIGN"
        },
        {
            "code": 182,
            "name": "PILCROW SIGN",
            "altName": "PARAGRAPH SIGN"
        },
        {
            "code": 183,
            "name": "MIDDLE DOT"
        },
        {
            "code": 184,
            "name": "CEDILLA",
            "altName": "SPACING CEDILLA"
        },
        {
            "code": 185,
            "name": "SUPERSCRIPT ONE",
            "altName": "SUPERSCRIPT DIGIT ONE"
        },
        {
            "code": 186,
            "name": "MASCULINE ORDINAL INDICATOR"
        },
        {
            "code": 187,
            "name": "RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK",
            "altName": "RIGHT POINTING GUILLEMET"
        },
        {
            "code": 188,
            "name": "VULGAR FRACTION ONE QUARTER",
            "altName": "FRACTION ONE QUARTER"
        },
        {
            "code": 189,
            "name": "VULGAR FRACTION ONE HALF",
            "altName": "FRACTION ONE HALF"
        },
        {
            "code": 190,
            "name": "VULGAR FRACTION THREE QUARTERS",
            "altName": "FRACTION THREE QUARTERS"
        },
        {
            "code": 191,
            "name": "INVERTED QUESTION MARK"
        },
        {
            "code": 192,
            "name": "LATIN CAPITAL LETTER A WITH GRAVE",
            "altName": "LATIN CAPITAL LETTER A GRAVE"
        },
        {
            "code": 193,
            "name": "LATIN CAPITAL LETTER A WITH ACUTE",
            "altName": "LATIN CAPITAL LETTER A ACUTE"
        },
        {
            "code": 194,
            "name": "LATIN CAPITAL LETTER A WITH CIRCUMFLEX",
            "altName": "LATIN CAPITAL LETTER A CIRCUMFLEX"
        },
        {
            "code": 195,
            "name": "LATIN CAPITAL LETTER A WITH TILDE",
            "altName": "LATIN CAPITAL LETTER A TILDE"
        },
        {
            "code": 196,
            "name": "LATIN CAPITAL LETTER A WITH DIAERESIS",
            "altName": "LATIN CAPITAL LETTER A DIAERESIS"
        },
        {
            "code": 197,
            "name": "LATIN CAPITAL LETTER A WITH RING ABOVE",
            "altName": "LATIN CAPITAL LETTER A RING"
        },
        {
            "code": 198,
            "name": "LATIN CAPITAL LETTER AE",
            "altName": "LATIN CAPITAL LETTER A E"
        },
        {
            "code": 199,
            "name": "LATIN CAPITAL LETTER C WITH CEDILLA",
            "altName": "LATIN CAPITAL LETTER C CEDILLA"
        },
        {
            "code": 200,
            "name": "LATIN CAPITAL LETTER E WITH GRAVE",
            "altName": "LATIN CAPITAL LETTER E GRAVE"
        },
        {
            "code": 201,
            "name": "LATIN CAPITAL LETTER E WITH ACUTE",
            "altName": "LATIN CAPITAL LETTER E ACUTE"
        },
        {
            "code": 202,
            "name": "LATIN CAPITAL LETTER E WITH CIRCUMFLEX",
            "altName": "LATIN CAPITAL LETTER E CIRCUMFLEX"
        },
        {
            "code": 203,
            "name": "LATIN CAPITAL LETTER E WITH DIAERESIS",
            "altName": "LATIN CAPITAL LETTER E DIAERESIS"
        },
        {
            "code": 204,
            "name": "LATIN CAPITAL LETTER I WITH GRAVE",
            "altName": "LATIN CAPITAL LETTER I GRAVE"
        },
        {
            "code": 205,
            "name": "LATIN CAPITAL LETTER I WITH ACUTE",
            "altName": "LATIN CAPITAL LETTER I ACUTE"
        },
        {
            "code": 206,
            "name": "LATIN CAPITAL LETTER I WITH CIRCUMFLEX",
            "altName": "LATIN CAPITAL LETTER I CIRCUMFLEX"
        },
        {
            "code": 207,
            "name": "LATIN CAPITAL LETTER I WITH DIAERESIS",
            "altName": "LATIN CAPITAL LETTER I DIAERESIS"
        },
        {
            "code": 208,
            "name": "LATIN CAPITAL LETTER ETH"
        },
        {
            "code": 209,
            "name": "LATIN CAPITAL LETTER N WITH TILDE",
            "altName": "LATIN CAPITAL LETTER N TILDE"
        },
        {
            "code": 210,
            "name": "LATIN CAPITAL LETTER O WITH GRAVE",
            "altName": "LATIN CAPITAL LETTER O GRAVE"
        },
        {
            "code": 211,
            "name": "LATIN CAPITAL LETTER O WITH ACUTE",
            "altName": "LATIN CAPITAL LETTER O ACUTE"
        },
        {
            "code": 212,
            "name": "LATIN CAPITAL LETTER O WITH CIRCUMFLEX",
            "altName": "LATIN CAPITAL LETTER O CIRCUMFLEX"
        },
        {
            "code": 213,
            "name": "LATIN CAPITAL LETTER O WITH TILDE",
            "altName": "LATIN CAPITAL LETTER O TILDE"
        },
        {
            "code": 214,
            "name": "LATIN CAPITAL LETTER O WITH DIAERESIS",
            "altName": "LATIN CAPITAL LETTER O DIAERESIS"
        },
        {
            "code": 215,
            "name": "MULTIPLICATION SIGN"
        },
        {
            "code": 216,
            "name": "LATIN CAPITAL LETTER O WITH STROKE",
            "altName": "LATIN CAPITAL LETTER O SLASH"
        },
        {
            "code": 217,
            "name": "LATIN CAPITAL LETTER U WITH GRAVE",
            "altName": "LATIN CAPITAL LETTER U GRAVE"
        },
        {
            "code": 218,
            "name": "LATIN CAPITAL LETTER U WITH ACUTE",
            "altName": "LATIN CAPITAL LETTER U ACUTE"
        },
        {
            "code": 219,
            "name": "LATIN CAPITAL LETTER U WITH CIRCUMFLEX",
            "altName": "LATIN CAPITAL LETTER U CIRCUMFLEX"
        },
        {
            "code": 220,
            "name": "LATIN CAPITAL LETTER U WITH DIAERESIS",
            "altName": "LATIN CAPITAL LETTER U DIAERESIS"
        },
        {
            "code": 221,
            "name": "LATIN CAPITAL LETTER Y WITH ACUTE",
            "altName": "LATIN CAPITAL LETTER Y ACUTE"
        },
        {
            "code": 222,
            "name": "LATIN CAPITAL LETTER THORN"
        },
        {
            "code": 223,
            "name": "LATIN SMALL LETTER SHARP S"
        },
        {
            "code": 224,
            "name": "LATIN SMALL LETTER A WITH GRAVE",
            "altName": "LATIN SMALL LETTER A GRAVE"
        },
        {
            "code": 225,
            "name": "LATIN SMALL LETTER A WITH ACUTE",
            "altName": "LATIN SMALL LETTER A ACUTE"
        },
        {
            "code": 226,
            "name": "LATIN SMALL LETTER A WITH CIRCUMFLEX",
            "altName": "LATIN SMALL LETTER A CIRCUMFLEX"
        },
        {
            "code": 227,
            "name": "LATIN SMALL LETTER A WITH TILDE",
            "altName": "LATIN SMALL LETTER A TILDE"
        },
        {
            "code": 228,
            "name": "LATIN SMALL LETTER A WITH DIAERESIS",
            "altName": "LATIN SMALL LETTER A DIAERESIS"
        },
        {
            "code": 229,
            "name": "LATIN SMALL LETTER A WITH RING ABOVE",
            "altName": "LATIN SMALL LETTER A RING"
        },
        {
            "code": 230,
            "name": "LATIN SMALL LETTER AE",
            "altName": "LATIN SMALL LETTER A E"
        },
        {
            "code": 231,
            "name": "LATIN SMALL LETTER C WITH CEDILLA",
            "altName": "LATIN SMALL LETTER C CEDILLA"
        },
        {
            "code": 232,
            "name": "LATIN SMALL LETTER E WITH GRAVE",
            "altName": "LATIN SMALL LETTER E GRAVE"
        },
        {
            "code": 233,
            "name": "LATIN SMALL LETTER E WITH ACUTE",
            "altName": "LATIN SMALL LETTER E ACUTE"
        },
        {
            "code": 234,
            "name": "LATIN SMALL LETTER E WITH CIRCUMFLEX",
            "altName": "LATIN SMALL LETTER E CIRCUMFLEX"
        },
        {
            "code": 235,
            "name": "LATIN SMALL LETTER E WITH DIAERESIS",
            "altName": "LATIN SMALL LETTER E DIAERESIS"
        },
        {
            "code": 236,
            "name": "LATIN SMALL LETTER I WITH GRAVE",
            "altName": "LATIN SMALL LETTER I GRAVE"
        },
        {
            "code": 237,
            "name": "LATIN SMALL LETTER I WITH ACUTE",
            "altName": "LATIN SMALL LETTER I ACUTE"
        },
        {
            "code": 238,
            "name": "LATIN SMALL LETTER I WITH CIRCUMFLEX",
            "altName": "LATIN SMALL LETTER I CIRCUMFLEX"
        },
        {
            "code": 239,
            "name": "LATIN SMALL LETTER I WITH DIAERESIS",
            "altName": "LATIN SMALL LETTER I DIAERESIS"
        },
        {
            "code": 240,
            "name": "LATIN SMALL LETTER ETH"
        },
        {
            "code": 241,
            "name": "LATIN SMALL LETTER N WITH TILDE",
            "altName": "LATIN SMALL LETTER N TILDE"
        },
        {
            "code": 242,
            "name": "LATIN SMALL LETTER O WITH GRAVE",
            "altName": "LATIN SMALL LETTER O GRAVE"
        },
        {
            "code": 243,
            "name": "LATIN SMALL LETTER O WITH ACUTE",
            "altName": "LATIN SMALL LETTER O ACUTE"
        },
        {
            "code": 244,
            "name": "LATIN SMALL LETTER O WITH CIRCUMFLEX",
            "altName": "LATIN SMALL LETTER O CIRCUMFLEX"
        },
        {
            "code": 245,
            "name": "LATIN SMALL LETTER O WITH TILDE",
            "altName": "LATIN SMALL LETTER O TILDE"
        },
        {
            "code": 246,
            "name": "LATIN SMALL LETTER O WITH DIAERESIS",
            "altName": "LATIN SMALL LETTER O DIAERESIS"
        },
        {
            "code": 247,
            "name": "DIVISION SIGN"
        },
        {
            "code": 248,
            "name": "LATIN SMALL LETTER O WITH STROKE",
            "altName": "LATIN SMALL LETTER O SLASH"
        },
        {
            "code": 249,
            "name": "LATIN SMALL LETTER U WITH GRAVE",
            "altName": "LATIN SMALL LETTER U GRAVE"
        },
        {
            "code": 250,
            "name": "LATIN SMALL LETTER U WITH ACUTE",
            "altName": "LATIN SMALL LETTER U ACUTE"
        },
        {
            "code": 251,
            "name": "LATIN SMALL LETTER U WITH CIRCUMFLEX",
            "altName": "LATIN SMALL LETTER U CIRCUMFLEX"
        },
        {
            "code": 252,
            "name": "LATIN SMALL LETTER U WITH DIAERESIS",
            "altName": "LATIN SMALL LETTER U DIAERESIS"
        },
        {
            "code": 253,
            "name": "LATIN SMALL LETTER Y WITH ACUTE",
            "altName": "LATIN SMALL LETTER Y ACUTE"
        },
        {
            "code": 254,
            "name": "LATIN SMALL LETTER THORN"
        },
        {
            "code": 255,
            "name": "LATIN SMALL LETTER Y WITH DIAERESIS",
            "altName": "LATIN SMALL LETTER Y DIAERESIS"
        },
        {
            "code": 128512,
            "name": "GRINNING FACE"
        },
        {
            "code": 128513,
            "name": "GRINNING FACE WITH SMILING EYES"
        },
        {
            "code": 128514,
            "name": "FACE WITH TEARS OF JOY"
        },
        {
            "code": 128515,
            "name": "SMILING FACE WITH OPEN MOUTH"
        },
        {
            "code": 128516,
            "name": "SMILING FACE WITH OPEN MOUTH AND SMILING EYES"
        },
        {
            "code": 128517,
            "name": "SMILING FACE WITH OPEN MOUTH AND COLD SWEAT"
        },
        {
            "code": 128518,
            "name": "SMILING FACE WITH OPEN MOUTH AND TIGHTLY-CLOSED EYES"
        },
        {
            "code": 128519,
            "name": "SMILING FACE WITH HALO"
        },
        {
            "code": 128520,
            "name": "SMILING FACE WITH HORNS"
        },
        {
            "code": 128521,
            "name": "WINKING FACE"
        },
        {
            "code": 128522,
            "name": "SMILING FACE WITH SMILING EYES"
        },
        {
            "code": 128523,
            "name": "FACE SAVOURING DELICIOUS FOOD"
        },
        {
            "code": 128524,
            "name": "RELIEVED FACE"
        },
        {
            "code": 128525,
            "name": "SMILING FACE WITH HEART-SHAPED EYES"
        },
        {
            "code": 128526,
            "name": "SMILING FACE WITH SUNGLASSES"
        },
        {
            "code": 128527,
            "name": "SMIRKING FACE"
        },
        {
            "code": 128528,
            "name": "NEUTRAL FACE"
        },
        {
            "code": 128529,
            "name": "EXPRESSIONLESS FACE"
        },
        {
            "code": 128530,
            "name": "UNAMUSED FACE"
        },
        {
            "code": 128531,
            "name": "FACE WITH COLD SWEAT"
        },
        {
            "code": 128532,
            "name": "PENSIVE FACE"
        },
        {
            "code": 128533,
            "name": "CONFUSED FACE"
        },
        {
            "code": 128534,
            "name": "CONFOUNDED FACE"
        },
        {
            "code": 128535,
            "name": "KISSING FACE"
        },
        {
            "code": 128536,
            "name": "FACE THROWING A KISS"
        },
        {
            "code": 128537,
            "name": "KISSING FACE WITH SMILING EYES"
        },
        {
            "code": 128538,
            "name": "KISSING FACE WITH CLOSED EYES"
        },
        {
            "code": 128539,
            "name": "FACE WITH STUCK-OUT TONGUE"
        },
        {
            "code": 128540,
            "name": "FACE WITH STUCK-OUT TONGUE AND WINKING EYE"
        },
        {
            "code": 128541,
            "name": "FACE WITH STUCK-OUT TONGUE AND TIGHTLY-CLOSED EYES"
        },
        {
            "code": 128542,
            "name": "DISAPPOINTED FACE"
        },
        {
            "code": 128543,
            "name": "WORRIED FACE"
        },
        {
            "code": 128544,
            "name": "ANGRY FACE"
        },
        {
            "code": 128545,
            "name": "POUTING FACE"
        },
        {
            "code": 128546,
            "name": "CRYING FACE"
        },
        {
            "code": 128547,
            "name": "PERSEVERING FACE"
        },
        {
            "code": 128548,
            "name": "FACE WITH LOOK OF TRIUMPH"
        },
        {
            "code": 128549,
            "name": "DISAPPOINTED BUT RELIEVED FACE"
        },
        {
            "code": 128550,
            "name": "FROWNING FACE WITH OPEN MOUTH"
        },
        {
            "code": 128551,
            "name": "ANGUISHED FACE"
        },
        {
            "code": 128552,
            "name": "FEARFUL FACE"
        },
        {
            "code": 128553,
            "name": "WEARY FACE"
        },
        {
            "code": 128554,
            "name": "SLEEPY FACE"
        },
        {
            "code": 128555,
            "name": "TIRED FACE"
        },
        {
            "code": 128556,
            "name": "GRIMACING FACE"
        },
        {
            "code": 128557,
            "name": "LOUDLY CRYING FACE"
        },
        {
            "code": 128558,
            "name": "FACE WITH OPEN MOUTH"
        },
        {
            "code": 128559,
            "name": "HUSHED FACE"
        },
        {
            "code": 128560,
            "name": "FACE WITH OPEN MOUTH AND COLD SWEAT"
        },
        {
            "code": 128561,
            "name": "FACE SCREAMING IN FEAR"
        },
        {
            "code": 128562,
            "name": "ASTONISHED FACE"
        },
        {
            "code": 128563,
            "name": "FLUSHED FACE"
        },
        {
            "code": 128564,
            "name": "SLEEPING FACE"
        },
        {
            "code": 128565,
            "name": "DIZZY FACE"
        },
        {
            "code": 128566,
            "name": "FACE WITHOUT MOUTH"
        },
        {
            "code": 128567,
            "name": "FACE WITH MEDICAL MASK"
        },
        {
            "code": 128568,
            "name": "GRINNING CAT FACE WITH SMILING EYES"
        },
        {
            "code": 128569,
            "name": "CAT FACE WITH TEARS OF JOY"
        },
        {
            "code": 128570,
            "name": "SMILING CAT FACE WITH OPEN MOUTH"
        },
        {
            "code": 128571,
            "name": "SMILING CAT FACE WITH HEART-SHAPED EYES"
        },
        {
            "code": 128572,
            "name": "CAT FACE WITH WRY SMILE"
        },
        {
            "code": 128573,
            "name": "KISSING CAT FACE WITH CLOSED EYES"
        },
        {
            "code": 128574,
            "name": "POUTING CAT FACE"
        },
        {
            "code": 128575,
            "name": "CRYING CAT FACE"
        },
        {
            "code": 128576,
            "name": "WEARY CAT FACE"
        },
        {
            "code": 128577,
            "name": "SLIGHTLY FROWNING FACE"
        },
        {
            "code": 128578,
            "name": "SLIGHTLY SMILING FACE"
        },
        {
            "code": 128581,
            "name": "FACE WITH NO GOOD GESTURE"
        },
        {
            "code": 128582,
            "name": "FACE WITH OK GESTURE"
        },
        {
            "code": 128583,
            "name": "PERSON BOWING DEEPLY"
        },
        {
            "code": 128584,
            "name": "SEE-NO-EVIL MONKEY"
        },
        {
            "code": 128585,
            "name": "HEAR-NO-EVIL MONKEY"
        },
        {
            "code": 128586,
            "name": "SPEAK-NO-EVIL MONKEY"
        },
        {
            "code": 128587,
            "name": "HAPPY PERSON RAISING ONE HAND"
        },
        {
            "code": 128588,
            "name": "PERSON RAISING BOTH HANDS IN CELEBRATION"
        },
        {
            "code": 128589,
            "name": "PERSON FROWNING"
        },
        {
            "code": 128590,
            "name": "PERSON WITH POUTING FACE"
        },
        {
            "code": 128591,
            "name": "PERSON WITH FOLDED HANDS"
        },
        {
            "code": 128592,
            "name": "NORTH WEST POINTING LEAF"
        },
        {
            "code": 128593,
            "name": "SOUTH WEST POINTING LEAF"
        },
        {
            "code": 128594,
            "name": "NORTH EAST POINTING LEAF"
        },
        {
            "code": 128595,
            "name": "SOUTH EAST POINTING LEAF"
        },
        {
            "code": 128596,
            "name": "TURNED NORTH WEST POINTING LEAF"
        },
        {
            "code": 128597,
            "name": "TURNED SOUTH WEST POINTING LEAF"
        },
        {
            "code": 128598,
            "name": "TURNED NORTH EAST POINTING LEAF"
        },
        {
            "code": 128599,
            "name": "TURNED SOUTH EAST POINTING LEAF"
        },
        {
            "code": 128600,
            "name": "NORTH WEST POINTING VINE LEAF"
        },
        {
            "code": 128601,
            "name": "SOUTH WEST POINTING VINE LEAF"
        },
        {
            "code": 128602,
            "name": "NORTH EAST POINTING VINE LEAF"
        },
        {
            "code": 128603,
            "name": "SOUTH EAST POINTING VINE LEAF"
        },
        {
            "code": 128604,
            "name": "HEAVY NORTH WEST POINTING VINE LEAF"
        },
        {
            "code": 128605,
            "name": "HEAVY SOUTH WEST POINTING VINE LEAF"
        },
        {
            "code": 128606,
            "name": "HEAVY NORTH EAST POINTING VINE LEAF"
        },
        {
            "code": 128607,
            "name": "HEAVY SOUTH EAST POINTING VINE LEAF"
        },
        {
            "code": 128608,
            "name": "NORTH WEST POINTING BUD"
        },
        {
            "code": 128609,
            "name": "SOUTH WEST POINTING BUD"
        },
        {
            "code": 128610,
            "name": "NORTH EAST POINTING BUD"
        },
        {
            "code": 128611,
            "name": "SOUTH EAST POINTING BUD"
        },
        {
            "code": 128612,
            "name": "HEAVY NORTH WEST POINTING BUD"
        },
        {
            "code": 128613,
            "name": "HEAVY SOUTH WEST POINTING BUD"
        },
        {
            "code": 128614,
            "name": "HEAVY NORTH EAST POINTING BUD"
        },
        {
            "code": 128615,
            "name": "HEAVY SOUTH EAST POINTING BUD"
        },
        {
            "code": 128616,
            "name": "HOLLOW QUILT SQUARE ORNAMENT"
        },
        {
            "code": 128617,
            "name": "HOLLOW QUILT SQUARE ORNAMENT IN BLACK SQUARE"
        },
        {
            "code": 128618,
            "name": "SOLID QUILT SQUARE ORNAMENT"
        },
        {
            "code": 128619,
            "name": "SOLID QUILT SQUARE ORNAMENT IN BLACK SQUARE"
        },
        {
            "code": 128620,
            "name": "LEFTWARDS ROCKET"
        },
        {
            "code": 128621,
            "name": "UPWARDS ROCKET"
        },
        {
            "code": 128622,
            "name": "RIGHTWARDS ROCKET"
        },
        {
            "code": 128623,
            "name": "DOWNWARDS ROCKET"
        },
        {
            "code": 128624,
            "name": "SCRIPT LIGATURE ET ORNAMENT"
        },
        {
            "code": 128625,
            "name": "HEAVY SCRIPT LIGATURE ET ORNAMENT"
        },
        {
            "code": 128626,
            "name": "LIGATURE OPEN ET ORNAMENT"
        },
        {
            "code": 128627,
            "name": "HEAVY LIGATURE OPEN ET ORNAMENT"
        },
        {
            "code": 128628,
            "name": "HEAVY AMPERSAND ORNAMENT"
        },
        {
            "code": 128629,
            "name": "SWASH AMPERSAND ORNAMENT"
        },
        {
            "code": 128630,
            "name": "SANS-SERIF HEAVY DOUBLE TURNED COMMA QUOTATION MARK ORNAMENT"
        },
        {
            "code": 128631,
            "name": "SANS-SERIF HEAVY DOUBLE COMMA QUOTATION MARK ORNAMENT"
        },
        {
            "code": 128632,
            "name": "SANS-SERIF HEAVY LOW DOUBLE COMMA QUOTATION MARK ORNAMENT"
        },
        {
            "code": 128633,
            "name": "HEAVY INTERROBANG ORNAMENT"
        },
        {
            "code": 128634,
            "name": "SANS-SERIF INTERROBANG ORNAMENT"
        },
        {
            "code": 128635,
            "name": "HEAVY SANS-SERIF INTERROBANG ORNAMENT"
        },
        {
            "code": 128636,
            "name": "VERY HEAVY SOLIDUS"
        },
        {
            "code": 128637,
            "name": "VERY HEAVY REVERSE SOLIDUS"
        },
        {
            "code": 128638,
            "name": "CHECKER BOARD"
        },
        {
            "code": 128639,
            "name": "REVERSE CHECKER BOARD"
        },
        {
            "code": 128640,
            "name": "ROCKET"
        },
        {
            "code": 128641,
            "name": "HELICOPTER"
        },
        {
            "code": 128642,
            "name": "STEAM LOCOMOTIVE"
        },
        {
            "code": 128643,
            "name": "RAILWAY CAR"
        },
        {
            "code": 128644,
            "name": "HIGH-SPEED TRAIN"
        },
        {
            "code": 128645,
            "name": "HIGH-SPEED TRAIN WITH BULLET NOSE"
        },
        {
            "code": 128646,
            "name": "TRAIN"
        },
        {
            "code": 128647,
            "name": "METRO"
        },
        {
            "code": 128648,
            "name": "LIGHT RAIL"
        },
        {
            "code": 128649,
            "name": "STATION"
        },
        {
            "code": 128650,
            "name": "TRAM"
        },
        {
            "code": 128651,
            "name": "TRAM CAR"
        },
        {
            "code": 128652,
            "name": "BUS"
        },
        {
            "code": 128653,
            "name": "ONCOMING BUS"
        },
        {
            "code": 128654,
            "name": "TROLLEYBUS"
        },
        {
            "code": 128655,
            "name": "BUS STOP"
        },
        {
            "code": 128656,
            "name": "MINIBUS"
        },
        {
            "code": 128657,
            "name": "AMBULANCE"
        },
        {
            "code": 128658,
            "name": "FIRE ENGINE"
        },
        {
            "code": 128659,
            "name": "POLICE CAR"
        },
        {
            "code": 128660,
            "name": "ONCOMING POLICE CAR"
        },
        {
            "code": 128661,
            "name": "TAXI"
        },
        {
            "code": 128662,
            "name": "ONCOMING TAXI"
        },
        {
            "code": 128663,
            "name": "AUTOMOBILE"
        },
        {
            "code": 128664,
            "name": "ONCOMING AUTOMOBILE"
        },
        {
            "code": 128665,
            "name": "RECREATIONAL VEHICLE"
        },
        {
            "code": 128666,
            "name": "DELIVERY TRUCK"
        },
        {
            "code": 128667,
            "name": "ARTICULATED LORRY"
        },
        {
            "code": 128668,
            "name": "TRACTOR"
        },
        {
            "code": 128669,
            "name": "MONORAIL"
        },
        {
            "code": 128670,
            "name": "MOUNTAIN RAILWAY"
        },
        {
            "code": 128671,
            "name": "SUSPENSION RAILWAY"
        },
        {
            "code": 128672,
            "name": "MOUNTAIN CABLEWAY"
        },
        {
            "code": 128673,
            "name": "AERIAL TRAMWAY"
        },
        {
            "code": 128674,
            "name": "SHIP"
        },
        {
            "code": 128675,
            "name": "ROWBOAT"
        },
        {
            "code": 128676,
            "name": "SPEEDBOAT"
        },
        {
            "code": 128677,
            "name": "HORIZONTAL TRAFFIC LIGHT"
        },
        {
            "code": 128678,
            "name": "VERTICAL TRAFFIC LIGHT"
        },
        {
            "code": 128679,
            "name": "CONSTRUCTION SIGN"
        },
        {
            "code": 128680,
            "name": "POLICE CARS REVOLVING LIGHT"
        },
        {
            "code": 128681,
            "name": "TRIANGULAR FLAG ON POST"
        },
        {
            "code": 128682,
            "name": "DOOR"
        },
        {
            "code": 128683,
            "name": "NO ENTRY SIGN"
        },
        {
            "code": 128684,
            "name": "SMOKING SYMBOL"
        },
        {
            "code": 128685,
            "name": "NO SMOKING SYMBOL"
        },
        {
            "code": 128686,
            "name": "PUT LITTER IN ITS PLACE SYMBOL"
        },
        {
            "code": 128687,
            "name": "DO NOT LITTER SYMBOL"
        },
        {
            "code": 128688,
            "name": "POTABLE WATER SYMBOL"
        },
        {
            "code": 128689,
            "name": "NON-POTABLE WATER SYMBOL"
        },
        {
            "code": 128690,
            "name": "BICYCLE"
        },
        {
            "code": 128691,
            "name": "NO BICYCLES"
        },
        {
            "code": 128692,
            "name": "BICYCLIST"
        },
        {
            "code": 128693,
            "name": "MOUNTAIN BICYCLIST"
        },
        {
            "code": 128694,
            "name": "PEDESTRIAN"
        },
        {
            "code": 128695,
            "name": "NO PEDESTRIANS"
        },
        {
            "code": 128696,
            "name": "CHILDREN CROSSING"
        },
        {
            "code": 128697,
            "name": "MENS SYMBOL"
        },
        {
            "code": 128698,
            "name": "WOMENS SYMBOL"
        },
        {
            "code": 128699,
            "name": "RESTROOM"
        },
        {
            "code": 128700,
            "name": "BABY SYMBOL"
        },
        {
            "code": 128701,
            "name": "TOILET"
        },
        {
            "code": 128702,
            "name": "WATER CLOSET"
        },
        {
            "code": 128703,
            "name": "SHOWER"
        },
        {
            "code": 128704,
            "name": "BATH"
        },
        {
            "code": 128705,
            "name": "BATHTUB"
        },
        {
            "code": 128706,
            "name": "PASSPORT CONTROL"
        },
        {
            "code": 128707,
            "name": "CUSTOMS"
        },
        {
            "code": 128708,
            "name": "BAGGAGE CLAIM"
        },
        {
            "code": 128709,
            "name": "LEFT LUGGAGE"
        },
        {
            "code": 128710,
            "name": "TRIANGLE WITH ROUNDED CORNERS"
        },
        {
            "code": 128711,
            "name": "PROHIBITED SIGN"
        },
        {
            "code": 128712,
            "name": "CIRCLED INFORMATION SOURCE"
        },
        {
            "code": 128713,
            "name": "BOYS SYMBOL"
        },
        {
            "code": 128714,
            "name": "GIRLS SYMBOL"
        },
        {
            "code": 128715,
            "name": "COUCH AND LAMP"
        },
        {
            "code": 128716,
            "name": "SLEEPING ACCOMMODATION"
        },
        {
            "code": 128717,
            "name": "SHOPPING BAGS"
        },
        {
            "code": 128718,
            "name": "BELLHOP BELL"
        },
        {
            "code": 128719,
            "name": "BED"
        },
        {
            "code": 128736,
            "name": "HAMMER AND WRENCH"
        },
        {
            "code": 128737,
            "name": "SHIELD"
        },
        {
            "code": 128738,
            "name": "OIL DRUM"
        },
        {
            "code": 128739,
            "name": "MOTORWAY"
        },
        {
            "code": 128740,
            "name": "RAILWAY TRACK"
        },
        {
            "code": 128741,
            "name": "MOTOR BOAT"
        },
        {
            "code": 128742,
            "name": "UP-POINTING MILITARY AIRPLANE"
        },
        {
            "code": 128743,
            "name": "UP-POINTING AIRPLANE"
        },
        {
            "code": 128744,
            "name": "UP-POINTING SMALL AIRPLANE"
        },
        {
            "code": 128745,
            "name": "SMALL AIRPLANE"
        },
        {
            "code": 128746,
            "name": "NORTHEAST-POINTING AIRPLANE"
        },
        {
            "code": 128747,
            "name": "AIRPLANE DEPARTURE"
        },
        {
            "code": 128748,
            "name": "AIRPLANE ARRIVING"
        },
        {
            "code": 128752,
            "name": "SATELLITE"
        },
        {
            "code": 128753,
            "name": "ONCOMING FIRE ENGINE"
        },
        {
            "code": 128754,
            "name": "DIESEL LOCOMOTIVE"
        },
        {
            "code": 128755,
            "name": "PASSENGER SHIP"
        }
    ]
};
