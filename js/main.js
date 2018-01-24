'use strict';

function main() {
    var gameScreen = document.querySelector('#game');
    var startBtn = document.querySelector('.start-btn');
    var soundBtn = document.querySelector('.sound-btn');
    var startGameScreen = document.querySelector('.start-game-screen');
    var playerDataInput,
        playerData,
        playerDataWrapper,
        playerDataBtn,
        mainGameDiv,
        mainGameTitle,
        mainGameStats,
        mainGameNewProject,
        mainGameSkills,
        mainGamePastProjects,
        mainGameSettings,
        modal,
        modalBtn,
        selectedProject,
        projectName,
        currentProject,
        mainGameLProjectData,
        mainGameRProjectData,
        mainGameCProjectData,
        projectLinesTbdInfo,
        projectTypeSelection,
        editText,
        mySound;
    var keystrokes = 0;
    var aceOn = false;
    var soundOn = true;

    //Adds event listeners to the Start and Sound buttons

    startBtn.addEventListener('click', destroySplash);
    soundBtn.addEventListener('click', soundTrigger);

    //Triggers sound
    audioStart();

    //Erases splash screen and loads new player screen
    function destroySplash() {
        startGameScreen.remove();
        loadNewPlayerScreen();
    }

    /* 
        Controls the soundOn flag that impacts 
        the audioStart function
        to enable or disable the sound
    */
    function soundTrigger() {
        if (soundOn) {
            soundOn = false;
            this.innerText = 'Sound Off'
            audioStart();
        } else {
            soundOn = true;
            this.innerText = 'Sound On'
            audioStart();
        }
    }

    /* 
        Creates the new player screen and
        adds a tip so that the player knows that
        the name field acts as a search for the gifs
    */

    function loadNewPlayerScreen() {
        startBtn.removeEventListener('click', destroySplash);

        playerDataWrapper = document.createElement('div');
        playerDataWrapper.classList.add('new-player');
        playerDataWrapper.innerHTML = '<p>What is your name?</p>';

        playerDataInput = document.createElement('input');
        playerDataInput.setAttribute('type', 'text');
        playerDataWrapper.appendChild(playerDataInput);

        playerDataBtn = document.createElement('button');
        playerDataBtn.innerText = 'Start';
        playerDataBtn.classList.add('start-input-btn');
        playerDataBtn.addEventListener('click', destroyLoadNewPlayer);
        playerDataWrapper.appendChild(playerDataBtn);

        var playerTip = document.createElement('p');
        playerTip.innerText = 'Psst... use the input to search the types of gifs you prefer!';
        playerDataWrapper.appendChild(playerTip);

        game.appendChild(playerDataWrapper);
    }

    /* 
        Checks if the name input is not empty.
        If it is then it displays a warning message,
        if it is not then creates the player and 
        triggers the main interface
    */

    function destroyLoadNewPlayer() {
        if (playerDataInput.value === '') {
            var emptyName = document.createElement('p');
            emptyName.innerText = 'Name cannot be empty';
            playerDataWrapper.appendChild(emptyName);
            setTimeout(() => {
                playerDataWrapper.remove();
                loadNewPlayerScreen();
            }, 800);
        } else {
            playerDataBtn.removeEventListener('click', destroyLoadNewPlayer);
            var playerName = playerDataInput.value;
            playerData = new Player(playerName);
            playerDataWrapper.remove();
            createMainGameScreen(playerName);
        }

    }

    /* 
        Creates the whole game interface
        through DOM manipulation and triggers
        the gifs in the middle of the screen
    */

    function createMainGameScreen(playerName) {

        getGifs();
        //Create main wrapper for game UI
        mainGameDiv = document.createElement('div');
        mainGameDiv.classList.add('game-wrapper');

        //Main div at the top
        var mainGameTop = document.createElement('div');
        mainGameTop.classList.add('topMenu');

        //Upper left button - TITLE
        mainGameTitle = document.createElement('div');
        mainGameTitle.classList.add('main-game-buttons');
        mainGameTitle.innerText = 'Procrastinator 3000 Ultimate Turbo Unlimited';
        mainGameTitle.addEventListener('click', loadTitleData);
        mainGameTop.appendChild(mainGameTitle);

        //Upper right button - STATS
        var mainGameStats = document.createElement('div');
        mainGameStats.classList.add('skills-info');

        var statsName = document.createElement('p');
        statsName.innerText = 'Player: ' + playerData.name;

        var statsMoney = document.createElement('p');
        statsMoney.innerText = 'Money: ' + playerData.money;

        var statsSpeed = document.createElement('p');
        statsSpeed.innerText = 'Speed: ' + playerData.speed + ' (keystrokes/line of code)';

        mainGameStats.appendChild(statsName);
        mainGameStats.appendChild(statsMoney);
        mainGameStats.appendChild(statsSpeed);

        mainGameStats.addEventListener('click', loadStatsData);
        mainGameTop.appendChild(mainGameStats);

        mainGameDiv.appendChild(mainGameTop);

        //Center data - Current Project Status
        var mainGameProjectData = document.createElement('div');

        mainGameLProjectData = document.createElement('div');
        mainGameLProjectData.innerText = 'No project currently ongoing';
        mainGameLProjectData.classList.add('sidebar');

        mainGameRProjectData = document.createElement('div');
        mainGameRProjectData.innerText = 'No project currently ongoing';
        mainGameRProjectData.classList.add('sidebar');

        mainGameCProjectData = document.createElement('div');
        mainGameCProjectData.classList.add('center');


        //Build Center area
        mainGameProjectData.appendChild(mainGameLProjectData);
        mainGameProjectData.appendChild(mainGameCProjectData);
        mainGameProjectData.appendChild(mainGameRProjectData);

        mainGameProjectData.classList.add('centerMenu');
        mainGameDiv.appendChild(mainGameProjectData);

        var mainGameBottom = document.createElement('div');

        //New project button
        mainGameNewProject = document.createElement('div');
        mainGameNewProject.classList.add('main-game-buttons');
        if (currentProject == undefined) {
            mainGameNewProject.innerText = 'Start New Project';
            mainGameNewProject.addEventListener('click', loadNewProjectStarter);
        } else {
            mainGameNewProject.innerText = 'Project in progress';
        }
        mainGameBottom.appendChild(mainGameNewProject);

        //Skills and Upgrades button
        mainGameSkills = document.createElement('div');
        mainGameSkills.classList.add('main-game-buttons');
        mainGameSkills.innerText = 'Skills and Upgrades';
        mainGameSkills.addEventListener('click', loadSkillsData);
        mainGameBottom.appendChild(mainGameSkills);

        //Past projects button
        mainGamePastProjects = document.createElement('div');
        mainGamePastProjects.classList.add('main-game-buttons');
        mainGamePastProjects.innerText = 'Past Projects';
        mainGamePastProjects.addEventListener('click', loadPastProjects);
        mainGameBottom.appendChild(mainGamePastProjects);

        //Game settings button
        mainGameSettings = document.createElement('div');
        mainGameSettings.classList.add('main-game-buttons');
        mainGameSettings.innerText = 'Game Settings';
        mainGameSettings.addEventListener('click', loadGameSettings);
        mainGameBottom.appendChild(mainGameSettings);

        mainGameBottom.classList.add('bottomMenu');
        mainGameDiv.appendChild(mainGameBottom);

        game.appendChild(mainGameDiv);


    }

    //Build title screen
    /* 
        Builds w/DOM the about info when the title is clicked
        Upper left button
    */

    function loadTitleData() {
        buildModal();
        var helloP = document.createElement('h2');
        helloP.innerText = 'Hello!';

        var info = document.createElement('p');
        info.innerText = ' Thank you so much for playing. This game was created by Filipe Rainho for the Ironhack Game Project with help of the awesome teacher and TAs!';
        var ihLogo = document.createElement('img');
        ihLogo.setAttribute('src', './img/ironhack.png');
        ihLogo.classList.add('logo');
        modal.appendChild(helloP);
        modal.appendChild(info);
        modal.appendChild(ihLogo);
    }

    /* 
        Builds w/DOM the stats info when stats is clicked
        Upper right button
    */

    function loadStatsData() {
        buildModal();
        var statsTitle = document.createElement('h2');
        statsTitle.innerText = 'Stats';

        var moneyText = document.createElement('p');
        moneyText.innerText = 'You made ' + playerData.money + ' so far. Reach 5000 to win!';

        var speedText = document.createElement('p');
        speedText.innerText = 'You need ' + playerData.speed + ' keystrokes in order to do a line of code. Check for upgrades to see if you can get faster!';

        modal.appendChild(statsTitle);
        modal.appendChild(moneyText);
        modal.appendChild(speedText);
    }

    //Build new project flow

    /* 
        Builds w/DOM the new project flow when the title is clicked
        Second to bottom right button
    */

    function loadNewProjectStarter() {
        buildModal();

        var projectNameText = document.createElement('p');
        projectNameText.innerText = 'Project Name:'

        projectName = document.createElement('input');
        projectName.setAttribute('type', 'text');
        projectName.classList.add('new-project-name');

        modal.appendChild(projectNameText);
        modal.appendChild(projectName);

        projectTypeSelection = document.createElement('div');
        projectTypeSelection.classList.add('projectTypeSelect')

        for (var index = 0; index < playerData.availableProjects.length; index++) {
            var newProject = document.createElement('div');
            newProject.innerText = playerData.availableProjects[index];
            if (index == 0) {
                newProject.classList.add('projectType');
                newProject.classList.add('selectedProject');
            } else {
                newProject.classList.add('projectType');
            }
            newProject.addEventListener('click', selectProject);
            projectTypeSelection.appendChild(newProject);
        }
        modal.appendChild(projectTypeSelection);

        var createProjectBtn = document.createElement('button');
        createProjectBtn.innerText = 'Create Project';
        createProjectBtn.addEventListener('click', createProject);

        modal.appendChild(createProjectBtn);

    }

    /* 
        Adds visual cue to the currently selected type of project
    */

    function selectProject() {
        var currSelected = document.querySelector('.selectedProject');
        currSelected.classList.remove('selectedProject');
        this.classList.add('selectedProject');
    }

    /*
        Forces the player to add a name to the project.
        When a name exists it creates project
    */

    function createProject() {
        var selectedProject = document.querySelector('.selectedProject').innerText;
        var projectNameWritten = document.querySelector('input').value;
        if (projectNameWritten === '') {
            var projectNameEmpty = document.createElement('p');
            projectNameEmpty.innerText = 'Project Name cannot be empty';
            modal.appendChild(projectNameEmpty);
            setTimeout(() => {
                modal.remove();
                loadNewProjectStarter();
            }, 800);

        } else {
            if (selectedProject === 'Single Page Website') {
                currentProject = new SinglePageWebsite(projectNameWritten);
            } else if (selectedProject === 'Multiple Page Website') {
                currentProject = new MultiplePageWebsite(projectNameWritten);
            }
            backToMainMenu();
            updateMainScreen();
        }
    }

    /* 
        Adds the current project information to the main screen
    */

    function updateMainScreen() {
        var projectTypeInfo = document.createElement('p');
        projectTypeInfo.innerText = 'Project Type: ' + currentProject.type;

        var projectLinesInfo = document.createElement('p');
        projectLinesInfo.innerText = 'Lines Needed: ' + currentProject.lines;

        var projectNameInfo = document.createElement('p');
        projectNameInfo.innerText = 'Project Name: ' + currentProject.name;

        mainGameLProjectData.innerText = '';

        mainGameLProjectData.appendChild(projectTypeInfo);
        mainGameLProjectData.appendChild(projectLinesInfo);
        mainGameLProjectData.appendChild(projectNameInfo);

        projectLinesTbdInfo = document.createElement('p');
        projectLinesTbdInfo.innerText = 'Lines to be done: ' + currentProject.linesTbd;

        mainGameRProjectData.innerText = '';

        mainGameRProjectData.appendChild(projectLinesTbdInfo);

        document.addEventListener('keydown', keystrokeCounter);
        document.addEventListener('keydown', loadAce);
    }

    /* 
        Function triggered by the listener of keydown
        Increments the keystroke count and as soon as the
        amount of keystrokes reaches the same of the player current speed
        it decrements a line in the current project
        It will also trigger a project completion flow if the project is finished.
        Adds the project to the player list and clears the current project var
    */

    function keystrokeCounter() {
        keystrokes++;
        if (keystrokes == playerData.speed || keystrokes > playerData.speed) {
            currentProject.linesTbd--;
            keystrokes = 0;
            mainGameRProjectData.innerText = '';
            projectLinesTbdInfo.innerText = 'Lines to be done: ' + currentProject.linesTbd;
            mainGameRProjectData.appendChild(projectLinesTbdInfo);
        }

        if (currentProject.linesTbd === 0) {
            buildModal();
            playerData.money += currentProject.reward;
            playerData.projectHistory.push(currentProject);
            if (playerData.money >= 700) {
                backToMainMenu();
                isWinner();
                currentProject = undefined;
                document.removeEventListener('keydown', keystrokeCounter);
                document.removeEventListener('keydown', loadAce);
            } else {
                document.removeEventListener('keydown', keystrokeCounter);
                document.removeEventListener('keydown', loadAce);
                var congratsMessage = document.createElement('p');
                congratsMessage.innerText = 'Wooohoooooo! You completed the project. 200 have been added to your account';
                modal.appendChild(congratsMessage);
                currentProject = undefined;
            }
        }
    }

    /* 
        Loads the upgrade screen showing the current speed
        and the possibility to upgrade
        Second to bottom right button
    */

    function loadSkillsData() {
        buildModal();

        var skillsWrap = document.createElement('div');

        var currentSpeed = document.createElement('p');
        currentSpeed.innerText = 'Your Current Speed is ' + playerData.speed + ' keystrokes per line of code.';

        var upgradeCost = document.createElement('p');
        upgradeCost.innerText = 'Upgrading costs: ' + playerData.upgradeCost;

        skillsWrap.appendChild(currentSpeed);
        skillsWrap.appendChild(upgradeCost);

        var upgradeSpeedBtn = document.createElement('button');
        upgradeSpeedBtn.innerText = 'Upgrade Speed';
        upgradeSpeedBtn.addEventListener('click', upgradePlayer);

        skillsWrap.appendChild(upgradeSpeedBtn);

        modal.appendChild(skillsWrap);

    }

    /* 
        Checks if there is enough money to upgrade and 
        increments the player speed by 20%
    */

    function upgradePlayer() {

        if (playerData.upgradeCost > playerData.money) {
            var noMoneyText = document.createElement('p');
            noMoneyText.innerText = 'Not enough money for this upgrade. Come back later!';
            modal.appendChild(noMoneyText);
            setTimeout(() => {
                backToMainMenu();
            }, 1200);
        } else {
            playerData.money -= playerData.upgradeCost;
            playerData.upgradeCost = playerData.upgradeCost * 2;
            playerData.speed = playerData.speed * 0.8;
            var costInfo = document.createElement('p');
            costInfo.innerText = 'Thank you for upgrading';
            modal.appendChild(costInfo);
            setTimeout(() => {
                backToMainMenu();
            }, 1200);
        }
    }

    /* 
        Displays a list of projects done by the player
        Bottom left button
    */

    function loadPastProjects() {
        buildModal();
        var projectHistoryList;

        if (playerData.projectHistory.length > 0) {
            projectHistoryList = document.createElement('div');
            projectHistoryList.innerText = 'Projects Completed: ';

            for (var i = 0; i < playerData.projectHistory.length; i++) {
                var project = document.createElement('p');
                project.innerText = i + 1 + ': This project was a ' + playerData.projectHistory[i].type + 'with the name ' + playerData.projectHistory[i].name;
                projectHistoryList.appendChild(project);
            }
        } else {
            projectHistoryList = document.createElement('div');
            projectHistoryList.innerText = 'You have not completed any projects';
        }

        modal.appendChild(projectHistoryList);
    }

    /* 
        Loads the game settings
        Bottom right button
    */

    function loadGameSettings() {
        buildModal();

        var resetBtn = document.createElement('button');
        resetBtn.innerText = 'Reset button (It reloads the page)';
        resetBtn.addEventListener('click', masterReset);

        var settingsSoundBtn = document.createElement('button');
        if (soundOn) {
            settingsSoundBtn.innerText = 'Sound On'
        } else {
            settingsSoundBtn.innerText = 'Sound Off'
        }
        settingsSoundBtn.addEventListener('click', soundTrigger);

        modal.appendChild(resetBtn);
        modal.appendChild(settingsSoundBtn);
    }

    /* 
        Ingame button to reload the page
    */

    function masterReset() {
        location.reload();
    }

    /* 
        Builds a base modal to be used by all the buttons of the interface
    */

    function buildModal() {
        mainGameDiv.remove();
        modal = document.createElement('div');
        modalBtn = document.createElement('button');
        modalBtn.innerText = 'Back';
        modalBtn.addEventListener('click', backToMainMenu);
        modal.classList.add('modal');
        modal.appendChild(modalBtn);
        game.appendChild(modal);
    }

    /* 
        Rebuilds the main interface
    */

    function backToMainMenu() {
        modal.remove();
        if (currentProject == undefined) {
            createMainGameScreen();
        } else {
            createMainGameScreen();
            updateMainScreen();
        }
    }

    /* 
        Triggers when the player reaches the end of the game
        i.e. Reaches 700 in money
        Shows a congratulations video
    */

    function isWinner() {
        buildModal();

        var winnerDiv = document.createElement('div');
        winnerDiv.innerHTML = '<iframe width="400" height="225" src="https://www.youtube.com/embed/1Bix44C1EzY?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><p>WIIIIIIINNNNNNNNNNNNNNNNNEEEEEEERRRRR!</p>';
        modal.appendChild(winnerDiv);
    }

    /* 
        Randomizes and plays/pauses the audio 
        when sound buttons are pressed
    */

    function audioStart() {
        if (soundOn) {
            var audioRandomizer = Math.random();
            if (audioRandomizer <= 0.3) {
                mySound = new Audio('./sounds/01 Frozen Langos.mp3');
            } else if (audioRandomizer > 0.3 && audioRandomizer <= 0.6) {
                mySound = new Audio('./sounds/02 Boink.mp3');
            } else {
                mySound = new Audio('./sounds/11 Secret Treehouse.mp3');
            }
            mySound.addEventListener("ended", audioStart);
            mySound.play();
        } else {
            mySound.pause();
        }

    }

    /* 
        Triggers Ajax request to GIHPY API
        API_KEY: 6GN01gTl8qrBxhBRQ1rrjXYwVb90juMX

        Gets a JSON with 100 gifs and randomizes them each 4 seconds
    
    */

    function getGifs() {
        var request = new XMLHttpRequest();
        var data;
        request.open('GET', 'http://api.giphy.com/v1/gifs/search?q=' + playerData.name + '&api_key=6GN01gTl8qrBxhBRQ1rrjXYwVb90juMX&limit=100', true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                data = JSON.parse(request.responseText);
            }
            setInterval(function () {
                var url = '<img src="' + data.data[Math.floor(Math.random() * 100)].images.fixed_height_downsampled.url + '">'
                mainGameCProjectData.innerHTML = url;
            }, 4000);
        };
        request.send();
    }

    /* 
        When the º key is pressed 
        it triggers a full screen editor. Pressing again returns to the game
    */

    function loadAce(event) {
        if (aceOn == false) {
            if (event.key == 'º') {
                aceOn = true;
                editText = document.createElement('div');
                editText.innerText = 'function foo(items) {        var x = "All this is syntax highlighted";        return x;    }';
                editText.setAttribute('id', 'something');
                document.body.appendChild(editText);
                var editor = ace.edit("something");
                editor.setTheme("ace/theme/monokai");
                editor.session.setMode("ace/mode/javascript");
                document.removeEventListener('keydown', keystrokeCounter);
            }
        } else if (event.key == 'º') {
            aceOn = false;
            editText.remove();
            document.addEventListener('keydown', keystrokeCounter);
        }

    }

}

window.onload = main;