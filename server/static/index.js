let prev_state = []
let loaded = false
let loader = document.querySelector('#loader')
let tableHead = document.querySelector('#tableHead')
let allCounter = document.querySelector('#allCounter')
tableHead.hidden = true

const elementFromText = (st) => {
	const elem = document.createElement('td')
	elem.classList.add('text-center')
	elem.innerHTML = st
	return(elem)
}

const change_tabel = (data) => {
	let table = document.querySelector('#tableBody')
	let new_table = document.createElement('tbody')
	let counter = 0
	data.forEach((ob, obIndex)=>{
		counter+=ob[1]
		let temp_tr = document.createElement('tr')
		let td_0 = elementFromText(`<h2>${obIndex+1}</h2>`)
		let td_1 = elementFromText(`<h2>${ob[0]} Поток ${2003+ob[0]} год</h2>`)
		let td_2 = elementFromText(`<h2>${ob[1]}</h2>`)
		temp_tr.append(td_0, td_1, td_2)
		new_table.append(temp_tr)
	})
	table.replaceWith(new_table)
	new_table.id = 'tableBody'
	console.log(counter)
	allCounter.innerHTML = counter
}

const fetch_data = () => {
	let options = {
		method: 'POST',
	}
	fetch('/api/results',options)
	.then(response =>{
		if(response.ok){
			return(response.json())
		}
	})
	.then(responseData => {
		if(responseData!=prev_state){
			prev_state = responseData
			if(!loaded){
				loader.remove()
				tableHead.hidden = false
				loaded = true 
			}
			change_tabel(responseData)
		}
	})
}

setInterval(fetch_data, 25*1000)
fetch_data()