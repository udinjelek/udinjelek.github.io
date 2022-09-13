I still don't know the best practice convert from web to mobile, 
especially breakdown div from this case

in web view
~~~
<div class='containerFlex'>
	<div class='containerA leftSide'>
		<div class='title'></div>
		<div class='article'></div>
	</div>

	<div class='containerB rightSide'>
		<div class='photo'></div>
	</div>
</div>
~~~

in mobile view
~~~
<div class='container viewFromTopToDown'>	
		<div class='title'></div>
		<div class='photo'></div>                       /*see photo are in mid!!! */
		<div class='article'></div>
</div>
~~~

/* ------------------------------------- */
so my solution are:
~~~
<div class='containerFlex'>
	<div class='containerA'>
		<div class='title'></div>
		<div class='photo mobileMode'></div>
		<div class='article'></div>
	</div>

	<div class='containerB'>
		<div class='photo webMode'></div>
	</div>
</div>
~~~

/* ------------------------------------- */
so the css are:
~~~
.mobileMode{
	display:none;
}
.webeMode{
	display:block;
}

@media {
	.webMode{
	display:none;
	}
	.mobileeMode{
		display:block;
	}	
}
~~~
/* ------------------------------------- */
but again, I don't think thats the right answer since I'm newbie and none of my friend are web programer