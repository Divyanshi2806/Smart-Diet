document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let foodItems = [];
    let waterIntake = 0;
    const maxWater = 2000; // 2L maximum for visualization
    
    // Initialize charts
    const caloriesChart = new Chart(
        document.getElementById('calories-chart'),
        {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Calories Consumed',
                    data: [1800, 2100, 1900, 2200, 2000, 2300, 2100],
                    borderColor: '#3498db',
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        }
    );
    
    const macrosChart = new Chart(
        document.getElementById('macros-chart'),
        {
            type: 'pie',
            data: {
                labels: ['Protein', 'Carbs', 'Fat'],
                datasets: [{
                    data: [30, 50, 20],
                    backgroundColor: [
                        '#3498db',
                        '#2ecc71',
                        '#e74c3c'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    );
    
    // Generate calendar
    function generateCalendar() {
        const calendarEl = document.getElementById('calendar');
        const today = new Date();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        
        // Get first day of month
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
        
        // Add empty days for calendar alignment
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day');
            calendarEl.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day');
            dayEl.textContent = i;
            
            // Mark current day and some random days as active (for demo)
            if (i === today.getDate()) {
                dayEl.classList.add('active');
            } else if (i < today.getDate() && Math.random() > 0.3) {
                dayEl.classList.add('active');
            }
            
            calendarEl.appendChild(dayEl);
        }
    }
    
    // Add food item
    document.getElementById('add-food').addEventListener('click', addFoodItem);
    document.getElementById('food-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addFoodItem();
        }
    });
    
    function addFoodItem() {
        const foodInput = document.getElementById('food-input');
        const foodName = foodInput.value.trim();
        
        if (foodName) {
            // For demo purposes, generate random nutrition data
            // In a real app, this would come from an API
            const calories = Math.floor(Math.random() * 300) + 100;
            const protein = (Math.random() * 20).toFixed(1);
            const fat = (Math.random() * 15).toFixed(1);
            const fiber = (Math.random() * 10).toFixed(1);
            
            const foodItem = {
                name: foodName,
                calories: calories,
                protein: protein,
                fat: fat,
                fiber: fiber
            };
            
            foodItems.push(foodItem);
            renderFoodItems();
            updateNutritionSummary();
            
            // Clear input
            foodInput.value = '';
            foodInput.focus();
        }
    }
    
    function renderFoodItems() {
        const foodListEl = document.getElementById('food-list');
        foodListEl.innerHTML = '';
        
        foodItems.forEach(item => {
            const foodItemEl = document.createElement('div');
            foodItemEl.classList.add('food-item');
            
            foodItemEl.innerHTML = `
                <div class="food-name">${item.name}</div>
                <div class="food-nutrition">
                    ${item.calories} cal | P: ${item.protein}g | F: ${item.fat}g | Fib: ${item.fiber}g
                </div>
            `;
            
            foodListEl.appendChild(foodItemEl);
        });
    }
    
    function updateNutritionSummary() {
        const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);
        const totalProtein = foodItems.reduce((sum, item) => sum + parseFloat(item.protein), 0).toFixed(1);
        const totalFat = foodItems.reduce((sum, item) => sum + parseFloat(item.fat), 0).toFixed(1);
        const totalFiber = foodItems.reduce((sum, item) => sum + parseFloat(item.fiber), 0).toFixed(1);
        
        document.getElementById('total-calories').textContent = totalCalories;
        document.getElementById('total-protein').textContent = `${totalProtein}g`;
        document.getElementById('total-fat').textContent = `${totalFat}g`;
        document.getElementById('total-fiber').textContent = `${totalFiber}g`;
    }
    
    // Water intake functionality
    document.getElementById('add-water').addEventListener('click', function() {
        addWater(250);
    });
    
    document.getElementById('add-custom-water').addEventListener('click', function() {
        document.getElementById('water-modal').style.display = 'block';
    });
    
    document.getElementById('submit-custom-water').addEventListener('click', function() {
        const customAmount = parseInt(document.getElementById('custom-water-input').value);
        if (!isNaN(customAmount) && customAmount > 0) {
            addWater(customAmount);
            document.getElementById('water-modal').style.display = 'none';
            document.getElementById('custom-water-input').value = '';
        }
    });
    
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('water-modal').style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('water-modal')) {
            document.getElementById('water-modal').style.display = 'none';
        }
    });
    
    function addWater(amount) {
        waterIntake += amount;
        updateWaterDisplay();
    }
    
    function updateWaterDisplay() {
        document.getElementById('water-amount').textContent = waterIntake;
        
        // Update water animation
        const fillPercentage = Math.min((waterIntake / maxWater) * 100, 100);
        document.getElementById('water-fill').style.height = `${fillPercentage}%`;
    }
    
    // Initialize the page
    generateCalendar();
    updateWaterDisplay();
});