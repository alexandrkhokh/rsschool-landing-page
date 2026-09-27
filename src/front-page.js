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

            this.swipeThreshold = 50;
            this.touchStartX = 0;
            this.touchStartY = 0;
            this.slidesWrapper = document.querySelector('.slides__wrapper');
            this.slidesWrapper.addEventListener('touchstart', this.touchStartHandler, { passive: true });
            this.slidesWrapper.addEventListener('touchend', this.touchEndHandler, { passive: true });
        }

        touchStartHandler = (event) => {
            this.touchStartX = event.changedTouches[0].clientX;
            this.touchStartY = event.changedTouches[0].clientY;
        }

        touchEndHandler = (event) => {
            const deltaX = event.changedTouches[0].clientX - this.touchStartX;
            const deltaY = event.changedTouches[0].clientY - this.touchStartY;

            if (Math.abs(deltaX) < this.swipeThreshold || Math.abs(deltaX) < Math.abs(deltaY)) {
                return;
            }

            deltaX < 0 ? this.nextSlide() : this.prevSlide();
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