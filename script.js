const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d'); // On va utiliser un environnement 2D dans notre canvas.

context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
let particuleTab;

class Particule {
    // On va utiliser la méthode constructor qui sert à gérer les propriétées qui vont être crées dans l'objet que l'on veut faire avec notre class.
    constructor(x, y, directionX, directionY, taille, couleur) {
        // On veut que l'objet créé ai les propriétés qu'on lui attribut lors de sa création
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.taille = taille;
        this.couleur = couleur;
    }

    // On veut dessiner les particules sur notre canvas. On va créer une méthode

    dessine() {
        context.beginPath(); // On commence à dessier
        context.arc(this.x, this.y, this.taille, 0, Math.PI * 2, false)
        context.fillStyle = this.couleur
        context.fill() // Rempli le canvas
    }

    // On va appeler ici la mathode dessine. La MAJ sera créé à chaque animation (reload).
    MAJ() {
        if(this.x + this.taille > canvas.width || this.x - this.taille < 0) {
            this.directionX = -this.directionX;
        }
        if(this.y + this.taille > canvas.height || this.y - this.taille < 0) {
            this.directionY = -this.directionY;
        }

        this.x = this.x + this.directionX;
        this.y += this.directionY;
        this.dessine(); //
    }
}

// const obj1 = new Particule(300, 300, 1, 1, 100, "white");
// obj1.dessine();

// Ci dessus, on a un objet qui à été créé, mais si on en veut une centaine, on ne va pas créer autant d'objet qu'on veut en afficher. On va faire une fonction nous permettant de placer les particules dans un tableau.

function init() {
    particuleTab = [];
    // On va itérer 100 fois et mettre 100 objets dans ce tableau.
    // DONC pour chaque objet, il nous faudre une taille, une position, une direction et une couleur.
    for(let i = 0; i < 100; i++) {
        let taille = (Math.random() + 0.01) * 20;
        let x = Math.random() * (window.innerWidth - taille * 2); // On enlève taille*2 pour que ça ne vienne pas se mettre sur les bordures mais à côté.
        let y = Math.random() * (window.innerHeight - taille * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let couleur = "white";

        particuleTab.push(new Particule(x, y, directionX, directionY, taille, couleur));
    }
}

function animation() {
    requestAnimationFrame(animation); // Exécute la fonction qu'on lui passe en paramètre 60x par seconde.
    // On veut nettoyer notre écren puis refaire apparaître nos éléments autant de fous qu'ils disparaissent. A nos yeux ça fait une animation.
    context.clearRect(0,0, window.innerWidth, window.innerHeight);

    // Pour faire apparaître les éléments, on boucle sur le tableau de particule
    for(let i = 0; i < particuleTab.length; i++){
        // On prend en compte chaque objet, on utilise MAJ dessus, qui sera une méthode de mise à jour de notre class, nous permettant de faire bouger les particules.
        particuleTab[i].MAJ();
    }
}

init();
animation();

// On remarque que lorsque l'on redimmesionne notre écran, les particules s'étalent, se pixelisent.

function resize() {
    init();
    animation();
}

let doIt;
// Quand on va redimmentionner (resize) notre fenêtre, on va mettre un setTimeOut qui va se lancer au bout de 0.1s. Il va appeler la fonction resize, appelant elle même les fonction init et animation, en se basant sur les nouvelles dimensions du navigateur.
window.addEventListener('resize', () => {
    clearTimeout(doIt);
    doIt = setTimeout(resize, 100);
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
});