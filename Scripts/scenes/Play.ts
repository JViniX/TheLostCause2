module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _jumpButton: objects.Button;
        private _background?: objects.Background;
        private _player?: objects.Player;
        private _island?: objects.Island;
        private _island2?: objects.Island;
        private _island3?: objects.Island;

        // private _clouds: Array<objects.Cloud>;

        private _scoreBoard: managers.ScoreBoard;
        private _bulletManager: managers.Bullet;
        private _keyboardManager: managers.Keyboard;


        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
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
        }        
        
        public Update(): void 
        {
           this._scoreBoard.Update();
            this._background.Update();

            this._player.Update();

            this._bulletManager.Update();

            
            if(createjs.Ticker.getTicks() % 2 == 0)
                this._island.Update();
            
            this._island2.Update();
            this._island3.Update();

            managers.Collision.AABBCheck(this._island, this._player);
            managers.Collision.AABBCheck(this._island2, this._player);
            managers.Collision.AABBCheck(this._island3, this._player);

            if(config.Game.LIVES < 1)
            {
                config.Game.SCENE = scenes.State.END;
            }

        }
        
        public Main(): void 
        {
            this.addChild(this._background);
            
            this.addChild(this._island);
            this.addChild(this._island2);
            this.addChild(this._island3);

            this.addChild(this._player);

            this._bulletManager.AddBulletsToScene(this);

            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);

            this.addChild(this._jumpButton);

            this._jumpButton.on("mousedown", ()=>{
                this._player.Jump(true);
            });

            this._jumpButton.on("click", ()=>{
                this._player.Jump(false);
            });
        }

        public Clean(): void
        {
            //this._player.engineSound.stop();
            this.removeAllChildren();
        }


    }

        
}