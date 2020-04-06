module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _welcomeLabel: objects.Label;
        private _startLabel: objects.Label;
        private _startButton: objects.Button;
        //private _ocean?: objects.Ocean;
        private _background?: objects.Background;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Start(): void 
        {
             //instantiate a new Text object
            this._welcomeLabel = new objects.Label("The Lost Cause 2", "60px", "Arial Black", "#FFFFFF", config.Game.SCREEN_WIDTH/2, 220, true);
            this._startLabel = new objects.Label("Click or Touch to Start", "40px", "Arial", "#FFFFFF", config.Game.SCREEN_WIDTH/2, config.Game.SCREEN_HEIGHT/2, true);
            // buttons
            this._startButton = new objects.Button("btnWhite", 0, 0, true, true);
            this._startButton.alpha = 0.01;
            this._startButton.scaleX = config.Game.SCREEN_WIDTH;
            this._startButton.scaleY = config.Game.SCREEN_HEIGHT;

             //this._ocean = new objects.Ocean();
            this._background = new objects.Background();
            this.Main();
        }        
        
        public Update(): void 
        {
           //this._ocean.Update();
           this._background.Update();
        }
        
        public Main(): void 
        {
            //this.addChild(this._ocean);
            this.addChild(this._background);
       
            this.addChild(this._welcomeLabel);
            this.addChild(this._startLabel);

        
            this.addChild(this._startButton);

            this._startButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY;
            });

        }

        public Clean(): void{
            this.removeAllChildren();
        }

        
    }
}