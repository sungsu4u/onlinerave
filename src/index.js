
// The wake lock sentinel.
let wakeLock = null;
 
// Function that attempts to request a screen wake lock.
const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      console.log('Screen Wake Lock was released');
    });
    console.log('Screen Wake Lock is active');
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};

// Request a screen wake lock…
requestWakeLock();

// eval("alert('OK!')");


document.addEventListener('DOMContentLoaded', () => {

    // Adding Scenarios
    const grid = document.querySelector('.scenario-section');

    for (let i = 0; i < 16; i++) {

        // Make scenario buttons
        const scenario = document.createElement('div');

        // Name the buttons by id
        scenario.id = i;

        // Add CSS to the button
        scenario.classList.add("scenario");

        // Add event action function
        // (Mouse)
        scenario.onmousedown = scenarioActionMouseDown;
        scenario.onmouseleave = scenarioActionMouseCanceled;
        scenario.onmouseup = scenarioActionMouseUp;
        // (Touch)
        scenario.ontouchstart = scenarioActionMouseDown;
        scenario.ontouchcancel = scenarioActionMouseCanceled;
        scenario.ontouchend = scenarioActionMouseUp;

        // Add default title on the button
        scenario.innerHTML = "Scenario " + i;

        // Add the button(div) object to the parent.
        grid.appendChild(scenario);

        // console.log("scenario " + scenario.id);
    }

    // Adding Menus on the side section
    const menu = document.querySelector('.menu-section');

    // STOP
    const menuStop = document.createElement('div');
        menuStop.classList.add("menu");
        menuStop.classList.add("stop");
        menuStop.id = "menu-stop";
        menuStop.readyFire = false;
        
        menuStop.onmousedown = menuActionMouseDown;
        menuStop.onmouseout = menuActionMouseCanceled;
        menuStop.onmouseup = menuActionMouseUp;

        menuStop.ontouchstart = menuActionMouseDown;
        menuStop.ontouchend = menuActionMouseCanceled;
        menuStop.ontouchcancel = menuActionMouseUp;

        menuStop.innerHTML = "STOP";

        menu.appendChild(menuStop);

    // FREE
    const menuFree = document.createElement('div');
        menuFree.classList.add("menu");
        // menuFree.classList.add("stop");
        menuFree.id = "menu-free";
        menuFree.readyFire = false;
        
        menuFree.onmousedown = menuActionMouseDown;
        menuFree.onmouseout = menuActionMouseCanceled;
        menuFree.onmouseup = menuActionMouseUp;

        menuFree.ontouchstart = menuActionMouseDown;
        menuFree.ontouchend = menuActionMouseCanceled;
        menuFree.ontouchcancel = menuActionMouseUp;

        menuFree.innerHTML = "FREE";

        menu.appendChild(menuFree);

    // VOTE
    const menuVote = document.createElement('div');
        menuVote.classList.add("menu");
        // menuFree.classList.add("stop");
        menuVote.id = "menu-vote";
        menuVote.readyFire = false;
        
        menuVote.onmousedown = menuActionMouseDown;
        menuVote.onmouseout = menuActionMouseCanceled;
        menuVote.onmouseup = menuActionMouseUp;

        menuVote.ontouchstart = menuActionMouseDown;
        menuVote.ontouchend = menuActionMouseCanceled;
        menuVote.ontouchcancel = menuActionMouseUp;

        menuVote.innerHTML = "VOTE";

        menu.appendChild(menuVote);

    // SETUP
    const menuSetup = document.createElement('div');
        menuSetup.classList.add("menu");
        menuSetup.classList.add("setup");
        menuSetup.id = "menu-setup";
        menuSetup.readyFire = false;
        
        menuSetup.onmousedown = menuActionMouseDown;
        menuSetup.onmouseout = menuActionMouseCanceled;
        menuSetup.onmouseup = menuActionMouseUp;

        menuSetup.ontouchstart = menuActionMouseDown;
        menuSetup.ontouchend = menuActionMouseCanceled;
        menuSetup.ontouchcancel = menuActionMouseUp;

        menuSetup.innerHTML = "SETUP";

        menu.appendChild(menuSetup);




});

function scenarioActionMouseDown(event) {
    event.target.style["border-color"] = "white";
    event.target.readyFire = true;
}

function scenarioActionMouseCanceled(event) {
    event.target.style["border-color"] = "red";
    event.target.readyFire = false;
}

function scenarioActionMouseUp(event) {
    event.target.style["border-color"] = "red";

    if (event.target.readyFire) {
        event.target.readyFire = false;
        console.log("scenario " + event.target.id + " fired");
        
        CommentUpdate(event.target.id + " fired", 3000);
        doAction(event.target);
        // alert(event.target.id + " Fired")
    } 
}

function menuActionMouseDown(event) {
    event.target.style["border-color"] = "white";
    event.target.readyFire = true;
}

function menuActionMouseCanceled(event) {
    event.target.style["border-color"] = "red";
    event.target.readyFire = false;
}

function menuActionMouseUp(event) {
    event.target.style["border-color"] = "red";

    if (event.target.readyFire) {
        event.target.readyFire = false;
        console.log(event.target.id + " fired");

        CommentUpdate(event.target.id + " fired", 3000)
        doAction(event.target);
        // alert(event.target.id + " Fired")
    }
}


function doAction(target) {
    // console.log("doAction("+target.id+")");

    if (target.colors) {
        console.log("==>doAction("+target.id+")");

        curColors = target.colors;

    } else {
        curColors = stopColors;
    }
}




// var elem = document.documentElement;

// if (elem.requestFullscreen) {
//     elem.requestFullscreen();
// }


// /* Get the documentElement (<html>) to display the page in fullscreen */
// var elem = document.documentElement;


// /* View in fullscreen */
// function openFullscreen() {
//   if (elem.requestFullscreen) {
//     elem.requestFullscreen();
//   } else if (elem.mozRequestFullScreen) { /* Firefox */
//     elem.mozRequestFullScreen();
//   } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
//     elem.webkitRequestFullscreen();
//   } else if (elem.msRequestFullscreen) { /* IE/Edge */
//     elem.msRequestFullscreen();
//   }
// }

// /* Close fullscreen */
// function closeFullscreen() {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   } else if (document.mozCancelFullScreen) { /* Firefox */
//     document.mozCancelFullScreen();
//   } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
//     document.webkitExitFullscreen();
//   } else if (document.msExitFullscreen) { /* IE/Edge */
//     document.msExitFullscreen();
//   }
// }

// openFullscreen()

var timerForComment;

function CommentUpdate(...args) {
    const comment = document.querySelector('.comment');
    let delaytime = (args[1] > 0)? args[1]: 5000;

    comment.innerHTML = args[0];

    clearTimeout(timerForComment);
    timerForComment = setTimeout(() => {
        comment.innerHTML = "";
    }, delaytime);
    
}

CommentUpdate("Ready to load scenarios.", 1000);



