function onloadHander()
{             
  var game = new Simon();
  game.start();
};

Simon = function() {
         
  this.green = $( "#green" );
  this.red = $( "#red" );
  this.yellow = $( "#yellow" );
  this.blue = $( "#blue" );
  
  this.sequences = [
    ['g', 'b', 'y', 'y'],
    ['r', 'r']
  ];

  this.currentsequence = null;
  
  this.start = function() {
    this.playNextSequence();
  };

  this.playNextSequence = function() {
    $( '#loser_dialog' ).hide();
    $( '#winner_dialog' ).hide();

    this.currentsequence = this.sequences.shift();
    this.playChallenge( this.currentsequence );
  };
  
  this.playChallenge = function( sequence ) {    
    var next = sequence[0];
    this.blink( next );

    var remaining = sequence.slice(1, sequence.length);
    if( remaining.length == 0 ) {
      this.evaluateResponse( this.currentsequence );
    }
    else {
      var _self = this;
      setTimeout( function() { _self.playChallenge( remaining ); }, 1000 );
    }
  };
  
  this.blink = function( color ) {
    this.green.attr( 'style', '' );
    this.red.attr( 'style', '' );
    this.yellow.attr( 'style', '' );
    this.blue.attr( 'style', '' );

    var next = null;
    if( color == 'g' ) { next = this.green; }
    else if( color == 'r' ) { next = this.red; }
    else if( color == 'y' ) { next = this.yellow; }
    else if( color == 'b' ) { next = this.blue; }
    
    next.attr( 'style', 'background-color: gray' );

    setTimeout( function() { next.attr( 'style', '' ); }, 200 );
  };
  
  this.evaluateResponse = function( sequence ) {
    var _this = this;
    this.green.click( function(){ _this.handleClick( 'g' ) } );
    this.red.click( function(){ _this.handleClick( 'r' ) } );
    this.yellow.click( function(){ _this.handleClick( 'y' ) } );
    this.blue.click( function() { _this.handleClick('b') } );
  };

  this.handleClick = function( color ) {
    if( color != this.currentsequence[0] ){
      this.lose();
      return;
    }

    this.currentsequence.shift();

    if( this.currentsequence.length == 0 ) {
      this.win();
    }
  };

  this.win = function() {
    this.stopGame();
    $('#winner_dialog').show();

    if( this.sequences.length > 0 ) {
      var _this = this;
      setTimeout( function() { _this.playNextSequence(); }, 1000 );
    }
    else {
      $('#gameover_dialog').show(); 
    }
  };

  this.lose = function() {
    this.stopGame();
    $('#loser_dialog').show();
  };

  this.stopGame = function() {
    this.green.unbind( 'click' );
    this.red.unbind( 'click' );
    this.yellow.unbind( 'click' );
    this.blue.unbind( 'click' );
  };
                                                              
}