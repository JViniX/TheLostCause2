module objects
{
    export class Button extends GameObject
    {
        
        // constructor
        constructor(button_name:string = "button", x:number = 0, y:number= 0, isCentered:boolean = false, touchScreen: boolean = false)
        {
            super(config.Game.SPRITEASSETS, button_name, x, y, isCentered);

            if(!touchScreen)
            {
                this.on("mouseover", this.MouseOver);
                this.on("mouseout", this.MouseOut);
            }

            this.Start();
        }
        
        // PRIVATE METHODS
        protected _checkBounds(): void {
            
        }

        // PUBLIC METHODS
        MouseOver():void
        {
            this.alpha = 0.7;
        }

        MouseOut():void
        {
            this.alpha = 1.0;
        }

        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        public Start(): void {
            this.type = enums.GameObjectType.BUTTON;
        }

        public Update(): void {
            
        }

        public Reset(): void {
            
        }
    }
}