# Web Frameworks demo

* Demo prep:
```
git clone https://github.com/InternetExplorer/CharMap.git CharMap
git checkout demo-start
npm install -g gulp
npm install
gulp
```
    
* Demo 1 - WinJS
    * SplitView
        * Open http://localhost:3000/winjs
        * Show UX
        * Go to: http://codepen.io/codemonkeychris/pen/XJBbOP
        *  Message: rich controls
        *  Message: UX where you need it
        *  Message: little details (button show/hide)
    * ContentDialog
        *  Open http://localhost:3000/winjs
        *  Show content dialog
        *  Resize window
        *  Message: polish
            
* Demo 2 - Knockout
    * "Add favorites"
    * Knockout project is hosted at https://github.com/spankyj/knockout-winjs
    * Very early work in progress, more directional
    * Show ListView wire up to Knockout data model
        
    * Add "favorites" data model
    ```js
    var viewModel = {
        listViewArray: ko.observableArray()
        favorites: ko.observableArray()
    };
    ```

    * Add "Favorite" primary button on dialog
    ```html
    <div data-win-control="WinJS.UI.ContentDialog" data-win-options="{
                 title: 'Character',
                 primaryCommandText: 'Favorite',
                 secondaryCommandText: 'Close'
            }">
    ```        

    * Add .show().then(…) to push something into the favorite data model
    ```
    document.querySelector(".win-contentdialog").winControl.show().
    then(function (e) {
        if(e.result === "primary") { // favorite
            viewModel.favorites.push(data);
        }
    });
    ```

    * Add "Favorite" button on nav bar
    ```html
    <div data-win-control="WinJS.UI.NavBarCommand" data-win-options="{ onclick: KOApp.favoriteClicked, label: 'Favorite', icon: 'favorite'}"></div>
    ```
    * Add "favoriteClicked" event handler
    ```
    window.KOApp.favoriteClicked = WinJS.UI.eventHandler(function (evt) {
        viewModel.listViewArray.removeAll();
        viewModel.listViewArray.push.apply(viewModel.listViewArray, viewModel.favorites());
    });    
    ```    

* Demo 3 - Angular
    * "Star ratings"
    * Angular project is hosted at https://github.com/winjs/angular-winjs
    * Fully supported project, working against Angular 1.X
    * Show module definition
    * Show markup: win-split-view, etc… run app
            
    * Add ratings control to UX
    ```html
    <win-rating max-rating="5" user-rating="item.data.rating"></win-rating>
    ```
    
    * Add scope change handler
    ```js
    if ($scope.viewState.mode === "list") {
        $scope.data = CharMap.createBlock($scope.viewState.currentBlock); 
    }
    else {
        var all = CharMap.getAllBlocks();
        var data = [];
        for (var i=0; i<all.length; i++) {
            data.push.apply(data, all[i].chars.filter(function (c) { return c.rating; }));
        }
        $scope.data = data;
    }
    ```

    * Run!
        
* Demo 4 - React
    * "Search"
    * React project is hosted at https://github.com/rigdern/react-winjs
    * Early work in progress, directional
    * Show basic app definition in React
    * Show ListView wire up, templates, etc.
    * Add Search button
    ```js
    <ReactWinJS.NavBarCommand onClick={this.searchClicked} key="search" label="Search" icon="find" />
    ```
    
    * Add Search clicked
    ```
    searchClicked: function () {
        this.setState({
            mode: "search"
        });
    },
    ```
    
    * Update render
    ```
    var contentComponent = this.state.mode === "search" ? this.renderSearch() : this.renderDefault();
    ```
    
    * Add render implementation
    ```js
    renderSearch: function() {
        var that = this;

        function matchChars(chars, str) { 
            return chars.filter(function(c) { 
                return c.name.toLowerCase().indexOf(str.toLowerCase()) != -1; 
            })
        };

        var all = CharMap.getAllBlocks();
        var onlyItemsWithMatches = all.filter(function (item) { 
            return matchChars(item.chars, that.state.searchString).length > 0; 
        });

        var blocks = onlyItemsWithMatches.
                map(function (item) {
                    return <ReactWinJS.Hub.Section key={item.block.name} header={item.block.name} isHeaderStatic={true}>
                        <div className="hubSectionLetterContainer">{
                            matchChars(item.chars, that.state.searchString).
                                filter(function (c, index) { return index < 40; }). // limit to first 40 results (for now)
                                map(function (c) {
                                    return <div className="item">
                                        <span className="letter" dangerouslySetInnerHTML={{__html: "&#x" + c.code.toString(16) + ";"}} /> 
                                        - {c.name}
                                    </div>;
                                })
                        }</div>
                    </ReactWinJS.Hub.Section>;
                });

        return  (
            <div className="contenttext">
                <div id="header">
                    <h1 id="title">CharMap React</h1>
                    
                    <input
                        type="text"
                        value={this.state.searchString}
                        onChange={this.handleSearchString}
                        style={{width:400}} />
                </div>
                <ReactWinJS.Hub className='simpleList'>
                    {blocks}
                </ReactWinJS.Hub>
            </div>
        );
    },
    ```
    
* Demo 5 - CORDOVA 

Pre-reqs:
* install cordova
```
npm install -g cordova
```
* Create the Cordova Project & add Windows 10 preview platform
```
cd <some directory not in the CharMap repo>
cordova create "CharMapApp" 
cd CharMapApp
cordova platform add windows@https://aka.ms/cordova-win10
```

* Copy the CharMap code into the www folder of `CharMapApp`
* Edit the Config.xml file, add a preference inside the widget tag
```
<preference name="windows-target-version" value="10.0"/>
```

* Build the app
```
cordova build
```

* Start the app
```
cordova run windows
```
* Show F12 debugging app
