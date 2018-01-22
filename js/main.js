'use strict';

function main() {
    var gameScreen = document.querySelector('#game');
    var startBtn = document.querySelector('.start-btn');
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
        currentProject;

    //Get start button and add eventListener to start game
    startBtn.addEventListener('click', destroySplash);

    function destroySplash() {
        startGameScreen.remove();
        loadNewPlayerScreen();
    }

    function loadNewPlayerScreen() {
        startBtn.removeEventListener('click', destroySplash);
        playerDataWrapper = document.createElement('div');
        playerDataWrapper.classList.add('new-player');
        playerDataWrapper.innerHTML = '<p>What is your name?</p>';
        playerDataInput = document.createElement('input');
        playerDataBtn = document.createElement('button');
        playerDataBtn.innerText = 'Start';
        playerDataBtn.classList.add('start-input-btn');
        playerDataInput.setAttribute('type', 'text');
        playerDataBtn.addEventListener('click', destroyLoadNewPlayer);
        playerDataWrapper.appendChild(playerDataInput);
        playerDataWrapper.appendChild(playerDataBtn);
        game.appendChild(playerDataWrapper);
    }

    function destroyLoadNewPlayer() {
        //@TODO - prevent game creation with empty name
        playerDataBtn.removeEventListener('click', destroyLoadNewPlayer);
        var playerName = playerDataInput.value;
        playerData = new Player(playerName);
        playerDataWrapper.remove();
        createMainGameScreen(playerName);
    }

    //Creation of main game interface

    function createMainGameScreen(playerName) {
        
        //Create main wrapper for game UI
        mainGameDiv = document.createElement('div');
        mainGameDiv.classList.add('game-wrapper');

        //Main div at the top
        var mainGameTop = document.createElement('div');
        mainGameTop.classList.add('topMenu');

        //Upper left button - TITLE
        mainGameTitle = document.createElement('div');
        mainGameTitle.classList.add('main-game-buttons');
        mainGameTitle.innerText = 'Web Dev Story';
        mainGameTitle.addEventListener('click', loadTitleData);
        mainGameTop.appendChild(mainGameTitle);

        //Upper right button - STATS
        var mainGameStats = document.createElement('div');
        mainGameStats.classList.add('main-game-buttons');
        mainGameStats.innerText += playerData.money;
        mainGameStats.innerText += "/" + playerData.speed;
        mainGameStats.addEventListener('click', loadStatsData);
        mainGameTop.appendChild(mainGameStats);
        
        mainGameDiv.appendChild(mainGameTop);

        //Center data - Current Project Status
        var mainGameProjectData = document.createElement('div');

        var mainGameLProjectData = document.createElement('div');
        mainGameLProjectData.innerText = 'No project currently ongoing';

        var mainGameRProjectData = document.createElement('div');
        mainGameRProjectData.innerText = 'No project currently ongoing';

        var mainGameCProjectData = document.createElement('div');
        mainGameCProjectData.innerHTML = '<img src="http://via.placeholder.com/440x210">';
        //@TODO - add image here!

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
        mainGameNewProject.innerText = 'Start New Project';
        mainGameNewProject.addEventListener('click', loadNewProjectStarter);
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

    function loadTitleData() {
        buildModal();
        var helloP = document.createElement('h2');
        helloP.innerText = 'Hello!';
        
        var info = document.createElement('p');
        info.innerText = ' Thank you so much for playing. This game was created by Filipe Rainho for the IronHack Game Project with help!';
        modal.appendChild(helloP);
        modal.appendChild(info);
        //@TODO add IH image
    }

    //Build stats screen

    function loadStatsData() {
        buildModal();
        var statsTitle = document.createElement('h2');
        statsTitle.innerText = 'Stats';

        var moneyText = document.createElement('p');
        moneyText.innerText = 'You made ' + playerData.money + ' so far. Reach 10000 to win!';

        var speedText = document.createElement('p');
        speedText.innerText = 'You need ' + playerData.speed + ' keystrokes in order to do a line of code. Check for upgrades to see if you can get faster!';

        modal.appendChild(statsTitle);
        modal.appendChild(moneyText);
        modal.appendChild(speedText);
    }

    //Build new project flow

    function loadNewProjectStarter() {
        buildModal();

        var projectNameText = document.createElement('p');
        projectNameText.innerText = 'Project Name:'

        projectName = document.createElement('input');
        projectName.setAttribute('type', 'text');
        projectName.classList.add('new-project-name');

        modal.appendChild(projectNameText);
        modal.appendChild(projectName);
        
        var projectTypeSelection = document.createElement('div');
        projectTypeSelection.classList.add('projectTypeSelect')

        for (var index = 0; index < playerData.availableProjects.length; index++) {
            var newProject = document.createElement('div');
            newProject.innerText = playerData.availableProjects[index];
            newProject.classList.add('projectType');
            newProject.addEventListener('click', selectProject);
            projectTypeSelection.appendChild(newProject);  
        }
        modal.appendChild(projectTypeSelection);

        var createProjectBtn = document.createElement('button');
        createProjectBtn.innerText = 'Create Project';
        createProjectBtn.addEventListener('click', createProject);

        modal.appendChild(createProjectBtn);

    }

    function selectProject() {
        var currSelected = document.querySelector('.selectedProject');
        if (currSelected !== null) {
            currSelected.classList.remove('selectedProject');
        }
        this.classList.add('selectedProject');
    }

    function createProject() {
        var selectedProject = document.querySelector('.selectedProject').innerText;
        var projectNameWritten = document.querySelector('input').value;
        if (selectedProject === 'Single Page Website') {
            currentProject = new SinglePageWebsite(projectNameWritten);
        }
        else if (selectedProject === 'Multiple Page Webstite') {
            currentProject = new MultiplePageWebsite(projectNameWritten);
        }
        
        backToMainMenu();
    }

    //Show skills screen

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

    function upgradePlayer() {
        playerData.money -= playerData.upgradeCost;      
        playerData.upgradeCost = playerData.upgradeCost * 2;
        playerData.speed = playerData.speed * 0.8;

        var costInfo = document.createElement('p');
        costInfo.innerText = 'Thank you for upgrading';

        modal.appendChild(costInfo);
    }

    //Show past projects screen
    
    function loadPastProjects() {
        buildModal();
    }

    //Show settings screen
    
    function loadGameSettings() {
        buildModal();
    }

    


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

    function backToMainMenu() {
        modal.remove();
        createMainGameScreen();
    }


}


window.onload = main;