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



function checkLocalStorage(){
  // console.log(allProducts);
  var productsFromLocalStorage = localStorage.getItem('products');
  // console.log('products from local storage: ', productsFromLocalStorage);
  var parsedProducts = JSON.parse(productsFromLocalStorage);
  // console.log('parsed products from local storage: ', parsedProducts);

  if (productsFromLocalStorage) {
    for(var i = 0; i < parsedProducts.length; i++){
      new Products(parsedProducts[i].filepath, parsedProducts[i].name, parsedProducts[i].votes, parsedProducts[i].views);

      // console.log(productsFromLocalStorage[i].filepath);
    }
  } else{
    generateNewInstances();
  }
}

checkLocalStorage();

function Products(filepath, name, votes = 0, views = 0){
  this.filepath = filepath;
  this.name = name;
  this.votes = votes;
  this.views = views;

  allProducts.push(this);
}

function generateNewInstances(){
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
  new Products('img/sweep.png', 'sweep');
  new Products('img/tauntaun.jpg', 'tauntaun');
  new Products('img/unicorn.jpg', 'unicorn');
  new Products('img/usb.gif', 'usb');
  new Products('img/water-can.jpg', 'water-can');
  new Products('img/wine-glass.jpg', 'wine-glass');
}

// console.log(allProducts);

// render function

function render(imageElement){

  // get a random index between 0 and the length of our allProducts array
  var randomIndex = getRandomNumber(0, allProducts.length - 1);

  while(recentRandomNumbers.includes(randomIndex)){
    randomIndex = getRandomNumber(0, allProducts.length - 1);
  }

  imageElement.src = allProducts[randomIndex].filepath;
  imageElement.alt = allProducts[randomIndex].name;
  // console.log(allProducts);
  allProducts[randomIndex].views++;
  // console.log(allProducts);
  recentRandomNumbers.push(randomIndex);
  // console.log(recentRandomNumbers);
  if (recentRandomNumbers.length > 5){
    recentRandomNumbers.shift();
    recentRandomNumbers.shift();
    recentRandomNumbers.shift();
    console.log('shifted array', recentRandomNumbers);
  }
  // This was from class demo, but seems to not do anything to help
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
    // console.log(chosenProduct);
    for (var i = 0; i < allProducts.length - 1; i++){
      if (chosenProduct === allProducts[i].name){
        allProducts[i].votes++;
      }
    }
    votingRoundTracker++;
    if (votingRoundTracker === votingRound){
      finalTally();

    } else {
      render(imageOneElement);
      render(imageTwoElement);
      render(imageThreeElement);
    }

  }

});


render(imageOneElement);
render(imageTwoElement);
render(imageThreeElement);

var resultsList = document.getElementById('resultsSection');

// // I need a function for the results list, that takes the name of the product and states how many times each image has been chosen.
// // First, I need to add each time an image is chosen.



function finalTally(){
  for (var i = 0; i < allProducts.length - 1; i++){
    var imageOne = document.createElement('li');
    imageOne.textContent = `${allProducts[i].name} received ${allProducts[i].votes} votes and ${allProducts[i].views} views.`;
    resultsList.appendChild(imageOne);
  }
  for (var j = 0; j < allProducts.length; j++){
    myChart.data.datasets[0].data.push(allProducts[j].votes);
  }

  for (var k = 0; k < allProducts.length; k++){
    myChart.data.labels.push(allProducts[k].name);
    // console.log(myChart.data.labels[k] + 'is speaking');
  }

  for (var x = 0; x < allProducts.length; x++){
    myChart.data.datasets[1].data.push(allProducts[x].views);
  }
  // console.log(allProducts, 'this is before it goes into storage');
  var stringifyProducts = JSON.stringify(allProducts);
  // console.log('My all Products array as JSON: ', stringifyProducts);
  localStorage.setItem('products', stringifyProducts);

  myChart.update();
}



// starting the chart

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {

    // I need the labels array to populate with the allProducts.name array.
    // I should create a variable for labels that loops over the allProducts array
    // Then I need the data array to populate with the allProducts.vote array. The "data" array should loop over the .vote array just like the previous one did over the .name array
    labels: [],
    datasets: [{
      label: '# of Votes',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(20, 20, 131, 0.2)',
        'rgba(0, 200, 130, 0.2)',
        'rgba(200, 145, 165, 0.2)',
        'rgba(245, 204, 21, 0.2)',
        'rgba(110, 45, 230, 0.2)',
        'rgba(2, 235, 133, 0.2)',
        'rgba(234, 34, 154, 0.2)',
        'rgba(53. 235, 75, 0.2)',
        'rgba(143, 165, 65, 0.2)',
        'rgba(255, 93, 138, 0.2)',
        'rgba(78, 86, 123, 0.2)',
        'rgba(135, 246, 78, 0.2)',
        'rgba(245, 67, 48, 0.2)',
        'rgba(25, 236, 145, 0.2'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(20, 20, 131, 1)',
        'rgba(0, 200, 130, 1)',
        'rgba(200, 145, 165, 1)',
        'rgba(245, 204, 21, 1)',
        'rgba(110, 45, 230, 1)',
        'rgba(2, 235, 133, 1)',
        'rgba(234, 34, 154, 1)',
        'rgba(53. 235, 75, 1)',
        'rgba(143, 165, 65, 1)',
        'rgba(255, 93, 138, 1)',
        'rgba(78, 86, 123, 1)',
        'rgba(135, 246, 78, 1)',
        'rgba(245, 67, 48, 1)',
        'rgba(25, 236, 145, 1)'
      ],
      borderWidth: 1
    }, {
      label: '# of Views',
      data: [],
      borderColor: 'rgba(0, 0, 0, 1)'
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    layout: {
      padding: {
        left: 20,
        right: 40,
        bottom: 20,
        top: 50,
      }
    }
  }
});
