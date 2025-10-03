// calculator.js

document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");
    const resultSection = document.getElementById("resultSection");

    // Handle Calculate
    calculateBtn.addEventListener("click", function () {
        let totalQuestions = parseInt(document.getElementById("totalQuestions").value) || 0;
        let maxMarks = parseFloat(document.getElementById("maxMarks").value) || 0;
        let attempted = parseInt(document.getElementById("attempted").value) || 0;
        let right = parseInt(document.getElementById("right").value) || 0;
        let negativeRatio = document.getElementById("negative").value;

        // Auto calculate wrong questions
        let wrong = attempted - right;
        if (wrong < 0) wrong = 0;

        // Marks per question
        let marksPerQuestion = (totalQuestions > 0) ? (maxMarks / totalQuestions) : 0;

        // Correct marks
        let correctMarks = right * marksPerQuestion;

        // Negative marks
        let negativeMarks = 0;
        if (negativeRatio !== "no") {
            let ratioParts = negativeRatio.split("/");
            if (ratioParts.length === 2) {
                let divisor = parseFloat(ratioParts[1]);
                negativeMarks = wrong * (marksPerQuestion / divisor);
            }
        }

        // Final score
        let finalScore = correctMarks - negativeMarks;
        if (finalScore < 0) finalScore = 0;

        // Display result
        resultSection.classList.add("show");
        document.getElementById("scoreValue").innerText = finalScore.toFixed(2);
        document.getElementById("summaryCorrect").innerText = right;
        document.getElementById("summaryWrong").innerText = wrong;
        document.getElementById("summaryAttempted").innerText = attempted;
    });

    // Handle Reset
    resetBtn.addEventListener("click", function () {
        document.getElementById("totalQuestions").value = "";
        document.getElementById("maxMarks").value = "";
        document.getElementById("attempted").value = "";
        document.getElementById("right").value = "";
        document.getElementById("negative").value = "no";
        resultSection.classList.remove("show");
    });

    // Preset Buttons
    const presetButtons = document.querySelectorAll(".preset-btn");
    presetButtons.forEach(button => {
        button.addEventListener("click", function () {
            let total = this.getAttribute("data-total");
            let marks = this.getAttribute("data-marks");
            let negative = this.getAttribute("data-negative");

            document.getElementById("totalQuestions").value = total;
            document.getElementById("maxMarks").value = marks;
            document.getElementById("negative").value = negative;
        });
    });
});
