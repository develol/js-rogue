class Game {
	#koef = 1;
    
    constructor(koef) { // КЛАСС
        this.#koef = koef;
    }
    
    // ЭКЗЕМПЛЯРЫ КЛАССОВ
    #AI;
    #map;
    #item;
    #state;
    #random;
    #persons;
    
	// КОНФИГУРАЦИЯ
    #sizeX; // количество клеток по X
    #sizeY; // количество клеток по Y
	#tileSize; // размер клетки
	#enemyCount; // количество врагов
	#swordCount; // количество мечей
	#minSassage; // мин. кол-во проходов
	#maxSassage; // макс. кол-во проходов
	#minRoomSize; // мин. размер комнаты
	#maxRoomSize; // макс. размер комнаты
	#minRoomCount; // мин. кол-во комнат
	#maxRoomCount; // макс. кол-во комнат
	#healthpointCount; // количество зелий
	#playerId; // Идентификатор игрока

	// ЭЛЕМЕНТЫ 
	#elGameMap = $('#game-map');
	#elTileStyle = $('#tile-style');
	
    init() { // ИНИЦИАЛИЗАЦИЯ
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
		
		this.#map.createMap( // СОЗДАНИЕ КАРТЫ
		    this.#minSassage, 
		    this.#maxSassage, 
		    this.#tileSize
		);
		
		this.#map.createRooms( // СОЗДАНИЕ КОМНАТ
		    this.#minRoomSize, 
		    this.#maxRoomSize, 
		    this.#minRoomCount, 
		    this.#maxRoomCount
		);
        
        this.#persons[this.#playerId] = new Person(this.#map, 2); // СОЗДАНИЕ ИГРОКА
        
        for (var i = 0; i < this.#enemyCount; i++) { // СОЗДАНИЕ ВРАГОВ
			this.#persons[i+1] = new Person(this.#map, 3);
        }
        
        for (var i = 0; i < this.#swordCount; i++) { // СОЗДАНИЕ МЕЧЕЙ
            this.#item.createItemOnMap(this.#map, 4);
        }
		
        for (var i = 0; i < this.#healthpointCount; i++) { // СОЗДАНИЕ ЗЕЛИЙ
            this.#item.createItemOnMap(this.#map, 5);
        }
    }

    playerAttack() { // АТАКА ИГРОКА
        this.#persons[this.#playerId].personAttack(this.#persons, this.#playerId);
    }

    playerUp() { // ШАГ ИГРОКА ВВЕРХ
        this.#persons[this.#playerId].personMoving(0, -1);
    }

    playerDown() { // ШАГ ИГРОКА ВНИЗ
        this.#persons[this.#playerId].personMoving(0, 1);
    }

    playerLeft() { // ШАГ ИГРОКА ВЛЕВО
        this.#persons[this.#playerId].personMoving(-1, 0);
    }

    playerRight() { // ШАГ ИГРОКА ВПРАВО
        this.#persons[this.#playerId].personMoving(1, 0);
    }

    stepAI() { // ШАГ ВРАГОВ (ИИ)
        this.#AI.stepAI(this.#persons, this.#playerId);
    }

    checkState() { // ПРОВЕРКА СОСТОЯНИЯ
        this.#state.checkState(this.#persons);
    }
}