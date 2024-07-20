document.addEventListener('DOMContentLoaded', () => {
    const goalInput = document.querySelector('input[type="number"]');
    const quantityDisplay = document.querySelector('.Quantity');
    const miniJar = document.querySelector('.miniJar');
    const waterDiv = document.querySelector('.water');
    const victoryMessage = document.querySelector('.victory');
    let goal = 0;
    let totalIntake = 0;

    goalInput.addEventListener('change', () => {
        goal = parseInt(goalInput.value);
        updateQuantityDisplay();
    });

    miniJar.addEventListener('click', (event) => {
        if (goal > 0) {
            if (event.target.classList.contains('fa-mug-hot')) {
                addToJar(100);
            } else if (event.target.classList.contains('fa-glass-water')) {
                addToJar(250);
            } else if (event.target.classList.contains('fa-bottle-water')) {
                addToJar(500);
            } else if (event.target.classList.contains('fa-jar')) {
                addToJar(1000);
            }
        } else {
            alert('Please set a water intake goal first!');
        }
    });

    function addToJar(amount) {
        totalIntake += amount;
        updateQuantityDisplay();
        updateWaterLevel();
        checkGoal();
    }

    function updateQuantityDisplay() {
        quantityDisplay.textContent = `${totalIntake}ml/${goal}ml Goal`;
    }

    function updateWaterLevel() {
        if (goal > 0) {
            const percentage = (totalIntake / goal) * 100;
            waterDiv.style.height = `${Math.min(percentage, 100)}%`;
            updateTextColor(percentage);
        }
    }

    function updateTextColor(percentage) {
        if (percentage >= 100) {
            quantityDisplay.style.color = 'white';
        } else {
            const slateValues = ['#64748b', '#8190a6', '#a4afbf', '#c8d0db', '#c8d0db'];
            const index = Math.min(Math.floor(percentage / 20), slateValues.length - 1);
            quantityDisplay.style.color = slateValues[index];
        }
    }

    function checkGoal() {
        if (totalIntake >= goal) {
            setTimeout(() => {
                victoryMessage.classList.remove('hidden');
            }, 1000); 
        } else {
            victoryMessage.classList.add('hidden');
        }
    }

    // Initialize victory message hidden
    victoryMessage.classList.add('hidden');
});
