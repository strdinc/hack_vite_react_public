document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    const formData = new FormData(this);
    const successMessage = document.getElementById('successMessage');
    const menuButtons = document.getElementById('menubuttonsall');

    // Скрываем кнопки меню
    menuButtons.style.display = 'none';

    fetch('submit.php', {
        method: 'POST',
        body: formData // Передаем данные формы
    })
        .then(response => response.json()) // Получаем ответ от сервера в формате JSON
        .then(data => {
            if (data.status === 'success') {
                document.querySelector('#successMessage .success_massage_text').textContent = data.message;
                successMessage.style.display = 'block';

                setTimeout(() => {
                    successMessage.style.display = 'none';
                    menuButtons.style.display = 'flex'
                }, 2000);
            } else {
                // Если ошибка, выводим сообщение об ошибке
                alert(data.message);

                // Возвращаем кнопки меню через 2 секунды
                setTimeout(() => {
                    menuButtons.style.display = 'flex';
                }, 2000);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке данных.');

            // Возвращаем кнопки меню через 2 секунды
            setTimeout(() => {
                menuButtons.style.display = 'flex';
            }, 2000);
        });
});