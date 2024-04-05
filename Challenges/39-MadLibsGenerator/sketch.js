let data;
const txt = "$$Exclamation$$! they said $$Adverb$$ as the jumped into their $$Noun$$ and flew off with their $$Adjective$$ $$Plural Noun$$.";

const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZ2h5zoJyadQzXi4cmHO4pPt8J0B0zeUG8xx0RgYgn4zyEBZPtvuvDwk5dBbTYMZKUnXDgcsdcgFkQ/pub?output=csv';

// const googleFormURI = https://forms.gle/Pvs5EaxmRjpg2cCKA

/*
	AUTHOR'S NOTE: Google may have changed the way publishing sheets works. Your mileage may vary.
		1. Make the form
			- Exclamation, Adverb, Noun, Adjective, Plural Noun
			- answers should be short answer text
			- share the form (short url).
			- Optional: replace both googleFormURI in index.html:16 with the short url.
		2. Go to responses
			- Link to Sheets
			- Create a new spreadsheet
		3. In the new spreadsheet, Navigate to File > Share > Publish to web
			- Entire Document
			- Comma-separated values (csv)
		4. copy the link
		5. replace csvURL with the link
		6. Put answers in the form and refresh this page.
*/

function setup(){
	noCanvas();
	
	Papa.parse(
		csvURL,
		{
			download: true,
			header: true,
			complete: gotData()
		}
	)

	let button = createButton('generate madlib');
	button.mousePressed(generate);
}

function gotData() {
	return function (results) {
		data = results.data;
		console.log(data);
	};
}

function replacer(match, pos) {
	let entry = random(data);
	return entry[pos];
}

function generate(){
	let madlib = txt.replace(/\$\$(.*?)\$\$/g, replacer);
	createP(madlib);
}
