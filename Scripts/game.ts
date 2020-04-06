//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let currentSceneState:scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;

    let textureAtlas: createjs.SpriteSheet;
    let backAtlas: createjs.SpriteSheet;
    let playerAtlas: createjs.SpriteSheet;
    let assetsAtlas: createjs.SpriteSheet;

    let assetManifest = 
    [
        {id:"background", src:"./Assets/images/background.png"},
        {id:"assets", src:"./Assets/sprites/Assets.png"},
        {id:"ocean", src:"./Assets/images/ocean.gif"},
        {id:"atlas", src:"./Assets/sprites/atlas.png"},
        {id:"she", src:"./Assets/sprites/She2.png"},
        {id:"engine", src:"./Assets/audio/engine.ogg"},
        {id:"yay", src:"./Assets/audio/yay.ogg"},
        {id:"thunder", src:"./Assets/audio/thunder.ogg"}
    ];

    let spriteData =
    {

        "images": {},
        "frames": [
            [1, 1, 16, 16, 0, 0, 0],
            [19, 1, 150, 50, 0, 0, 0],
            [1, 53, 226, 178, 0, 0, 0],
            [229, 53, 62, 63, 0, 0, 0],
            [1, 233, 65, 65, 0, 0, 0],
            [68, 233, 65, 65, 0, 0, 0],
            [135, 233, 65, 65, 0, 0, 0],
            [202, 233, 65, 65, 0, 0, 0],
            [1, 300, 150, 50, 0, 0, 0],
            [153, 300, 150, 50, 0, 0, 0]
        ],
        
        "animations": {
            "bullet": { "frames": [0] },
            "button": { "frames": [1] },
            "cloud": { "frames": [2] },
            "island": { "frames": [3] },
            "placeholder": { "frames": [4] },
            "plane": { 
                "frames": [5, 6, 7],
                "speed": 0.5 
                    },
            "restartButton": { "frames": [8] },
            "startButton": { "frames": [9] }
        }
        
    };
    
    let playerData = 
    {

        "images": {},
        
        //"framerate": 20,
        "frames": [
            [1, 1, 151, 184, 0, 0, 0],
            [154, 1, 150, 184, 0, 0, 0],
            [306, 1, 148, 184, 0, 0, 0],
            [456, 1, 148, 184, 0, 0, 0],
            [606, 1, 151, 183, 0, 0, 0],
            [759, 1, 149, 183, 0, 0, 0],
            [910, 1, 146, 181, 0, 0, 0],
            [1058, 1, 151, 180, 0, 0, 0],
            [1211, 1, 145, 177, 0, 0, 0],
            [1358, 1, 143, 169, 0, 0, 0]
        ],
        
        "animations": {
            "walk": { 
                "frames": [0, 1, 2, 3, 4, 5, 7],
                "speed" : 0.2
                        },
            "jump": { "frames": [6, 8, 9] ,
                        "speed" : 0.1
                    }
        }
        
    };

    let assetsData = 
    {
        "images": {},
        
        //"framerate": 20,
        "frames": [
            [1, 1, 448, 63, 0, 0, 0],
            [1, 66, 188, 46, 0, 0, 0],
            [343, 66, 125, 46, 0, 0, 0],
            [451, 1, 150, 50, 0, 0, 0],
            [191, 66, 150, 50, 0, 0, 0],
            [603, 1, 64, 64, 0, 0, 0],
            [470, 53, 64, 63, 0, 0, 0],
            [536, 53, 63, 63, 0, 0, 0],
            [669, 1, 40, 40, 0, 0, 0],
            [601, 67, 40, 40, 0, 0, 0],
            [643, 67, 40, 40, 0, 0, 0],
            [685, 43, 35, 40, 0, 0, 0],
            [685, 85, 16, 16, 0, 0, 0],
            [711, 1, 13, 13, 0, 0, 0]
        ],
        
        "animations": {
            "platbase": { "frames": [0] },
            "plat3": { "frames": [1] },
            "plat2": { "frames": [2] },
            "restartButton": { "frames": [3] },
            "startButton": { "frames": [4] },
            "Box": { "frames": [5] },
            "Stone": { "frames": [6] },
            "Acid": { "frames": [7] },
            "haste-fire": { "frames": [8] },
            "haste-sky": { "frames": [9] },
            "mine": { "frames": [10] },
            "ship3": { "frames": [11] },
            "bulletBlue": { "frames": [12] },
            "btnWhite": { "frames": [13] }
        },
    }


    let backData = 
    {
        "images": {},
        "frames": [
            [0, 0, 1702, 640, 0, 0, 0],
        ],
        "animations": {
            "ocean": { "frames": [0] },
        }
    }


    function Preload():void
    {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);

        spriteData.images = [assets.getResult("atlas")];
        textureAtlas = new createjs.SpriteSheet(spriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;

        backData.images = [assets.getResult("background")];
        backAtlas = new createjs.SpriteSheet(backData);
        config.Game.BACKGROUND_ATLAS = backAtlas;

        playerData.images = [assets.getResult("she")];
        playerAtlas = new createjs.SpriteSheet(playerData);
        config.Game.SPRITEPLAYER = playerAtlas;

        assetsData.images = [assets.getResult("assets")];
        assetsAtlas = new createjs.SpriteSheet(assetsData);
        config.Game.SPRITEASSETS = assetsAtlas;
        
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update():void
    {
        if(currentSceneState != config.Game.SCENE)
        {
            Main();
        }

        currentScene.Update();
        


        stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Scene Switched...`, "color: green; font-size: 16px;");

        // clean up
        if(currentSceneState != scenes.State.NO_SCENE)
        {
            currentScene.Clean();
            stage.removeAllChildren();
        }

        // switch to the new scene

        switch(config.Game.SCENE)
        {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start(); 
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play(); 
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End(); 
                break;
        }

        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);

    }

    window.addEventListener('load', Preload);


})();