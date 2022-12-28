//Birthday modal element
const birthdayModalElement = document.getElementById("modal");
const errorMsg = "❌That date is incomplete";

//YouTube video controls
const video = document.getElementById("birthday-video");
const playCommand = "&autoplay=1";
const playVideo = () => (video.src += playCommand);
const stopVideo = () => (video.src = video.src.replace(playCommand, ""));

/**
 * Access and hide the birthday modal window via a click event
 */
document.getElementsByClassName("close")[0].addEventListener("click", () => {
	birthdayModalWindow.hide();
});

/**
 * Calculates the years, months, and days the person has been alive for
 * @param {*} form The form containing the date-of-birth (dob) values
 * @returns An object containing the number of years, months, and days they user has been alive for
 */
const calculateAge = (form) => {
	//Error panel for showing an error in case the given dob is incomplete
	const errorPanel = document.getElementById("error-msg");

	if (!isValidDob(form)) {
        //Append the error message and show it to the user
        errorPanel.innerHTML = errorMsg;
		errorPanel.hidden = false;
		//Exit the function if dob is invalid
		return;
	} else errorPanel.hidden = true;

	//Construct 2 date objects, one for now, and the other set to the given dob
	const now = new Date();
	const dob = new Date(form["year"].value, form["month"].value, form["day"].value);

	//Find the current age based on the difference between 'now' & 'dob'
	const age = currentAge(now, dob);

	//Show the current age results to the user by appending the following html to the page
	let displayGrid = `   
        <h2 class="span-2">Your current age</h2>
        <label for="years">Years:</label>
        <output name="years" id="years">${age.Years}</output>
        <label for="months">Months:</label>
        <output name="months" id="months">${age.Months}</output>
        <label for="days">Days:</label>
        <output name="days" id="days">${age.Days}</output>
        `;

	document.getElementById("age-results").innerHTML = displayGrid;

	//If it's the users birthday, show the birthday song video
	if (isBirthday(form["month"].value, form["day"].value)) {
		// showBirthdayModal();
		birthdayModalWindow.show();
	}
};

/**
 * Checks if a dob form contains values
 * @param {*} form The form element containing the users dob
 * @returns True if all fields are supplied, false otherwise
 */
const isValidDob = (form) => {
    return [form["year"], form["month"], form["day"]].every((v) => v.value != "");
};

/**
 * A simple helper method to find the number of days in a given month (in the current year)
 * @param {*} month The month to assess
 * @returns The number of days in the given month
 */
const getDaysInMonth = (month) => {
	return new Date(new Date().getFullYear(), month, 0).getDate();
};

/**
 * Compares the given dob with the current date to determine the user's age in days, months, and years
 * @param {*} now The current date
 * @param {*} dob The persons date of birth
 * @returns An object holding the current age in years, months, and days, based on the given dob
 */
const currentAge = (now, dob) => {
	//Get the difference between date values
	const years = now.getFullYear() - dob.getFullYear();
	const months = now.getMonth() - dob.getMonth();
	let days = now.getDate() - dob.getDate();

	//Adds the difference in the number of days if the birthday is greater than the current day
	if (days < 0) {
		days = getDaysInMonth(now.getMonth()) + days;
	}

	return { Years: years, Months: months, Days: days };
};

/**
 * Check if today is the user's birthday
 * @param {*} month The user's birth month
 * @param {*} day The user's birth day (of the month)
 * @returns Returns true if the current month is equals to the dob month AND the current day is equal to the dob day
 */
const isBirthday = (month, day) => {
	const now = new Date();
	return month == now.getMonth() + 1 && day == now.getDate();
};

/**
 * An object that holds the only two functions required for the birthday video, show and hide
 */
let birthdayModalWindow = {
	//Set the modal display to make it visible, and start playing the video
	show: () => {
		birthdayModalElement.style.display = "flex";
		playVideo();
	},
	//Set the modal display to `none` to hide it, and stop playing the video
	hide: () => {
		birthdayModalElement.style.display = "none";
		stopVideo();
	},
};
