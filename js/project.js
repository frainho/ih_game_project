function SinglePageWebsite(name) {
    this.name = name;
    this.type = 'Single Page Webstite';
    this.complexity = 1;
    this.lines = 2;
    this.linesTbd = 2;
    this.timeToComplete = 100;
    this.reward = 200;
    this.skills = {
        'Front-end': [{
                skillName: 'HTML/CSS',
                status: 1,
                cost: 0
            },
            {
                skillName: 'JS',
                status: 1,
                cost: 0
            },
            {
                skillName: 'Angular',
                status: 0,
                cost: 0
            }
        ]
    };
}

function MultiplePageWebsite(name) {
    this.name = name;
    this.type = 'Multiple Page Webstite';
    this.complexity = 3;
    this.lines = 40;
    this.linesTbd = 40;
    this.timeToComplete = 300;
    this.reward = 500;
    this.skills = {
        'Front-end': [{
                skillName: 'HTML/CSS',
                status: 1,
                cost: 0
            },
            {
                skillName: 'JS',
                status: 1,
                cost: 0
            },
            {
                skillName: 'Angular',
                status: 1,
                cost: 0
            }
        ]
    };
}