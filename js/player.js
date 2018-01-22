function Player(name) {
    this.name = name;
    this.money = 500;
    this.playerUpgrades = [];
    this.skills = [{
        'Back-end': [],
        'Front-end': [],
        'General': []
    }];
    this.speed = 500;
    this.debugging = 0;
    this.projectCount = 0;
    this.projectHistory = [];
}