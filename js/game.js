let swordRotationClock = 0.05;
let swordRotationCounterClock = -swordRotationClock;
let playerSpeed = 4;
let player;
let sword;
let score;
let scoreText;
let enemy;
let maxBallEnemy = 3;
let ballEnemyCount = 0;
let enemySpeed = 1.5;
let ballEnemy;
let ballEnemySpeed = 3.5;
let timer = 0;
let GameOver = false;



class mainScene {
    
    
    //Cria três métodos base para o projeto
    preload() {
        //preload é chamado uma vez no início
        //Serve para carregar os assets como sprites e sons  
        //Carrega o sprite do player na cena
        this.load.image('player', 'assets/BallGB.png');
        this.load.image('enemy', 'assets/BallRED.png');
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
        this.physics.add.overlap(player, enemy, this.hitPlayer, null, this);

        this.physics.add.collider(player, ballEnemy);
        

        
        
        //this.physics.add.collider(sword, enemy);
        //this.physics.add.collider(sword, enemy, this.hitEnemy, null, this);
       
        
    }
    update() {
        //update é chamado 60 vezes por segundo;
        //É como o update da Unity e onde a lógica do jogo ocorre
        //Movimentação horizontal
        if (this.arrow.right.isDown) {
            player.x += playerSpeed; //Move para a direita

        } else if (this.arrow.left.isDown) {
            player.x -= playerSpeed; //Move para a esquerda

        }
        //Movimentação vertical
        if (this.arrow.down.isDown) {
            player.y += playerSpeed; //Move para baixo

        } else if (this.arrow.up.isDown) {
            player.y -= playerSpeed; //Move para cima

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

        if ( ballEnemyCount == 0 && this.time.now > 10000) {
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
        if (timer > 60) {
            score += 1;
            scoreText.setText('Score: ' + score);
            timer = 0;
        }

        if(GameOver == true){
            this.input.on('pointerdown', function (pointer){
                this.scene.restart();
            });
        }
        

    }   

        
    hitPlayer(player, enemy) {
        
        console.log("hit1");
        scoreText.setText('Score: ' + score);
        this.add.text(80, 200, "Game Over", { font: '32px Arial', fill: '#ffffff', align: 'center'});
        this.add.text(80, 400, "Press any location to restart", { font: '32px Arial', fill: '#ffffff', align: 'center'});
        GameOver = true;
        
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







