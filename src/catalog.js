(function () {
    class createCards {
        constructor() {
            this.container = document.getElementById('product-cards');
            this.fetchData().then(
                data => {
                    this.createProductCards(data);
                    document.querySelectorAll('[data-modal]').forEach( a => {
                        a.addEventListener('click', (event) => this.openModal(event, data))
                    } )
                }
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

        openModal = (event, data) => {
            event.preventDefault();
            const target = event.target.closest('a').dataset.modal

            new Modal(...data.filter(i => i.name === target));
        }

        createProductCards = (data) => {
            this.container.innerHTML = data.reduce((acc, cur) => {
                return acc += `
                <a href="#" class="product__card ${cur.category}" data-modal="${cur.name}">
                    <div class="product__card__image">
                        <img src="/img/products/${cur.name}.jpg" alt="${cur.name}">
                    </div>
                    <div class="product__card__content">
                        <h3>${cur.name}</h3>
                        <p class="desc">${cur.description}</p>
                        <div class="h3">$${cur.price}</div>
                    </div>
                </a>`
            }, '');
        }
    }
    new createCards();

    class Modal {
        constructor(data) {
            this.data = data;
            this.modal = document.createElement('div');

            this.overlay = document.createElement('div')
            this.overlay.classList.add('modal__overlay');
            this.overlay.addEventListener('click', this.destroy);

            this.createModal();
        }

        createModal = () => {
            this.modal.classList.add('modal');
            this.modal.innerHTML = `
                <div class="col d-none d-md-block">
                    <img src="/img/products/${this.data.name}.jpg" alt="${this.data.name}">
                </div>
                <div class="col">
                    <h3>${this.data.name}</h3>
                    <p>${this.data.description}</p>
                </div>
            `
            document.body.append(this.modal)
            document.body.append(this.overlay)
        }

        destroy() {
            
        }
    }

    class ProductCardSwitcher {
        category = ['coffee', 'tea', 'dessert'];
        activeCategory = this.category[0];
        constructor() {
            this.category.forEach( cat => {
                this[cat] = document.getElementById(`product-category__${cat}`);
                this[cat].addEventListener('click', this.toggleCategory)

            });

            this.productCards = document.getElementById('product-cards');

            this[this.activeCategory].classList.add('active');
            this.productCards.classList.add(this.activeCategory);
        }

        toggleCategory = (event) => {
            this[this.activeCategory].classList.remove('active');
            this.productCards.classList.remove(this.activeCategory);
            this.activeCategory = event.target.closest('button').id.replace('product-category__', '');
            this[this.activeCategory].classList.add('active');
            this.productCards.classList.add(this.activeCategory);
        }

        destroy() {
            category.forEach( i => {
                this[i].removeEventListener('click', this.toggleCategory)
            });
        }
    }

    new ProductCardSwitcher();
})()