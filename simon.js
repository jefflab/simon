function onloadHander()
{             
  var game = new Simon();
  game.start();
};

Simon = function() { 
         
  this.green = document.getElementById( "green" );
  this.red = document.getElementById( "red" );
  this.yellow = document.getElementById( "yellow" );
  this.blue = document.getElementById( "blue" );
  
  this.sequences = [
    ['g'],
    ['g', 'r'],
    ['g', 'b', 'y', 'y']
  ];
  
  this.currentsequence = 0;                        
  
  this.start = function() {        
    var sequences = this.sequences;   
        
    for( var i = 0; i < sequences.length; i++ ) {
      this.currentsequence = i;
      var sequence = sequences[ this.currentsequence ];
      this.playChallenge( sequence );
    }
  };
    
  /* CAPTURE RESPONSE */
  this.captureResponse = function( sequence ) {
    alert( 'capture the response here' );
  };                                 
        
  /* PLAY SEQUENCE */
  this.playChallenge = function( sequence ) {    
    var next = sequence[0];
    this.blink( next );
                       
    if( sequence.length > 1 ) {
      var remaining = sequence.slice(1, sequence.length);
      var _self = this;
      setTimeout( function() { _self.playChallenge( remaining ); }, 1000 );
    }
    else {
      this.captureResponse( this.currentsequence );
    }
  };
  
  this.blink = function( color ) {
    this.green.setAttribute( 'style', '' ); 
    this.red.setAttribute( 'style', '' ); 
    this.yellow.setAttribute( 'style', '' ); 
    this.blue.setAttribute( 'style', '' );
    
    var next = this.green; // default
    if( color == 'r' ) { next = this.red; }
    else if( color == 'y' ) { next = this.yellow; }
    else if( color == 'b' ) { next = this.blue; }
    
    next.setAttribute( 'style', 'background-color: gray' );
  };                     
                                                              
}