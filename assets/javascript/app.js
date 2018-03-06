

/** Figher Class */
const data = [
     {'name': 'Obi-Wan', 'img': 'obi-wan.jpg', 'hp': 120, 'atack': 5,  'counter' : 15 },
     {'name': 'Luke', 'img': 'luke.jpg', 'hp': 100, 'atack': 25,  'counter' : 5 }
];

const fighter = function (){
    this.name = null;
    this.img = null;
    this.hp = null;
    this.atack = null;
    this.baseAttack = null;
    this.counter = null;
}

fighter.prototype.create = function(fighterBio) {
    this.name = fighterBio.name;
    this.img = fighterBio.img;
    this.hp = fighterBio.hp;
    this.atack = fighterBio.atack;
    this.baseAttack = fighterBio.atack;
    this.counter = fighterBio.counter;
}

fighter.prototype.increaseAttack = function() {
    this.atack = this.atack + this.baseAttack;
}

fighter.prototype.takeDammage = function(dammge){
    this.hp = this.hp - dammage;
}



