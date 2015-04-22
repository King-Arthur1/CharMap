(function() {
    var viewModel = {
        listViewArray: ko.observableArray()
    };

    function update() {
        var blockSlider = document.getElementById('blockSlider');
        var blockIndex = +blockSlider.value;
        viewModel.listViewArray.removeAll();
        viewModel.listViewArray.push.apply(viewModel.listViewArray, CharMap.createBlock(blockIndex));
    };


    WinJS.Namespace.define("SplitView", {
        splitView: null,
        togglePane: WinJS.UI.eventHandler(function (ev) {
            if(SplitView.splitView) {
                SplitView.splitView.paneHidden = !SplitView.splitView.paneHidden;
            }
            console.log(SplitView.splitView);
        })
    });

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

            ko.applyBindings(viewModel);
            update();
        });

        var lv = document.getElementById('content');
        lv.addEventListener('iteminvoked', handleListViewItemInvoked);

    };

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
})();