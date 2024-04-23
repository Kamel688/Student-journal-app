const table = document.querySelector("table");
const tbody = document.querySelector('tbody');
const btnAdd = document.querySelector(".add");
const inputName = document.querySelector(".name");
const inputSurname = document.querySelector(".surname");
const inputEmail = document.querySelector(".email");
const inputSpecialization = document.querySelector(".specialization");
const inputGrade = document.querySelector(".grade");
const errorMessage = document.querySelector('.error-message');

const invalidNameText = document.querySelector('.invalid-name')
const invalidSurnameText = document.querySelector('.invalid-surname')
const invalidEmailText = document.querySelector('.invalid-email');
const invalidSpecializationText = document.querySelector('.invalid-specialization');
const invalidGradeText = document.querySelector('.invalid-grade');
const emailIsExistText = document.querySelector('.exist-email');

const validateEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateDigit = /^(?=.*[0-9])/;

let isValidName = false;
let isValidSurname = false;
let isValidEmail = false;
let isValidSpecialization = false;
let isValidGrade = false;
let isNotExistEmail = true;

let tableRow;
const editRow = document.createElement("tr");

const editName = document.createElement("input");
editName.setAttribute("type", "text");
editName.setAttribute("class", "name");
editName.setAttribute("placeholder", "Imię");

const editSurname = document.createElement("input");
editSurname.setAttribute("type", "text");
editSurname.setAttribute("class", "surname");
editSurname.setAttribute("placeholder", "Nazwisko");

const editEmail = document.createElement("input");
editEmail.setAttribute("type", "text");
editEmail.setAttribute("class", "email");
editEmail.setAttribute("placeholder", "E-mail");

const editSpecialization = document.createElement("input");
editSpecialization.setAttribute("type", "text");
editSpecialization.setAttribute("class", "specialization");
editSpecialization.setAttribute("placeholder", "Specializacja");

const editGrade = document.createElement("input");
editGrade.setAttribute("type", "text");
editGrade.setAttribute("class", "grade");
editGrade.setAttribute("placeholder", "Ocena");

//Komunikat o błędzie
const errorMsgName = document.createElement('p');
errorMsgName.setAttribute('class','invalid-name');
const errorMsgSurname = document.createElement('p');
errorMsgSurname.setAttribute('class','invalid-surname');
const errorMsgEmail = document.createElement('p');
errorMsgEmail.setAttribute('class','invalid-email');
const errorMsgSpecialization = document.createElement('p');
errorMsgSpecialization.setAttribute('class','invalid-specialization');
const errorMsgGrade = document.createElement('p');
errorMsgGrade.setAttribute('class','invalid-grade');
const errorExistEmail = document.createElement('p');
errorExistEmail.setAttribute('class','exist-email');


const allEmails = [];

const addPerson = () => {
	const personTr = document.createElement("tr");
	const personNameTd = document.createElement("td");
	const personSurnameTd = document.createElement("td");
	const personEmailTd = document.createElement("td");
	const personSpecializationTd = document.createElement("td");
	const personGradeTd = document.createElement("td");

	const buttons = document.createElement("td");
	const btnEdit = document.createElement("button");
	const btnRemove = document.createElement("button");

	//buttons
	buttons.setAttribute("class", "buttons");
	btnEdit.setAttribute("class", "btn edit");
	btnRemove.setAttribute("class", "btn remove");

	btnEdit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
	btnRemove.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

	if(allEmails.includes(inputEmail.value.toLocaleLowerCase())){
		emailIsExistText.textContent = 'E-mail już istnieje';
		isNotExistEmail = false;
	}else{
		emailIsExistText.textContent = '';
		isNotExistEmail = true;
	}
	

	if(inputName.value.length < 3 || inputName.value.match(validateDigit)){
		invalidNameText.textContent = 'Wprowadź imię';
		isValidName = false;
	}else{
		invalidNameText.textContent = '';
		isValidName = true;
	}
	if(inputSurname.value.length < 4 || inputSurname.value.match(validateDigit)){
		invalidSurnameText.textContent = 'Wprowadź nazwisko';
		isValidSurname = false
	}else{
		invalidSurnameText.textContent = '';
		isValidSurname = true;
	}
	if(!inputEmail.value.match(validateEmail)){
		invalidEmailText.textContent = 'Nieprawidłowy format';
		isValidEmail = false;
	} else{
		invalidEmailText.textContent = '';
		isValidEmail = true;
	}
	if(inputSpecialization.value.length < 8 || inputSpecialization.value.match(validateDigit)){
		invalidSpecializationText.textContent = 'Wprowadź specializację'
		isValidSpecialization = false;
	}else{
		invalidSpecializationText.textContent = ''
		isValidSpecialization = true;
	}
	if(!inputGrade.value.match(validateDigit)){
		invalidGradeText.textContent = 'Wprowadź ocenę';
		isValidGrade = false;
	}else if(inputGrade.value.length > 1) {
		invalidGradeText.textContent = 'Wprowadź jedną cyfrę';
		isValidGrade = false;
	}else{
		invalidGradeText.textContent = '';
		isValidGrade = true;
	}
	if(inputName.value.trim() && inputSurname.value.trim() && inputEmail.value.trim() && inputSpecialization.value.trim() && inputGrade.value.trim() && isValidName && isValidSurname && isValidEmail && isValidSpecialization && isValidGrade && isNotExistEmail){
		//Inicializacja osoby do wiersza w tabeli
		personNameTd.textContent = inputName.value.toLocaleLowerCase();
		personSurnameTd.textContent = inputSurname.value.toLocaleLowerCase();
		personEmailTd.textContent = inputEmail.value.toLowerCase();
		personSpecializationTd.textContent = inputSpecialization.value.toLowerCase();
		personGradeTd.textContent = inputGrade.value;
		allEmails.push(inputEmail.value.toLowerCase());
		//Dodanie przycisków do komórki
		buttons.append(btnEdit, btnRemove);

		//Dodanie komórek do wiersza tabeli
		personTr.append(
			personNameTd,
			personSurnameTd,
			personEmailTd,
			personSpecializationTd,
			personGradeTd,
			buttons
		);
		tbody.append(personTr);
		//Wyczyszczenie inputów
		inputName.value = '';
		inputSurname.value = '';
		inputEmail.value = '';
		inputSpecialization.value = '';
		inputGrade.value = '';

		//Wyczyszczenie komunikatu
		errorExistEmail.textContent = '';
	}
	console.log(allEmails);
};

const editPerson = (e) => {
	tableRow = e.target.closest("tr"); //Kliknięty wiersz
	//kliknięte komórki - potrzebne aby inputy miały wartości komórek podczas edycji - bez tego inputy będą puste
	const closestName = tableRow.childNodes.item(0);
	const closestSurname = tableRow.childNodes.item(1);
	const closestEmail = tableRow.childNodes.item(2);
	const closestSpecialization = tableRow.childNodes.item(3);
	const closestGrade = tableRow.childNodes.item(4);

	//Pojemniki na inputy i error message
	const boxName = document.createElement('div');
	boxName.setAttribute('class','edit-box box-name');
	const boxSurname = document.createElement('div');
	boxSurname.setAttribute('class','edit-box box-surname');
	const boxEmail = document.createElement('div');
	boxEmail.setAttribute('class','edit-box box-email');
	const boxSpecialization = document.createElement('div');
	boxSpecialization.setAttribute('class','edit-box box-specialization');
	const boxGrade = document.createElement('div');
	boxGrade.setAttribute('class','edit-box box-grade');

	//Komórki
	const tdName = document.createElement("td");
	const tdSurname = document.createElement("td");
	const tdEmail = document.createElement("td");
	const tdSpecialization = document.createElement("td");
	const tdGrade = document.createElement("td");
	const tdButtons = document.createElement("td");

	const btnEdit = document.createElement("button");
	btnEdit.setAttribute("class", "btn confirm");
	btnEdit.innerHTML = '<i class="fa-solid fa-check"></i>';

	const btnRemove = document.createElement("button");
	btnRemove.setAttribute("class", "btn reject");
	btnRemove.innerHTML = '<i class="fa-solid fa-xmark"></i>';


	//inputy
	editName.value = closestName.textContent;
	editSurname.value = closestSurname.textContent;
	editEmail.value = closestEmail.textContent;
	editSpecialization.value = closestSpecialization.textContent;
	editGrade.value = closestGrade.textContent;

	if(!editRow.innerHTML){
	//divy
	boxName.append(editName,errorMsgName);
	boxSurname.append(editSurname,errorMsgSurname);
	boxEmail.append(editEmail,errorMsgEmail,errorExistEmail);
	boxSpecialization.append(editSpecialization, errorMsgSpecialization);
	boxGrade.append(editGrade, errorMsgGrade);

	//Dodanie do komórki przycisków
	tdButtons.append(btnEdit, btnRemove);
	//Dodanie do komórek inputów
	tdName.append(boxName);
	tdSurname.append(boxSurname);
	tdEmail.append(boxEmail);
	tdSpecialization.append(boxSpecialization);
	tdGrade.append(boxGrade);

	//Dodanie do wiersza wszystkich komórek
		editRow.append(
			tdName,
			tdSurname,
			tdEmail,
			tdSpecialization,
			tdGrade,
			tdButtons
		);
	}
		
	if(!tableRow.classList.contains("display-none")){
		tableRow.classList.add("display-none");
	}
	if(editRow.classList.contains("display-none")){
		editRow.classList.remove("display-none");
	}
	
	tableRow.after(editRow);
	errorMsgEmail.textContent = '';
};

const editPersonConfirm = () => {
	//Tr do edycji
	const nameToEdit = tableRow.childNodes.item(0);
	const surnameToEdit = tableRow.childNodes.item(1);
	const emailToEdit = tableRow.childNodes.item(2);
	const specializationToEdit = tableRow.childNodes.item(3);
	const gradeToEdit = tableRow.childNodes.item(4);
	//console.log(editRow.childNodes.item(1).firstChild.lastChild);
	console.log('test');
	console.log(emailToEdit.textContent.toLowerCase());
	console.log(editEmail.value.toLowerCase());
	// for(let email of allEmails){
	// 	if(email == editEmail.value || email == editEmail.value.toUpperCase()){
	// 		errorExistEmail.textContent = 'E-mail już istnieje';
	// 		isNotExistEmail = false;
	// 	}else{
	// 		allEmails.push(editEmail.value.toUpperCase());
	// 		isNotExistEmail = true;
	// 		errorExistEmail.textContent = '';
	// 	}
	// }
	if(allEmails.includes(editEmail.value.toLowerCase())){
		if(emailToEdit.textContent.toLowerCase() != editEmail.value.toLowerCase()){
		errorExistEmail.textContent = 'Email już istnieje';
		isNotExistEmail =  false;
		}else{
			isNotExistEmail =  true;
		}
	}else{
		//Jeśli nie istnieje to usuwamy ten element aby podmienić innym e-mailem
		const index = allEmails.indexOf(emailToEdit.textContent); //Indeks elementu, który trzeba usunąć z tablicy
		allEmails.splice(index,1);
		allEmails.push(editEmail.value.toLowerCase());
		isNotExistEmail = true;
		errorExistEmail.textContent = '';
	}

	if(editName.value.length < 3 || editName.value.match(validateDigit)){
		errorMsgName.textContent = 'Wprowadź imię';
		isValidName = false;
	}else{
		errorMsgName.textContent = '';
		isValidName = true;
	}
	if(editSurname.value.length < 4 || editSurname.value.match(validateDigit)){
		errorMsgSurname.textContent = 'Wprowadź nazwisko';
		isValidSurname = false
	}else{
		errorMsgSurname.textContent = '';
		isValidSurname = true;
	}
	if(!editEmail.value.match(validateEmail)){
		errorMsgEmail.textContent = 'Nieprawidłowy format';
		isValidEmail = false;
	} else{
		errorMsgEmail.textContent = '';
		isValidEmail = true;
	}
	if(editSpecialization.value.length < 8 || editSpecialization.value.match(validateDigit)){
		errorMsgSpecialization.textContent = 'Wprowadź specializację'
		isValidSpecialization = false;
	}else{
		errorMsgSpecialization.textContent = ''
		isValidSpecialization = true;
	}
	if(!editGrade.value.match(validateDigit)){
		errorMsgGrade.textContent = 'Wprowadź liczbę';
		isValidGrade = false;
	}else if(editGrade.value.length > 1){
		errorMsgGrade.textContent = 'Wprowadź jedną cyfrę';
		isValidGrade = false;
	}else{
		errorMsgGrade.textContent = '';
		isValidGrade = true;
	}
	
	//Inicjalizacja nowych danych do komórek z inputów
	   if(editName.value.trim() && editSurname.value.trim()  && editEmail.value.trim()  && editSpecialization.value.trim()  && editGrade.value.trim() && isValidName && isValidSurname && isValidEmail && isValidSpecialization && isValidGrade && isNotExistEmail){
		nameToEdit.textContent = editName.value.toLowerCase();
		surnameToEdit.textContent = editSurname.value.toLowerCase();
		emailToEdit.textContent = editEmail.value.toLocaleLowerCase();
		specializationToEdit.textContent = editSpecialization.value.toLowerCase();
		gradeToEdit.textContent = editGrade.value;
		//zmiana klas
		editRow.classList.add("display-none");
		tableRow.classList.remove("display-none");
		console.log(editRow);
		errorMessage.textContent = '';
		errorExistEmail.textContent = '';
	}

};

const removePerson = (e) => {
	console.log(e.target.closest("tr"));
	e.target.closest("tr").remove();
};

const clickController = (e) => {
	if (e.target.matches(".remove") || e.target.matches(".fa-trash-can")) {
		removePerson(e);
	} else if (e.target.matches(".edit") || e.target.matches(".fa-pen-to-square")){
			editPerson(e);
			console.log(e.target);
	} else if((e.target.matches(".confirm")) || (e.target.matches(".fa-check"))){
			editPersonConfirm();
	} else if(e.target.matches('.reject') || e.target.matches('.fa-xmark')){
		if(tableRow.classList.contains('display-none')){
			tableRow.classList.remove('display-none');
		}
		if(!editRow.classList.contains('display-none')){
			editRow.remove();
		}
		errorExistEmail.textContent = '';
	}
};

const check = (e) => {
	console.log(e.target.closest('button'));
}

btnAdd.addEventListener("click", addPerson);
addEventListener("click", clickController);

