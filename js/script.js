<script>
document.getElementById("calculateBtn").addEventListener("click", function () {
    // Get input values
    let totalQuestions = parseInt(document.getElementById("totalQuestions").value) || 0;
    let maxMarks = parseFloat(document.getElementById("maxMarks").value) || 0;
    let attempted = parseInt(document.getElementById("attempted").value) || 0;
    let right = parseInt(document.getElementById("right").value) || 0;
    let negativeRatio = document.getElementById("negative").value;

    // Calculate wrong questions automatically
    let wrong = attempted - right;
    if (wrong < 0) wrong = 0; // safeguard if input error

    // Marks per question
    let marksPerQuestion = maxMarks / totalQuestions;

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

    // Show result
    document.getElementById("resultSection").classList.add("show");
    document.getElementById("scoreValue").innerText = finalScore.toFixed(2);
    document.getElementById("summaryCorrect").innerText = right;
    document.getElementById("summaryWrong").innerText = wrong;
    document.getElementById("summaryAttempted").innerText = attempted;
});
</script>
