class Person {
    #x;
    #y;
    #hp;
    #wp;
    #cls;
    
    #map;
	#baseHealth = 100; // базавое здоровье
	#baseWeapon = 10; // базавая атака
	#imbaWeapon = this.#baseWeapon * 2; // атака с мечом
    
    #audioHP    = new Audio('./audio/hp.mp3');
    #audioImba  = new Audio('./audio/imba.mp3');
    #audioAtack = new Audio('./audio/atack.mp3');
    #audioDeath = new Audio('./audio/death.mp3');
    
    constructor(map, cls) { // КОНСТРУКТОР
        this.#map = map;
        this.personCreate(cls);
    }   
    
    getX() { // ГЕТТЕР Х-КОАРДИНАТЫ
        return this.#x;
    }
    
    getY() { // ГЕТТЕР Y-КОАРДИНАТЫ
        return this.#y;
    }
    
    getHP() { // ГЕТТЕР ЗДОРОВЬЯ
        return this.#hp;
    }
    
    getWP() { // ГЕТТЕР АТАКИ
        return this.#wp;
    }
    
    getCls() { // ГЕТТЕР КЛАССА
        return this.#cls;
    }
    
	personCreate(cls) { // СОЗДАНИЕ АКТЕРОВ
		var personXY = this.#map.randomTile();
        this.#x = personXY[0];
        this.#y = personXY[1];
        this.#cls = cls;
        this.#map.changeTile(personXY[0], personXY[1], cls);
        this.changeHP(this.#baseHealth);
        this.changeWP(this.#baseWeapon);
	}  
	
    changeHP(hp) { // УСТАНОВКА ЗДОРОВЬЯ
        if (hp < 1) {
            this.#hp = 0;
            this.#wp = 0;
            this.#map.changeTile(this.#x, this.#y, 0);
            $('#tile_' + this.#x + '_' + this.#y).html('');
            this.#audioDeath.play();
        } else {
            if(typeof this.#hp !== 'undefined'){
                if(this.#hp < hp){
                    this.#audioHP.play();
                }
            }
			this.#hp = hp;
			this.#personBar();
			
        }
    }

    changeWP(wp) { // УСТАНОВКА АТАКИ
        if(typeof this.#wp !== 'undefined'){
            if(this.#wp < wp){
                this.#audioImba.play();
            }
        }
        this.#wp = wp;
		this.#personBar();
    }
    
	#personBar() { // ОБНОВЛЕНИЕ БАРА ЗДОРОВЬЯ
		$('#tile_' + this.#x + '_' + this.#y).html('');
		var imba = '';
		if(this.#wp > this.#baseWeapon){
			imba = 'imba';
		}
        $('<div>', {
            class: 'health ' + imba
        }).css('width', this.#hp + '%')
          .appendTo('#tile_' + this.#x + '_' + this.#y);
	}
	
    personMoving(x, y) { // ПЕРЕМЕЩЕНИЕ ПЕРСОНАЖА
        if (this.#hp > 0) {
			var preStepType;
			if (this.#x + x < 0) {
				preStepType = this.#map.getMap()[this.#map.getSizeX() - 1][this.#y + y];
				if ((preStepType < 1) || (preStepType > 3)) {
					x = this.#map.getSizeX() - 1;
				} else {
					return false;
				}
            }
			if (this.#x + x > this.#map.getSizeX() - 1) {
				preStepType = this.#map.getMap()[0][this.#y + y];
				if ((preStepType < 1) || (preStepType > 3)) {
					x = -(this.#map.getSizeX() - 1);
				} else {
					return false;
				}
            }	
			if (this.#y + y < 0) {
				preStepType = this.#map.getMap()[this.#x + x][this.#map.getSizeY() - 1];
				if ((preStepType < 1) || (preStepType > 3)) {
					y = this.#map.getSizeY() - 1;
				} else {
					return false;
				}
            }
			if (this.#y + y > this.#map.getSizeY() - 1) {
				preStepType = this.#map.getMap()[this.#x + x][0];
				if ((preStepType < 1) || (preStepType > 3)) {
					y = -(this.#map.getSizeY() - 1);
				} else {
					return false;
				}
            }				
            var stepType = this.#map.getMap()[this.#x + x][this.#y + y];
            if ((stepType < 1) || (stepType > 3)) {
                if (stepType === 4) {
                    this.changeWP(this.#imbaWeapon)
                }
                if (stepType === 5) {
                    this.changeHP(this.#baseHealth);
                }
                this.#map.movingTile(this.#x, this.#y, (this.#x + x), (this.#y + y));
                this.#y = this.#y + y;
                this.#x = this.#x + x;
                return true;
            }
        }
        return false;
    }
    
    personAttack(persons, id) { // АТАКА ПЕРСОНАЖА
        var x, y, i, 
            atack = false;
        if (this.#hp > 0) {
            for (x = this.#x - 1; x < this.#x + 2; x++) {
                for (y = this.#y - 1; y < this.#y + 2; y++) {
                    for (i = 0; i < persons.length; ++i) {
                        if (persons[i] != this) {
                            if (persons[i].getCls() != this.#cls) {
                                if ((persons[i].getX() == x) && (persons[i].getY() == y)) {
                                    if (persons[i].getHP() > 0) {
                                        persons[i].changeHP(persons[i].getHP() - this.#wp);
                                        atack = true;
                                        this.#audioAtack.play();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if(atack) {
            return true;
        } else {
            return false;
        }
    }
}