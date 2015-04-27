(function() {
    window.WinJSApp = window.WinJSApp || {};
    window.WinJSApp.listClicked = WinJS.UI.eventHandler(update);

    function update() {
        var content = document.getElementById('content');
        var blockSlider = (document.getElementById('blockSlider'));
        var blockIndex = +blockSlider.value;
        var data = new WinJS.Binding.List(CharMap.createBlock(blockIndex));
        content.winControl.itemDataSource = data.dataSource;
    }
    window.onload = function () {
        var root = document.getElementById('root');
        WinJS.UI.processAll(root).then(function () {
            // UNDONE: for development, just jam the content in here... :)
            //
            return window.global_data;
        }).then(function (data) {
            window.unicode = data;
            var title = document.getElementById('title');
            title.textContent = "CharMap";
            var blockSlider = (document.getElementById('blockSlider'));
            blockSlider.max = "" + (window.unicode.blocks.length - 1);
            blockSlider.addEventListener("change", update);
            update();
        });
    };

})();
