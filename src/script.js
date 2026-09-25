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

    class createCards {
        constructor() {
            this.container = document.getElementById('product-cards');
            this.fetchData().then(
                data => this.createProductCards(data)
            );
        }

        fetchData = async () => {
            try {
                const resp = await fetch('/products.json');
                if(!resp.ok) {
                    console.error('Failed to fetch data')
                }
                return await resp.json();
            } catch {
                throw new Error("Failed to parse data");
            }

        }

        createProductCards = (data) => {
            const cardsElements = data.reduce( (acc, cur) => {
                return acc += `
                <div class="product__card">
                    <div class="product__card__image">
                        <img src="/img/products/${cur.category}-6.jpg" alt="${cur.name}">
                    </div>
                    <div class="product__card__content">
                        <h3>${cur.name}</h3>
                        <p class="desc">${cur.description}</p>
                        <div class="h3">$${cur.price}</div>
                    </div>
                </div>`
            }, '');
            this.container.innerHTML = cardsElements;
        }
    }

    new createCards();
})();













