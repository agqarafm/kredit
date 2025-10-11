document.addEventListener('DOMContentLoaded', () => {

    // --- GOOGLE APPS SCRIPT URL ---
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxMa1jZrOm8jAem44VfM6w3IytbssPVcmwd0f6TNwIszT6_cVzrpwl2hCAnwf5worzoZQ/exec'; // <-- BU HİSSƏNİ DƏYİŞƏCƏKSİNİZ!

    // Elementlərin seçilməsi
    const productCodeInput = document.getElementById('product-code');
    const productDetailsDiv = document.getElementById('product-details');
    const totalPriceSpan = document.getElementById('total-price');

    const customerCodeInput = document.getElementById('customer-code');
    const customerNameInput = document.getElementById('customer-name');
    const customerFinInput = document.getElementById('customer-fin');
    const customerPhoneInput = document.getElementById('customer-phone');
    
    const newCustomerBtn = document.getElementById('new-customer-btn');
    const modal = document.getElementById('new-customer-modal');
    const closeButton = document.querySelector('.close-button');
    const newCustomerForm = document.getElementById('new-customer-form');

    let currentProduct = null;

    // Menyuların açılıb-bağlanması
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const submenu = item.nextElementSibling;
            submenu.classList.toggle('active');
        });
    });


    // Məhsul koduna görə məlumatların gətirilməsi
    productCodeInput.addEventListener('change', async () => {
        const productCode = productCodeInput.value.trim();
        if (!productCode) return;

        productDetailsDiv.innerHTML = 'Yüklənir...';
        
        try {
            const response = await fetch(`${WEB_APP_URL}?action=getProduct&code=${productCode}`);
            const result = await response.json();

            if (result.success) {
                currentProduct = result.data;
                productDetailsDiv.innerHTML = `
                    <strong>Məhsul:</strong> ${currentProduct.name}<br>
                    <strong>Nağd Qiymət:</strong> ${currentProduct.price} AZN
                `;
                totalPriceSpan.textContent = parseFloat(currentProduct.price).toFixed(2);
            } else {
                productDetailsDiv.innerHTML = `<span style="color: red;">${result.message}</span>`;
                totalPriceSpan.textContent = '0.00';
                currentProduct = null;
            }
        } catch (error) {
            productDetailsDiv.innerHTML = `<span style="color: red;">Server xətası.</span>`;
            console.error('Error fetching product:', error);
        }
    });

    // Yeni müştəri modalının açılması
    newCustomerBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Modalın bağlanması
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Yeni müştərinin yadda saxlanması
    newCustomerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const customerData = {
            name: document.getElementById('new-customer-name-modal').value,
            fin: document.getElementById('new-customer-fin-modal').value,
            phone: document.getElementById('new-customer-phone-modal').value
        };

        try {
            const response = await fetch(WEB_APP_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'addCustomer', data: customerData })
            });
            const result = await response.json();

            if(result.success) {
                alert('Müştəri uğurla əlavə edildi!');
                // Sahələri doldur
                customerCodeInput.value = result.data.customerCode;
                customerNameInput.value = result.data.name;
                customerFinInput.value = result.data.fin;
                customerPhoneInput.value = result.data.phone;
                modal.style.display = 'none';
                newCustomerForm.reset();
            } else {
                alert(`Xəta: ${result.message}`);
            }

        } catch (error) {
            alert('Serverlə əlaqə qurmaq mümkün olmadı.');
            console.error('Error adding customer:', error);
        }
    });
});
