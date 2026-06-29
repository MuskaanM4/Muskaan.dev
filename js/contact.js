document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('portfolioContactForm');
    const successMsg = document.getElementById('formSuccess');
    const statusEl = document.getElementById('formStatus');

    if (!form) return;

    const inputs = form.querySelectorAll('input[required], textarea');
    const submitBtn = form.querySelector('button[type="submit"]');

    inputs.forEach((input) => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let valid = true;
        inputs.forEach((input) => {
            if (!validateField(input)) valid = false;
        });

        if (!valid) {
            setStatus('Please fill in the required details first ✨', true);
            return;
        }

        const name = document.getElementById('name').value.trim();
        const contactMethod = document.getElementById('contact-method').value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const ccValue = emailPattern.test(contactMethod) ? contactMethod : '';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        setStatus('Sending your message...');

        const formData = new FormData(form);
        formData.set('_subject', `New portfolio message from ${name}`);
        formData.set('_captcha', 'false');
        formData.set('_template', 'table');
        formData.set('_replyto', emailPattern.test(contactMethod) ? contactMethod : '');
        formData.set('_cc', ccValue);

        try {
            const response = await fetch('https://formsubmit.co/ajax/muskaanmahabier@gmail.com', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Unable to send message right now.');
            }

            form.style.display = 'none';

            if (successMsg) {
                successMsg.querySelector('.success-name').textContent = name || 'there';
                successMsg.querySelector('.success-contact').textContent = contactMethod || 'your inbox';
                successMsg.classList.add('show');
            }

            setStatus('Message sent successfully 💌', false);

            setTimeout(() => {
                form.reset();
                form.style.display = '';
                inputs.forEach((input) => input.classList.remove('valid', 'invalid'));
                if (successMsg) successMsg.classList.remove('show');
                setStatus('');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message 💌';
                }
            }, 5000);
        } catch (error) {
            setStatus(error.message || 'Something went wrong. Please try again.', true);
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message 💌';
            }
        }
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

function setStatus(message, isError = false) {
    const statusEl = document.getElementById('formStatus');
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `form-status${isError ? ' error' : ''}`;
}
