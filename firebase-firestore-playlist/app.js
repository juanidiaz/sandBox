const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// CReate element and render cafe list
function renderCafe(doc) {
    console.log(doc.data());
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // Deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();

        let id = e.target.parentElement.getAttribute('data-id');

        db.collection('cafes').doc(id).delete();

    })
}

// // Gettting data from Firebase
// //db.collection('cafes').where('city', '==', 'Cuernavaca').get().then((snapshot) => {   <<-- This line will return only elements with 'city' = 'Cuernavaca'
// // db.collection('cafes').orderBy('name').get().then((snapshot) => {                    <<-- This line will order elements by 'name'
// db.collection('cafes').where('city', '==', 'Cuernavaca').orderBy('name').get().then((snapshot) => {

//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     })
// })

// Saving new cafe
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    })
    form.name.value = '';
    form.city.value = '';
})

// RealTime listener
db.collection('cafes').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    //console.log(changes);

    changes.forEach(change => {
        //console.log(change.doc.data())
        if(change.type == 'added'){
            renderCafe(change.doc)
        }else if(change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    })
})




/* 
To UPDATE a specific document this is the line... you ned to know the ID of the document!

db.collection('cafes').doc('obv03lhSiTVjFLdcEca2').update({
    name: 'Lola Cafe'
})

To SET a document will REMOVE all other properties!!!... you ned to know the ID of the document!

db.collection('cafes').doc('obv03lhSiTVjFLdcEca2').set({
    name: 'Lola Cafe'
})


 */

