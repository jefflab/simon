function onloadHander()
{             
  GameManager.start(new Simon());
};

Simon = function() { 
         
  this.green = document.getElementById( "green" );
  this.red = document.getElementById( "red" );
  this.yellow = document.getElementById( "yellow" );
  this.blue = document.getElementById( "blue" );
  
  this.levels = [
    ['g'],
    ['g', 'r'],
    ['g', 'b', 'y', 'y']
  ];
  
  this.currentlevel = 0;
  
  this.nextColor = function() {
    // return null if no more blinking instructions
    if( this.currentlevel == this.levels.length - 1 &&
        this.levels[ this.currentlevel ].length == 0 ) {
       return null;
    }
    
    // advance to next level if current level completed
    if( this.levels[ this.currentlevel ].length == 0 ) {
      this.currentlevel += 1;
      return this.nextColor();
    }
         
    // otherwise return element cooresponding to next instruction
    var next = this.levels[ this.currentlevel ].shift();
    if( next == 'g' ) { return this.green; }
    else if( next == 'r' ) { return this.red; }
    else if( next == 'y' ) { return this.yellow; }
    else if( next == 'b' ) { return this.blue; }
    else { return null; } 
  };                        
  
  this.blink = function() {          
    this.green.setAttribute( 'style', '' ); 
    this.red.setAttribute( 'style', '' ); 
    this.yellow.setAttribute( 'style', '' ); 
    this.blue.setAttribute( 'style', '' );
    
    var next = this.nextColor();
    if( next ) {
      next.setAttribute( 'style', 'background-color: gray' );
    }
  };  
                                                              
}