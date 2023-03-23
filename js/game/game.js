class Game {
	#koef = 1;
    
    constructor(koef) { // CONSTRUCTOR
        this.#koef = koef;
    }
    
    // INSTANCES OF CLASSES
    #AI;
    #map;
    #item;
    #state;
    #random;
    #persons;
    
	// CONFIGURATION
    #sizeX; // number of cells by X
    #sizeY; // number of cells by Y
	#tileSize; // cell size
	#enemyCount; // number of enemies
	#swordCount; // number of swords
	#minSassage; // min. number of roads
	#maxSassage; // max. number of roads
	#minRoomSize; // min. room size
	#maxRoomSize; // max. room size
	#minRoomCount; // min. number of rooms
	#maxRoomCount; // max. number of rooms
	#healthpointCount; // number of potions
	#playerId; // player ID

	// ELEMENTS 
	#elGameMap = $('#game-map');
	#elTileStyle = $('#tile-style');
	
    init() { // INITIALIZATION
        this.#persons = [];
        this.#playerId = 0;
    	this.#tileSize = 32 / this.#koef;
    	this.#enemyCount = 10 * this.#koef;
    	this.#swordCount = 2 * this.#koef;
    	this.#healthpointCount = 10 * this.#koef;
    	this.#minSassage = 3 * this.#koef;
    	this.#maxSassage = 5 * this.#koef;
    	this.#minRoomCount = 5 * this.#koef;
    	this.#maxRoomCount = 10 * this.#koef;
    	this.#minRoomSize = 3 * this.#koef;
    	this.#maxRoomSize = 8 * this.#koef;
	    this.#sizeX = Math.floor(this.#elGameMap.width() / this.#tileSize);
		this.#sizeY = Math.floor(this.#elGameMap.height() / this.#tileSize);

        this.#random = new Random();
        this.#map = new Map(this.#sizeX, this.#sizeY);
	    this.#AI = new AI();
	    this.#state = new State(this.#playerId);
	    this.#item = new Item();
	    
		this.#elTileStyle.remove();
		this.#elGameMap.html('');
		$('head').append('<style id="tile-style" type="text/css">'+
			'.field .tile {'+
				'width: '+this.#tileSize+'px;'+
				'height: '+this.#tileSize+'px;'+
			'}'+
		'</style>');
        
		$('.menu').css('display', 'none');
		$('.menu .elem').css('display', 'none');
		$('body').css('background-size', this.#tileSize+'px')
		
		this.#map.createMap( // CREATING A MAP
		    this.#minSassage, 
		    this.#maxSassage, 
		    this.#tileSize
		);
		
		this.#map.createRooms( // CREATING ROOMS
		    this.#minRoomSize, 
		    this.#maxRoomSize, 
		    this.#minRoomCount, 
		    this.#maxRoomCount
		);
        
        this.#persons[this.#playerId] = new Person(this.#map, 2); // CREATING A PLAYER
        
        for (var i = 0; i < this.#enemyCount; i++) { // CREATING ENEMIES
			this.#persons[i+1] = new Person(this.#map, 3);
        }
        
        for (var i = 0; i < this.#swordCount; i++) { // CREATING SWORDS
            this.#item.createItemOnMap(this.#map, 4);
        }
		
        for (var i = 0; i < this.#healthpointCount; i++) { // CREATING POTIONS
            this.#item.createItemOnMap(this.#map, 5);
        }
    }

    playerAttack() { // PLAYER ATTACK
        this.#persons[this.#playerId].personAttack(this.#persons, this.#playerId);
    }

    playerUp() { // PLAYER'S STEP UP
        this.#persons[this.#playerId].personMoving(0, -1);
    }

    playerDown() { // PLAYER'S STEP DOWN
        this.#persons[this.#playerId].personMoving(0, 1);
    }

    playerLeft() { // PLAYER'S STEP LEFT
        this.#persons[this.#playerId].personMoving(-1, 0);
    }

    playerRight() { // PLAYER'S STEP RIGHT
        this.#persons[this.#playerId].personMoving(1, 0);
    }

    stepAI() { // STEP ENEMIES (AI)
        this.#AI.stepAI(this.#persons, this.#playerId);
    }

    checkState() { // CHECKING THE STATUS
        this.#state.checkState(this.#persons);
    }
}