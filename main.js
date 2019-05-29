let phrases = document.querySelectorAll('.phrase')
let arrowHours = document.querySelector('.clock__arrow_hours')
let arrowMinute = document.querySelector('.clock__arrow_minute')
let timeHours = document.querySelector('.clock__time_hours')
let timeMinutes = document.querySelector('.clock__time_minutes')


for (let i = 0, len = phrases.length; i < len; i++) {
	let phrase = phrases[i];
	let str = phrase.textContent;
	phrase.innerText = '';
	phrase.setAttribute('string', str)
	let arr = [...str]

	for (let i = 0, len = arr.length; i < len; i++) {
		let span = document.createElement('span');
		span.className = `symbol${i}`
		span.innerText = arr[i]
		phrase.appendChild(span)
	}
}

hours()
minutes()

function minutes() {
	let today = new Date(),
		thisMinute = today.getMinutes();
	let degMinutes = []
	for (let i = 0; i < 60; i++) {
		degMinutes.push(i * 6)
	}
	let filter_minute = degMinutes.filter((item, key) => key === thisMinute);

	arrowMinute.style.transform = `translate(-50%, -50%) rotate(${filter_minute[0]}deg)`

	if (thisMinute < 10) {
		thisMinute = `0${thisMinute}`;
	}

	timeMinutes.innerText = thisMinute

	beautifulPositionHour(thisMinute)
}

function hours() {
	let today = new Date(),
		thisHour = today.getHours();

	let degHours = []
	for (let i = 0; i <= 24; i++) {
		if (i <= 12) {
			degHours.push(i * 30)
		} else {
			degHours.push((i - 12) * 30)
		}
	}

	let filter_hour = degHours.filter((item, key) => key === thisHour);
	arrowHours.style.transform = `translate(-50%, -50%) rotate(${filter_hour[0]}deg)`



	if (thisHour < 10) {
		thisHour = `0${thisHour}`;
	}

	timeHours.innerText = thisHour

}


let requestHours = requestAnimationFrame(checkHours);
let requestMinutes = requestAnimationFrame(checkMinutes);


function checkHours() {
	setTimeout(() => {
		requestHours = requestAnimationFrame(checkHours);
		hours()
	}, 1000);
}


function checkMinutes() {
	setTimeout(function () {
		requestMinutes = requestAnimationFrame(checkMinutes);
		minutes()
	}, 1000);
}


function beautifulPositionHour(minutes) {
	let thisMinute = minutes;
	let beautiDeg = Number(arrowHours.style.transform.match(/rotate\((.*)deg\)/)[1]);
	if (thisMinute > 15 && thisMinute < 29) {
		beautiDeg += 9
	}

	if (thisMinute > 30 && thisMinute <= 49) {
		beautiDeg += 15
	}

	if (thisMinute > 50) {
		beautiDeg += 22
	}
	arrowHours.style.transform = `translate(-50%, -50%) rotate(${beautiDeg}deg)`
}