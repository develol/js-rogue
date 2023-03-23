class AI {
    #random = new Random();
    
    #movingAI(person, player) { // MOVING THE ENEMY (AI)
        var x = 0,
			y = 0;
        if (player.getX() < person.getX()) {x = -1;}
        if (player.getX() > person.getX()) {x =  1;}
        if (player.getY() < person.getY()) {y = -1;}
        if (player.getY() > person.getY()) {y =  1;}
        if (!person.personMoving(x, y)) {
            person.personMoving(this.#random.integer(-1, 1), this.#random.integer(-1, 1));
        }
    }

    stepAI(persons, player) { // STEP ENEMIES (AI)
        var i;
        for (i = 0; i < persons.length; i++) {
			if (persons[i].getCls() != 2) {
				if (persons[i].getHP() > 0) {
					if (!persons[i].personAttack(persons, i)) {
						this.#movingAI(persons[i], persons[player]);
					}
				}
			}
        }
    }    
}