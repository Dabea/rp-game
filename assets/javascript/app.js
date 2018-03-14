/**
 *  Generates the template for the the fighers to be displayed on the page
 * 
 * @method figherView
 * @param {*} fighter 
 */
const fighterView = function (fighter){
    const fighterTemplate = `<div class="panel fighter-js" data-name="${fighter.name}" >
    <div class="panel-head">${fighter.name}</div> 
    <div class="panel-body"><img class="panel-image" src="./assets/img/${fighter.img}" alt="">
        <div>Hp: ${fighter.hp}</div>
        <div>Attack: ${fighter.attack}</div>
        <div>Faction: ${fighter.faction}</div>
    </div>
</div>`;
return fighterTemplate;
}

/**
 * construcotr for RP game 
 * 
 * @Constructor
 */
const RpGame = function() {
    this.chosenPlayer = null;
    this.opponet = null;
    this.fighterCollection = [];
    this.generateFighterCollection();
    this.victoryCount = 0;
    this.SELECTOR = {player: '.player', opponet: '.opponet'}
}

/**
 *  Generates the list of the available fighters from the avitabile data
 * 
 * @for Rpgame
 * @method generateFighterCollection
 */
RpGame.prototype.generateFighterCollection = function (){
    for(let i = 0; i < data.length; i++){
        let fighter = new Fighter();
        fighter.create(data[i]);
        let fighterTemplate = fighterView(fighter);
        $('.player-select').append(fighterTemplate);
        this.fighterCollection.push(fighter);
    }
}

/**
 * Sets the chosen player
 * 
 * @method _setChosenPlayer
 * @for Rpgame
 * @param {Fighter} figher 
 */
RpGame.prototype._setChosenPlayer = function (figher){
    /***   Need to enable a check that the class is be created byt the correct classes */
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
 *  Gathers all the infomatino needed for the fighters to engage in combat
 * 
 * @method prepareFighter
 * @param {*} event 
 */
RpGame.prototype.prepareFighter = function(event){
    const $target = $(event.target).closest('.fighter-js');
    if(this.chosenPlayer === null) {
       this.selectPlayer($target, 'player');
       this.chosenPlayer = this.findFighter($target.data('name'));
        return
    }
    if(this.opponet === null){
        this.selectPlayer($target, 'opponet')
        this.enableAttack();
        this.opponet = this.findFighter($target.data('name'));
        return
    }

    alert('you must deal with your current opponet');
}

/**
 *  Select the avtive  player
 * 
 * @param {*}  
 * @param {*} owner 
 */
RpGame.prototype.selectPlayer = function($target, owner) {
    $target.closest('.fighter-js').remove();
    $(this.SELECTOR[owner]).append($target)
    $target.off();
    this[owner] = this.findFighter($target.data('name'));
}

/**
 *  creates the attack event listner to attack
 * 
 * @for Rpgame
 * @method enableAttack
 */
RpGame.prototype.enableAttack = function () {
    this.fight = this.fight.bind(this);
    $('.attack-js').on('click', this.fight )
}

/**
 *  disables the attack event listner
 * 
 * @for Rpgame
 * @method disableAttack
 */
RpGame.prototype.disableAttack = function () {
    $('.attack-js').off();
}

/**
 *  Gathers infomation for the game for the battle ahaed
 * 
 * @for RPgame
 * @method fight
 */
RpGame.prototype.fight = function () {
    BattleSystem(this.chosenPlayer, this.opponet)
    //handel Player
    if(this.chosenPlayer.hp <= 0 && this.opponet.hp > 0) {
        this.gameOver();
        $('.player').empty();
     }else{
         $('.player').empty();
         const chosenFighterTemplate = fighterView(this.chosenPlayer);
         $('.player').append(chosenFighterTemplate);
     }
    //handel Opponet
    if(this.opponet.hp <= 0){
        $('.opponet').empty();
        this.opponet = null;
    }else{
        const opponetighterTemplate = fighterView(this.opponet);
        $('.opponet').empty();
        $('.opponet').append(opponetighterTemplate);
    }

    if(this.fighterCollection.length === 0){
        alert('You Win');
    }
    if(this.chosenPlayer.hp <= 0){
        alert('game Over');
        $('.model').removeClass('hidden');
    }
}

/**
 *  Will find the wanted finghter by the given name
 * 
 * @method findFighter
 * @param {*} name 
 * 
 */
RpGame.prototype.findFighter = function (name){
    const foundIndex = this.fighterCollection.findIndex(function(key){
        return key.name === name;
    })

    foundFighter = this.fighterCollection.map(fighter => fighter.name === name);
    return this.fighterCollection[foundIndex]
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
    //alert(`${attacker.name}  Challages ${defender.name}`);
    defender.takeDammage(attacker.attack);
    //alert(`${attacker.name}  dose ${attacker.attack} dammge to ${defender.name}, ${defender.name} has ${defender.hp}Hp left`);
    attacker.increaseAttack();
    //alert(`${attacker.name}  battle enrages and gains ${attacker.baseAttack} and now has ${attacker.attack}`);
    attacker.takeDammage(defender.counter);
    //alert(`${defender.name} counter attacks and dose ${defender.counter} and now ${attacker.name} has ${attacker.hp}Hp left`);
}

/** Figher Class data */
const data = [
     {'name': 'Obi-Wan', 'img': 'obi-wan.jpg', 'hp': 120, 'attack': 5,  'counter' : 20, 'faction': 'jedi' },
     {'name': 'Luke', 'img': 'luke.jpeg', 'hp': 100, 'attack': 15,  'counter' : 10, 'faction': 'jedi' },
     {'name': 'Darth Vader', 'img': 'vader.jpeg', 'hp': 60, 'attack': 30,  'counter' : 25, 'faction': 'Sith' }
];

/**
 * Fighter constructor builds initates and sets up the  fighter class
 */
const Fighter = function (){
    this.name = null;
    this.img = null;
    this.hp = null;
    this.attack = null;
    this.baseAttack = null;
    this.counter = null;
    this.faction = null;
}

/**
 *  Creats and gives values to the fighers
 * 
 * @for Fighter
 * @method create
 * @param {*} fighterBio 
 */
Fighter.prototype.create = function(fighterBio) {
    this.name = fighterBio.name;
    this.img = fighterBio.img;
    this.hp = fighterBio.hp;
    this.attack = fighterBio.attack;
    this.baseAttack = fighterBio.attack;
    this.counter = fighterBio.counter;
    this.faction = fighterBio.faction;
}

/**
 * Increases the Attack of the fighter
 * 
 * @for fighter
 * @method increaseAttack
 */
Fighter.prototype.increaseAttack = function() {
    this.attack = this.attack + this.baseAttack;
}

/**
 * Reduces the Hp of a figter
 * 
 * @for Figher
 * @method takeDammage
 * @param {*} dammage 
 */
Fighter.prototype.takeDammage = function(dammage){
    this.hp = this.hp - dammage;
}


const game = new RpGame();
game.enable();



