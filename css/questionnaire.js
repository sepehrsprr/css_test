document.addEventListener('DOMContentLoaded', function() {
    // Define your questions here
    const questions = [
        { question: "What is your Business Name?", type: "text", name: "businessName", placeholder: "Your Business Name" },
        { question: "What is your Contact Email?", type: "email", name: "contactEmail", placeholder: "Contact Email" },
        { question: "What is your Target Audience?", type: "text", name: "targetAudience", placeholder: "Describe Your Target Audience" },
        { question: "Name a Key Competitor.", type: "text", name: "competitor", placeholder: "Competitor Name" },
        { question: "What is your Budget?", type: "number", name: "budget", placeholder: "Your Budget" }
    ];

    const formContainer = document.getElementById('form-container');
    const progressIndicator = document.getElementById('progress-indicator');

    // Only proceed if we're on the questionnaire page
    if (formContainer && progressIndicator) {
        // Create form steps for each question
        questions.forEach((q, index) => {
            const step = document.createElement('div');
            step.className = 'form-step';
            step.setAttribute('data-step', index + 1);

            step.innerHTML = `
                <h2>${q.question}</h2>
                <input type="${q.type}" name="${q.name}" placeholder="${q.placeholder}" required />
                <div class="button-container">
                    ${index > 0 ? `
                        <button class="back-btn">
                            <span class="label">Back</span>
                            <span class="icon">←</span>
                        </button>
                    ` : ''}
                    ${index < questions.length - 1 ? `
                        <button class="next-btn">
                            <span class="label">Next</span>
                            <span class="icon">→</span>
                        </button>
                    ` : `
                        <button class="submit-btn">
                            <span class="label">Review Answers</span>
                            <span class="icon">✓</span>
                        </button>
                    `}
                </div>
            `;
            
            formContainer.appendChild(step);

            // Create step indicator
            const indicator = document.createElement('div');
            indicator.className = 'step-indicator';
            indicator.setAttribute('data-step-indicator', index + 1);
            indicator.textContent = index + 1;
            progressIndicator.appendChild(indicator);
        });

        // Create a summary step
        const summaryStep = document.createElement('div');
        summaryStep.className = 'form-step summary-step';
        summaryStep.setAttribute('data-step', questions.length + 1);
        summaryStep.innerHTML = `
            <h2>Review Your Answers</h2>
            <div id="summary-content" class="summary-content"></div>
            <div class="button-container">
                <button class="back-btn">
                    <span class="label">Back</span>
                    <span class="icon">←</span>
                </button>
                <button class="confirm-btn">
                    <span class="label">Confirm & Generate Plan</span>
                    <span class="icon">✓</span>
                </button>
            </div>
        `;
        formContainer.appendChild(summaryStep);

        // Add summary step indicator
        const summaryIndicator = document.createElement('div');
        summaryIndicator.className = 'step-indicator';
        summaryIndicator.setAttribute('data-step-indicator', questions.length + 1);
        summaryIndicator.textContent = '✓';
        progressIndicator.appendChild(summaryIndicator);

        const formSteps = document.querySelectorAll('.form-step');
        const stepIndicators = document.querySelectorAll('.step-indicator');
        let currentStep = 0;

        const showStep = (step) => {
            formSteps.forEach((el, idx) => {
                el.style.display = idx === step ? 'flex' : 'none';
            });
            stepIndicators.forEach((el, idx) => {
                el.classList.toggle('active', idx === step);
            });
        };

        // Show initial step
        showStep(currentStep);

        // Handle button clicks
        document.addEventListener('click', (e) => {
            // Find the closest button if clicked on span or svg
            const button = e.target.closest('button');
            if (!button) return;

            if (button.classList.contains('next-btn')) {
                const currentInput = formSteps[currentStep].querySelector('input');
                if (currentInput.checkValidity()) {
                    currentStep++;
                    showStep(currentStep);
                } else {
                    currentInput.reportValidity();
                }
            } else if (button.classList.contains('back-btn')) {
                if (currentStep > 0) {
                    currentStep--;
                    showStep(currentStep);
                }
            } else if (button.classList.contains('submit-btn')) {
                const currentInput = formSteps[currentStep].querySelector('input');
                if (currentInput.checkValidity()) {
                    // Collect all data and show summary
                    const data = {};
                    questions.forEach((q, idx) => {
                        const input = formSteps[idx].querySelector(`input[name="${q.name}"]`);
                        data[q.name] = input.value;
                    });

                    // Fill summary step with collected data
                    const summaryContent = document.getElementById('summary-content');
                    summaryContent.innerHTML = '';
                    questions.forEach(q => {
                        const summaryItem = document.createElement('div');
                        summaryItem.className = 'summary-item';
                        summaryItem.innerHTML = `
                            <div class="summary-label">${q.question}</div>
                            <div class="summary-value">${data[q.name]}</div>
                        `;
                        summaryContent.appendChild(summaryItem);
                    });

                    currentStep++;
                    showStep(currentStep);
                } else {
                    currentInput.reportValidity();
                }
            } else if (button.classList.contains('confirm-btn')) {
                // Final confirm action
                alert('Thank you! Your business plan will be generated shortly.');
                // Here you would typically send the data to your backend
                // window.location.href = 'success.html'; // Redirect to success page
            }
        });
    }
});