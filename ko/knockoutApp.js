// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

WinJS.Namespace.define("SplitView", {

    splitView: null,
    togglePane: WinJS.UI.eventHandler(function (ev) {
        if(SplitView.splitView) {
            SplitView.splitView.paneHidden = !SplitView.splitView.paneHidden;
        }
        console.log(SplitView.splitView);
    })
});


function makeSingleChar(data) {
    if (data.name === "<control>") {
        return { preview: "", text: data.code.toString(16) + " - " + data.altName + "(control)" };
    }
    else {
        return { preview: "&#x" + data.code.toString(16) + ";", text: data.code.toString(16) + " - " + data.name.replace("<", "&lt;").replace(">", "&gt;") };
    }
};

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
};

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
};

// This calls out to Knockout for binding the content of each ListView item
// 
function renderItem(itemPromise) {
    var template = document.getElementById("smallListIconTextTemplate");
    var element = template.firstElementChild.cloneNode(true);
    var renderComplete = itemPromise.then(function(item) {
        // Apply Knockout data binding
        ko.applyBindings(item.data, element);
        return item.ready;
    });
    return {element: element, renderComplete: renderComplete};
};   

// This validates we can generate the content for every page
// testData();
function update() {
    var content = document.getElementById('content');
    var blockSlider = (document.getElementById('blockSlider'));
    var blockIndex = +blockSlider.value;
    var data = new WinJS.Binding.List(createBlock(blockIndex));
    content.winControl.itemDataSource = data.dataSource;
    content.winControl.itemTemplate = renderItem;
};

window.onload = function () {
    var root = document.getElementById('root');
    WinJS.UI.processAll(root).then(function () {

        // Setup the SplitView Control
        SplitView.splitView = document.querySelector(".splitView").winControl;
        new WinJS.UI._WinKeyboard(SplitView.splitView.paneElement);
        
        // Load data
        return window.global_data;

    }).then(function (data) {
        unicode = data;
        var title = document.getElementById('title');
        title.textContent = "CharMap";
        var blockSlider = (document.getElementById('blockSlider'));
        blockSlider.max = "" + (unicode.blocks.length - 1);
        blockSlider.addEventListener("change", update);
        update();
    });

    var btnResize = document.getElementById('btnResize');

    btnResize.addEventListener('click', function () {
        // Stub for resizing list view
        var lv = document.getElementById('content');
        lv.style.height = '200px';
    });

    var lv = document.getElementById('content');
    lv.addEventListener('iteminvoked', handleListViewItemInvoked);

    // window.onresize = function () {
    //     setTimeout(function(){isWindowHeightStable(document.body.clientHeight)}, 300);
    // };
};

// TODO: Check if portrait or landscape, change direction of list, Portrait vertical, landscape horizontal

function isWindowHeightStable(height){
    if(document.body.clientHeight === height) {
        var lv = document.getElementById('content');
        lv.style.height =  (document.body.clientHeight - 200) + 'px';
    }
}

function isWindowsPortrait(){
    if(document.body.clientHeight > document.body.clientWidth) {
        return true;
    } else {
        return false;
    }
}


// function render(){
//     // if(isWindowPortrait()){
//     //     var lv = document.getElementById('content');
        
//     // }
// }

// Use Request Animation Frame for updating UI
// (function animationLoop() {
//     requestAnimationFrame(animationLoop);
//     render();
// })();


/*** 

    TESTING Content Dialog Control 

***/

function showDialog() {
    document.querySelector(".win-contentdialog").winControl.show();
}

function cancelDismissal(evenObject) {
    if (evenObject.detail.result === WinJS.UI.ContentDialog.DismissalResult.none) {
        evenObject.preventDefault();
        log("<br/>Dialog implicit dismissal cancelled");
    }
}

function log(msg) {
    document.getElementById("status").innerHTML += msg;
}

function handleListViewItemInvoked (ev) {
    showDialog();
}