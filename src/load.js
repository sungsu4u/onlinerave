// Load project Information
var project;

fetch("data/projects.json")
    .then(response => response.json())
    .then((elem) => project = elem)
    .then(() =>  CommentUpdate("Scenarios were loaded.", 1000))
    .then(() => {
        // console.log(project[0])

        project[0].Scenarios.forEach(snumber => {

            // console.log(snumber)
            fetch("data/" + project[0].Code + "/" + snumber + ".json")
                .then(response => response.json())
                .then((scenario) => { 
                    document.getElementById(snumber).script = scenario.script;
                    document.getElementById(snumber).title = scenario.title;
                    document.getElementById(snumber).description = scenario.description;
                    document.getElementById(snumber).colors = scenario.colors;

                    // document.getElementById(snumber).innerHTML = `
                    //     <div class="scenario-title" id=${snumber}>${scenario.title}</div>
                    //     <div class="scenario-description">${scenario.description}</div>`;
                    document.getElementById(snumber).innerHTML = `
                        <div class="scenario-title" id=${snumber}>${scenario.title}</div>
                        <div class="scenario-description">${scenario.description}</div>`;
                    
                    // console.log(document.getElementById(snumber).description);
                })
                .catch ((err) => {
                    console.log("scenario missing: " + snumber)
                })

        });
    })
// Load scenarios
// project[0].Scenarios.forEach(element => {
//     console.log(element)
// });
