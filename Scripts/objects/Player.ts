module objects
{
    export class Player extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        //private _verticalPosition:number;
        private _horizontalPosition:number;
        private _engineSound : createjs.AbstractSoundInstance;
        private _bulletSpawn: objects.Vector2;
        private _verticalSpeed: number;
        private _isJumping: boolean;
        private _onGround: boolean;
        
        // PUBLIC PROPERTIES
        public get engineSound() : createjs.AbstractSoundInstance 
        {
            return this._engineSound;
        }

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.SPRITEPLAYER, "walk", 0, 0, true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            // Top boundary
            if(this.position.y <= this.halfHeight)
            {
                this.position = new Vector2(this.position.x, this.halfHeight );
            }

            // Botton boundary
            if(this.position.y >= config.Game.SCREEN_HEIGHT)
            {
                this._onGround = true;
                if(createjs.Ticker.getTicks() % 50 == 0)
                {
                    config.Game.LIVES = config.Game.LIVES - 1;
                }
                //this.position = new Vector2(this.position.x, config.Game.SCREEN_HEIGHT);
            }
        }        

        private _jumps = 3;
        private _hightLimiteJump: number = 10;
        private _move():void
        {
            if(createjs.Ticker.getTicks() % 3 == 1)
            {
                if(this._isJumping && this._hightLimiteJump >= 0 && this._jumps >= 0) 
                {
                    this._hightLimiteJump = this._hightLimiteJump - 1;
                    this.position = Vector2.subtract(this.position, this.velocity);
                }
                else{
                    // Gravity atraction
                    if(!this._onGround){
                        this.position = Vector2.add(this.position, this.velocity);
                        this.gotoAndPlay("walk");
                    }
                }
            }
        }

        // PUBLIC METHODS
        public Jump(jump: boolean): void
        {
            this._onGround = false;
            this._isJumping = jump;
            if(jump) 
            {
                this.gotoAndPlay("jump");
            }else{
                this._hightLimiteJump = 10;
                this._jumps = this._jumps - 1; //Mouse was released;
            }
        }      
        
        public Start(): void 
        {
            this.type = enums.GameObjectType.PLANE;
            this._horizontalPosition = 200; // locked to the bottom of the screen
            //this._engineSound = createjs.Sound.play("engine");
            // this._engineSound.loop = -1; // loop forever
            // this._engineSound.volume = 0.1; // 10% volume
            this._verticalSpeed = 12;
            this.position = new objects.Vector2(this._horizontalPosition, 250);
            this.velocity = new Vector2(0, this._verticalSpeed);
        }


        public Update(): void 
        {

            if(this.isColliding) {
                
                this._jumps = 3;
                this._onGround = true;
            }
            else 
            {
                this._onGround = false;
            }
            this._move();  
            this._checkBounds();
            
            // fire bullets every 10 frames
            if(createjs.Ticker.getTicks() % 10 == 0)
            {
                config.Game.SCORE = config.Game.SCORE + 1;
                // if(config.Game.KEYBOARD_MANAGER.Fire)
                // {
                //     this.FireBullets();
                // }
            }
            
        }

        public Reset(): void 
        {

        }

        public FireBullets(): void
        {
            let bullet = config.Game.BULLET_MANAGER.GetBullet();
            bullet.position = this._bulletSpawn;
        }
        
    }
}