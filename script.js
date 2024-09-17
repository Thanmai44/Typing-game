document.addEventListener("DOMContentLoaded", function () {
    const textToType = document.getElementById("text-to-type");
    const typingInput = document.getElementById("typing-input");
    const speedDisplay = document.getElementById("speed");
    const accuracyDisplay = document.getElementById("accuracy");
    const sampleText = ["The sun rises over the horizon, painting the sky with shades of pink and orange. Birds chirp in the trees as the world slowly awakens to another day. The calmness of the morning is a reminder of nature’s quiet beauty.",
        "In today's fast-paced world, technology evolves at an incredible rate. From the introduction of artificial intelligence to the development of quantum computing, innovation knows no bounds. It’s fascinating how machines are learning to think and solve complex problems.",
        "Traveling through time has always been a dream for many. Imagine visiting ancient civilizations or witnessing the birth of the universe. Though time travel remains in the realm of science fiction, the idea continues to capture our imagination.",
         "Life is a journey filled with challenges and triumphs. Every step we take shapes our future, and every decision impacts the path ahead. It’s important to pause and reflect, to appreciate the small victories and learn from the setbacks."];
    let currentIndex = 0;
    let startTime = new Date();
    let errors = 0;

    function initializeGame() {
        const text = sampleText[Math.floor(Math.random() * sampleText.length)];
        textToType.textContent = text;
        typingInput.value = "";
        currentIndex = 0;
        startTime = new Date();
        errors = 0;
        updateFeedback();
    }

    function updateFeedback() {
        const currentTime = new Date();
        const elapsedTime = (currentTime - startTime) / 60000;

        const charsTyped = typingInput.value.length;
        const wordsTyped = charsTyped / 5;
        const speed = elapsedTime > 0 ? Math.round(wordsTyped / elapsedTime) : 0;
        speedDisplay.textContent = speed;

        const accuracy = currentIndex > 0 ? Math.round(((currentIndex - errors) / currentIndex) * 100) : 100;
        accuracyDisplay.textContent = accuracy;
    }

    function checkCharacter(inputChar, targetChar) {
        if (inputChar !== targetChar) {
            errors++;
            return false;
        } else {
            return true;
        }
    }

    function displayMessage(message) {
        const messageArea = document.getElementById("message-area");
        messageArea.textContent = message;
        setTimeout(() => {
            messageArea.textContent = "";
        }, 3000);
    }

    typingInput.addEventListener("input", function () {
        const typedElement = typingInput.value;
        const targetElement = textToType.textContent;

        if (currentIndex < typedElement.length) {
            const isCorrect = checkCharacter(typedElement[currentIndex], targetElement[currentIndex]);
            textToType.innerHTML =
                targetElement.substring(0, currentIndex) +
                (isCorrect
                    ? "<span class='correct'>" + targetElement[currentIndex] + "</span>"
                    : "<span class='incorrect'>" + targetElement[currentIndex] + "</span>") +
                targetElement.substring(currentIndex + 1);
            currentIndex++;

            if (currentIndex === targetElement.length) {
                displayMessage("Text Typed Successfully");
                setTimeout(initializeGame, 1000);
            }
        }

        updateFeedback();
    });

    initializeGame();
});
