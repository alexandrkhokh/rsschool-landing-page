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
            this.modalEl = document.getElementById('modal');
            this.modalEl.classList.add('show');

            this.overlayEl = document.createElement('div')
            this.overlayEl.classList.add('modal__overlay');
            this.overlayEl.addEventListener('click', this.destroy);

            this.sizes = data.sizes;
            this.sizesElArray = Object.entries(this.sizes).map(([key, { size }], i) => {
                const label = document.createElement('label')
                const sizeEl = document.createElement('input')
                sizeEl.setAttribute('type', 'radio')
                sizeEl.setAttribute('name', 'size')
                sizeEl.setAttribute('value', key)
                sizeEl.checked = i === 0
                label.append(sizeEl, `${key.toUpperCase()} ${size}`)
                return label
            });

            this.sizesEl = this.modalEl.querySelector('.sizes');
            this.sizesEl.replaceChildren(...this.sizesElArray);

            this.additives = data.additives;

            this.closeButton = this.modalEl.querySelector('.close');

            this.createModal();
        }

        createModal = () => {

            const img = this.modalEl.querySelector('img')
            img.src = `/img/products/${this.data.name}.jpg`
            img.alt = this.data.name

            this.modalEl.querySelector('.modal__title').textContent = this.data.name
            this.modalEl.querySelector('p').textContent = this.data.description
            this.modalEl.querySelector('.price').textContent = `$ ${this.calculatePrice()}`

            this.closeButton.addEventListener('click', this.destroy)

            document.body.append(this.overlayEl)
        }

        calculatePrice = () => {
            let price = this.data.price;
            return price;
        }

        destroy = () => {
            this.overlayEl.removeEventListener('click', this.destroy);
            this.modalEl.classList.remove('show')
            this.overlayEl.remove()
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