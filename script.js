// Perguntas do quiz organizadas por nível de dificuldade
const questions = {
    easy: [
        {
            question: "Qual é a principal fonte de água doce disponível para consumo humano?",
            options: [
                "Oceanos",
                "Rios e lagos",
                "Águas subterrâneas",
                "Geleiras"
            ],
            correctAnswer: 2,
            waterImpact: 10
        },
        {
            question: "Qual é a melhor prática para economizar água ao escovar os dentes?",
            options: [
                "Deixar a torneira aberta",
                "Usar um copo de água",
                "Usar água mineral",
                "Não escovar os dentes"
            ],
            correctAnswer: 1,
            waterImpact: 10
        },
        {
            question: "Qual é a melhor forma de reutilizar água da chuva?",
            options: [
                "Beber",
                "Regar plantas",
                "Lavar roupas",
                "Cozinhar"
            ],
            correctAnswer: 1,
            waterImpact: 10
        }
    ],
    medium: [
        {
            question: "Qual atividade consome mais água no Brasil?",
            options: [
                "Indústria",
                "Agricultura",
                "Consumo doméstico",
                "Geração de energia"
            ],
            correctAnswer: 1,
            waterImpact: 20
        },
        {
            question: "Qual é o principal problema causado pelo desperdício de água?",
            options: [
                "Aumento da conta de água",
                "Escassez hídrica",
                "Poluição do ar",
                "Desmatamento"
            ],
            correctAnswer: 1,
            waterImpact: 20
        },
        {
            question: "Qual é a porcentagem de água doce disponível no planeta?",
            options: [
                "2,5%",
                "5%",
                "10%",
                "15%"
            ],
            correctAnswer: 0,
            waterImpact: 20
        }
    ],
    hard: [
        {
            question: "Qual é o principal gás de efeito estufa liberado pela decomposição da matéria orgânica em rios poluídos?",
            options: [
                "Dióxido de carbono",
                "Metano",
                "Óxido nitroso",
                "Vapor d'água"
            ],
            correctAnswer: 1,
            waterImpact: 30
        },
        {
            question: "Qual é o principal processo de tratamento de água que remove partículas sólidas?",
            options: [
                "Cloração",
                "Fluoretação",
                "Coagulação",
                "Filtração"
            ],
            correctAnswer: 2,
            waterImpact: 30
        },
        {
            question: "Qual é o principal impacto da acidificação dos oceanos?",
            options: [
                "Aumento da temperatura",
                "Dissolução dos recifes de coral",
                "Aumento do nível do mar",
                "Formação de tsunamis"
            ],
            correctAnswer: 1,
            waterImpact: 30
        }
    ]
};

// Variáveis globais
let currentQuestion = 0;
let score = 0;
let waterLevel = 0;
let isAnswered = false;
let currentDifficulty = 'easy';
let questionsAnswered = 0;

// Elementos do DOM
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const waterLevelElement = document.querySelector('.water-level');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-button');

// Função para atualizar o nível de água
function updateWaterLevel() {
    waterLevelElement.style.height = `${waterLevel}%`;
}

// Função para obter o próximo nível de dificuldade
function getNextDifficulty() {
    const difficulties = ['easy', 'medium', 'hard'];
    const currentIndex = difficulties.indexOf(currentDifficulty);
    return difficulties[(currentIndex + 1) % difficulties.length];
}

// Função para mostrar a pergunta atual
function showQuestion() {
    const question = questions[currentDifficulty][currentQuestion];
    questionText.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });
    
    isAnswered = false;
}

// Função para verificar a resposta
function checkAnswer(selectedIndex) {
    if (isAnswered) return;
    isAnswered = true;
    
    const question = questions[currentDifficulty][currentQuestion];
    const buttons = document.querySelectorAll('.option-button');
    
    buttons.forEach(button => button.disabled = true);
    
    if (selectedIndex === question.correctAnswer) {
        buttons[selectedIndex].classList.add('correct');
        score += question.waterImpact;
        waterLevel += question.waterImpact;
        updateWaterLevel();
        scoreElement.textContent = `Pontuação: ${score}`;
        questionsAnswered++;
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correctAnswer].classList.add('correct');
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions[currentDifficulty].length) {
            showQuestion();
        } else {
            currentDifficulty = getNextDifficulty();
            currentQuestion = 0;
            if (currentDifficulty === 'easy') {
                endQuiz();
            } else {
                showQuestion();
            }
        }
    }, 1500);
}

// Função para determinar a premiação
function getReward() {
    if (score >= 150) {
        return {
            title: "Mestre da Água! 🌊",
            message: "Parabéns! Você é um verdadeiro especialista em conservação de água!",
            icon: "fas fa-crown"
        };
    } else if (score >= 100) {
        return {
            title: "Guardião da Água! 💧",
            message: "Excelente! Você tem um ótimo conhecimento sobre água!",
            icon: "fas fa-award"
        };
    } else if (score >= 50) {
        return {
            title: "Amigo da Água! 💦",
            message: "Bom trabalho! Continue aprendendo sobre conservação de água!",
            icon: "fas fa-star"
        };
    } else {
        return {
            title: "Iniciante! 🌱",
            message: "Continue estudando sobre conservação de água!",
            icon: "fas fa-seedling"
        };
    }
}

// Função para finalizar o quiz
function endQuiz() {
    const reward = getReward();
    questionText.textContent = "Quiz finalizado!";
    optionsContainer.innerHTML = '';
    
    const finalMessage = document.createElement('div');
    finalMessage.className = 'final-message';
    finalMessage.innerHTML = `
        <i class="${reward.icon}"></i>
        <h2>${reward.title}</h2>
        <p>${reward.message}</p>
        <p class="final-score">Sua pontuação final: ${score}</p>
    `;
    
    optionsContainer.appendChild(finalMessage);
    
    startButton.style.display = 'block';
    startButton.textContent = 'Jogar novamente';
    startButton.addEventListener('click', startQuiz);
}

// Função para iniciar o quiz
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    waterLevel = 0;
    questionsAnswered = 0;
    currentDifficulty = 'easy';
    updateWaterLevel();
    scoreElement.textContent = 'Pontuação: 0';
    startButton.style.display = 'none';
    showQuestion();
}

// Event listener para o botão de início
startButton.addEventListener('click', startQuiz); 