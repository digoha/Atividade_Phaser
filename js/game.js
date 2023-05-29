let swordRotationClock = 0.05;
let swordRotationCounterClock = -swordRotationClock;
let playerSpeed = 4;
let player;
let sword;
let buttonLeft;
let buttonRight;
let buttonUp;
let buttonDown;
let score;
let scoreText;
let enemy;
let maxBallEnemy = 4;
let ballEnemyCount = 0;
let enemySpeed = 1.5;
let ballEnemy;
let ballEnemySpeed = 3.5;
let spawnBallEnemyTime = 5;
let SBETimeReset = 5;
let timer = 0;
let GameOver = false;
let resetButton;
let bLPressed = false;
let bRPressed = false;
let bUPPressed = false;
let bDownPressed = false;



class mainScene {
    
    
    //Cria três métodos base para o projeto
    preload() {
        //preload é chamado uma vez no início
        //Serve para carregar os assets como sprites e sons  
        //Carrega o sprite do player na cena
        this.load.image('player', 'assets/BallGB.png');
        this.load.image('enemy', 'assets/BallRED.png');
        this.load.image('button', 'assets/ArrowButton.png');
        this.load.image('resetButton', 'assets/RestartButton.png');
        //this.load.image('sword', 'assets/Sword.png');
    }
    create() {
        //create é chamado uma vez depois do preload
        //Serve para inicializar a cena (pense nele como o Start da Unity)
        //Posiciona o player na posição inicial
        //sword = this.physics.add.image(400, 300, 'sword').setScale(1.5).setOrigin(0.5, 1);
        player = this.physics.add.image(400, 300, 'player').setScale(1.5);
        enemy = this.physics.add.image(0, 0, 'enemy').setScale(1.5).setTint(0xfffb00);
        //Armazena a pontuação
        score = 0;
        //Define o estilo da pontuação
        let style = { font: '20px Arial', fill: "#ffffff" };
        //Adiciona o texto na posição x 20, y 20 e aplica o estilo
        scoreText = this.add.text(20, 20, 'Score: ' + score, style);
        //Adiciona input do teclado
        this.arrow = this.input.keyboard.createCursorKeys();

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        player.setCollideWorldBounds(true);
        enemy.setCollideWorldBounds(true);
        

        this.physics.add.collider(player, enemy);
        this.physics.add.collider(player, enemy, this.hitPlayer, null, this);

        this.physics.add.collider(player, ballEnemy);

        //this.physics.add.collider(sword, enemy);
        //this.physics.add.collider(sword, enemy, this.hitEnemy, null, this);
       
        buttonLeft = this.add.image(45, 500, 'button').setAlpha(0.25).setScale(0.075).setInteractive();
        buttonLeft.on('pointerdown', pointer => 
        {
            bLPressed = true;
        });
        buttonLeft.on('pointerout', pointer => 
        {

            bLPressed = false;

        });

        buttonLeft.on('pointerup',  pointer => 
        {

            bLPressed = false;

        });

        buttonRight = this.add.image(155, 500, 'button').setAlpha(0.25).setScale(0.075).setInteractive();
        buttonRight.on('pointerdown', pointer => 
        {
            bRPressed = true;
        });
        buttonRight.on('pointerout', pointer => 
        {

            bRPressed = false;

        });

        buttonRight.on('pointerup',  pointer => 
        {

            bRPressed = false;

        });

        buttonUp = this.add.image(100, 450, 'button').setAlpha(0.25).setScale(0.075).setInteractive()
        buttonUp.on('pointerdown', pointer => 
        {
            bUPPressed = true;
        });
        buttonUp.on('pointerout', pointer => 
        {

            bUPPressed = false;

        });

        buttonUp.on('pointerup',  pointer => 
        {

            bUPPressed = false;

        });

        buttonDown = this.add.image(100, 550, 'button').setAlpha(0.25).setScale(0.075).setInteractive()
        buttonDown.on('pointerdown', pointer => 
        {
            bDownPressed = true;
        });
        buttonDown.on('pointerout', pointer => 
        {

            bDownPressed = false;

        });

        buttonDown.on('pointerup',  pointer => 
        {

            bDownPressed = false;

        });

        buttonUp.rotation = Phaser.Math.DegToRad(-90);
        buttonDown.rotation = Phaser.Math.DegToRad(90);
        buttonLeft.rotation = Phaser.Math.DegToRad(180);
          
        this.input.addPointer(1);
        
        
    }
    update() {
        const pointer = this.input.activePointer;
        //update é chamado 60 vezes por segundo;
        //É como o update da Unity e onde a lógica do jogo ocorre
        //Movimentação horizontal
        if (this.arrow.right.isDown || bRPressed) {
            this.moveR();
             //Move para a direita

        } else if (this.arrow.left.isDown || bLPressed) {
            this.moveL(); //Move para a esquerda
        }
        //Movimentação vertical
        if (this.arrow.down.isDown || bDownPressed) {
            this.moveDown(); //Move para baixo

        } else if (this.arrow.up.isDown || bUPPressed) {
            this.moveUP(); //Move para cima

        }

        //enemy movement
        if (enemy.x < player.x) {
            enemy.x += enemySpeed;
        } 
        else if (enemy.x > player.x) {
            enemy.x -= enemySpeed;
        }
        if (enemy.y < player.y) {
            enemy.y += enemySpeed;
        }
        else if (enemy.y > player.y) {
            enemy.y -= enemySpeed;
        }

        if(GameOver == false){

            playerSpeed = 4;
            enemySpeed = 1.5;
            if ( ballEnemyCount == 0 && this.time.now > 5000) {
                ballEnemy = this.physics.add.image(0, 0, 'enemy').setScale(1.5);
    
                ballEnemy.body.velocity.x = 200;
                ballEnemy.body.velocity.y = 200;
                //certifica que a bola ira rebater quando acertar em algo
                ballEnemy.body.bounce.setTo(1);
                ballEnemy.body.collideWorldBounds = true;
                ballEnemyCount += 1;
                this.physics.add.overlap(player, ballEnemy, this.hitPlayer, null, this);
                
            }
            if ( ballEnemyCount == 1 && this.time.now > 25000) {
                ballEnemy = this.physics.add.image(0, 0, 'enemy').setScale(1.5);
    
                ballEnemy.body.velocity.x = 300;
                ballEnemy.body.velocity.y = 100;
                //certifica que a bola ira rebater quando acertar em algo
                ballEnemy.body.bounce.setTo(1);
                ballEnemy.body.collideWorldBounds = true;
                ballEnemyCount += 1;
                this.physics.add.overlap(player, ballEnemy, this.hitPlayer, null, this);
                
            }
            if ( ballEnemyCount == 2 && this.time.now > 45000) {
                ballEnemy = this.physics.add.image(0, 0, 'enemy').setScale(1.5);
    
                ballEnemy.body.velocity.x = 100;
                ballEnemy.body.velocity.y = 300;
                //certifica que a bola ira rebater quando acertar em algo
                ballEnemy.body.bounce.setTo(1);
                ballEnemy.body.collideWorldBounds = true;
                ballEnemyCount += 1;
                this.physics.add.overlap(player, ballEnemy, this.hitPlayer, null, this);
                
            }
    
            if ( ballEnemyCount == 3 && this.time.now > 80000) {
                ballEnemy = this.physics.add.image(0, 0, 'enemy').setScale(1.5);
    
                ballEnemy.body.velocity.x = 600;
                ballEnemy.body.velocity.y = 50;
                //certifica que a bola ira rebater quando acertar em algo
                ballEnemy.body.bounce.setTo(1);
                ballEnemy.body.collideWorldBounds = true;
                ballEnemyCount += 1;
                this.physics.add.overlap(player, ballEnemy, this.hitPlayer, null, this);
                
            }
        }

        if(GameOver == true){
            if( ballEnemyCount > 0){

                

            }

            enemySpeed = 0;
            playerSpeed = 0;
        }
        
        //rotação da espada
        // if (this.keyA.isDown) {
        //     sword.rotation += swordRotationCounterClock;
        // }
        // if (this.keyD.isDown) {
        //     sword.rotation += swordRotationClock;   
        // }

        //sword.x = player.x;
        //sword.y = player.y;

        //faça os pontos aumentarem com o tempo
        timer += 1;
        if (timer > 60 && GameOver == false) {
            score += 1;
            scoreText.setText('Score: ' + score);
            timer = 0;
        }

        if(GameOver == true){
            resetButton = this.physics.add.sprite(400, 300, 'resetButton').setInteractive()
            .on('pointerdown', () => this.gameOverScene());    
        }
        

    }   

        
    hitPlayer(player, enemy) {
        
        console.log("hit1");
        scoreText.setText('Score: ' + score);
        GameOver = true;
        
    }

    gameOverScene(){
        resetButton.destroy();
        this.time.now = 0;
        GameOver = false;
        score = 0;
        this.scene.restart();
        location.reload();
    }

    moveR(){
        player.x += playerSpeed;
    }
    moveL(){
        player.x -= playerSpeed;
    }
    moveUP(){
        player.y -= playerSpeed;
    }
    moveDown(){
        player.y += playerSpeed;
    }

    // hitEnemy(sword, enemy) {
    //     console.log("hit2");
    //     score += 1;
    //     scoreText.setText('Score: ' + score);
    // }
    
}
var config = {
    width: 800,                     //Largura do jogo em pixels
    height: 600,                    //Altura do jogo em pixels
    backgroundColor: '#0a0a0a',     //Cor de background
    scene: mainScene,               //O nome da cena criada
    physics: { default: 'arcade' }, //O tipo de física utilizada
    parent: 'game',                 //Cria o jogo dentro da div 'game'
}
var game = new Phaser.Game(config);







