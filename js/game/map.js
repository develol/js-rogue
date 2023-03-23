class Map {
    #sizeX;
    #sizeY;
    #map    = [];
    #types  = ['tileW', 'tileP', 'tileE', 'tileSW', 'tileHP'];
    #random = new Random();

    constructor(sizeX, sizeY) { // КОНСТРУКТОР
        this.#sizeX = sizeX;
        this.#sizeY = sizeY;
    }
    
    getSizeX() { // ГЕТТЕР РАЗМЕРА ПО Х
        return this.#sizeX;
    }
    
    getSizeY() { // ГЕТТЕР РАЗМЕРА ПО Y
        return this.#sizeY;
    }
    
    getMap() { // ГЕТТЕР МАССИВА КАРТЫ
        return this.#map;
    }
    
    createMap(minSassage, maxSassage, tileSize) { // СОЗДАНИЕ КАРТЫ
        var x, y, i;
        var wall,
            countSassageX = Math.floor(this.#sizeX / (this.#random.integer(minSassage, maxSassage))),
            countSassageY = Math.floor(this.#sizeY / (this.#random.integer(minSassage, maxSassage)));
        for (x = 0; x < this.#sizeX; x++) {
            this.#map[x] = [];
            for (y = 0; y < this.#sizeY; y++) {
                if (
					((x % countSassageX === 0) && (x !== 0) && (x !== this.#sizeX)) || 
					((y % countSassageY === 0) && (y !== 0) && (y !== this.#sizeY))
				) {
                    this.#map[x][y] = 0;
                } else {
                    this.#map[x][y] = 1;
                }

                if (this.#map[x][y] === 1) {
                    wall = 'tileW';
                }
                $('<div>', {
                        class: 'tile ' + wall,
                        id: 'tile_' + x + '_' + y
                    }).css('left', (x * tileSize) + 'px')
                    .css('top', (y * tileSize) + 'px')
                    .appendTo('.field');
                wall = '';
            }
        }        
    }
    
    createRooms(minRoomSize, maxRoomSize, minRoomCount, maxRoomCount) { // СОЗДАНИЕ КОМНАТ
        var x, y, i;
        var roomCount = this.#random.integer(minRoomCount, maxRoomCount),
			roomSizeX,
            roomSizeY,
            cornerRoomX,
            cornerRoomY;
        for (i = 0; i < roomCount; i++) {
            roomSizeX   = this.#random.integer(minRoomSize, maxRoomSize);
            roomSizeY   = this.#random.integer(minRoomSize, maxRoomSize);
            cornerRoomX = this.#random.integer(1, this.#sizeX - roomSizeX);
            cornerRoomY = this.#random.integer(1, this.#sizeY - roomSizeY);
            for (x = 0; x < roomSizeX; x++) {
                for (y = 0; y < roomSizeY; y++) {
                    this.changeTile((cornerRoomX + x), (cornerRoomY + y), 0);
                }
            }
        }        
    }

    changeTile(x, y, type) { // УСТАНОВКА КЛЕТКИ
        this.#map[x][y] = type;
        $('#tile_' + x + '_' + y).removeClass();
        $('#tile_' + x + '_' + y).addClass('tile');
        if (type != 0) {
            $('#tile_' + x + '_' + y).addClass(this.#types[type - 1]);
        }
    }
    
    movingTile(oldX, oldY, newX, newY) { // ПЕРЕМЕЩЕНИЕ КЛЕТКИ
        this.#map[newX][newY] = this.#map[oldX][oldY];
        $('#tile_' + (newX) + '_' + (newY)).html(
            $('#tile_' + (oldX) + '_' + (oldY)).html()
        );
        $('#tile_' + (oldX) + '_' + (oldY)).html('');
        this.#map[oldX][oldY] = 0;
        this.changeTile(oldX, oldY, 0);
        this.changeTile(newX, newY, this.#map[newX][newY]);
    }
    
    randomTile() { // ПОЛУЧЕНИЕ СЛУЧАЙНОЙ СВОБОДНОЙ КЛЕТКИ
        var x, y;
        x = this.#random.integer(0, this.#sizeX - 1);
        y = this.#random.integer(0, this.#sizeY - 1);
        if (this.#map[x][y] === 0) {
            return [x, y];
        } else {
            return this.randomTile();
        }
    }
}