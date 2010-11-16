var simon = null;

function onloadHander()
{
  simon = new Simon();
  simon.start();
};

Simon = function() {

  this.ui = new Simon.UI();
         
  this.green = $( "#green" );
  this.red = $( "#red" );
  this.yellow = $( "#yellow" );
  this.blue = $( "#blue" );
  
  this.sequences = null;
  this.currentsequence = null;
  
  this.start = function() {
    this.ui.hideGameoverDialog();
    this.loadSequence();
    this.playNextSequence();
  };

  this.loadSequence = function() {
    this.sequences = $.extend(true, [], Simon.Settings.sequences);
  };

  this.playNextSequence = function() {
    this.ui.hideLoserDialog();
    this.ui.hideWinnerDialog();

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
    this.ui.resetButtonColors();

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
    this.ui.showWinnerDialog();

    if( this.sequences.length > 0 ) {
      var _this = this;
      setTimeout( function() { _this.playNextSequence(); }, 1000 );
    }
    else {
      this.ui.showGameoverDialog();
    }
  };

  this.lose = function() {
    this.stopGame();
    this.ui.showLoserDialog();
  };

  this.stopGame = function() {
    this.ui.disableColorButtons();
  };                                                            
};

/***********************************************************************
 * Simon.Settings
 **********************************************************************/

Simon.Settings = {
  sequences: [
    ['g', 'b', 'y', 'y'],
    ['r', 'r']
  ]
};

/***********************************************************************
 * Simon.UI
 **********************************************************************/

Simon.UI = function() {
  this.green = $( "#green" );
  this.red = $( "#red" );
  this.yellow = $( "#yellow" );
  this.blue = $( "#blue" );  
  this.winner_dialog = $('#winner_dialog');
  this.loser_dialog = $('#loser_dialog');
  this.gameover_dialg = $('#gameover_dialog');
}

Simon.UI.prototype = {
  disableColorButtons: function() {
    this.green.unbind( 'click' );
    this.red.unbind( 'click' );
    this.yellow.unbind( 'click' );
    this.blue.unbind( 'click' );
  },

  resetButtonColors: function() {
    this.green.attr( 'style', '' );
    this.red.attr( 'style', '' );
    this.yellow.attr( 'style', '' );
    this.blue.attr( 'style', '' );
  },

  showLoserDialog: function() {
    $('#loser_dialog').show();
  },

  hideLoserDialog: function() {
    $( '#loser_dialog' ).hide();
  },

  showGameoverDialog: function() {
    $('#gameover_dialog').show();
  },

  hideGameoverDialog: function() {
    $('#gameover_dialog').hide();
  },

  showWinnerDialog: function() {
    $('#winner_dialog').show();
  },

  hideWinnerDialog: function() {
    $( '#winner_dialog' ).hide();
  }
}