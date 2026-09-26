(function (){
    class productSlider {
        activeSlide;

        constructor() {
            this.activeSlide = 0;
            this.leftButton = document.querySelector('.slide-control.left');
            this.rightButton = document.querySelector('.slide-control.right');

            this.leftButton.addEventListener('click', this.prevSlide);
            this.rightButton.addEventListener('click', this.nextSlide);

            this.slides =  document.querySelectorAll('.slider-item')
            this.markers = document.querySelectorAll('.slider-marker');
        }

        nextSlide = () => {
            this.activeSlide = (this.activeSlide < this.slides.length - 1) ?
                this.activeSlide + 1 : 0;
            [...this.slides, ...this.markers].forEach(slide => {
                slide.classList.remove('active');
            })

            this.slides[this.activeSlide].classList.add('active');
            this.markers[this.activeSlide].classList.add('active');
        }

        prevSlide = () => {
            this.activeSlide = (this.activeSlide === 0) ?
                this.slides.length - 1 : this.activeSlide - 1;
            [...this.slides, ...this.markers].forEach(slide => {
                slide.classList.remove('active');
            })
            this.slides[this.activeSlide].classList.add('active')
            this.markers[this.activeSlide].classList.add('active')
        }
    }
    new productSlider();
})()