document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navOverlay = document.querySelector('.nav-overlay');
        const navLinks = document.querySelectorAll('.nav-menu .nav-link');
        const allNavItems = document.querySelectorAll('.nav-menu .nav-link, .btn-nav-mobile');
        const currentUrl = window.location.href;

        // --- GESTION DE L'ÉTAT ACTIF (AU CHARGEMENT DE LA PAGE) ---
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('#')) {
                // Si l'URL de la page courante contient la valeur du href, on l'active
                if (currentUrl.includes(href)) {
                    link.classList.add('active');
                }
            }
        });

        // --- DEUX FONCTIONS DU MENU MOBILE ---
        function toggleMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const isOpen = menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open', isOpen);
            if (navOverlay) navOverlay.classList.toggle('open', isOpen);
            document.body.classList.toggle('no-scroll', isOpen);
        }

        function closeMenu() {
            if (menuToggle) menuToggle.classList.remove('open');
            if (navMenu) navMenu.classList.remove('open');
            if (navOverlay) navOverlay.classList.remove('open');
            document.body.classList.remove('no-scroll');
        }

        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMenu);
            menuToggle.addEventListener('touchend', toggleMenu);
        }

        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
            navOverlay.addEventListener('touchend', closeMenu);
        }

        // --- ACTION AU CLIC SUR UN LIEN ---
        allNavItems.forEach(link => {
            const handler = (e) => {
                e.stopPropagation();
                const href = link.getAttribute('href');
                
                // Mettre à jour visuellement le lien actif (pour les ancres instantanées)
                if (link.classList.contains('nav-link')) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
                
                closeMenu();
                
                if (href && href !== '#') {
                    // Cas 1 : Ancre interne de défilement (ex: #propos)
                    if (href.startsWith('#')) {
                        const target = document.querySelector(href);
                        if (target) {
                            e.preventDefault();
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    } else {
                        // Cas 2 : Lien vers une page HTML externe
                        window.location.href = href;
                    }
                }
            };

            link.addEventListener('click', handler);
            link.addEventListener('touchend', handler);
        });
    });