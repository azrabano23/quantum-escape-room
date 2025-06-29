/**
 * Game Levels - Progressive quantum concept introduction
 * From simple observation to complex quantum phenomena
 */

const GAME_LEVELS = [
    // Level 1: Basic Superposition
    {
        id: 1,
        title: "The Quantum Door",
        concept: "Superposition",
        description: "You face a door that exists in a superposition of being both open and closed. The act of observation will collapse it to one state.",
        difficulty: "Simple",
        decoherenceTime: 30,
        tutorial: {
            concept: "Superposition",
            explanation: "A quantum system can exist in multiple states simultaneously until observed. This is like Schrödinger's cat being both alive and dead until you open the box."
        },
        scenario: {
            text: "Before you stands a mysterious quantum door, shimmering between states. Is it open? Is it closed? Both? Neither? Only by observing it will reality decide...",
            visualization: "superposition-door"
        },
        choices: [
            {
                id: "observe-door",
                text: "🔍 Observe the door directly",
                description: "Look directly at the door to collapse its quantum state",
                outcomes: [
                    {
                        probability: 0.6,
                        result: "success",
                        text: "The door collapses to an OPEN state! You may proceed.",
                        nextAction: "advance"
                    },
                    {
                        probability: 0.4,
                        result: "failure",
                        text: "The door collapses to a CLOSED state. You must find another way.",
                        nextAction: "retry"
                    }
                ]
            },
            {
                id: "indirect-measure",
                text: "📡 Use indirect measurement",
                description: "Try to measure the door's state without direct observation",
                outcomes: [
                    {
                        probability: 0.8,
                        result: "success",
                        text: "Clever! Your indirect measurement reveals the door is open while preserving quantum coherence.",
                        nextAction: "advance"
                    },
                    {
                        probability: 0.2,
                        result: "partial",
                        text: "The measurement disturbs the quantum state slightly, but you can still proceed.",
                        nextAction: "advance"
                    }
                ]
            },
            {
                id: "ignore-door",
                text: "🚶 Walk through without observing",
                description: "Attempt to pass through while the door remains in superposition",
                outcomes: [
                    {
                        probability: 0.3,
                        result: "success",
                        text: "Amazing! You quantum tunnel through the superposed door!",
                        nextAction: "advance",
                        bonus: "quantum-tunneling"
                    },
                    {
                        probability: 0.7,
                        result: "failure",
                        text: "You bump into the collapsed closed door. Sometimes quantum mechanics isn't on your side.",
                        nextAction: "retry"
                    }
                ]
            }
        ],
        entanglements: []
    },

    // Level 2: Quantum Entanglement
    {
        id: 2,
        title: "The Entangled Switches",
        concept: "Entanglement",
        description: "Two switches are quantum entangled. Flipping one instantly affects the other, no matter the distance.",
        difficulty: "Moderate",
        decoherenceTime: 25,
        tutorial: {
            concept: "Entanglement",
            explanation: "When particles are entangled, measuring one instantly determines the state of the other, regardless of distance. Einstein called this 'spooky action at a distance.'"
        },
        scenario: {
            text: "You discover two switches on opposite walls. A quantum signature indicates they're entangled - affecting one will instantly change the other. You need both switches in the 'UP' position to unlock the exit.",
            visualization: "entangled-switches"
        },
        choices: [
            {
                id: "flip-left",
                text: "⬅️ Flip the left switch",
                description: "Flip the switch on the left wall",
                entangled: [0, 1], // This choice affects choice 1
                outcomes: [
                    {
                        probability: 0.5,
                        result: "success",
                        text: "Left switch UP! Due to entanglement, the right switch is now DOWN. You need to flip the right switch while preserving the left.",
                        nextAction: "continue"
                    },
                    {
                        probability: 0.5,
                        result: "partial",
                        text: "Left switch DOWN! The entangled right switch is now UP. Strategic thinking required!",
                        nextAction: "continue"
                    }
                ]
            },
            {
                id: "flip-right",
                text: "➡️ Flip the right switch",
                description: "Flip the switch on the right wall",
                entangled: [1, 0], // This choice affects choice 0
                outcomes: [
                    {
                        probability: 0.5,
                        result: "success",
                        text: "Right switch UP! The entangled left switch is now DOWN. Plan your next move carefully.",
                        nextAction: "continue"
                    },
                    {
                        probability: 0.5,
                        result: "partial",
                        text: "Right switch DOWN! The entangled left switch is now UP. Entanglement dynamics in action!",
                        nextAction: "continue"
                    }
                ]
            },
            {
                id: "break-entanglement",
                text: "🔗 Attempt to break entanglement",
                description: "Try to decouple the quantum entanglement between switches",
                outcomes: [
                    {
                        probability: 0.3,
                        result: "success",
                        text: "Success! You've broken the entanglement. Both switches can now be controlled independently.",
                        nextAction: "advance",
                        bonus: "entanglement-break"
                    },
                    {
                        probability: 0.7,
                        result: "failure",
                        text: "The entanglement holds strong. You must work within the quantum constraints.",
                        nextAction: "retry"
                    }
                ]
            }
        ],
        entanglements: [
            {
                particles: [0, 1],
                type: "anti-correlated",
                strength: 0.9
            }
        ]
    },

    // Level 3: Quantum Interference
    {
        id: 3,
        title: "The Interference Chamber",
        concept: "Quantum Interference",
        description: "Navigate through a chamber where quantum waves interfere with each other, creating patterns of constructive and destructive interference.",
        difficulty: "Complex",
        decoherenceTime: 20,
        tutorial: {
            concept: "Quantum Interference",
            explanation: "Quantum particles can interfere with themselves, creating patterns where some paths are more likely than others. This is demonstrated in the famous double-slit experiment."
        },
        scenario: {
            text: "You enter a chamber with multiple possible paths. Quantum waves are propagating through the space, creating interference patterns. Some paths will amplify your quantum signature (constructive interference), while others will cancel it out (destructive interference).",
            visualization: "interference-patterns"
        },
        choices: [
            {
                id: "path-alpha",
                text: "🌊 Take the Alpha path",
                description: "Follow the path with blue quantum waves",
                interference: { phase: 0, amplitude: 1.0 },
                outcomes: [
                    {
                        probability: 0.8,
                        result: "success",
                        text: "Constructive interference! Your quantum signature is amplified, making passage easier.",
                        nextAction: "advance"
                    },
                    {
                        probability: 0.2,
                        result: "partial",
                        text: "Mild interference effects slow your progress but don't stop you.",
                        nextAction: "advance"
                    }
                ]
            },
            {
                id: "path-beta",
                text: "🔥 Take the Beta path",
                description: "Follow the path with red quantum waves",
                interference: { phase: Math.PI, amplitude: 0.8 },
                outcomes: [
                    {
                        probability: 0.3,
                        result: "failure",
                        text: "Destructive interference! Your quantum signature is nearly cancelled out.",
                        nextAction: "retry"
                    },
                    {
                        probability: 0.7,
                        result: "partial",
                        text: "Despite interference, you manage to push through with reduced efficiency.",
                        nextAction: "advance"
                    }
                ]
            },
            {
                id: "superposition-path",
                text: "⚡ Take both paths simultaneously",
                description: "Use quantum superposition to travel both paths at once",
                interference: { phase: Math.PI/2, amplitude: 1.2 },
                outcomes: [
                    {
                        probability: 0.6,
                        result: "success",
                        text: "Brilliant! You achieve quantum superposition, experiencing both constructive and destructive interference simultaneously!",
                        nextAction: "advance",
                        bonus: "superposition-mastery"
                    },
                    {
                        probability: 0.4,
                        result: "failure",
                        text: "The superposition collapses unexpectedly, leaving you in a random path.",
                        nextAction: "retry"
                    }
                ]
            }
        ],
        entanglements: []
    },

    // Level 4: Quantum Tunneling
    {
        id: 4,
        title: "The Impossible Barrier",
        concept: "Quantum Tunneling",
        description: "Face an energy barrier that classical physics says is impossible to cross. But quantum mechanics offers another way...",
        difficulty: "Complex",
        decoherenceTime: 18,
        tutorial: {
            concept: "Quantum Tunneling",
            explanation: "Quantum particles can pass through energy barriers that should be impossible to cross classically. The probability depends on the barrier's height and width."
        },
        scenario: {
            text: "A massive energy barrier blocks your path. Classically, you lack the energy to overcome it. However, quantum mechanics suggests there's a probability you could tunnel through...",
            visualization: "energy-barrier"
        },
        choices: [
            {
                id: "attempt-climb",
                text: "🧗 Try to climb over",
                description: "Use classical mechanics to overcome the barrier",
                tunneling: false,
                outcomes: [
                    {
                        probability: 0.1,
                        result: "failure",
                        text: "The barrier is too high. Classical physics confirms what you suspected.",
                        nextAction: "retry"
                    },
                    {
                        probability: 0.9,
                        result: "failure",
                        text: "Insufficient energy to overcome the barrier classically.",
                        nextAction: "retry"
                    }
                ]
            },
            {
                id: "quantum-tunnel",
                text: "🌊 Attempt quantum tunneling",
                description: "Trust in quantum mechanics and attempt to tunnel through",
                tunneling: true,
                barrier: { height: 5, width: 2 },
                outcomes: [
                    {
                        probability: 0.4,
                        result: "success",
                        text: "Incredible! You successfully tunnel through the barrier. Quantum mechanics prevails!",
                        nextAction: "advance",
                        bonus: "tunneling-success"
                    },
                    {
                        probability: 0.6,
                        result: "failure",
                        text: "The tunneling attempt fails. The barrier remains solid.",
                        nextAction: "retry"
                    }
                ]
            },
            {
                id: "reduce-barrier",
                text: "🔧 Try to lower the barrier",
                description: "Attempt to modify the barrier parameters to increase tunneling probability",
                tunneling: true,
                barrier: { height: 3, width: 1.5 },
                outcomes: [
                    {
                        probability: 0.7,
                        result: "success",
                        text: "Smart! By reducing the barrier height, you increase the tunneling probability significantly.",
                        nextAction: "advance"
                    },
                    {
                        probability: 0.3,
                        result: "partial",
                        text: "Partial success - the barrier is weakened but not eliminated.",
                        nextAction: "advance"
                    }
                ]
            }
        ],
        entanglements: []
    },

    // Level 5: Quantum Decoherence (Master Level)
    {
        id: 5,
        title: "The Decoherence Trap",
        concept: "Decoherence & Master Challenge",
        description: "The final challenge: maintain quantum coherence while navigating multiple quantum phenomena simultaneously.",
        difficulty: "Master",
        decoherenceTime: 15,
        tutorial: {
            concept: "Decoherence",
            explanation: "Decoherence occurs when a quantum system loses its quantum properties due to interaction with the environment. It's what makes quantum effects disappear at macroscopic scales."
        },
        scenario: {
            text: "The final room contains all quantum phenomena at once: superposed objects, entangled particles, interference patterns, and tunneling opportunities. But the environment is causing rapid decoherence. You must act quickly and precisely to maintain quantum coherence long enough to escape!",
            visualization: "decoherence-chaos"
        },
        choices: [
            {
                id: "isolate-system",
                text: "🛡️ Create quantum isolation",
                description: "Attempt to isolate the quantum system from environmental decoherence",
                decoherenceEffect: 0.3,
                outcomes: [
                    {
                        probability: 0.5,
                        result: "success",
                        text: "Excellent! You've created a temporary isolation bubble, slowing decoherence.",
                        nextAction: "continue",
                        timeBonus: 10
                    },
                    {
                        probability: 0.5,
                        result: "partial",
                        text: "Partial isolation achieved. Decoherence is slowed but not stopped.",
                        nextAction: "continue",
                        timeBonus: 5
                    }
                ]
            },
            {
                id: "quantum-error-correction",
                text: "🔄 Apply quantum error correction",
                description: "Use quantum error correction to maintain coherence",
                decoherenceEffect: 0.2,
                outcomes: [
                    {
                        probability: 0.7,
                        result: "success",
                        text: "Masterful! Your error correction maintains quantum coherence against environmental noise.",
                        nextAction: "advance",
                        bonus: "quantum-master"
                    },
                    {
                        probability: 0.3,
                        result: "failure",
                        text: "The error correction fails under the intense decoherence pressure.",
                        nextAction: "retry"
                    }
                ]
            },
            {
                id: "embrace-decoherence",
                text: "🌪️ Work with decoherence",
                description: "Instead of fighting decoherence, use it strategically",
                decoherenceEffect: 1.0,
                outcomes: [
                    {
                        probability: 0.4,
                        result: "success",
                        text: "Brilliant insight! You use controlled decoherence to your advantage, collapsing the system into a favorable classical state.",
                        nextAction: "advance",
                        bonus: "decoherence-master"
                    },
                    {
                        probability: 0.6,
                        result: "failure",
                        text: "The decoherence overwhelms the system, collapsing everything into a random state.",
                        nextAction: "retry"
                    }
                ]
            }
        ],
        entanglements: [
            {
                particles: [0, 1, 2],
                type: "three-way-entanglement",
                strength: 0.95
            }
        ]
    },

    // Level 6: Bell's Inequality & Quantum Non-locality
    {
        id: 6,
        title: "The Bell Inequality Test",
        concept: "Bell's Theorem & Non-locality",
        description: "Perform experiments that violate Bell's inequality, proving that no local hidden variable theory can explain quantum mechanics.",
        difficulty: "Expert",
        decoherenceTime: 12,
        tutorial: {
            concept: "Bell's Theorem",
            explanation: "Bell's theorem proves that no physical theory based on local hidden variables can reproduce all the predictions of quantum mechanics. When Bell's inequality is violated, it confirms the non-local nature of quantum entanglement."
        },
        scenario: {
            text: "You've discovered an experimental setup with two entangled photons being measured at distant locations. Alice and Bob are making polarization measurements. The correlation between their results will either support local realism or quantum mechanics. The Bell parameter S must exceed 2 to violate classical expectations!",
            visualization: "bell-experiment"
        },
        physics: {
            bellInequality: "S = |E(a,b) - E(a,b') + E(a',b) + E(a',b')| ≤ 2",
            quantumPrediction: "S_quantum ≤ 2√2 ≈ 2.828",
            explanation: "Where E(θ₁,θ₂) = correlation coefficient between measurements at angles θ₁ and θ₂"
        },
        choices: [
            {
                id: "measure-parallel",
                text: "📏 Measure at parallel angles (0°, 0°)",
                description: "Set both Alice and Bob's polarizers to the same angle",
                angles: { alice: 0, bob: 0 },
                correlation: 1.0,
                outcomes: [
                    {
                        probability: 1.0,
                        result: "success",
                        text: "Perfect correlation achieved! E(0°,0°) = +1. This matches both classical and quantum predictions.",
                        nextAction: "continue",
                        bellContribution: 0
                    }
                ]
            },
            {
                id: "measure-orthogonal",
                text: "⊥ Measure at orthogonal angles (0°, 90°)",
                description: "Set Alice at 0° and Bob at 90° for maximum anti-correlation",
                angles: { alice: 0, bob: 90 },
                correlation: -1.0,
                outcomes: [
                    {
                        probability: 1.0,
                        result: "success",
                        text: "Perfect anti-correlation! E(0°,90°) = -1. Photons always have opposite polarizations.",
                        nextAction: "continue",
                        bellContribution: 0
                    }
                ]
            },
            {
                id: "measure-bell-angles",
                text: "🔔 Use optimal Bell test angles (22.5° spacing)",
                description: "Measure at the specific angles that maximize Bell inequality violation",
                angles: { alice: [0, 22.5], bob: [22.5, 67.5] },
                correlation: "quantum",
                outcomes: [
                    {
                        probability: 0.8,
                        result: "success",
                        text: "Bell inequality violated! S = 2.828 > 2. This proves quantum non-locality and rules out local hidden variables. Einstein's 'spooky action at a distance' is real!",
                        nextAction: "advance",
                        bonus: "bell-violation",
                        bellContribution: 2.828
                    },
                    {
                        probability: 0.2,
                        result: "partial",
                        text: "Measurement noise affected the results. S = 2.3 > 2, still violating Bell's inequality but not optimally.",
                        nextAction: "advance",
                        bellContribution: 2.3
                    }
                ]
            },
            {
                id: "design-custom-test",
                text: "🧪 Design custom Bell test",
                description: "Create your own measurement protocol to test quantum non-locality",
                angles: "custom",
                outcomes: [
                    {
                        probability: 0.6,
                        result: "success",
                        text: "Brilliant experimental design! Your custom protocol achieved S = 2.65, clearly violating classical bounds.",
                        nextAction: "advance",
                        bonus: "experimental-design"
                    },
                    {
                        probability: 0.4,
                        result: "failure",
                        text: "Your protocol didn't optimize the Bell parameter. S = 1.8 < 2, failing to demonstrate non-locality.",
                        nextAction: "retry"
                    }
                ]
            }
        ],
        entanglements: [
            {
                particles: [0, 1, 2, 3],
                type: "bell-state",
                strength: 1.0
            }
        ]
    },

    // Level 7: Schrödinger's Cat & Quantum Measurement Problem
    {
        id: 7,
        title: "Schrödinger's Laboratory",
        concept: "Measurement Problem & Cat States",
        description: "Navigate the paradox of quantum measurement and macroscopic superposition in Schrödinger's famous thought experiment.",
        difficulty: "Master",
        decoherenceTime: 10,
        tutorial: {
            concept: "Schrödinger's Cat Paradox",
            explanation: "This thought experiment illustrates the problem of applying quantum mechanics to everyday objects. A cat in a box is simultaneously dead and alive until observed, highlighting the measurement problem and the boundary between quantum and classical worlds."
        },
        scenario: {
            text: "You stand before Schrödinger's infamous experimental chamber. Inside, a quantum system controls a mechanism that determines the cat's fate. The quantum state |ψ⟩ = α|alive⟩ + β|dead⟩ with |α|² + |β|² = 1. Opening the box will collapse the superposition, but the cat's state depends on your measurement approach and the decoherence time!",
            visualization: "schrodinger-box"
        },
        physics: {
            waveFunction: "|ψ⟩ = α|alive⟩ + β|dead⟩",
            probability: "P(alive) = |α|², P(dead) = |β|²",
            decoherence: "τ_d = ℏ/(k_B T) × (system_size/λ_dB)²",
            explanation: "Decoherence time depends on temperature T and the system's de Broglie wavelength λ_dB"
        },
        choices: [
            {
                id: "quick-observation",
                text: "👁️ Open box immediately",
                description: "Make an instantaneous quantum measurement",
                measurementType: "projective",
                decoherenceEffect: 0.0,
                outcomes: [
                    {
                        probability: 0.5,
                        result: "success",
                        text: "Wave function collapsed instantly! The cat is found alive (|ψ⟩ → |alive⟩). Your quick measurement preserved quantum coherence during collapse.",
                        nextAction: "continue",
                        catState: "alive"
                    },
                    {
                        probability: 0.5,
                        result: "partial",
                        text: "Wave function collapsed to dead state (|ψ⟩ → |dead⟩). The measurement was clean but the outcome was unfavorable.",
                        nextAction: "continue",
                        catState: "dead"
                    }
                ]
            },
            {
                id: "gradual-measurement",
                text: "🔍 Perform weak measurement",
                description: "Use a gentle, non-invasive measurement to partially determine the state",
                measurementType: "weak",
                decoherenceEffect: 0.3,
                outcomes: [
                    {
                        probability: 0.7,
                        result: "success",
                        text: "Weak measurement succeeded! You gained information without fully collapsing the state: P(alive) ≈ 0.73. The cat exists in a partially mixed state.",
                        nextAction: "continue",
                        catState: "mixed"
                    },
                    {
                        probability: 0.3,
                        result: "partial",
                        text: "Measurement disturbed the system. Decoherence increased, making the state more classical.",
                        nextAction: "continue",
                        catState: "decoherent"
                    }
                ]
            },
            {
                id: "environmental-monitoring",
                text: "🌡️ Monitor environmental decoherence",
                description: "Study how environmental interaction affects the cat's quantum state",
                measurementType: "environmental",
                decoherenceEffect: 1.0,
                outcomes: [
                    {
                        probability: 0.8,
                        result: "success",
                        text: "Fascinating! Environmental decoherence naturally collapses the superposition over time τ_d = 10⁻²³ seconds for a macroscopic cat. This explains why we don't see quantum cats in reality!",
                        nextAction: "advance",
                        bonus: "decoherence-understanding",
                        catState: "classical"
                    },
                    {
                        probability: 0.2,
                        result: "partial",
                        text: "Environmental monitoring was partially successful but introduced additional measurement back-action.",
                        nextAction: "advance",
                        catState: "mixed"
                    }
                ]
            },
            {
                id: "quantum-error-correction",
                text: "🛡️ Apply quantum error correction",
                description: "Attempt to preserve the cat's superposition using active error correction",
                measurementType: "error-corrected",
                decoherenceEffect: -0.5,
                outcomes: [
                    {
                        probability: 0.4,
                        result: "success",
                        text: "Incredible achievement! You've created a stable macroscopic superposition |ψ⟩ = (|alive⟩ + |dead⟩)/√2 using quantum error correction. The cat remains in perfect superposition!",
                        nextAction: "advance",
                        bonus: "superposition-preservation",
                        catState: "superposition"
                    },
                    {
                        probability: 0.6,
                        result: "failure",
                        text: "Error correction failed. The complexity of maintaining macroscopic coherence overwhelmed your protocol.",
                        nextAction: "retry",
                        catState: "collapsed"
                    }
                ]
            }
        ],
        entanglements: [
            {
                particles: ["cat", "quantum_system", "environment"],
                type: "macroscopic-entanglement",
                strength: 0.95
            }
        ]
    }
];

// Additional quantum concepts that can be introduced in higher levels
const ADVANCED_CONCEPTS = {
    "bell-states": {
        name: "Bell States",
        description: "Maximally entangled quantum states that violate Bell's inequality"
    },
    "quantum-teleportation": {
        name: "Quantum Teleportation", 
        description: "Transfer quantum information using entanglement and classical communication"
    },
    "quantum-computing": {
        name: "Quantum Computing",
        description: "Use quantum gates and circuits to solve computational problems"
    },
    "many-worlds": {
        name: "Many-Worlds Interpretation",
        description: "Every quantum measurement splits the universe into parallel realities"
    }
};

// Difficulty progression
const DIFFICULTY_SETTINGS = {
    "Simple": {
        decoherenceTime: 30,
        entanglementComplexity: 0.2,
        interferenceStrength: 0.3,
        tunnelingProbability: 0.4
    },
    "Moderate": {
        decoherenceTime: 25,
        entanglementComplexity: 0.5,
        interferenceStrength: 0.6,
        tunnelingProbability: 0.3
    },
    "Complex": {
        decoherenceTime: 20,
        entanglementComplexity: 0.7,
        interferenceStrength: 0.8,
        tunnelingProbability: 0.25
    },
    "Master": {
        decoherenceTime: 15,
        entanglementComplexity: 0.9,
        interferenceStrength: 0.9,
        tunnelingProbability: 0.2
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GAME_LEVELS, ADVANCED_CONCEPTS, DIFFICULTY_SETTINGS };
}
