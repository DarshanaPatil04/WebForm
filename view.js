document.addEventListener('DOMContentLoaded', async () => {
    const userDataContainer = document.getElementById('userData');

    try {
        const response = await fetch('http://localhost:5000/api/data');
        const data = await response.json();

        if (response.ok) {
            if (data.length === 0) {
                userDataContainer.innerHTML = '<p class="no-data">No submissions yet.</p>';
                return;
            }

            data.forEach(entry => {
                const entryElement = document.createElement('div');
                entryElement.className = 'data-row';
                entryElement.innerHTML = `
                    <h3>${entry.name}</h3>
                    <p><strong>Email:</strong> ${entry.email}</p>
                    <p><strong>Phone:</strong> ${entry.phone_number}</p>
                    <p><strong>Message:</strong> ${entry.message}</p>
                `;
                userDataContainer.appendChild(entryElement);
            });
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Error loading data. Please try again later.';
        userDataContainer.appendChild(errorMessage);
    }
}); 