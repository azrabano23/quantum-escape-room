/**
 * Main Game Controller - Schrödinger's Escape Room
 * Coordinates all game systems and user interactions
 */

class QuantumEscapeRoom {
    constructor() {
        this.quantumEngine = new QuantumEngine();
        this.currentLevel = 0;
        this.gameState = 'menu';
        this.score = 0;
        this.achievements = new Set();
        this.currentSuperposition = null;
        
        this.initializeGame();
    }

    /**
     * Initialize the game and set up event listeners
     */
    initializeGame() {
        this.setupEventListeners();
        this.loadLevel(0);
        console.log('🌌 Quantum Escape Room initialized!');
    }

    /**
     * Set up event listeners for user interactions
     */
    setupEventListeners() {
        // Listen for decoherence events
        document.addEventListener('decoherenceChoice', (event) => {
            this.handleDecoherenceChoice(event.detail);
        });

        // Listen for window focus/blur to pause/resume timer
        window.addEventListener('blur', () => {
            if (this.gameState === 'playing') {
                this.quantumEngine.clearTimer();
            }
        });

        window.addEventListener('focus', () => {
            if (this.gameState === 'playing') {
                this.restartTimer();
            }
        });
    }

    /**
     * Load and display a specific level
     * @param {number} levelIndex - Index of the level to load
     */
    loadLevel(levelIndex) {
        if (levelIndex >= GAME_LEVELS.length) {
            this.completeGame();
            return;
        }

        this.currentLevel = levelIndex;
        const level = GAME_LEVELS[levelIndex];
        
        // Reset quantum engine for new level
        this.quantumEngine.reset();
        
        // Update UI elements
        this.updateLevelDisplay(level);
        this.updateTutorial(level.tutorial);
        this.createChoices(level);
        
        // Setup entanglements if any
        if (level.entanglements && level.entanglements.length > 0) {
            level.entanglements.forEach(entanglement => {
                this.quantumEngine.createEntanglement(entanglement.particles);
            });
        }

        // Start decoherence timer
        this.startLevelTimer(level);
        
        this.gameState = 'playing';
        console.log(`🎮 Level ${level.id} loaded: ${level.title}`);
    }

    /**
     * Update the level display information
     * @param {Object} level - The current level object
     */
    updateLevelDisplay(level) {
        const levelElement = document.getElementById('level');
        const titleElement = document.querySelector('#room-description h2');
        const scenarioElement = document.getElementById('scenario-text');
        const quantumStateElement = document.getElementById('quantum-state');

        if (levelElement) levelElement.textContent = level.id;
        if (titleElement) titleElement.textContent = level.title;
        if (scenarioElement) scenarioElement.textContent = level.scenario.text;
        if (quantumStateElement) quantumStateElement.textContent = 'Superposition';

        // Apply visual effects based on level
        this.applyLevelVisualEffects(level);
    }

    /**
     * Apply visual effects specific to the current level
     * @param {Object} level - The current level object
     */
    applyLevelVisualEffects(level) {
        const gameArea = document.getElementById('game-area');
        const visualization = document.getElementById('quantum-visualization');
        
        // Remove previous level classes
        gameArea.classList.remove('superposition', 'entangled', 'interference', 'tunneling', 'decoherence');
        
        // Add class based on level concept
        const conceptClass = level.concept.toLowerCase().replace(/\s+/g, '-').replace('&', '');
        gameArea.classList.add(conceptClass);
        
        // Update quantum visualization
        if (visualization) {
            this.updateQuantumVisualization(level.scenario.visualization);
        }
    }

    /**
     * Update the quantum visualization based on the scenario
     * @param {string} visualizationType - Type of visualization to display
     */
    updateQuantumVisualization(visualizationType) {
        const particle1 = document.getElementById('particle-1');
        const particle2 = document.getElementById('particle-2');
        const entanglement = document.getElementById('entanglement');

        switch (visualizationType) {
            case 'superposition-door':
                particle1.style.opacity = '0.5';
                particle2.style.opacity = '0.5';
                entanglement.style.display = 'none';
                break;
                
            case 'entangled-switches':
                particle1.style.opacity = '1';
                particle2.style.opacity = '1';
                entanglement.style.display = 'block';
                break;
                
            case 'interference-patterns':
                particle1.style.animation = 'quantumFloat 1s ease-in-out infinite';
                particle2.style.animation = 'quantumFloat 1s ease-in-out infinite reverse';
                entanglement.style.display = 'none';
                break;
                
            case 'energy-barrier':
                particle1.style.transform = 'translateX(-50px)';
                particle2.style.transform = 'translateX(50px)';
                entanglement.style.display = 'block';
                entanglement.style.background = 'linear-gradient(90deg, transparent 0%, #ff4500 50%, transparent 100%)';
                break;
                
            case 'decoherence-chaos':
                particle1.classList.add('superposition');
                particle2.classList.add('superposition');
                entanglement.style.display = 'block';
                entanglement.classList.add('superposition');
                break;
        }
    }

    /**
     * Update the tutorial sidebar
     * @param {Object} tutorial - Tutorial information for the current level
     */
    updateTutorial(tutorial) {
        const conceptElement = document.querySelector('#concept-explanation h4');
        const explanationElement = document.querySelector('#concept-explanation p');
        
        // Get current level to check for physics equations
        const level = GAME_LEVELS[this.currentLevel];

        if (conceptElement) conceptElement.textContent = tutorial.concept;
        if (explanationElement) {
            explanationElement.textContent = tutorial.explanation;
            
            // Add physics equations if available
            if (level.physics) {
                const physicsDiv = document.createElement('div');
                physicsDiv.className = 'physics-equations';
                physicsDiv.innerHTML = this.createPhysicsDisplay(level.physics);
                explanationElement.parentNode.appendChild(physicsDiv);
            }
        }
    }

    /**
     * Create physics equations display
     * @param {Object} physics - Physics information for the level
     * @returns {string} HTML for physics display
     */
    createPhysicsDisplay(physics) {
        let html = '<div class="physics-section">';
        html += '<h5>🧮 Physics & Mathematics</h5>';
        
        // Add equations based on what's available
        Object.keys(physics).forEach(key => {
            if (key !== 'explanation') {
                const label = this.formatPhysicsLabel(key);
                html += `<div class="equation">`;
                html += `<strong>${label}:</strong> `;
                html += `<span class="math">${physics[key]}</span>`;
                html += `</div>`;
            }
        });
        
        if (physics.explanation) {
            html += `<div class="physics-note">${physics.explanation}</div>`;
        }
        
        html += '</div>';
        return html;
    }

    /**
     * Format physics labels for display
     * @param {string} key - Physics property key
     * @returns {string} Formatted label
     */
    formatPhysicsLabel(key) {
        const labels = {
            'bellInequality': 'Bell Inequality',
            'quantumPrediction': 'Quantum Bound',
            'waveFunction': 'Wave Function',
            'probability': 'Probability',
            'decoherence': 'Decoherence Time',
            'tunneling': 'Tunneling Probability',
            'interference': 'Interference Amplitude'
        };
        return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
    }

    /**
     * Create and display choices for the current level
     * @param {Object} level - The current level object
     */
    createChoices(level) {
        const choicesContainer = document.getElementById('choices');
        if (!choicesContainer) return;

        // Clear existing choices
        choicesContainer.innerHTML = '';

        // Create superposition of choices
        this.currentSuperposition = this.quantumEngine.createSuperposition(level.choices);

        // Apply quantum interference if applicable
        const processedChoices = this.quantumEngine.calculateQuantumInterference(level.choices);

        // Create choice buttons
        processedChoices.forEach((choice, index) => {
            const button = this.createChoiceButton(choice, index);
            choicesContainer.appendChild(button);
        });

        // Apply superposition visual effect
        choicesContainer.classList.add('superposition');
    }

    /**
     * Create a choice button element
     * @param {Object} choice - Choice object
     * @param {number} index - Choice index
     * @returns {HTMLElement} Button element
     */
    createChoiceButton(choice, index) {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.innerHTML = `
            <strong>${choice.text}</strong>
            <p>${choice.description}</p>
            ${choice.isUncertain ? '<small>⚠️ Quantum uncertainty detected</small>' : ''}
        `;
        
        button.addEventListener('click', () => {
            this.makeChoice(index);
        });

        // Apply uncertainty effects
        if (choice.isUncertain) {
            button.classList.add('uncertain');
        }

        return button;
    }

    /**
     * Handle a choice made by the player
     * @param {number} choiceIndex - Index of the chosen option
     */
    makeChoice(choiceIndex) {
        if (this.gameState !== 'playing') return;

        const level = GAME_LEVELS[this.currentLevel];
        const choice = level.choices[choiceIndex];

        // Clear the timer - choice has been made
        this.quantumEngine.clearTimer();

        // Collapse the wave function
        const collapsedState = this.quantumEngine.collapseWaveFunction(
            this.currentSuperposition, 
            choiceIndex
        );

        // Apply special effects based on choice type
        this.applyChoiceEffects(choice, collapsedState);

        // Determine outcome based on probabilities
        const outcome = this.determineOutcome(choice);

        // Display the outcome
        this.displayOutcome(outcome, collapsedState);

        // Update game state
        this.gameState = 'outcome';

        console.log(`🎯 Choice made: ${choice.text}, Outcome: ${outcome.result}`);
    }

    /**
     * Apply special effects based on choice type
     * @param {Object} choice - The chosen option
     * @param {Object} collapsedState - The collapsed quantum state
     */
    applyChoiceEffects(choice, collapsedState) {
        const choicesContainer = document.getElementById('choices');
        const quantumStateElement = document.getElementById('quantum-state');

        // Remove superposition effects
        choicesContainer.classList.remove('superposition');
        choicesContainer.classList.add('collapsed');

        // Update quantum state display
        if (quantumStateElement) {
            quantumStateElement.textContent = 'Collapsed';
        }

        // Handle special choice properties
        if (choice.tunneling) {
            this.handleQuantumTunneling(choice);
        }

        if (choice.interference) {
            this.handleQuantumInterference(choice);
        }

        if (choice.entangled) {
            this.handleEntanglementEffects(choice, collapsedState);
        }
    }

    /**
     * Handle quantum tunneling mechanics
     * @param {Object} choice - Choice with tunneling properties
     */
    handleQuantumTunneling(choice) {
        if (choice.barrier) {
            const success = this.quantumEngine.attemptQuantumTunneling(choice.barrier);
            if (success) {
                this.addAchievement('quantum-tunneler');
                console.log('🌊 Quantum tunneling successful!');
            }
        }
    }

    /**
     * Handle quantum interference effects
     * @param {Object} choice - Choice with interference properties
     */
    handleQuantumInterference(choice) {
        const interferenceStrength = choice.interference.amplitude * Math.cos(choice.interference.phase);
        
        if (interferenceStrength > 0.5) {
            this.addAchievement('interference-master');
            console.log('🌊 Constructive interference achieved!');
        }
    }

    /**
     * Handle entanglement effects
     * @param {Object} choice - Choice with entanglement properties
     * @param {Object} collapsedState - The collapsed state
     */
    handleEntanglementEffects(choice, collapsedState) {
        if (collapsedState.entanglementEffects && collapsedState.entanglementEffects.length > 0) {
            collapsedState.entanglementEffects.forEach(effect => {
                console.log(`🔗 Entanglement effect: ${effect.description}`);
            });
        }
    }

    /**
     * Determine the outcome based on choice probabilities
     * @param {Object} choice - The chosen option
     * @returns {Object} The selected outcome
     */
    determineOutcome(choice) {
        const random = Math.random();
        let cumulativeProbability = 0;

        for (const outcome of choice.outcomes) {
            cumulativeProbability += outcome.probability;
            if (random <= cumulativeProbability) {
                return outcome;
            }
        }

        // Fallback to last outcome
        return choice.outcomes[choice.outcomes.length - 1];
    }

    /**
     * Display the outcome of a choice
     * @param {Object} outcome - The outcome to display
     * @param {Object} collapsedState - The collapsed quantum state
     */
    displayOutcome(outcome, collapsedState) {
        const outcomeArea = document.getElementById('outcome-area');
        const outcomeText = document.getElementById('outcome-text');
        const choicesContainer = document.getElementById('choices-container');
        const nextButton = document.getElementById('next-level');

        if (!outcomeArea || !outcomeText) return;

        // Hide choices and show outcome
        choicesContainer.style.display = 'none';
        outcomeArea.style.display = 'block';

        // Build outcome text
        let displayText = outcome.text;
        
        // Add entanglement effects if any
        if (collapsedState.entanglementEffects && collapsedState.entanglementEffects.length > 0) {
            displayText += '\n\n🔗 Quantum Entanglement Effects:\n';
            collapsedState.entanglementEffects.forEach(effect => {
                displayText += `• ${effect.description}\n`;
            });
        }

        outcomeText.textContent = displayText;

        // Handle different outcome types
        if (outcome.nextAction === 'advance') {
            nextButton.textContent = 'Continue to Next Level';
            nextButton.onclick = () => this.nextLevel();
        } else if (outcome.nextAction === 'retry') {
            nextButton.textContent = 'Try Again';
            nextButton.onclick = () => this.retryLevel();
        } else if (outcome.nextAction === 'continue') {
            nextButton.textContent = 'Make Another Choice';
            nextButton.onclick = () => this.continueLevel();
        }

        // Handle bonuses
        if (outcome.bonus) {
            this.handleBonus(outcome.bonus);
        }

        if (outcome.timeBonus) {
            this.quantumEngine.timeRemaining += outcome.timeBonus;
        }

        // Update score
        this.updateScore(outcome);
    }

    /**
     * Handle bonus achievements
     * @param {string} bonusType - Type of bonus achieved
     */
    handleBonus(bonusType) {
        const bonusMessages = {
            'quantum-tunneling': '🌊 Quantum Tunneling Master!',
            'entanglement-break': '🔗 Entanglement Breaker!',
            'superposition-mastery': '⚡ Superposition Expert!',
            'tunneling-success': '🎯 Tunneling Specialist!',
            'quantum-master': '👑 Quantum Master!',
            'decoherence-master': '🌪️ Decoherence Controller!',
            'bell-violation': '🔔 Bell Inequality Violator!',
            'experimental-design': '🧪 Quantum Experimentalist!',
            'decoherence-understanding': '🌡️ Decoherence Expert!',
            'superposition-preservation': '🛡️ Quantum Protector!'
        };

        const message = bonusMessages[bonusType];
        if (message) {
            this.addAchievement(bonusType);
            console.log(`🏆 ${message}`);
        }
    }

    /**
     * Add an achievement to the player's collection
     * @param {string} achievement - Achievement identifier
     */
    addAchievement(achievement) {
        if (!this.achievements.has(achievement)) {
            this.achievements.add(achievement);
            this.score += 100;
            console.log(`🏆 New achievement unlocked: ${achievement}`);
        }
    }

    /**
     * Update the player's score
     * @param {Object} outcome - The outcome that affects score
     */
    updateScore(outcome) {
        const scoreMultipliers = {
            'success': 50,
            'partial': 25,
            'failure': 0
        };

        const points = scoreMultipliers[outcome.result] || 0;
        this.score += points;

        // Bonus points for quick decisions
        if (this.quantumEngine.timeRemaining > 20) {
            this.score += 10;
        }
    }

    /**
     * Proceed to the next level
     */
    nextLevel() {
        this.hideOutcomeArea();
        this.loadLevel(this.currentLevel + 1);
    }

    /**
     * Retry the current level
     */
    retryLevel() {
        this.hideOutcomeArea();
        this.loadLevel(this.currentLevel);
    }

    /**
     * Continue the current level with new choices
     */
    continueLevel() {
        this.hideOutcomeArea();
        const choicesContainer = document.getElementById('choices-container');
        if (choicesContainer) {
            choicesContainer.style.display = 'block';
        }
        this.restartTimer();
        this.gameState = 'playing';
    }

    /**
     * Hide the outcome area and reset UI
     */
    hideOutcomeArea() {
        const outcomeArea = document.getElementById('outcome-area');
        const choicesContainer = document.getElementById('choices-container');
        
        if (outcomeArea) outcomeArea.style.display = 'none';
        if (choicesContainer) choicesContainer.style.display = 'block';
    }

    /**
     * Start the decoherence timer for the current level
     * @param {Object} level - Current level object
     */
    startLevelTimer(level) {
        this.quantumEngine.startDecoherenceTimer(
            level.decoherenceTime,
            () => this.handleTimerExpired()
        );
    }

    /**
     * Restart the timer with remaining time
     */
    restartTimer() {
        if (this.quantumEngine.timeRemaining > 0) {
            this.quantumEngine.startDecoherenceTimer(
                this.quantumEngine.timeRemaining,
                () => this.handleTimerExpired()
            );
        }
    }

    /**
     * Handle timer expiration (decoherence)
     */
    handleTimerExpired() {
        if (this.gameState === 'playing') {
            console.log('⏰ Time expired! Decoherence forcing random choice...');
        }
    }

    /**
     * Handle forced choice due to decoherence
     * @param {Object} detail - Event detail with choice information
     */
    handleDecoherenceChoice(detail) {
        if (this.gameState === 'playing') {
            console.log(`🌪️ Decoherence forced choice: ${detail.choiceIndex}`);
            this.makeChoice(detail.choiceIndex);
        }
    }

    /**
     * Complete the game - all levels finished
     */
    completeGame() {
        const gameOverScreen = document.getElementById('game-over');
        if (gameOverScreen) {
            gameOverScreen.style.display = 'flex';
        }

        this.gameState = 'completed';
        console.log(`🎉 Game completed! Final score: ${this.score}`);
        console.log(`🏆 Achievements: ${Array.from(this.achievements).join(', ')}`);
    }

    /**
     * Restart the entire game
     */
    restartGame() {
        this.currentLevel = 0;
        this.score = 0;
        this.achievements.clear();
        this.quantumEngine.reset();
        
        const gameOverScreen = document.getElementById('game-over');
        if (gameOverScreen) {
            gameOverScreen.style.display = 'none';
        }

        this.loadLevel(0);
        console.log('🔄 Game restarted!');
    }
}

// Global functions for HTML onclick handlers
function nextLevel() {
    if (window.game) {
        window.game.nextLevel();
    }
}

function restartGame() {
    if (window.game) {
        window.game.restartGame();
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new QuantumEscapeRoom();
    console.log('🌌 Welcome to Schrödinger\'s Escape Room!');
});
