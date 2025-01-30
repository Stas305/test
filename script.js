document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартную отправку формы

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // Проверяем, отправлял ли уже этот пользователь заявку (дополнительная реализация)
    if (sessionStorage.getItem('formSubmitted_' + phone)) {
        alert('Вы уже отправили заявку с этим номером телефона.');
        return;
    }

    const data = {
      'stream_code': 'vv4uf',
      'client': {
        'phone': phone,
        'name': name,
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer RLPUUOQAMIKSAB2PSGUECA'
    };


    fetch('https://order.drcash.sh/v1/order', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                // Дополнительная реализация: Сохраняем в sessionStorage, что заявка была отправлена
                sessionStorage.setItem('formSubmitted_' + phone, true);
                window.location.href = "success.html"; // Перенаправляем на страницу успеха
            } else {
                console.error('Ошибка отправки:', response.status, response.statusText);
                alert('Ошибка отправки заявки, попробуйте позже.');
            }
        })
        .catch(error => {
            console.error('Ошибка при отправке:', error);
            alert('Ошибка при отправке заявки, попробуйте позже.');
        });
});