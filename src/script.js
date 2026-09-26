(function (){
    class MobileMenu {
        mobileMenuButton;
        menu;
        constructor() {
            this.mobileMenuButton = document.getElementById('header-menu-button-mobile');
            this.menu = document.getElementById('mobile-menu');

            this.mobileMenuButton.addEventListener('click', this.menuToggleHandler);
            this.menu.addEventListener('click', this.linkClickHandler);
            window.addEventListener('resize', this.resizeHandler);
        }

        isOpen() {
            return this.menu.classList.contains('open');
        }

        open() {
            this.menu.classList.add('open');
            this.mobileMenuButton.classList.add('open');
            document.body.classList.add('no-scroll');
        }

        close() {
            this.menu.classList.remove('open');
            this.mobileMenuButton.classList.remove('open');
            document.body.classList.remove('no-scroll');
        }

        menuToggleHandler = () => {
            this.isOpen() ? this.close() : this.open();
        }

        linkClickHandler = (event) => {
            if (event.target.closest('a')) {
                this.close();
            }
        }

        resizeHandler = () => {
            if (this.isOpen() && getComputedStyle(this.mobileMenuButton).display === 'none') {
                this.close();
            }
        }

        destroy() {
            this.mobileMenuButton.removeEventListener('click', this.menuToggleHandler);
            this.menu.removeEventListener('click', this.linkClickHandler);
            window.removeEventListener('resize', this.resizeHandler);
        }
    }
    new MobileMenu();


    class ThemeSwitcher {
        switcher;
        light;
        dark;
        constructor() {
            this.switcher = document.getElementById('theme-switcher');
            this.light = document.getElementById('light');
            this.dark = document.getElementById('dark');

            let theme = localStorage.getItem('theme');
            if(!theme) {
                theme = 'light';
                localStorage.setItem('theme', theme);
            }
            this[theme].classList.add('active');

            if(theme === 'dark'){
                document.body.classList.add('dark')
            }

            this.light.addEventListener('click', this.toggleTheme);
            this.dark.addEventListener('click', this.toggleTheme);
        }

        toggleTheme = (event) => {
            this.theme = event.target.closest('button').id;

            this.light.classList.remove('active');
            this.dark.classList.remove('active');
            this[this.theme].classList.add('active');

            localStorage.setItem('theme', this.theme);

            if(this.theme === 'dark'){
                document.body.classList.add('dark')
            }else {
                document.body.classList.remove('dark')
            }
        }
    }
    new ThemeSwitcher();



})();













