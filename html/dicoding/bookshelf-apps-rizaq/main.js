let listbook = [];
const RENDER_EVENT = 'render-book';
const storageKey = 'book-storage';
let searchBookTitle = "";
let inputForm = document.getElementById('containerInputForm');

function updateCheckBox()
{	let checkBox = document.querySelector('#inputBookIsComplete').checked;
	let bookSubmit = document.getElementById('bookSubmit');
	if (checkBox) 	{	bookSubmit.innerHTML = 'Masukkan Buku ke rak <span>Selesai dibaca</span>'; 			}
	else 			{	bookSubmit.innerHTML = 'Masukkan Buku ke rak <span>Belum selesai dibaca</span>'; 	}
}

function showHideAddMenu()
{	
	if(inputForm.style.display == 'flex')
	{	inputForm.style.display = 'none' ;}
	else{
		inputForm.style.display = 'flex';
	}
}

function hideAddMenu()
{	
	inputForm.style.display = 'none' ;
}

function generateId() { return +new Date();   }

function addBook()
{	const title 		= document.getElementById('inputBookTitle').value;
	const author 		= document.getElementById('inputBookAuthor').value;
	const year 			= document.getElementById('inputBookYear').value;
	const isComplete	= document.getElementById('inputBookIsComplete').checked;
	const id 			= generateId();
	const bookNew = {id, title, author, year, isComplete };
	listbook.push(bookNew);
	document.dispatchEvent(new Event(RENDER_EVENT));
}

function clearInputBook()
{	document.getElementById('inputBookTitle').value = "";
	document.getElementById('inputBookAuthor').value = "";
	document.getElementById('inputBookYear').value = "";
}


function deleteBook(bookId) 
{	const bookTarget = findBookIndex(bookId);
	if (bookTarget === -1) return;
	
	if (confirm('Are you sure you want to delete this book "' + listbook[bookTarget].title +'" by "'+ listbook[bookTarget].author +'" ?')) 
	{	listbook.splice(bookTarget, 1);
		putUserList(listbook);
		document.dispatchEvent(new Event(RENDER_EVENT));
  	} 	
}

function changeStateBook(bookId) 
{	const bookTarget = findBookIndex(bookId);
	if (bookTarget === -1) return;
	if (listbook[bookTarget].isComplete) 	{	listbook[bookTarget].isComplete = false; 	}
	else 								 	{	listbook[bookTarget].isComplete = true; 	}
	putUserList(listbook);
	document.dispatchEvent(new Event(RENDER_EVENT));
}

function createBook(bookNew)
{	const textTitle 		= document.createElement('h3');
	textTitle.innerText 	= bookNew.title;
	const textAuthor 		= document.createElement('p');
	textAuthor.innerText 	= "Penulis: " + bookNew.author;
	const textYear 			= document.createElement('p');
	textYear.innerText 		= "Tahun: " + bookNew.year;

	const changeStateButton = document.createElement('button');
	changeStateButton.classList.add('green');
	if (bookNew.isComplete)		{	changeStateButton.innerText = "Belum selesai dibaca"}
	else 						{	changeStateButton.innerText = "Selesai dibaca"}
	changeStateButton.addEventListener('click', function() { changeStateBook(bookNew.id); } )

	const deleteButton = document.createElement('button');
	deleteButton.classList.add('red');
	deleteButton.innerText = "Hapus buku"
	deleteButton.addEventListener('click', function () { deleteBook(bookNew.id); });
	
	const bookInfoContainer = document.createElement('div');
	bookInfoContainer.classList.add('book-info');
	bookInfoContainer.append(textTitle, textAuthor, textYear );

	const buttonContainer = document.createElement('div');
	buttonContainer.classList.add('action');
	buttonContainer.append(changeStateButton, deleteButton );
	
	const container = document.createElement('article');
	container.classList.add('book_item');
	container.append(bookInfoContainer );
	container.append(buttonContainer);
	return container;
}

function findBookIndex(bookId) 
{	for (const index in listbook) {   if (listbook[index].id === bookId) 	{	return index;	}	}
	return -1;
}

document.getElementById('closeMenuInput').onclick = hideAddMenu;
document.getElementById('showHideAddMenu').onclick = showHideAddMenu;
document.getElementById('inputBookIsComplete').onclick = updateCheckBox;
document.addEventListener('DOMContentLoaded', function () 
{	const submitForm = document.getElementById('inputBook');
	submitForm.addEventListener('submit', function (event) 
		{	event.preventDefault();
			addBook();
			putUserList(listbook);
			clearInputBook();
			hideAddMenu();
		});

	const searchForm = document.getElementById('searchBook');
	searchForm.addEventListener('submit', function (event) 
		{	event.preventDefault();
			searchBookTitle = document.getElementById('searchBookTitle').value
			document.dispatchEvent(new Event(RENDER_EVENT));
		});

});

document.addEventListener(RENDER_EVENT, function () 
{	const unreadBookList = document.getElementById('incompleteBookshelfList');
	const rereadBookList = document.getElementById('completeBookshelfList');
	unreadBookList.innerHTML = '';
	rereadBookList.innerHTML = '';
	
	for (const bookItem of listbook) 
	{	const bookElement = createBook(bookItem); 
		if (searchBookTitle == "" || bookItem.title.search(searchBookTitle) != -1)
		{	if (bookItem.isComplete)	{	rereadBookList.append(bookElement);}
			else 						{	unreadBookList.append(bookElement);}
		}
	}
});

function checkForStorage()  {    return typeof (Storage) !== 'undefined'; }
function putUserList(data) 
{   if (checkForStorage()) 
	{	localStorage.removeItem(storageKey);
      	localStorage.setItem(storageKey, JSON.stringify(data));
    }
}

function getUserList() 
{	if (checkForStorage()) 		{ return JSON.parse(localStorage.getItem(storageKey)) || [];     } 
	else {   return [];    }
}

window.addEventListener('load', function () {
    if (checkForStorage) {
      if (localStorage.getItem(storageKey) !== null) {
        listbook = getUserList();
    	document.dispatchEvent(new Event(RENDER_EVENT));
      }
    } 
  });

  window.onclick = function(event) {
	if (event.target == inputForm) {
		hideAddMenu();
	}
  } 