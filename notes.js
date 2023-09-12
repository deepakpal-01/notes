var titlesArr;
var notesArr;
showNote();
let addBtn = document.getElementById("addBtn");

let noteText=function (e) {
    let addText = document.getElementById("addText");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesArr = [];
    } else {
      notesArr = JSON.parse(notes);
    }
    notesArr.push(addText.value);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    addText.value = "";
    // console.log(notesArr)
    showNote();
  }
let titleText=function(e){
    let addTitle = document.getElementById("addTitle");
    let titles = localStorage.getItem("titles");
    if (titles == null) {
      titlesArr = [];
    } else {
      titlesArr = JSON.parse(titles);
    }
    titlesArr.push(addTitle.value);
    localStorage.setItem("titles", JSON.stringify(titlesArr));
    addTitle.value = "";
    // console.log(titlesArr)
}

addBtn.addEventListener("click",titleText );
addBtn.addEventListener("click",noteText );



function showNote() {
  let cardBox = document.getElementsByClassName("cards-container")[0];
  
  let notes = localStorage.getItem("notes");
  let titles = localStorage.getItem("titles");
  

  if (notes == null && titlesArr==null) {
      notesArr = [];
      titlesArr=[];
      cardBox.innerHTML+= "<h3>Your Notes will be here!!!!</h3>";
  } else {
    notesArr = JSON.parse(notes);
    titlesArr = JSON.parse(titles);

    let noteElements = "";
    notesArr.forEach((element, index) => {
      let setTitle=titlesArr[index];
      if(setTitle==''){
        setTitle="No Title"
      }
      noteElements += `
        <div class="card-item my-2 mx-3" style="width: 16rem;">
        <div class="card-body">
          <h3 class="card-title">${setTitle}</h3><hr>
          <p class="card-text">${element}</p>
          <button id=${index} class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
        </div>
      </div>`;
    });
    cardBox.innerHTML = noteElements;
  }
}
let deleteTitle=(index)=>{
    // console.log(typeof titlesArr)
    titlesArr.splice(index,1)
    localStorage.setItem("titles",JSON.stringify(titlesArr))
}
function deleteNote(index){
                notesArr.splice(index,1)
                localStorage.setItem("notes",JSON.stringify(notesArr))
                deleteTitle(index);
            showNote()
}

let searchBar=document.getElementById('searchText')
searchBar.addEventListener('input',function(){
    let inputVal=searchBar.value
    let cards=document.getElementsByClassName('card-item')
    // console.log(cards)
    Array.from(cards).forEach((element)=>{
        let cardText=element.getElementsByTagName('p')[0].innerHTML
        // console.log(cardText        
        if(cardText.includes(inputVal)){
            element.style.display="block"
        }
        else{
            element.style.display="none"
        }
    })  
})