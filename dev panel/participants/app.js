document.addEventListener("DOMContentLoaded", function () {

    async function fetchData() {
        try {
            const response = await fetch('generate.php');
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const data = await response.json();

            console.log("Данные из PHP:", data);

            if (data.error) {
                console.error(data.error);
                return;
            }

            // Генерация HTML
            generateHTML(data);

            // После генерации HTML вызываем функцию для уменьшения текста
            adjustTextSize();
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    }

    function generateHTML(participants) {
        const app = document.getElementById('app');
        app.innerHTML = '';

        // Группировка участников по командам
        const teams = {};
        const noCommandParticipants = [];

        participants.forEach((participant, index) => {
            const commandName = participant.command_name.trim();
            if (!commandName || commandName === "no_command") {
                noCommandParticipants.push(participant);
            } else {
                if (!teams[commandName]) {
                    teams[commandName] = [];
                }
                teams[commandName].push(participant);
            }
        });

        // Генерация HTML для команд
        let teamIndex = 1;
        for (const [commandName, teamParticipants] of Object.entries(teams)) {
            const teamDiv = document.createElement('div');
            teamDiv.className = `command_${teamIndex} command`;

            const teamNameDiv = document.createElement('div');
            teamNameDiv.className = `command_${teamIndex}_name command_name`;
            teamNameDiv.textContent = commandName;
            teamDiv.appendChild(teamNameDiv);

            const participantsDiv = document.createElement('div');
            participantsDiv.className = `command_${teamIndex}_participants command_participants`;

            teamParticipants.forEach((participant, index) => {
                participantsDiv.appendChild(createParticipantHTML(participant, index + 1, `command_${teamIndex}_participant`));
            });

            teamDiv.appendChild(participantsDiv);
            app.appendChild(teamDiv);

            teamIndex++;
        }

        // Генерация HTML для участников без команды
        if (noCommandParticipants.length > 0) {
            const noCommandDiv = document.createElement('div');
            noCommandDiv.className = 'no_command_participants command';

            const noCommandTitle = document.createElement('div');
            noCommandTitle.className = 'no_command_participants_title command_name';
            noCommandTitle.textContent = 'Участники без команды';
            noCommandDiv.appendChild(noCommandTitle);

            const participantsDiv = document.createElement('div');
            participantsDiv.className = 'no_command_participants_list command_participants';

            noCommandParticipants.forEach((participant, index) => {
                participantsDiv.appendChild(createParticipantHTML(participant, index + 1, 'no_command_participant'));
            });

            noCommandDiv.appendChild(participantsDiv);
            app.appendChild(noCommandDiv);
        }
    }

    // Функция для создания HTML одного участника
    function createParticipantHTML(participant, index, prefix) {
        const participantDiv = document.createElement('div');
        participantDiv.className = `${prefix}_${index} command_participant`;

        const fullnameDiv = document.createElement('div');
        fullnameDiv.className = `${prefix}_${index}_fullname fullname`;
        fullnameDiv.textContent = participant.full_name;
        participantDiv.appendChild(fullnameDiv);

        const institutionDiv = document.createElement('div');
        institutionDiv.className = `${prefix}_${index}_institution institution`;
        institutionDiv.textContent = participant.institution;
        participantDiv.appendChild(institutionDiv);

        const selectedTrackDiv = document.createElement('div');
        selectedTrackDiv.className = `${prefix}_${index}_selectedtrack selectedtrack`;
        selectedTrackDiv.textContent = participant.selected_track;
        participantDiv.appendChild(selectedTrackDiv);

        const phoneDiv = document.createElement('div');
        phoneDiv.className = `${prefix}_${index}_phone phone`;
        phoneDiv.textContent = participant.phone;
        participantDiv.appendChild(phoneDiv);

        const emailDiv = document.createElement('div');
        emailDiv.className = `${prefix}_${index}_email email`;
        emailDiv.textContent = participant.email;
        participantDiv.appendChild(emailDiv);

        const fileLink = document.createElement('a');
        fileLink.className = `${prefix}_${index}_file file`;
        fileLink.textContent = 'согласие';
        fileLink.setAttribute('data-id', participant.id);
        fileLink.style.cursor = 'pointer';

        // Обработчик клика на кнопку
        fileLink.addEventListener('click', async (event) => {
            event.preventDefault();
            const id = fileLink.getAttribute('data-id');

            try {
                const response = await fetch(`download.php?id=${id}`); // Запрос на скачивание файла
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `file_${id}.png`; // Имя файла
                document.body.appendChild(a);
                a.click();
                a.remove();
            } catch (error) {
                console.error("Ошибка при скачивании файла:", error);
            }
        });

        participantDiv.appendChild(fileLink);

        return participantDiv;
    }

    // Функция для уменьшения текста, если он не помещается
    function adjustTextSize() {
        const containers = document.querySelectorAll('.command_participant, .no_command_participant');

        containers.forEach(container => {
            Array.from(container.children).forEach(child => {
                let fontSize = parseFloat(window.getComputedStyle(child).fontSize);
                while (child.scrollWidth > child.offsetWidth && fontSize > 8) {
                    fontSize -= 0.5; // Уменьшаем размер шрифта
                    child.style.fontSize = `${fontSize}px`;
                }
            });
        });
    }

    fetchData();
});
