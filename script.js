
const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");
const logoText = document.querySelector(".logo-text");

// Toggle mobile menu visibility
menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu")
});
logoText.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu")
});

// Close menu when the close button is clicked 
menuCloseButton.addEventListener("click", () => menuOpenButton.click()); 

navLinks.forEach(link => {
    link.addEventListener('click', () => menuOpenButton.click());
});

// Initialize swiper 
const swiper = new Swiper('.slider-wrapper', {
    loop: true, 
    grabCursor: true, 
    spaceBetween: 20,
    effect: 'slide',
    speed: 600,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true, 
    dynamicBullets: true, 
    },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },

    // responsive breakpoint 
    breakpoints: {
        0: {
            slidesPerView: 1,
            effect: 'flip'
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    },

    // autoplay
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// ...existing code...

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const messageBox = document.getElementById('form-message');
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            submitButton.textContent = 'Sending ...';
            submitButton.disabled = true;

            const formData = new URLSearchParams();
            formData.append('name', form.elements['name'].value);
            formData.append('email', form.elements['email'].value);
            formData.append('message', form.elements['message'].value);

            fetch('https://script.google.com/macros/s/AKfycbyhBLrJcvnLJO4g6y6Kz-UFaYbjM434xVtPqKLTubm-VmnLxzVfXg3PHPwQBsaiKBo/exec', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                messageBox.textContent = 'Message sent successfully!';
                messageBox.classList.add('success');
                messageBox.style.display = 'block';
                form.reset();
                setTimeout(() => {
                    window.location.href = "#contact-section";
                }, 3000);
            })
            .catch(error => {
                messageBox.textContent = 'Error sending message. Please try again.';
                messageBox.classList.add('error');
                messageBox.style.display = 'block';
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
});