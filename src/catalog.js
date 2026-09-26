(function () {
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
                <div class="product__card ${cur.category}">
                    <div class="product__card__image">
                        <img src="/img/products/${cur.name}.jpg" alt="${cur.name}">
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