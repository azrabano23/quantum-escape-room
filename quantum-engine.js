/**
 * Quantum Engine - Core quantum mechanics simulation
 * Handles superposition, entanglement, and decoherence
 */

class QuantumEngine {
    constructor() {
        this.quantumState = 'superposition';
        this.entanglements = new Map();
        this.decoherenceTimer = null;
        this.timeRemaining = 30;
        this.isCollapsed = false;
    }

    /**
     * Creates a superposition of multiple states
     * @param {Array} states - Array of possible states
     * @returns {Object} Superposition object
     */
    createSuperposition(states) {
        return {
            type: 'superposition',
            states: states.map(state => ({
                ...state,
                probability: 1 / states.length,
                amplitude: Math.sqrt(1 / states.length)
            })),
            isObserved: false
        };
    }

    /**
     * Collapses the wave function based on observation (choice)
     * @param {Object} superposition - The superposition to collapse
     * @param {number} choiceIndex - Index of the choice made
     * @returns {Object} Collapsed state
     */
    collapseWaveFunction(superposition, choiceIndex) {
        if (superposition.isObserved) {
            return superposition.states[choiceIndex];
        }

        const chosenState = superposition.states[choiceIndex];
        
        // Apply quantum mechanics: the act of observation changes the system
        const collapsedState = {
            ...chosenState,
            probability: 1,
            amplitude: 1,
            isCollapsed: true,
            entanglementEffects: this.calculateEntanglementEffects(choiceIndex)
        };

        this.quantumState = 'collapsed';
        this.isCollapsed = true;
        
        return collapsedState;
    }

    /**
     * Creates quantum entanglement between particles/choices
     * @param {Array} particles - Particles to entangle
     * @returns {Object} Entanglement configuration
     */
    createEntanglement(particles) {
        const entanglementId = `entanglement_${Date.now()}`;
        
        const entanglement = {
            id: entanglementId,
            particles: particles,
            correlationType: this.determineCorrelationType(),
            strength: Math.random() * 0.8 + 0.2 // 0.2 to 1.0
        };

        this.entanglements.set(entanglementId, entanglement);
        return entanglement;
    }

    /**
     * Determines how entangled particles affect each other
     * @returns {string} Type of correlation
     */
    determineCorrelationType() {
        const types = ['positive', 'negative', 'neutral'];
        return types[Math.floor(Math.random() * types.length)];
    }

    /**
     * Calculates effects of entanglement on outcome
     * @param {number} choiceIndex - The choice made
     * @returns {Object} Entanglement effects
     */
    calculateEntanglementEffects(choiceIndex) {
        const effects = [];
        
        this.entanglements.forEach(entanglement => {
            if (entanglement.particles.includes(choiceIndex)) {
                const effect = {
                    type: entanglement.correlationType,
                    strength: entanglement.strength,
                    description: this.getEntanglementDescription(entanglement.correlationType)
                };
                effects.push(effect);
            }
        });

        return effects;
    }

    /**
     * Gets description for entanglement effects
     * @param {string} type - Type of entanglement
     * @returns {string} Description
     */
    getEntanglementDescription(type) {
        const descriptions = {
            'positive': 'Your choice resonates positively with entangled particles, amplifying the effect!',
            'negative': 'Quantum interference occurs, creating unexpected complications.',
            'neutral': 'The entanglement maintains quantum neutrality, preserving balance.'
        };
        return descriptions[type] || 'Quantum effects are unpredictable...';
    }

    /**
     * Starts the decoherence timer
     * @param {number} duration - Timer duration in seconds
     * @param {Function} callback - Function to call when timer expires
     */
    startDecoherenceTimer(duration, callback) {
        this.timeRemaining = duration;
        this.updateTimerDisplay();

        this.decoherenceTimer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();

            if (this.timeRemaining <= 10) {
                this.addTimerWarning();
            }

            if (this.timeRemaining <= 0) {
                this.triggerDecoherence();
                if (callback) callback();
            }
        }, 1000);
    }

    /**
     * Updates the timer display
     */
    updateTimerDisplay() {
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = `${this.timeRemaining}s`;
        }
    }

    /**
     * Adds visual warning when timer is low
     */
    addTimerWarning() {
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.classList.add('timer-warning');
        }
    }

    /**
     * Triggers decoherence when timer expires
     */
    triggerDecoherence() {
        this.clearTimer();
        this.quantumState = 'decoherent';
        
        // Random collapse if no choice was made
        const choices = document.querySelectorAll('.choice-button');
        if (choices.length > 0 && !this.isCollapsed) {
            const randomChoice = Math.floor(Math.random() * choices.length);
            this.forceChoice(randomChoice);
        }
    }

    /**
     * Forces a random choice due to decoherence
     * @param {number} choiceIndex - Index of forced choice
     */
    forceChoice(choiceIndex) {
        const event = new CustomEvent('decoherenceChoice', {
            detail: { choiceIndex, isForced: true }
        });
        document.dispatchEvent(event);
    }

    /**
     * Clears the decoherence timer
     */
    clearTimer() {
        if (this.decoherenceTimer) {
            clearInterval(this.decoherenceTimer);
            this.decoherenceTimer = null;
        }
        
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.classList.remove('timer-warning');
        }
    }

    /**
     * Resets the quantum engine for a new level
     */
    reset() {
        this.clearTimer();
        this.quantumState = 'superposition';
        this.entanglements.clear();
        this.isCollapsed = false;
        this.timeRemaining = 30;
        
        // Update UI
        const quantumStateElement = document.getElementById('quantum-state');
        if (quantumStateElement) {
            quantumStateElement.textContent = 'Superposition';
        }
    }

    /**
     * Applies quantum uncertainty principle
     * @param {Object} choice - The choice object
     * @returns {Object} Modified choice with uncertainty
     */
    applyUncertaintyPrinciple(choice) {
        // The more precisely we know the outcome, the less we know about the process
        const uncertaintyFactor = Math.random() * 0.3; // Up to 30% uncertainty
        
        return {
            ...choice,
            uncertainty: uncertaintyFactor,
            description: choice.description + (uncertaintyFactor > 0.15 ? 
                ' (Quantum uncertainty clouds the exact outcome...)' : ''),
            isUncertain: uncertaintyFactor > 0.15
        };
    }

    /**
     * Simulates quantum tunneling effect
     * @param {Object} obstacle - Obstacle that might be tunneled through
     * @returns {boolean} Whether tunneling occurs
     */
    attemptQuantumTunneling(obstacle) {
        const tunnelingProbability = Math.exp(-obstacle.barrierHeight / obstacle.width);
        return Math.random() < tunnelingProbability;
    }

    /**
     * Gets current quantum state description
     * @returns {string} State description
     */
    getQuantumStateDescription() {
        const descriptions = {
            'superposition': 'All possibilities exist simultaneously until observed',
            'collapsed': 'Wave function has collapsed to a definite state',
            'decoherent': 'Quantum coherence has been lost to the environment',
            'entangled': 'Particles are quantum mechanically correlated'
        };
        return descriptions[this.quantumState] || 'Unknown quantum state';
    }

    /**
     * Calculates quantum interference between choices
     * @param {Array} choices - Available choices
     * @returns {Array} Choices with interference effects
     */
    calculateQuantumInterference(choices) {
        return choices.map((choice, index) => {
            // Calculate interference with other choices
            let interferenceEffect = 0;
            
            choices.forEach((otherChoice, otherIndex) => {
                if (index !== otherIndex) {
                    const phaseDifference = Math.random() * 2 * Math.PI;
                    interferenceEffect += Math.cos(phaseDifference) * 0.1;
                }
            });

            return {
                ...choice,
                interferenceEffect,
                probability: Math.max(0.1, choice.probability + interferenceEffect)
            };
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumEngine;
}
