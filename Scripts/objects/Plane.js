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
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        // CONSTRUCTOR
        function Plane() {
            var _this = _super.call(this, config.Game.SPRITEPLAYER, "walk", 0, 0, true) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Plane.prototype, "engineSound", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._engineSound;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Plane.prototype._checkBounds = function () {
            // Top boundary
            if (this.position.y <= this.halfHeight) {
                this.position = new objects.Vector2(this.position.x, this.halfHeight);
            }
            // Botton boundary
            if (this.position.y >= config.Game.SCREEN_HEIGHT) {
                this._onGround = true;
                //this.position = new Vector2(this.position.x, config.Game.SCREEN_HEIGHT);
            }
        };
        Plane.prototype._move = function () {
            if (createjs.Ticker.getTicks() % 3 == 1) {
                if (this._isJumping) {
                    this.position = objects.Vector2.subtract(this.position, this.velocity);
                }
                else {
                    if (!this._onGround) {
                        this.position = objects.Vector2.add(this.position, this.velocity);
                        this.gotoAndPlay("walk");
                    }
                }
            }
        };
        // PUBLIC METHODS
        Plane.prototype.Jump = function (jump) {
            this._isJumping = jump;
            if (jump)
                this.gotoAndPlay("jump");
            this._onGround = false;
        };
        Plane.prototype.Start = function () {
            this.type = enums.GameObjectType.PLANE;
            this._horizontalPosition = 200; // locked to the bottom of the screen
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1; // loop forever
            this._engineSound.volume = 0.1; // 10% volume
            this._verticalSpeed = 12;
            this.position = new objects.Vector2(this._horizontalPosition, 250);
            this.velocity = new objects.Vector2(0, this._verticalSpeed);
        };
        Plane.prototype.Update = function () {
            this._checkBounds();
            this._move();
            // fire bullets every 10 frames
            if (createjs.Ticker.getTicks() % 2 == 0) {
                if (config.Game.KEYBOARD_MANAGER.Fire) {
                    this.FireBullets();
                }
            }
        };
        Plane.prototype.Reset = function () {
        };
        Plane.prototype.FireBullets = function () {
            var bullet = config.Game.BULLET_MANAGER.GetBullet();
            bullet.position = this._bulletSpawn;
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=Plane.js.map