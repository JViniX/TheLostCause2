module objects
{
    export class Background extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _Speed?:number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.BACKGROUND_ATLAS, "background");

            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            if(this.x <= -853)
            {
                this.Reset();
            }
        }       
        
        private _move():void
        {
            this.position = Vector2.subtract(this.position, this.velocity);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.OCEAN;
            this._Speed = 2; // 5 px per frame
            this.velocity = new Vector2(this._Speed, 0);
            this.Reset();
        }
        
        public Update(): void 
        {
            this._move();
            this._checkBounds();
        }
        
        public Reset(): void 
        {
            this.position = new Vector2(0, 0);
        }

        
    }
}