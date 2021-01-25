let prev_state = []

const change_tabel = (data) => {
	let table = document.querySelector('#tableBody')
	let new_table = document.createElement('tbody')
	data.forEach((ob, obIndex)=>{
		let temp_tr = document.createElement('tr')
		let td_0 = document.createElement('td')
		let td_1 = document.createElement('td')
		let td_2 = document.createElement('td')
		td_0.textContent = `${obIndex+1}` 
		td_1.textContent = `${ob[0]} Поток`
		td_2.textContent = `${ob[1]}`
		temp_tr.append(td_0, td_1, td_2)
		new_table.append(temp_tr)
	})
	table.replaceWith(new_table)
	new_table.id = 'tableBody'
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
			change_tabel(responseData)
		}
	})
}

setInterval(fetch_data, 25*1000)
fetch_data()