document.addEventListener('DOMContentLoaded', () => {
    const preparation = document.getElementById('preparation');
    const opportunity = document.getElementById('opportunity');
    const timer = document.getElementById('timer');

    let preparationClicks = 0;
    let opportunityClicks = 0;
    const maxClicks = 50; // Number of clicks to reach full visibility

    let startTime = null;
    let intervalId = null;

    const startTimer = () => {
        startTime = Date.now();
        intervalId = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0');
            const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0');
            const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
            timer.textContent = `Time: ${hours}:${minutes}:${seconds}`;
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(intervalId);
        const elapsedTime = Date.now() - startTime;
        const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
        timer.textContent = `Finished in: ${hours}:${minutes}:${seconds}`;
    };

    const handleClick = (wordElement, clicks) => {
        if (clicks < maxClicks) {
            const opacity = clicks / maxClicks;
            wordElement.style.color = `rgba(255, 255, 255, ${opacity})`;
            if (opacity === 1) {
                // Trigger confetti when word is fully visible
                triggerConfetti(wordElement);
            }
        } else {
            if (preparationClicks >= maxClicks && opportunityClicks >= maxClicks) {
                stopTimer();
            }
        }
    };

    const triggerConfetti = (wordElement) => {
        // Create confetti element
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        wordElement.appendChild(confetti);
        // Remove confetti after animation
        setTimeout(() => {
            wordElement.removeChild(confetti);
        }, 3000);
    };

    preparation.addEventListener('click', () => {
        if (preparationClicks === 0 && opportunityClicks === 0) {
            startTimer();
        }
        if (preparationClicks < maxClicks) {
            preparationClicks++;
            handleClick(preparation, preparationClicks);
        }
    });

    opportunity.addEventListener('click', () => {
        if (preparationClicks === 0 && opportunityClicks === 0) {
            startTimer();
        }
        if (opportunityClicks < maxClicks) {
            opportunityClicks++;
            handleClick(opportunity, opportunityClicks);
        }
    });
});