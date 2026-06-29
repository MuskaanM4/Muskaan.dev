document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('portfolioContactForm');
    const successMsg = document.getElementById('formSuccess');

    if (!form) return;

    const inputs = form.querySelectorAll('input[required], textarea');

    inputs.forEach((input) => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let valid = true;
        inputs.forEach((input) => {
            if (!validateField(input)) valid = false;
        });

        if (!valid) return;

        const name = document.getElementById('name').value;
        const contactMethod = document.getElementById('contact-method').value;

        form.style.display = 'none';

        if (successMsg) {
            successMsg.querySelector('.success-name').textContent = name;
            successMsg.querySelector('.success-contact').textContent = contactMethod;
            successMsg.classList.add('show');
        }

        setTimeout(() => {
            form.reset();
            form.style.display = '';
            inputs.forEach((input) => input.classList.remove('valid', 'invalid'));
            if (successMsg) successMsg.classList.remove('show');
        }, 5000);
    });
});

function validateField(input) {
    const value = input.value.trim();
    let valid = value.length > 0;

    if (input.id === 'contact-method' && valid) {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isPhone = /^[\d\s+\-()]{7,}$/.test(value);
        valid = isEmail || isPhone;
    }

    input.classList.toggle('valid', valid && value.length > 0);
    input.classList.toggle('invalid', !valid && value.length > 0);
    return valid;
}
