class State {
    #id;
    #stateGame
    
	// ELEMENTS 
	#elMainMenu = $('#main-menu');
	#elMainMenu1 = $('#main-menu-1');
	#elMainMenu2 = $('#main-menu-2');
	
    constructor(id) { // CONSTRUCTOR
        this.#id = id;
    }
    
	checkState(persons) { // CHECKING THE STATUS
		var countLife = 0, i;
        for (i = 0; i < persons.length; i++) {
			if (i === this.#id) {
				if (persons[i].getHP() < 1) {
					this.#stateGame = 1;
				}
			} else {
				if (persons[i].getCls() != persons[this.#id].getCls()) {
					if (persons[i].getHP() > 0) {
						countLife++;
					}
				}
			}
        }
		if(countLife === 0) {
			this.#stateGame = 2;
		}
		if(this.#stateGame !==0 ) {
			this.#releaseState();
		}
		return this.#stateGame;
	}

	#releaseState() { // STATE APPLICATION
		this.#elMainMenu.css('display', 'block');
		switch(this.#stateGame) {
			case 1:
				this.#elMainMenu1.css('display', 'block');
				break;
			case 2:
				this.#elMainMenu2.css('display', 'block');
				break;
			default:
				this.#elMainMenu.css('display', 'none');
				break;
		}
	}    
}