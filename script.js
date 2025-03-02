document.addEventListener("DOMContentLoaded", function () {
    const regulationSelect = document.getElementById("regulation-select");
    if (regulationSelect) {
        regulationSelect.addEventListener("change", function () {
            if (this.value === "2022") {
                window.location.href = "R2022.html";
            }
        });
    }

    
    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            // No action needed for now
        });
    }

    
    const cgpaCalculator = document.getElementById("cgpa-calculator");
    if (cgpaCalculator) {
        cgpaCalculator.addEventListener("click", function () {
            window.location.href = "cgpa_calculator.html";
        });
    }
});
