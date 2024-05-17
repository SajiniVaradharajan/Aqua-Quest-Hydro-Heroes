document.addEventListener('DOMContentLoaded', function(){
    const instructionsPanel = document.getElementById('instructions');
    const gamePanel = document.getElementById('game-panel');
    const startButton = document.getElementById('start-btn');
    const daysRemainingDisplay = document.getElementById('days-remaining');
    const waterResourcesDisplay = document.getElementById('water-resources');
    const pointsDisplay = document.getElementById('points');
    const actionsContainer = document.getElementById('actions');
    const messageBox = document.getElementById('message');

    let waterResources = 1000;
    let daysRemaining = 30;
    let points = 0;
    let clickCounter = 0;

    // Array of quotes
    const quotes = [
        "Saving water now means a better future for all.",
        "Conservation starts with you!",
        "Every drop counts.",
        "Water is life. Don't waste it.",
        "Be a water hero!",
        "Conserve water, conserve life.",
        "Water is a precious resource, let's use it wisely.",
        "Small actions can make a big difference.",
        "Protecting water today, securing tomorrow.",
        "Use water wisely, be water wise."
    ];

    startButton.addEventListener('click', function() {
        instructionsPanel.classList.add('hidden');
        gamePanel.classList.remove('hidden');
        showGameStatus();
    });

    actionsContainer.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', function() {
            const amount = parseInt(button.getAttribute('data-amount'));
            const earnedPoints = parseInt(button.getAttribute('data-points'));
            
            waterResources += amount;
            points += earnedPoints;

            // Decrease days remaining for all actions
            daysRemaining--;

            // Update water meter dynamically
            document.getElementById('water-meter').value = waterResources;

            showGameStatus();
            checkGameOver();
            if (button.id !== 'action-help') {
                clickCounter++;
                if (clickCounter % 2 === 0) {
                    showFeedback();
                }
            }
        });
    });

    const helpButton = document.getElementById('action-help');
    helpButton.addEventListener('click', function() {
        messageBox.textContent = "Click on any one of these buttons to fix the water crisis. Ensure that your time doesn't run out.";
        messageBox.classList.remove('hidden');
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 10000);
    });

    function showGameStatus() {
        daysRemainingDisplay.textContent = daysRemaining;
        waterResourcesDisplay.textContent = waterResources;
        pointsDisplay.textContent = points;
    }

    function checkGameOver() {
        if (waterResources <= 0 || daysRemaining === 0) {
            // Display positive game over message with instructions
            alert("Game's over, but you have managed to show quick-thinking, speed, and accuracy skills in your endeavor to save water. You're a hydro hero! Click on the 'Next' button in the home page at the left corner to view the next page.");

            // Create and append the new "Next" button
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.id = 'next-btn';
            nextButton.classList.add('action-btn');
            document.body.appendChild(nextButton);

            // Add event listener to the new button to navigate to the new page
            nextButton.addEventListener('click', function() {
                window.location.href = "https://blog.cwf-fcf.org/wp-content/uploads/2017/03/Loren-Eiseley-1100x619.jpg";
            });

            resetGame();
        } else if (daysRemaining === 20 || daysRemaining === 10) {
            alert("Warning: Water shortage crisis approaching!");
        }
    }

    function resetGame() {
        // Reset game state
        waterResources = 1000;
        daysRemaining = 30;
        points = 0;
        
        // Hide game panel and show instructions panel
        showGameStatus();
        instructionsPanel.classList.remove('hidden');
        gamePanel.classList.add('hidden');
    }

    function showFeedback() {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        messageBox.textContent = randomQuote;
        messageBox.classList.remove('hidden');
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 10000);
    }
});