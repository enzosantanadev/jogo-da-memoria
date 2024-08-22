document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' },
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' }
    ];

    let grid = document.querySelector('.grid');
    let resetButton = document.getElementById('reset-button');
    let chosenCards = [];
    let chosenCardsId = [];
    let matchedCards = [];

    function createBoard() {
        grid.innerHTML = ''; // Limpa o tabuleiro
        cardArray.sort(() => 0.5 - Math.random()); // Embaralha as cartas
        cardArray.forEach((_, index) => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', index);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (chosenCardsId.length < 2 && !chosenCardsId.includes(cardId)) {
            this.textContent = cardArray[cardId].img;
            this.classList.add('flipped');
            chosenCards.push(cardArray[cardId].name);
            chosenCardsId.push(cardId);
            if (chosenCards.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        let cards = document.querySelectorAll('.card');
        const [firstId, secondId] = chosenCardsId;
        if (chosenCards[0] === chosenCards[1]) {
            cards[firstId].classList.add('matched');
            cards[secondId].classList.add('matched');
            matchedCards.push(chosenCards);
        } else {
            cards[firstId].textContent = '';
            cards[secondId].textContent = '';
            cards[firstId].classList.remove('flipped');
            cards[secondId].classList.remove('flipped');
        }
        chosenCards = [];
        chosenCardsId = [];
        if (matchedCards.length === cardArray.length / 2) {
            setTimeout(() => alert('Você encontrou todos os pares!'), 300);
        }
    }

    resetButton.addEventListener('click', () => {
        matchedCards = [];
        chosenCards = [];
        chosenCardsId = [];
        createBoard();
    });

    createBoard(); 
});
