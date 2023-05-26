class mainScene {
    //Cria três métodos base para o projeto
    preload() {
        //preload é chamado uma vez no início
        //Serve para carregar os assets como sprites e sons  
        //Carrega o sprite do player na cena
        this.load.image('player', 'assets/BallGB.png');
        this.load.image('enemy', 'assets/BallRED.png');
        this.load.image('sword', 'assets/Sword.png');
    }
    create() {
        //create é chamado uma vez depois do preload
        //Serve para inicializar a cena (pense nele como o Start da Unity)
        //Posiciona o player na posição inicial
        this.player = this.physics.add.image(100, 100, 'player');
        this.enemy = this.physics.add.image(300, 300, 'enemy');
        this.sword = this.physics.add.image(200, 200, 'sword');
        //Armazena a pontuação
        this.score = 0;
        //Define o estilo da pontuação
        let style = { font: '20px Arial', fill: "#ffffff" };
        //Adiciona o texto na posição x 20, y 20 e aplica o estilo
        this.scoreText = this.add.text(20, 20, 'Score: ' + this.score, style);
        //Adiciona input do teclado
        this.arrow = this.input.keyboard.createCursorKeys();
    }
    update() {
        //update é chamado 60 vezes por segundo;
        //É como o update da Unity e onde a lógica do jogo ocorre
        //Movimentação horizontal
        if (this.arrow.right.isDown) {
            this.player.x += 3; //Move para a direita
        } else if (this.arrow.left.isDown) {
            this.player.x -= 3; //Move para a esquerda
        }
        //Movimentação vertical
        if (this.arrow.down.isDown) {
            this.player.y += 3; //Move para baixo
        } else if (this.arrow.up.isDown) {
            this.player.y -= 3; //Move para cima
        }

    }

}

new Phaser.Game({
    width: 700,                     //Largura do jogo em pixels
    height: 400,                    //Altura do jogo em pixels
    backgroundColor: '#040483',     //Cor de background
    scene: mainScene,               //O nome da cena criada
    physics: { default: 'arcade' }, //O tipo de física utilizada
    parent: 'game',                 //Cria o jogo dentro da div 'game'
});

