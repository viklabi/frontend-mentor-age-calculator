const dayLabel = document.querySelector(".day-label");
const monthLabel = document.querySelector(".month-label");
const yearLabel = document.querySelector(".year-label");

const dayError = document.querySelector(".day-error");
const monthError = document.querySelector(".month-error");
const yearError = document.querySelector(".year-error");

const yearAge = document.querySelector(".year-age");
const monthAge = document.querySelector(".month-age");
const dayAge = document.querySelector(".day-age");

const day = new Date();
const dayNumber = day.getDate();
const monthNumber = day.getMonth() + 1;
const yearNumber = day.getFullYear();

const calcAge = () => {
	validateForm();
	if (validateForm()) {
		const birthDay = +document.querySelector("#day").value;
		const birthMonth = +document.querySelector("#month").value;
		const birthYear = +document.querySelector("#year").value;

		dayError.innerHTML = "";
		monthError.innerHTML = "";
		yearError.innerHTML = "";

		let ageInYears = yearNumber - birthYear;
		let ageInMonths = monthNumber - birthMonth;
		let ageInDays = dayNumber - birthDay;

		if (ageInDays < 0) {
			ageInMonths--;
			ageInDays += new Date(yearNumber, monthNumber - 1, 0).getDate();
		}

		if (ageInMonths < 0) {
			ageInYears--;
			ageInMonths += 12;
		}

		yearAge.innerHTML = ageInYears;
		monthAge.innerHTML = ageInMonths;
		dayAge.innerHTML = ageInDays;
	}
};

document.querySelector("button").addEventListener("click", e => {
	e.preventDefault();
	calcAge();
});

function validateForm() {
	const birthDay = +document.querySelector("#day").value;
	const birthMonth = +document.querySelector("#month").value;
	const birthYear = +document.querySelector("#year").value;

	dayError.innerHTML = "";
	monthError.innerHTML = "";
	yearError.innerHTML = "";

	let isValid = true;

	if (birthDay <= 0 || birthDay > 31) {
		dayError.innerHTML = "Must be a valid day";
		makeError(dayLabel);
		isValid = false;
	} else {
		dayError.innerHTML = "";
	}

	if (birthMonth <= 0 || birthMonth > 12) {
		monthError.innerHTML = "Must be a valid month";
		makeError(monthLabel);
		isValid = false;
	} else {
		monthError.innerHTML = "";
	}

	if (birthYear <= 0 || birthYear > yearNumber) {
		yearError.innerHTML = "Must be a valid year";
		makeError(yearLabel);
		isValid = false;
	} else {
		yearError.innerHTML = "";
	}

	const daysInMonth = new Date(birthYear, birthMonth, 0).getDate();
	if (birthDay > daysInMonth) {
		dayError.innerHTML = "Must be a valid day for the given month";
		makeError(dayLabel);
		isValid = false;
	}

	return isValid;
}
function makeError(label) {
	label.classList.add("error");
}