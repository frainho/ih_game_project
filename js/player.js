function Player(name) {
  this.name = name;
  this.money = 500;
  this.playerUpgrades = [];
  this.availableProjects = ["Single Page Website", "Multiple Page Website"];
  this.speed = 50;
  this.upgradeCost = 400;
  this.debugging = 0;
  this.projectCount = 0;
  this.projectHistory = [];
}
