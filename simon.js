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
    ['g', 'b', 'y', 'y']
  ];

  this.currentsequence = null;
  
  this.start = function() {        
    var sequences = this.sequences;

    for( var i = 0; i < sequences.length; i++ ) {
      this.currentsequence = sequences[ i ];
      this.playChallenge( this.currentsequence );
    }
  };                               
        
  /* PLAY CHALLENGE SEQUENCE */
  
  this.playChallenge = function( sequence ) {    
    var next = sequence[0];
    this.blink( next );

    if( sequence.length == 0 ) {
      this.evaluateResponse( this.currentsequence );
      return;
    }

    var remaining = sequence.slice(1, sequence.length);
    var _self = this;
    setTimeout( function() { _self.playChallenge( remaining ); }, 1000 );
  };
  
  this.blink = function( color ) {
    this.green.attr( 'style', '' );
    this.red.attr( 'style', '' );
    this.yellow.attr( 'style', '' );
    this.blue.attr( 'style', '' );
    
    var next = this.green; // default
    if( color == 'r' ) { next = this.red; }
    else if( color == 'y' ) { next = this.yellow; }
    else if( color == 'b' ) { next = this.blue; }
    
    next.attr( 'style', 'background-color: gray' );
  };
  
  this.evaluateResponse = function( sequence ) {
    var _this = this;
    this.green.click( function(){ _this.handleClick( 'g' ) } );
    this.red.click( function(){ _this.handleClick( 'r' ) } );
    this.yellow.click( function(){ _this.handleClick( 'y' ) } );
    this.blue.click( function(){ _this.handleClick( 'b' ) } );
  };

  this.handleClick = function( color ) {
    if( color != this.currentsequence[0] ){
      this.gameOver();
      return;
    }

    this.currentsequence.shift();

    if( this.currentsequence.length == 0 ) {
      this.win();
      return;
    }
  };

  this.win = function() {
    alert( 'you win' );
  };

  this.gameOver = function() {
    this.green.unbind( 'click' );
    this.red.unbind( 'click' );
    this.yellow.unbind( 'click' );
    this.blue.unbind( 'click' );
    
    alert( 'gameover stuff' );
  };
                                                              
}