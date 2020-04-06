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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            this._jumpButton = new objects.Button("btnWhite", 0, 0, true, true);
            this._jumpButton.alpha = 0.01;
            this._jumpButton.scaleX = config.Game.SCREEN_WIDTH;
            this._jumpButton.scaleY = config.Game.SCREEN_HEIGHT;
            this._background = new objects.Background();
            this._player = new objects.Player();
            this._island = new objects.Island("plat2", true);
            this._island2 = new objects.Island("plat2", true);
            this._island3 = new objects.Island("plat3", true);
            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;
            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;
            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;
            this.Main();
        };
        Play.prototype.Update = function () {
            this._scoreBoard.Update();
            this._background.Update();
            this._player.Update();
            this._bulletManager.Update();
            if (createjs.Ticker.getTicks() % 2 == 0)
                this._island.Update();
            this._island2.Update();
            this._island3.Update();
            managers.Collision.AABBCheck(this._island, this._player);
            managers.Collision.AABBCheck(this._island2, this._player);
            managers.Collision.AABBCheck(this._island3, this._player);
            if (config.Game.LIVES < 1) {
                config.Game.SCENE = scenes.State.END;
            }
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._background);
            this.addChild(this._island);
            this.addChild(this._island2);
            this.addChild(this._island3);
            this.addChild(this._player);
            this._bulletManager.AddBulletsToScene(this);
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._jumpButton);
            this._jumpButton.on("mousedown", function () {
                _this._player.Jump(true);
            });
            this._jumpButton.on("click", function () {
                _this._player.Jump(false);
            });
        };
        Play.prototype.Clean = function () {
            //this._player.engineSound.stop();
            this.removeAllChildren();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map