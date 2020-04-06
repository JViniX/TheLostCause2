module objects
{
    export class Island extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _Speed?:number;
        private _resetable: boolean;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor(spriteName: string, resetable:boolean)
        {
            super(config.Game.SPRITEASSETS, spriteName, new Vector2(), true);
            this._resetable = resetable;
            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            // if(this.y >= config.Game.SCREEN_HEIGHT + this.height)
            if(this.x <= - this.width && this._resetable)
            {
                this.Reset();
            }
        }       
        
        private _move():void
        {
            // if(this.x >= - this.width)
                this.position = Vector2.subtract(this.position, this.velocity);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.ISLAND;
            this._Speed = 5; // 5 px per frame
            this.velocity = new Vector2(this._Speed, 0);
            this.Reset();
        }
        
        public Update(): void 
        {
            // console.log(this.position);
            this._move();
            this._checkBounds();
        }
        
        public Reset(): void 
        {
            let randomX = util.Mathf.RandomRange(config.Game.SCREEN_HEIGHT / 2, config.Game.SCREEN_HEIGHT );
            this.position = new Vector2(config.Game.SCREEN_WIDTH + 200, randomX);
        }

        
    }
}