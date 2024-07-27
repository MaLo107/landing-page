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

    const sourceText = `Hey guys! I'm Mauricio, an upcoming fourth year at UVA! I am a passionate CS student and developer with a keen interest in AI and software engineering. I enjoy creating innovative solutions to complex problems and always strive to learn and grow in my field through experiences, internships, or personal projects.I am currently working on two projects, 'SchedPro' and 'EmissionWise', two platforms that I hope to grow and enhance as time goes on (Both links at the bottom are currently under construction!).Welcome to my personal landing page where you can learn about and connect with me. Hope to meet as many of you as I can!`;

    let i = 0;
    const speed = 50;  // Speed of typing, in milliseconds
    const codeElement = document.getElementById('typing-code');

    function typeWriter() {
        if (i < sourceText.length) {
            codeElement.textContent += sourceText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();  // Initialize the typing effect
});