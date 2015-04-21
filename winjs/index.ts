/// <reference path="../js/charmap.ts" />

declare var WinJS: any;

function update() {
    var content = document.getElementById('content');
    var blockSlider = <HTMLInputElement>(document.getElementById('blockSlider'));
    var blockIndex = +blockSlider.value;
    var data = new WinJS.Binding.List(CharMap.createBlock(blockIndex));
    (<any>content).winControl.itemDataSource = data.dataSource;
}


window.onload = () => {
    var root = document.getElementById('root');
    WinJS.UI.processAll(root).then(function () {
        // UNDONE: for development, just jam the content in here... :)
        //
        return (<any>window).global_data;
        // return WinJS.xhr({ url: "ucd.js" }).then(function (result) {
        //     return JSON.parse(result.responseText);
        // });
    }).then(function (data) {
        (<any>window).unicode = data;
        var title = document.getElementById('title');
        title.textContent = "CharMap";

        var blockSlider = <HTMLInputElement>(document.getElementById('blockSlider'));
        blockSlider.max = "" + ((<any>window).unicode.blocks.length - 1);
        blockSlider.addEventListener("change", update);
        update();
    });
};
