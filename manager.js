/* 
  Singleton to control event timer for game
 */
var GameManager = {
  game: null,
  
  timer: null,
  
  start: function( game ) {
    this.game = game;
    this.tick();
  },
  
  tick: function() {
    this.game.blink();                                                                 
    setTimeout( function() { GameManager.tick.call( GameManager ) }, 1000 )
  }
}