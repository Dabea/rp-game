const fighterView = function (fighter){
    console.log(fighter);
    const fighterTemplate = `<div class="panel fighter-js">
    <div class="panel-head">${fighter.name}</div> 
    <div class="panel-body"><img class="panel-image" src="./assets/img/${fighter.img}" alt="">
        <div>Hp: ${fighter.hp}</div>
        <div>Attack: ${fighter.attack}</div>
        <div>Faction: ${fighter.faction}</div>
    </div>
</div>`;
$('.player-select').append(fighterTemplate);
}

const RpGame = function() {
    this.chosenPlayer = null;
    this.opponet = null;
    this.fighterCollection = [];
    this.generateFighterCollection();
    this.fighterCollection
   
}

RpGame.prototype.generateFighterCollection = function (){
    for(let i = 0; i < data.length; i++){
        let fighter = new Fighter();
        fighter.create(data[i]);
        fighterView(fighter);
        this.fighterCollection.push(fighter);
    }

    const findIndex = this.fighterCollection.findIndex(function(key){
        console.log(key.name);
        return key.name === '';
    })
    console.log(findIndex);
}


/**
 * Sets the chosen player
 * 
 * @method _setChosenPlayer
 * @for Rpgame
 * @param {Fighter} figher 
 */
RpGame.prototype._setChosenPlayer = function (figher){
    //if(   !(attacker instanceof Fighter) ||  !(defender instanceof Fighter)  ){
      //  console.error('failure to set Play must be fighter Class');
       // return
   // }
    this.chosenPlayer = fighter;

}

/**
 * Sets the chosen player
 * 
 * @method chosePlayer
 * @for Rpgame
 * @param {Fighter} figher 
 */
RpGame.prototype.enable = function (){
    this.prepareFighter = this.prepareFighter.bind(this);
    $('.fighter-js').on('click', this.prepareFighter)
}

/**
 * 
 * @param {*} event 
 */
RpGame.prototype.prepareFighter = function(event){
    const $target = $(event.target).closest('.fighter-js');
    event.target.closest('.fighter-js').remove();
    if(this.chosenPlayer === null) {
        $('.player').append($target)
        console.log($target);
        $target.off();
        this.chosenPlayer = 'test';
        return
    }
    if(this.opponet === null){
        $('.opponet').append($target)
        $target.off();
        this.enableAttack();
        return
    }
}

RpGame.prototype.enableAttack = function () {
    $('.attack-js').on('click', function(){

    })
}

RpGame.prototype.disableAttack = function () {
    $('.attack-js').off();
}

RpGame.prototype.fight = function () {

}



  

/**
 *  Runs though the battle
 * 
 * @method BattleSystem
 * @param {Fighter} attacker 
 * @param {Fighter} defender 
 */
const BattleSystem = function (attacker, defender) {
    // confrim attackher and defender are part of the Fighter Class
    if(   !(attacker instanceof Fighter) ||  !(defender instanceof Fighter)  ){
        console.error('failure to instantiate Class');
        return
    }

    alert(`${attacker.name}  Challages ${defender.name}`);
    console.log(defender);
    defender.takeDammage(attacker.attack);
    alert(`${attacker.name}  dose ${attacker.attack} dammge to ${defender.name}, ${defender.name} has ${defender.hp}Hp left`);
    attacker.increaseAttack();
    alert(`${attacker.name}  battle enrages and gains ${attacker.baseAttack} and now has ${attacker.attack}`);
    attacker.takeDammage(defender.counter);
    alert(`${defender.name} counter attacks and dose ${defender.counter} and now ${attacker.name} has ${attacker.hp}Hp left`);
}

/** Figher Class */
const data = [
     {'name': 'Obi-Wan', 'img': 'obi-wan.jpg', 'hp': 120, 'attack': 5,  'counter' : 15, 'faction': 'jedi' },
     {'name': 'Luke', 'img': 'luke.jpeg', 'hp': 100, 'attack': 25,  'counter' : 5, 'faction': 'jedi' }
];

const Fighter = function (){
    this.name = null;
    this.img = null;
    this.hp = null;
    this.attack = null;
    this.baseAttack = null;
    this.counter = null;
    this.faction = null;
}

Fighter.prototype.create = function(fighterBio) {
    this.name = fighterBio.name;
    this.img = fighterBio.img;
    this.hp = fighterBio.hp;
    this.attack = fighterBio.attack;
    this.baseAttack = fighterBio.attack;
    this.counter = fighterBio.counter;
    this.faction = fighterBio.faction;
}

Fighter.prototype.increaseAttack = function() {
    this.attack = this.attack + this.baseAttack;
}

Fighter.prototype.takeDammage = function(dammage){
    this.hp = this.hp - dammage;
}





const game = new RpGame();
game.enable();



