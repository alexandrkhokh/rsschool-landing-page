(function (){
    class MobileMenu {
        mobileMenuButton;
        constructor() {
            this.mobileMenuButton = document.getElementById('header-menu-button-mobile');
            this.mobileMenuButton.addEventListener('click', this.menuToggleHandler);
        }

        menuToggleHandler = () => {
            console.log('click Menu');
        }

        destroy() {
            this.mobileMenuButton.removeEventListener('click', this.menuToggleHandler);
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
                localStorage.setItem('theme', 'light');
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