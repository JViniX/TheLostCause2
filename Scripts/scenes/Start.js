"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            //instantiate a new Text object
            this._welcomeLabel = new objects.Label("The Lost Cause 2", "60px", "Arial Black", "#FFFFFF", config.Game.SCREEN_WIDTH / 2, 220, true);
            this._startLabel = new objects.Label("Click or Touch to Start", "40px", "Arial", "#FFFFFF", config.Game.SCREEN_WIDTH / 2, config.Game.SCREEN_HEIGHT / 2, true);
            // buttons
            this._startButton = new objects.Button("btnWhite", 0, 0, true, true);
            this._startButton.alpha = 0.01;
            this._startButton.scaleX = config.Game.SCREEN_WIDTH;
            this._startButton.scaleY = config.Game.SCREEN_HEIGHT;
            //this._ocean = new objects.Ocean();
            this._background = new objects.Background();
            this.Main();
        };
        Start.prototype.Update = function () {
            //this._ocean.Update();
            this._background.Update();
        };
        Start.prototype.Main = function () {
            //this.addChild(this._ocean);
            this.addChild(this._background);
            this.addChild(this._welcomeLabel);
            this.addChild(this._startLabel);
            this.addChild(this._startButton);
            this._startButton.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
        };
        Start.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map