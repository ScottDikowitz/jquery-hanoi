(function () {
  var Hanoi = window.Hanoi = window.Hanoi || {};

  var View = Hanoi.View = function(game, $el) {
    this.game = game;
    this.$el = $el;
    this.selectedTower = null;
    this.setupTowers();
    this.render();
    this.clickTower();
  };

  View.prototype.setupTowers = function () {
    for (var i = 0; i < 3; i++) {
      $figure = $('<figure class="tower-container"></figure>');

      $ul = $('<ul class="tower" id="' + i + '"></ul>');
      $ul.append($('<li></li></li><li></li><li>'));
      $figure.append($ul);
      this.$el.append($figure);
    }
  }

  View.prototype.render = function() {
    var towers = this.game.towers;
    var sizes = ["_", "sm", "med", "lg"];
    $("ul").each(function(towerIdx) {
      var tower = $(this);
      tower.children().each(function(childIdx) {
        var size = towers[towerIdx][towers[towerIdx].length - childIdx - 1];
        $(this).removeClass();
        if (!(size === "undefined")) {
          $(this).addClass(sizes[size]);
        }
      });
    });
  }

  View.prototype.clickTower = function() {
    $("body").on("click", ".tower-container", function($e) {
      // debugger;
      if (this.selectedTower === null) {
        this.selectedTower = $e.currentTarget.children[0];
        $(this.selectedTower).toggleClass("selected");
      }
      else {
        this.game.move(this.selectedTower.id, $e.currentTarget.children[0].id);
        this.render();
        $(this.selectedTower).toggleClass("selected");
        this.selectedTower = null;
        if (this.game.isWon()){
          alert("you win!");
          this.game = new Hanoi.Game();
          this.render();
        }
      }
      console.log (JSON.stringify(this.game.towers));
    }.bind(this))
  }

})();




    //     $(this).append('<li class="' + sizes[disc] + '"></li>');
    //   }
    // });
