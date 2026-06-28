document.addEventListener('DOMContentLoaded', () => {
    
    // --- BONUS: Título Dinámico ---
    const formTitle = document.getElementById('form-title');
    const inputFullname = document.getElementById('fullname');

    const updateTitle = (e) => {
        const name = e.target.value.trim();
        formTitle.textContent = name === '' ? 'HOLA' : `HOLA ${name.toUpperCase()}`;
    };

    // Eventos para el Bonus
    inputFullname.addEventListener('keyup', updateTitle);
    inputFullname.addEventListener('focus', updateTitle);

    // --- REGLAS DE VALIDACIÓN ---
    const rules = {
        fullname: {
            validate: (val) => val.length > 6 && val.includes(' '),
            message: 'Debe tener más de 6 letras y al menos un espacio.'
        },
        email: {
            validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
            message: 'Formato de email inválido.'
        },
        password: {
            validate: (val) => val.length >= 8 && /(?=.*[a-zA-Z])(?=.*[0-9])/.test(val),
            message: 'Al menos 8 caracteres, formados por letras y números.'
        },
        'rep-password': {
            validate: (val) => val === document.getElementById('password').value && val !== '',
            message: 'Las contraseñas no coinciden.'
        },
        age: {
            validate: (val) => Number.isInteger(Number(val)) && Number(val) >= 18,
            message: 'Debe ser un número entero mayor o igual a 18.'
        },
        phone: {
            validate: (val) => /^\d{7,}$/.test(val),
            message: 'Al menos 7 dígitos, sin espacios, guiones ni paréntesis.'
        },
        address: {
            validate: (val) => val.length >= 5 && /(?=.*[a-zA-Z])(?=.*[0-9])/.test(val) && val.includes(' '),
            message: 'Al menos 5 caracteres, con letras, números y un espacio.'
        },
        city: {
            validate: (val) => val.length >= 3,
            message: 'Debe tener al menos 3 caracteres.'
        },
        zipcode: {
            validate: (val) => val.length >= 3,
            message: 'Debe tener al menos 3 caracteres.'
        },
        dni: {
            validate: (val) => /^\d{7,8}$/.test(val),
            message: 'Debe ser un número de 7 u 8 dígitos.'
        }
    };

    // --- EVENTOS BLUR Y FOCUS PARA TODOS LOS CAMPOS ---
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('blur', (e) => {
            const fieldId = e.target.id;
            const value = e.target.value.trim();
            const errorSpan = document.getElementById(`err-${fieldId}`);

            if (rules[fieldId] && !rules[fieldId].validate(value)) {
                errorSpan.textContent = rules[fieldId].message;
                errorSpan.classList.add('visible');
            }
        });

        input.addEventListener('focus', (e) => {
            const fieldId = e.target.id;
            const errorSpan = document.getElementById(`err-${fieldId}`);
            if (errorSpan) {
                errorSpan.classList.remove('visible');
                errorSpan.textContent = '';
            }
        });
    });

    // --- EVENTO SUBMIT DEL FORMULARIO ---
    const form = document.getElementById('subscription-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que se recargue la página

        let hasErrors = false;
        let successData = "Datos cargados correctamente:\n\n";
        let errorData = "Se encontraron los siguientes errores:\n\n";

        inputs.forEach(input => {
            const fieldId = input.id;
            const value = input.value.trim();
            
            if (rules[fieldId]) {
                if (!rules[fieldId].validate(value)) {
                    hasErrors = true;
                    errorData += `- ${fieldId}: ${rules[fieldId].message}\n`;
                    // Mostrar también en el HTML
                    const errorSpan = document.getElementById(`err-${fieldId}`);
                    errorSpan.textContent = rules[fieldId].message;
                    errorSpan.classList.add('visible');
                } else {
                    successData += `- ${fieldId}: ${value}\n`;
                }
            }
        });

        if (hasErrors) {
            alert(errorData);
        } else {
            alert(successData);
        }
    });
});