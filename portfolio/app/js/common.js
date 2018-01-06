var myImage = document.getElementsByClassName("figure__item-img");

myImage[0].onclick = function() {
    var mySrc = myImage[0].getAttribute('style');
    if(mySrc === "background-image:url(img/portfolio-figure-01.png);") {
      myImage[0].setAttribute ('style','background-image:url(img/portfolio-figure-02.png);');
    } else {
      myImage[0].setAttribute ('style','background-image:url(img/portfolio-figure-01.png);');
    }
};
myImage[1].onclick = function() {
    var mySrc = myImage[1].getAttribute('style');
    if(mySrc === "background-image:url(img/portfolio-figure-01.png);") {
      myImage[1].setAttribute ('style','background-image:url(img/portfolio-figure-02.png);');
    } else {
      myImage[1].setAttribute ('style','background-image:url(img/portfolio-figure-01.png);');
    }
};