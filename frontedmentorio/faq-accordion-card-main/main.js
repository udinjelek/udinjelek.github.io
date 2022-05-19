// function hideUnhideAnswer(selectedId){
//     console.log(selectedId);
//     if (document.getElementById(selectedId).style.display === "none") 
//     {   document.getElementById(selectedId).style.display = "block";
//     }
//     else
//     {   document.getElementById(selectedId).style.display = "none";
//     }
  
// }

function hideUnhideAnswer(e){
    // console.log(e.target);  // to get the element
    // console.log(e.target.tagName);  // to get the element tag name alone
    // console.log(e.target.parentNode); // parent Node
    var nowNodes = null;
    var arrowNodes = null;
    
    if (e.target.tagName === "BUTTON")
    {   nowNodes = e.target.parentNode.childNodes;
    } 
    else
    {   nowNodes = e.target.parentNode.parentNode.childNodes;
    }
    arrowNodes = nowNodes[1].childNodes;
    
    // console.log(arrowNodes[1]); // parent Node
    if (    nowNodes[3].style.display === "none") 
    {       nowNodes[3].style.display = "block";
            arrowNodes[1].className = "arrow";
            
    }
    else
    {       nowNodes[3].style.display = "none";
            arrowNodes[1].className = "up";
    }
    
    

}