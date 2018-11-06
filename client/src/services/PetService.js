//./services/BookService.js

export const _updatePet = (updatedId, name, type) => {
	return fetch(`http://localhost:3001/pets/update/${updatedId}`, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({name, type})
	  }).then(res => res.json())
}

export const _loadPets = () => {
  return fetch("http://localhost:3001/pets")
    .then(res => res.json())
}

export const _deletePet = (id) => {
    return fetch(`http://localhost:3001/pets/${id}`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
}

export const _createPet = (name, type) => {
	return fetch("http://localhost:3001/pets", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({name, type})
	  }).then(res => res.json())
}

//put all of the fetch calls in BookService.js