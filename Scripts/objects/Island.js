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
    var Island = /** @class */ (function (_super) {
        __extends(Island, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Island(spriteName, resetable) {
            var _this = _super.call(this, config.Game.SPRITEASSETS, spriteName, new objects.Vector2(), true) || this;
            _this._resetable = resetable;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Island.prototype._checkBounds = function () {
            // if(this.y >= config.Game.SCREEN_HEIGHT + this.height)
            if (this.x <= -this.width && this._resetable) {
                this.Reset();
            }
        };
        Island.prototype._move = function () {
            // if(this.x >= - this.width)
            this.position = objects.Vector2.subtract(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Island.prototype.Start = function () {
            this.type = enums.GameObjectType.ISLAND;
            this._Speed = 5; // 5 px per frame
            this.velocity = new objects.Vector2(this._Speed, 0);
            this.Reset();
        };
        Island.prototype.Update = function () {
            // console.log(this.position);
            this._move();
            this._checkBounds();
        };
        Island.prototype.Reset = function () {
            var randomX = util.Mathf.RandomRange(config.Game.SCREEN_HEIGHT / 2, config.Game.SCREEN_HEIGHT);
            this.position = new objects.Vector2(config.Game.SCREEN_WIDTH + 200, randomX);
        };
        return Island;
    }(objects.GameObject));
    objects.Island = Island;
})(objects || (objects = {}));
//# sourceMappingURL=Island.js.map