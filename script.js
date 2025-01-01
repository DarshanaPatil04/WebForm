document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');

    // Validation patterns
    const patterns = {
        email: /^[\w\.-]+@[\w\.-]+\.\w+$/,
        phone: /^\+?1?\d{9,15}$/
    };

    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    function clearError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Clear previous errors
        clearError(nameError);
        clearError(emailError);
        clearError(phoneError);
        clearError(messageError);

        // Validate name
        if (name.length < 2) {
            showError(nameError, 'Name must be at least 2 characters long');
            isValid = false;
        }

        // Validate email
        if (!patterns.email.test(email)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate phone
        if (!patterns.phone.test(phone)) {
            showError(phoneError, 'Please enter a valid phone number');
            isValid = false;
        }

        // Validate message
        if (message.length < 10) {
            showError(messageError, 'Message must be at least 10 characters long');
            isValid = false;
        }

        return isValid;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone_number: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        try {
            const response = await fetch('http://localhost:5000/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Form submitted successfully!';
                
                // Insert message before the form
                form.parentNode.insertBefore(successMessage, form);
                
                // Clear form
                form.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } else {
                throw new Error(data.error || 'Submission failed');
            }
        } catch (error) {
            // Create error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = error.message;
            
            // Insert message before the form
            form.parentNode.insertBefore(errorMessage, form);
            
            // Remove error message after 3 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        }
    });
}); 