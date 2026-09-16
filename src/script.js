(function (){
    const mobileMenuButton = document.getElementById('header-menu-button-mobile');

    const menuToggleHandler = () => {
        console.log('click Menu');
    }

    mobileMenuButton.addEventListener('click', menuToggleHandler);
})();