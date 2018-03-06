const BattleSystem = function (attacker, defender) {
    // confrim attackher and defender are part of the Fighter Class
    if(   !(attacker instanceof Fighter) ||  !(defender instanceof Fighter)  ){
        console.error('failure to instantiate Class');
        return
    }

    alert(`${attacker.name}  Challages ${defender.name}`);
    console.log(defender);
    defender.takeDammage(attacker.atack);
    alert(`${attacker.name}  dose ${attacker.atack} dammge to ${defender.name}, ${defender.name} has ${defender.hp}Hp left `);
    attacker.increaseAttack();
    alert(`${attacker.name}  battle enrages and gains ${attacker.baseAttack} and now has ${attacker.atack}`);
    attacker.takeDammage(defender.counter);
    alert(`${defender.name} counter attacks and dose ${defender.counter} and now ${attacker.name} has ${attacker.hp}Hp left  `)
    
    
}

/** Figher Class */
const data = [
     {'name': 'Obi-Wan', 'img': 'obi-wan.jpg', 'hp': 120, 'atack': 5,  'counter' : 15 },
     {'name': 'Luke', 'img': 'luke.jpg', 'hp': 100, 'atack': 25,  'counter' : 5 }
];

const Fighter = function (){
    this.name = null;
    this.img = null;
    this.hp = null;
    this.atack = null;
    this.baseAttack = null;
    this.counter = null;
}

Fighter.prototype.create = function(fighterBio) {
    this.name = fighterBio.name;
    this.img = fighterBio.img;
    this.hp = fighterBio.hp;
    this.atack = fighterBio.atack;
    this.baseAttack = fighterBio.atack;
    this.counter = fighterBio.counter;
}

Fighter.prototype.increaseAttack = function() {
    this.atack = this.atack + this.baseAttack;
}

Fighter.prototype.takeDammage = function(dammage){
    this.hp = this.hp - dammage;
}


const obi = new Fighter();
const luke = new Fighter();
obi.create(data[0]);
luke.create(data[1]);


BattleSystem(obi , luke);
BattleSystem(obi , luke);
BattleSystem(obi , luke);
BattleSystem(obi , luke);
BattleSystem(obi , luke);
BattleSystem(obi , luke);