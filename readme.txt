Primera entrea del curso Js de CodherHouse.

La idea es generar una app para la consulta de turnos para el club de padel Jardín de la Ciudad de Córdoba, en la cual el ususario pueda ingresar como invitado, como usuario o pueda llegar a registrarse.
Luego seleccionar día, hora y duración del turno.
La disponibilidad por ahora se genera de forma aleatoria.

Aclaraciones Primera Entrega:
Existe un usuario para iniciar sessión como "Jardin" y la contraseña es "1234", se realiza más que nada para implementar lo aprendido.
El registro de un nuevo usuario reemplazará al existente.

Aclaraciones segunda entrega: 
Se agregó ciclo a todo el menu inicio, solamente se cierra al ingresar la opción 4.
Se mejoró la validación al ingresar la opción "Cancelar".
Se modificaron los nombres de variables y funciones para estandarizarlas al castellano.
Se unificó las funciones menu() e inicio() en menuInicio().
Se agregó el array usuarios y se elimina el usuario predeterminado, ahora para ingresar por la opción inicio de sesión previamente se debe registrar.
Se agregó array de objetos turnos con los turnos confirmados con los cuales se chequea la disponibilidad de los turnos que se soliciten posteriormente,
se eliminó la función ramdom que generaba la disponibilidad aleatoria del turno.
Los usuarios registrados acceden aun descuento.