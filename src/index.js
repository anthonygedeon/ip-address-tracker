const inputField = document.querySelector('.search__input');
const enter = document.querySelector('.search');

const textIpAddress = document.querySelector('.ip-address');
const textLocation = document.querySelector('.location');
const textTimezone = document.querySelector('.timezone');
const textIsp = document.querySelector('.isp');

let ipAddress;

const API_KEY = 'at_iLGIjbJEwwni8gD9ozzXeDJKahm8B';

const map = L.map('map').setView([51.505, -0.09], 13);

const blackIcon = L.icon({
	iconUrl: '../src/images/icon-location.svg',
});

L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
	maxZoom: 20,
	subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);

const updateMap = () => {};

const getIp = async () => {
	ipAddress = inputField.value;

	const data = await fetch(
		`https://geo.ipify.org/api/v1?apiKey=at_iLGIjbJEwwni8gD9ozzXeDJKahm8B&ipAddress=${ipAddress}`
	);
	const location = await data.json();

	console.log(location);

	textIpAddress.textContent = location.ip;
	textIsp.textContent = location.isp;
	textTimezone.textContent = `UTC ${location.location.timezone}`;
	textLocation.textContent = `${location.location.city}, ${location.location.region}, ${location.location.geonameId}`;

	L.marker([location.location.lat, location.location.lng], {
		icon: blackIcon,
	}).addTo(map);

	map.setView([location.location.lat, location.location.lng], 13);
};

enter.addEventListener('click', getIp);
