// what I believe to be the last version my lead tracker.
//it has one final feature i am adding which is to inform you if you already
// have a lead that you are trying to save


let myLeads = []
const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const messageEl = document.getElementById("message-el")
const ulEl = document.getElementById("ul-el")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))


if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

saveBtn.addEventListener("click", function(){
//    not in render function because this only applies to the input not the other buttons
   if(inputEl.value){//if the input element is not empty run first code.
       isSaved(myLeads,inputEl.value)
   }else{//else send out a message asking for an input when this button is clicked
       messageEl.textContent = "your input is empty, Please enter a lead."
       messageEl.style.background =  "rgb(200, 130, 130)";
   }
})

saveBtn.addEventListener("mousedown",function(){
    saveBtn.style.background = "#58A4B0"
})

saveBtn.addEventListener("mouseup",function(){
    saveBtn.style.background = "#5f9341"
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({currentWindow:true,active:true}, function(tabs){
        isSaved(myLeads,tabs[0].url)
    })
})

tabBtn.addEventListener("mousedown",function(){
    tabBtn.style.background = "#58A4B0"
})

tabBtn.addEventListener("mouseup",function(){
    tabBtn.style.background = "#5f9341"
})

deleteBtn.addEventListener("dblclick", function(){
    messageEl.textContent = "" 
    inputEl.value = ""
    myLeads = []
    messageEl.style.background = "white";
    localStorage.clear()
    ulEl.textContent = ""
})

function render(anArray){
    let listItems = "" 
    if(anArray){
        for(let i = 0;i < anArray.length;i++){
            listItems += `<li>
           <a target="_blank" href="${anArray[i]}">${anArray[i]}</a> 
            </li>
            `
        }
        ulEl.innerHTML = listItems
    }else{
        console.log("anArray is empty")
    }

}


function isSaved(checking,valueBeingCheckedFor){
    // checks wether the lead being saved already exists
    if(checking.includes(valueBeingCheckedFor) == false){
        checking.push(valueBeingCheckedFor)
        messageEl.textContent = ""
        messageEl.style.background =  "white";
        checking = JSON.stringify(checking)
        checking = localStorage.setItem("myLeads",checking)
        checking = JSON.parse(localStorage.getItem("myLeads"))
        render(checking)
    }else{
        messageEl.textContent = "You already have that lead saved"
        messageEl.style.background = "rgb(200, 130, 130)"
    }
}


