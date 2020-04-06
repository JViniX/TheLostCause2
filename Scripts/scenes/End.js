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
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function End() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        End.prototype.Start = function () {
            //instantiate a new Text object
            this._gameOverLabel = new objects.Label("Game Over", "60px", "Arial Black", "#FFFFFF", config.Game.SCREEN_WIDTH / 2, 220, true);
            // buttons
            this._restartButton = new objects.Button("restartButton", config.Game.SCREEN_WIDTH / 2, 430, true);
            this._background = new objects.Background();
            this._scoreBoard = new managers.ScoreBoard();
            if (this._scoreBoard.HighScore <= config.Game.SCORE)
                this._scoreBoard.HighScore = config.Game.SCORE;
            this.Main();
        };
        End.prototype.Update = function () {
            this._background.Update();
        };
        End.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._gameOverLabel);
            this.addChild(this._restartButton);
            this._restartButton.on("click", function () {
                config.Game.LIVES = 5;
                config.Game.SCORE = 0;
                config.Game.SCENE = scenes.State.PLAY;
            });
            this.addChild(this._scoreBoard.highScoreLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._scoreBoard.LivesLabel);
        };
        End.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map