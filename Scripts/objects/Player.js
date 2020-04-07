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
var objects;
(function (objects) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // CONSTRUCTOR
        function Player() {
            var _this = _super.call(this, config.Game.SPRITEPLAYER, "walk", 0, 0, true) || this;
            _this._jumps = 3;
            _this._hightLimiteJump = 10;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Player.prototype, "engineSound", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._engineSound;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Player.prototype._checkBounds = function () {
            // Top boundary
            if (this.position.y <= this.halfHeight) {
                this.position = new objects.Vector2(this.position.x, this.halfHeight);
            }
            // Botton boundary
            if (this.position.y >= config.Game.SCREEN_HEIGHT) {
                this._onGround = true;
                if (createjs.Ticker.getTicks() % 50 == 0) {
                    config.Game.LIVES = config.Game.LIVES - 1;
                }
            }
        };
        Player.prototype._move = function () {
            if (createjs.Ticker.getTicks() % 3 == 1) {
                if (this._isJumping && this._hightLimiteJump >= 0 && this._jumps > 0) {
                    this._hightLimiteJump = this._hightLimiteJump - 1;
                    this.position = objects.Vector2.subtract(this.position, this.velocity);
                }
                else {
                    // Gravity atraction
                    if (!this._onGround) {
                        this.position = objects.Vector2.add(this.position, this.velocity);
                        this.gotoAndPlay("walk");
                    }
                }
            }
        };
        // PUBLIC METHODS
        Player.prototype.Jump = function (jump) {
            this._isJumping = jump;
            if (jump) {
                this._onGround = false;
                this.gotoAndPlay("jump");
            }
            else {
                this._hightLimiteJump = 10;
                this._jumps = this._jumps - 1; //Mouse was released;
            }
        };
        Player.prototype.Start = function () {
            this.type = enums.GameObjectType.PLANE;
            this._horizontalPosition = 200; // locked to the bottom of the screen
            //this._engineSound = createjs.Sound.play("engine");
            // this._engineSound.loop = -1; // loop forever
            // this._engineSound.volume = 0.1; // 10% volume
            this._verticalSpeed = 12;
            this._isJumping = false;
            this._onGround = false;
            this.position = new objects.Vector2(this._horizontalPosition, 250);
            this.velocity = new objects.Vector2(0, this._verticalSpeed);
        };
        Player.prototype.Update = function () {
            if (this.isColliding) {
                this._jumps = 3;
                this._onGround = true;
            }
            else {
                this._onGround = false;
            }
            this._move();
            this._checkBounds();
            // fire bullets every 10 frames
            // if(createjs.Ticker.getTicks() % 10 == 0)
            // {
            //     config.Game.SCORE = config.Game.SCORE + 1;
            // if(config.Game.KEYBOARD_MANAGER.Fire)
            // {
            //     this.FireBullets();
            // }
            // }
        };
        Player.prototype.Reset = function () {
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map