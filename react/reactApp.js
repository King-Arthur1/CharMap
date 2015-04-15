var React = require('react/addons');
var ReactWinJS = require('react-winjs');

// UNDONE: release react-winjs 0.2.0 and depend on that instead of depending on master

// UNDONE: for development, just jam the content in here... :)
var unicode = global_data;

function createBlock(blockIndex) {
    var block = unicode.blocks[blockIndex];
    // undone: block.name
    var data = [];
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
            
            data.push({
                altName:"<not present>",
                code:currentCode,
                name:"<not present>"
            });
        }
        else {
            data.push(unicode.data[index]);
        }

        // advance to next location in the data (<= will advance to one past currentCode)
        //
        while (index < unicode.data.length-1 && unicode.data[index].code <= currentCode) {
            index++;
        }
    }
    return data;
};

var App = React.createClass({
    charItemRenderer: ReactWinJS.reactRenderer(function (item) {
        return (
            <div className="container">
                <div className="letter">{
                    item.data.name === "<control>" ? "" : String.fromCharCode(item.data.code)
                }</div>
                <div>{item.data.code.toString(16) + " - " + (
                    item.data.name === "<control>" ? item.data.altName + " (control)" : item.data.name
                )}</div>
            </div>
        );
    }),
    gridLayout: new WinJS.UI.GridLayout(),
    handleChangeBlockIndex: function (eventObject) {
        var newBlockIndex = eventObject.currentTarget.value;
        if (newBlockIndex !== this.state.blockIndex) {
            this.setState({
                blockIndex: newBlockIndex,
                charList: new WinJS.Binding.List(createBlock(newBlockIndex))
            });
        }
    },
    handleToggleSplitView: function () {
        var splitView = this.refs.splitView.winControl;
        splitView.paneHidden = !splitView.paneHidden;
    },
    getInitialState: function () {
        var initialBlockIndex = 0;
        return {
            blockIndex: initialBlockIndex,
            charList: new WinJS.Binding.List(createBlock(initialBlockIndex))
        };
    },
    render: function () {
        var paneComponent = (
            <div>
                <div className="header">
                    <button type="button" className="win-splitview-button" onClick={this.handleToggleSplitView}></button>
                    <div className="title">SplitView Pane area</div>
                </div>

                <div className="nav-commands">
                    <ReactWinJS.NavBarCommand key="home" label="Home" icon="home" />
                    <ReactWinJS.NavBarCommand key="favorite" label="Favorite" icon="favorite" />
                    <ReactWinJS.NavBarCommand key="settings" label="Settings" icon="settings" />
                </div>
            </div>
        );

        var contentComponent = (
            <div className="contenttext">
                <div id="header">
                    <h1 id="title">CharMap React</h1>
                    
                    Join in on <a href="https://github.com/InternetExplorer/CharMap">GitHub</a>. Other versions...
                    <a href="ng/index.html">angular</a>,
                    <a href="index.html">winjs</a>,
                    <a href="ko/index.html">knockout</a>, ... <br />

                    <input
                        type="range"
                        min="0"
                        max="4"
                        value={this.state.blockIndex}
                        onChange={this.handleChangeBlockIndex}
                        style={{width:400}} />
                </div>

                <ReactWinJS.ListView
                    itemDataSource={this.state.charList.dataSource}
                    itemTemplate={this.charItemRenderer}
                    selectionMode="none"
                    tapBehavior="none"
                    layout={this.gridLayout} />
            </div>
        );

        return <ReactWinJS.SplitView
            ref="splitView"
            paneComponent={paneComponent}
            contentComponent={contentComponent} />
    }
});

React.render(<App />, document.getElementById("app"));