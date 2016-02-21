function play() {
  $("body").css({"transform": "scale(1)"});
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {

      // Pick remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap that element with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  var numberList = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

  // Shuffle the number list
  shuffle(numberList);  

  // Assign each card a number from numberList
  $(".back").each(function (i){
    $(this).text(numberList[i]);
  });
  
  // Number of chances the player has left
  var chances = 3;
  // Displays number when clicking on card
  $(".card").click(function() {
    $(this).addClass(".clicked");
    var $back  = $(".back", this);
    var $front = $(".front", this);
    $front.css({"transform": "perspective(600px) rotateY(180deg)"});
    $back.css({"transform": "perspective(600px) rotateY(0deg)"});
    setTimeout(function(){$front.css({"transform": "perspective(600px) rotateY(0deg)"})}, 1500);
    setTimeout(function(){$back.css({"transform": "perspective(600px) rotateY(180deg)"})}, 1500);
    var $value = $(".back", this).text();
    match.push($value);

  // Logic for determining if a match was made or not
    function score() {
      if (match.length > 1){
        if(match[0] === match[1]){
          setTimeout(function(){alert("Yay!")}, 1000);
          match = [];
        }
        else {
          setTimeout(function(){alert("Nope!")}, 1000);
          match = [];
          chances -= 1;
          if (chances == 0) {
          setTimeout(function(){
            var again = confirm("Game Over...Play again?");
            if (again){
              play();
            }
            else {
              alert(":(")
            }}, 1000);
          $("body").css({"transform": "scale(0)"});
          }
        }
      }
    }
    score();
  });
  match = [];
  $(".chances").text("You have " + chances + " chances left!");
}

play();
