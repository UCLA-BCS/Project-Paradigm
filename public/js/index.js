function addName() {
  $.ajax({
    url: "https://bestow-app.herokuapp.com/user/get-info",
    method: "GET",
  }).then(function(user) {
    var currentName = user[0].name;
    console.log(user);
    $("#userNameGoesHere").html(currentName);
  });
}

function addDrinks() {
  $.ajax({
    url: "https://bestow-app.herokuapp.com/users/drinks",
    method: "GET",
  }).then(function(drinks) {
    $("#drinksGoHere").empty();

    for (var i = 0; i < drinks.length; i++) {
      var newRow = $("<tr>");
      var drinkIsHot = drinks[i].isHot ? "Hot Drink" : "Cold Drink";

      newRow.html(
        `<td>${drinks[i].coffeeShop}</td><td>${drinkIsHot}</td><td>${drinks[i].drinkName}</td><td>${drinks[i].specialInstructions}</td>`
      );
      $("#drinksGoHere").append(newRow);
    }
  });
}

$(document).ready(function() {
  addName();
  addDrinks();
});
