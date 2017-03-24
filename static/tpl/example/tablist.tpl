<ul class='tablist'>
	{{#each data.tablist}}
		{{#if active}}
			<li class='tabli activeLi'>{{list}}</li>
		{{else}}
			<li class='tabli'>{{list}}</li>
		{{/if}}	
	{{/each}}
</ul>