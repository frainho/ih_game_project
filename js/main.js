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
        modalBtn;

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

    function loadNewProjectStarter() {
        buildModal();
    }

    function loadSkillsData() {
        buildModal();
    }

    function loadPastProjects() {
        buildModal();
    }
    
    function loadGameSettings() {
        buildModal();
    }

    function buildModal() {
        mainGameDiv.remove();
        modal = document.createElement('div');
        modalBtn = document.createElement('button');
        modalBtn.innerText = 'Done';
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