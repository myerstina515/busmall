'use strict';

// global variables
var allProducts = [];
var imageOneElement = document.getElementById('imageOne');
var imageTwoElement = document.getElementById('imageTwo');
var imageThreeElement = document.getElementById('imageThree');
var recentRandomNumbers = [];
var votingRoundTracker = 0;
var votingRound = 25;

// math.random to return a random number between 0 and the length of the array.
// Use that nubmer to be the index position of our allProducts array. So that when we do imageOneElement.src = allProducts[randomNumber]




// Goals: render 3 photos to the DOM
// allow users to vote on which photo they like
// keep track of votes
// keep track of views


// do this three times:
// go to my index and select an image tag
// fill that image tag with content
// append it to the DOM


function Products(filepath, name){
  this.filepath = filepath;
  this.name = name;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}

new Products('img/boots.jpg', 'boots');
new Products('img/bag.jpg', 'bag');
new Products('img/banana.jpg', 'banana');
new Products('img/bathroom.jpg', 'bathroom');
new Products('img/breakfast.jpg', 'breakfast');
new Products('img/bubblegum.jpg', 'bubblegum');
new Products('img/chair.jpg', 'chair');
new Products('img/cthulhu.jpg', 'cthulhu');
new Products('img/dog-duck.jpg', 'dog-duck');
new Products('img/dragon.jpg', 'dragon');
new Products('img/pen.jpg', 'pen');
new Products('img/pet-sweep.jpg', 'pet-sweep');
new Products('img/scissors.jpg', 'scissors');
new Products('img/shark.jpg', 'shark');
new Products('img/pet-sweep.jpg', 'pet-sweep');
new Products('img/tauntaun.jpg', 'tauntaun');
new Products('img/unicorn.jpg', 'unicorn');
new Products('img/usb.gif', 'usb');
new Products('img/water-can.jpg', 'water-can');
new Products('img/wine-glass.jpg', 'wine-glass');


console.log(allProducts);

// render function

function render(imageElement){

  // get a random index between 0 and the length of our allProducts array
  var randomIndex = getRandomNumber(0, allProducts.length - 1);

  while(recentRandomNumbers.includes(randomIndex)){
    randomIndex = getRandomNumber(0, allProducts.length - 1);
  }

  imageElement.src = allProducts[randomIndex].filepath;
  imageElement.alt = allProducts[randomIndex].name;

  if (recentRandomNumbers.length > 2){
    recentRandomNumbers = [];
  }
  recentRandomNumbers.push(randomIndex);

}

// helper functions


function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// when a user clicks "vote" button, I need all photos to go away
// I'll need an event listener on the parent of all images.
// listen on the vote button for a submit

var productOptionsElement = document.getElementById('productOptions');
productOptionsElement.addEventListener('click', function(event){

  if (votingRoundTracker < votingRound){

    //   console.log(event.target.title);

    var chosenProduct = event.target.alt;
    console.log(chosenProduct);
    for (var i = 0; i < allProducts.length - 1; i++){
      if (chosenProduct === allProducts[i].name){
        allProducts[i].votes++;
      }
      render(imageOneElement);
      render(imageTwoElement);
      render(imageThreeElement);
    }
    votingRoundTracker++;
  } else {
    finalTally();
  }
});

render(imageOneElement);
render(imageTwoElement);
render(imageThreeElement);

var resultsList = document.getElementById('resultsSection');

// // I need a function for the results list, that takes the name of the product and states how many times each image has been chosen.
// // First, I need to add each time an image is chosen.


// I CAN'T GET THIS TO WORK!!!!!!!!!!!! :(
function finalTally(){
  for (var i = 0; i < allProducts.length - 1; i++){
    var imageOne = document.createElement('li');
    imageOne.textContent = `${allProducts[i].name} received ${allProducts[i].votes} votes over 25 rounds of voting`;
    resultsList.appendChild(imageOne);
  }
}


