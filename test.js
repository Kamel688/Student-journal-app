const inputName = document.createElement("input");
const inputSurname = document.createElement("input");
const inputEmail = document.createElement("input");
const inputSpecialization = document.createElement("input");
const inputGrade = document.createElement("input");


class Person {
	constructor(name, surname, email, specialization, grade) {
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.specialization = specialization;
		this.grade = grade;
	}
}

const createElements = () => {
	const body = document.querySelector("body");
	const personTable = document.createElement("table");

	//Pierwszy element na stronie - nagłówki
	const personTr = document.createElement("tr");
	const personName = document.createElement("th");
	const personSurname = document.createElement("th");
	const personEmail = document.createElement("th");
	const personSpecialization = document.createElement("th");
	const personGrade = document.createElement("th");
	const personAction = document.createElement("th");

	personName.textContent = "Imię";
	personSurname.textContent = "Nazwisko";
	personEmail.textContent = "E-mail";
	personSpecialization.textContent = "Specjalizacja";
	personGrade.textContent = "Ocena";
	personAction.textContent = "Akcja";

	//TR i TD z przyciskami
	const personTrInputs = document.createElement("tr");
	const personTdInputName = document.createElement("td");
	const personTdInputSurname = document.createElement("td");
	const personTdInputEmail = document.createElement("td");
	const personTdInputSpecialization = document.createElement("td");
	const personTdInputGrade = document.createElement("td");

	//Przyciski
	const personActionButtons = document.createElement("td");
	personActionButtons.setAttribute("class", "buttons");

	const btnAdd = document.createElement("button");
	btnAdd.setAttribute("class", "btn add");
	btnAdd.innerHTML = '<i class="fa-solid fa-plus"></i>';

	const btnRemove = document.createElement("button");
	btnRemove.setAttribute("class", "btn remove");
	btnRemove.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

	//Inputy
	inputName.setAttribute("type", "text");
	inputName.setAttribute("class", "Name");
	inputName.setAttribute("placeholder", "Imię");

	inputSurname.setAttribute("type", "text");
	inputSurname.setAttribute("class", "Surname");
	inputSurname.setAttribute("placeholder", "Nazwisko");

	inputEmail.setAttribute("type", "text");
	inputEmail.setAttribute("class", "Email");
	inputEmail.setAttribute("placeholder", "E-mail");

	inputSpecialization.setAttribute("type", "text");
	inputSpecialization.setAttribute("class", "Specialization");
	inputSpecialization.setAttribute("placeholder", "Specjalizacja");

	inputGrade.setAttribute("type", "text");
	inputGrade.setAttribute("class", "Grade");
	inputGrade.setAttribute("placeholder", "Ocena");

	//Włożenie wszystkich komórek do wiersz (pierwszy element na stronie)
	personTr.append(
		personName,
		personSurname,
		personEmail,
		personSpecialization,
		personGrade,
		personAction
	);

	//Włożenie inputów do komórek
	personTdInputName.append(inputName);
	personTdInputSurname.append(inputSurname);
	personTdInputEmail.append(inputEmail);
	personTdInputSpecialization.append(inputSpecialization);
	personTdInputGrade.append(inputGrade);
	personActionButtons.append(btnAdd, btnRemove);

	//Włożenie do wiersza wszystkich inputów
	personTrInputs.append(
		personTdInputName,
		personTdInputSurname,
		personTdInputEmail,
		personTdInputSpecialization,
		personTdInputGrade,
		personActionButtons
	);

	//Włożenie do tabelki wszystkich inputów
	personTable.append(personTr, personTrInputs);

	//Włożenie do body tabeli z całą zawartością.
	body.append(personTable);
};

createElements();

const addPerson = () => {
	const person = new Person(
		inputName.value,
		inputSurname.value,
		inputEmail.value,
		inputSpecialization.value,
		inputGrade.value
	);

};

addPerson();