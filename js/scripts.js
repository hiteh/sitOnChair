function Slide(paragraph, header, image) {
  this.paragraph = paragraph;
  this.header = header;
  this.image = image;
}
function Slider() {
  this.prevButton = document.querySelector('.main-slider-cnt-prev');
  this.nextButton = document.querySelector('.main-slider-cnt-next');
  this.currentIndex = 0;
  this.slides = [];
}
Slider.prototype.addSlide = function(header,image,paragraph) {
  this.slides.push(new Slide(paragraph, header, image));
}
Slider.prototype.renderSlide = function(slide) {
  var newSlide = document.querySelector('.main-slider-cnt-slides').cloneNode(true);
  var images = newSlide.querySelectorAll('img');
  for (var i = 0; i < images.length; i++) {
    if(images[i].src == window.location.origin+'/sitOnChair/'+slide.image) {
      images[i].classList.remove('hidden');
    } else {
      images[i].classList.add('hidden');
    }
  }
  newSlide.querySelector('p').innerText = slide.paragraph;
  var headerElements = slide.header.split(" ");
  var header = '';
  for (var i = 0; i < headerElements.length; i++) {
    if (headerElements.indexOf(headerElements[i]) % 2 != 0) {
      header += ' <span>'+headerElements[i]+'</span> ';
    } else {
      header += headerElements[i];
    }
  }
  newSlide.querySelector('h2').innerHTML = header;
  newSlide.classList.add('animate');
  document.querySelector('.main-slider-cnt').replaceChild(newSlide, document.querySelector('.main-slider-cnt-slides'));
}
Slider.prototype.previousSlide = function() {
  if(this.currentIndex > -1){
    this.currentIndex--;
  }
  if(this.currentIndex == -1){
    this.currentIndex = this.slides.length-1;
  }
  for(var i = 0; i < this.slides.length; i++) {
    if(this.slides.indexOf(this.slides[i]) == this.currentIndex) {
      this.renderSlide(this.slides[i]);
      break;
    }
  }
}
Slider.prototype.nextSlide = function() {
  if(this.currentIndex == this.slides.length-1){
    this.currentIndex = -1;
  }
  if(this.currentIndex < this.slides.length-1){
    this.currentIndex++;
  }
  for(var i = 0; i < this.slides.length; i++) {
    if(this.slides.indexOf(this.slides[i]) == this.currentIndex) {
      this.renderSlide(this.slides[i]);
      break;
    }
  }
}
/* CALCULATOR*/
function Calculator() {
  this.type = null;
  this.color = null;
  this.fabric = null;
  this.typePrice = 0;
  this.colorPrice = 0;
  this.fabricPrice = 0;
  this.transportPrice = 0;
}

Calculator.prototype.setType = function(type) {
  this.type = type;
  this.typePrice = this.storage[type];
  this.renderForm();
}
Calculator.prototype.setTransport = function(transport) {
  this.transportPrice = parseFloat(transport);
  this.renderForm();
}
Calculator.prototype.setColor = function(color) {
  this.color = color;
  this.colorPrice = this.storage[color];
  this.renderForm();
}
Calculator.prototype.setFabric = function(fabric) {
  this.fabric = fabric;
  this.fabricPrice = this.storage[fabric];
  this.renderForm();
}
Calculator.prototype.calculateTotal = function() {
  return this.typePrice + this.colorPrice + this.fabricPrice + this.transportPrice;
}
Calculator.prototype.renderForm = function() {
  var currrentForm = document.querySelector('.summary_panel');
  var leftPanel = currrentForm.querySelector('.panel_left');
  var rightPanel = currrentForm.querySelector('.panel_right');

  if(this.type !== null) {
    leftPanel.querySelector('.title').innerText = this.type;
    rightPanel.querySelector('.title').innerText = this.typePrice;

    if(this.color !== null) {
      leftPanel.querySelector('.color').innerText = this.color;
      rightPanel.querySelector('.color').innerText = this.colorPrice;
    }
    if(this.fabric !== null) {
      leftPanel.querySelector('.pattern').innerText = this.fabric;
      rightPanel.querySelector('.pattern').innerText = this.fabricPrice;
    }

    leftPanel.querySelector('.transport').innerText = 'Transport';
    rightPanel.querySelector('.transport').innerText = this.transportPrice;
    document.querySelector('.sum').innerHTML = '<strong>'+this.calculateTotal()+'</strong>'
  }

}
Calculator.prototype.storage = {
  Clair: 150.00,
  Margarita: 200.00,
  Selena: 300.00,
  Czerwony: 50.00,
  Czarny: 40.00,
  Pomarańczowy: 80.00,
  Tkanina: 15.00,
  Skóra: 30.00
}

document.addEventListener('DOMContentLoaded', function() {
  /* CALCULATOR */
  var calculator = new Calculator();
  var listButtons = document.querySelectorAll('.list_arrow');
  for (var i = 0; i < listButtons.length; i++) {
    listButtons[i].addEventListener('click', function(){
      if(this.nextElementSibling.style.display != 'block') {
        this.nextElementSibling.style.display = 'block';
      } else {
        this.nextElementSibling.style.display = 'none';
      }
    });
  }
  var transport = document.querySelector('#transport');
  transport.addEventListener('click', function(){
    if(this.checked == true) {
      calculator.setTransport(this.dataset.transportPrice);
    } else {
      calculator.setTransport(0);
    }
  });
  var type = document.querySelector('.drop_down_list');
  var color = type.nextElementSibling;
  var fabric = color.nextElementSibling;
  for (var i = 0; i < type.querySelectorAll('li').length; i++) {
    type.querySelectorAll('li')[i].addEventListener('click', function(){
      calculator.setType(this.innerText);
      this.parentElement.style.display = 'none';
      this.parentElement.parentElement.querySelector('.list_label').innerText = this.innerText;
    });
  }
  for (var i = 0; i < color.querySelectorAll('li').length; i++) {
    color.querySelectorAll('li')[i].addEventListener('click', function(){
      calculator.setColor(this.innerText);
      this.parentElement.style.display = 'none';
      this.parentElement.parentElement.querySelector('.list_label').innerText = this.innerText;
    });
  }
  for (var i = 0; i < fabric.querySelectorAll('li').length; i++) {
    fabric.querySelectorAll('li')[i].addEventListener('click', function(){
      calculator.setFabric(this.innerText);
      this.parentElement.style.display = 'none';
      this.parentElement.parentElement.querySelector('.list_label').innerText = this.innerText;
    });
  }

  /* SLIDER */
  var topSlider = new Slider();
  topSlider.addSlide('Sit on our chair', 'images/black_chair.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
  topSlider.addSlide('Just sit and relax', 'images/orange.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
  topSlider.addSlide('Best designs', 'images/red.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
  setInterval(function(){
    topSlider.nextSlide();
  }, 6000);
  topSlider.prevButton.addEventListener('click', function(e) {
    topSlider.previousSlide();
  });
  topSlider.nextButton.addEventListener('click', function(e) {
    topSlider.nextSlide();
  });
  /* FEATURES */
  var productBoxes = document.querySelectorAll('.style-product img');
  for (var i = 0; i < productBoxes.length; i++) {
    productBoxes[i].addEventListener('mouseenter', function(e){
      var newElement = this.previousElementSibling.cloneNode(true);
      newElement.classList.remove('show');
      newElement.classList.add('hide');
      this.parentElement.replaceChild(newElement, this.parentElement.querySelector('.features-content-box-title'));
    });
    productBoxes[i].addEventListener('mouseout', function(e){
      var newElement = this.previousElementSibling.cloneNode(true);
      newElement.classList.remove('hide');
      newElement.classList.add('show');
      this.parentElement.replaceChild(newElement, this.parentElement.querySelector('.features-content-box-title'));
    });
  }
  var list = document.querySelectorAll('.features-content-box-title');
  console.log(list);
  for (var i = 0; i < list.length; i++) {
    list[i].addEventListener('mouseover', function(){
      console.log('hit');
    });
  }

  /* NAVIGATION */
  var navigationList = document.querySelectorAll('.page-nav-list > li');
  for (var i = 0; i < navigationList.length; i++) {
    var currrentListItem = navigationList[i].querySelector('ul');
    if(currrentListItem) {
      navigationList[i].addEventListener('mouseover', function(e) {
        var sublist = this.querySelector('ul');
        sublist.style.opacity = 1;
        sublist.style.visibility = 'visible';
        sublist.style.top = '51px';
        sublist.style.zIndex = 999;
      });
      navigationList[i].addEventListener('mouseout', function(){
        var sublist = this.querySelector('ul');
        sublist.style.visibility = 'hidden';
        sublist.style.top = '45px';
      });
    }
  }
});
