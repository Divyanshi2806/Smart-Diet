document.addEventListener('DOMContentLoaded', function() {
            let foodItems = [];
            let waterIntake = 0;
            let waterGoal = 8; 
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
            function generateCalendar() {
                const calendarEl = document.getElementById('calendar');
                const today = new Date();
                const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
                const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
                for (let i = 0; i < firstDay; i++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.classList.add('calendar-day');
                    calendarEl.appendChild(emptyDay);
                }
                for (let i = 1; i <= daysInMonth; i++) {
                    const dayEl = document.createElement('div');
                    dayEl.classList.add('calendar-day');
                    dayEl.textContent = i;
                    if (i === today.getDate()) {
                        dayEl.classList.add('active');
                    } else if (i < today.getDate() && Math.random() > 0.3) {
                        dayEl.classList.add('active');
                    }
                    
                    calendarEl.appendChild(dayEl);
                }
            }
            
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
                    //api
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
            document.getElementById('add-water').addEventListener('click', function() {
                addWater(1);
            });
            
            document.getElementById('remove-water').addEventListener('click', function() {
                removeWater(1);
            });
            
            document.getElementById('add-custom-water').addEventListener('click', function() {
                document.getElementById('water-modal').style.display = 'block';
            });
            
            document.getElementById('set-goal').addEventListener('click', function() {
                document.getElementById('goal-modal').style.display = 'block';
            });
            
            document.getElementById('submit-custom-water').addEventListener('click', function() {
                const customAmount = parseInt(document.getElementById('custom-water-input').value);
                if (!isNaN(customAmount) && customAmount > 0) {
                    addWater(customAmount);
                    document.getElementById('water-modal').style.display = 'none';
                    document.getElementById('custom-water-input').value = '';
                }
            });
            
            document.getElementById('submit-custom-goal').addEventListener('click', function() {
                const customGoal = parseInt(document.getElementById('custom-goal-input').value);
                if (!isNaN(customGoal) && customGoal > 0 && customGoal <= 20) {
                    setWaterGoal(customGoal);
                    document.getElementById('goal-modal').style.display = 'none';
                    document.getElementById('custom-goal-input').value = '';
                } else {
                    alert('Please enter a valid goal between 1 and 20 glasses.');
                }
            });
            
            document.querySelectorAll('.close').forEach(closeBtn => {
                closeBtn.addEventListener('click', function() {
                    this.closest('.modal').style.display = 'none';
                });
            });
            window.addEventListener('click', function(event) {
                if (event.target.classList.contains('modal')) {
                    event.target.style.display = 'none';
                }
            });
            
            function addWater(glasses) {
                waterIntake += glasses;
                updateWaterDisplay();
                checkGoalCompletion();
            }
            
            function removeWater(glasses) {
                waterIntake = Math.max(0, waterIntake - glasses);
                updateWaterDisplay();
                checkGoalCompletion();
            }
            
            function setWaterGoal(glasses) {
                waterGoal = glasses;
                document.getElementById('water-goal').textContent = waterGoal;
                updateWaterDisplay();
                checkGoalCompletion();
            }
            function updateWaterDisplay() {
                document.getElementById('water-amount').textContent = waterIntake;
                
                const progress = Math.min((waterIntake / waterGoal) * 100, 100);
                const remaining = Math.max(waterGoal - waterIntake, 0);
                
                document.getElementById('progress-percentage').textContent = `${Math.round(progress)}%`;
                document.getElementById('remaining-glasses').textContent = remaining;
                
                document.getElementById('water-fill').style.height = `${progress}%`;
            } 
            function checkGoalCompletion() {
                const goalMessage = document.getElementById('goal-message');
                if (waterIntake >= waterGoal) {
                    goalMessage.style.display = 'block';
                } else {
                    goalMessage.style.display = 'none';
                }
            }
            generateCalendar();
            updateWaterDisplay();
        });