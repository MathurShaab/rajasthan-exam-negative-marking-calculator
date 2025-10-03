function calculateScore() {
    // Get input values
    const totalQuestions = parseInt(document.getElementById('totalQuestions').value) || 0;
    const maxMarks = parseFloat(document.getElementById('maxMarks').value) || 0;
    const attemptedQuestions = parseInt(document.getElementById('attemptedQuestions').value) || 0;
    const wrongAnswers = parseInt(document.getElementById('wrongQuestions').value) || 0;
    const negativeRatio = parseFloat(document.getElementById('negativeRatio').value) || 0;

    // Validate inputs
    if (totalQuestions === 0 || maxMarks === 0) {
        alert('Please enter total questions and maximum marks');
        return;
    }

    if (attemptedQuestions > totalQuestions) {
        alert('Attempted questions cannot exceed total questions');
        return;
    }

    if (wrongAnswers > attemptedQuestions) {
        alert('Wrong answers cannot exceed attempted questions');
        return;
    }

    // Marks per question (auto-calculated)
    const marksPerQuestion = maxMarks / totalQuestions;

    // Calculate values
    const correctAnswers = attemptedQuestions - wrongAnswers;
    const unattemptedQuestions = totalQuestions - attemptedQuestions;

    // Calculate scores
    const positiveMarks = correctAnswers * marksPerQuestion;
    const negativeMarks = wrongAnswers * marksPerQuestion * negativeRatio;
    const totalScore = positiveMarks - negativeMarks;

    // Calculate percentages
    const accuracy = attemptedQuestions > 0 ? ((correctAnswers / attemptedQuestions) * 100).toFixed(2) : 0;
    const percentage = maxMarks > 0 ? ((totalScore / maxMarks) * 100).toFixed(2) : 0;

    // Performance analysis
    let performanceStatus = '';
    let analysisText = '';

    if (parseFloat(accuracy) >= 80) {
        performanceStatus = '🌟 Excellent Performance!';
        analysisText = `Outstanding work! With ${accuracy}% accuracy, you're demonstrating strong command.`;
    } else if (parseFloat(accuracy) >= 60) {
        performanceStatus = '👍 Good Performance';
        analysisText = `Good job! ${accuracy}% accuracy shows solid preparation.`;
    } else if (parseFloat(accuracy) >= 40) {
        performanceStatus = '⚠️ Needs Improvement';
        analysisText = `Your ${accuracy}% accuracy indicates room for improvement.`;
    } else {
        performanceStatus = '🚨 Requires Attention';
        analysisText = `With ${accuracy}% accuracy, you need to revisit your preparation strategy.`;
    }

    if (negativeMarks > positiveMarks * 0.3) {
        analysisText += ` Note: High negative marking (${negativeMarks.toFixed(2)} marks lost) suggests you should attempt more carefully.`;
    }

    // Display results
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('totalScore').textContent = totalScore.toFixed(2);
    document.getElementById('positiveMarks').textContent = '+' + positiveMarks.toFixed(2);
    document.getElementById('negativeMarks').textContent = '-' + negativeMarks.toFixed(2);
    document.getElementById('accuracy').textContent = accuracy + '%';
    document.getElementById('percentage').textContent = percentage + '%';
    document.getElementById('unattempted').textContent = unattemptedQuestions;
    document.getElementById('performanceStatus').textContent = performanceStatus;
    document.getElementById('analysisText').textContent = analysisText;

    // Show result section with animation
    document.getElementById('resultSection').classList.add('show');
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });

    // Store calculation in session memory
    window.lastCalculation = {
        totalQuestions, maxMarks, attemptedQuestions, wrongAnswers, correctAnswers,
        marksPerQuestion: marksPerQuestion.toFixed(2), negativeRatio, totalScore: totalScore.toFixed(2),
        timestamp: new Date().toISOString()
    };
}

// Reset calculator function
function resetCalculator() {
    document.getElementById('totalQuestions').value = '';
    document.getElementById('maxMarks').value = '';
    document.getElementById('attemptedQuestions').value = '';
    document.getElementById('wrongQuestions').value = '';
    document.getElementById('negativeRatio').value = '0';
    document.getElementById('resultSection').classList.remove('show');
    document.getElementById('totalQuestions').focus();
}

// Add keyboard support (Enter = calculate)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.type === 'number') {
        calculateScore();
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('totalQuestions').focus();
});
function setPreset(examType) {
    const presets = {
        'ras': { total: 150, max: 200, negative: '0.33' },
        'constable': { total: 150, max: 300, negative: '0.5' },
        'juniorAssistant': { total: 200, max: 200, negative: '0.25' },
        'si': { total: 100, max: 200, negative: '0.33' },
        'patwari': { total: 150, max: 300, negative: '0.33' },
        'fourth_grade': { total: 120, max: 200, negative: '0.33' }
    };

    if(presets[examType]) {
        const preset = presets[examType];
        document.getElementById('totalQuestions').value = preset.total;
        document.getElementById('maxMarks').value = preset.max;
        document.getElementById('negativeRatio').value = preset.negative;
        document.getElementById('attemptedQuestions').value = '';
        document.getElementById('wrongAnswers').value = '';
        document.getElementById('resultSection').classList.remove('show');
    }
}
