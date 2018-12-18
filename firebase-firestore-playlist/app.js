const cafeList = document.querySelector('#cafe-list');

function renderCafe(doc) {
    console.log(doc.data());
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    
}


db.collection('cafes').get().then((snapshot) => {

    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    })

})