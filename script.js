// Keep all existing DOM Elements and add new ones
const loginBtn = document.querySelector('.btn-login');
const signupBtn = document.querySelector('.btn-signup');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeBtns = document.querySelectorAll('.close');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

// Add new mobile menu elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');
const navLinks = document.querySelectorAll('.nav-menu a');


document.addEventListener('DOMContentLoaded', function () {
    // Video interaction
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function () {
            // In a real application, this would launch the video player
            // For this demo, we'll just show an alert
            const videoTitle = this.closest('.video-card').querySelector('.video-title').textContent;
            alert(`Playing video: ${videoTitle}`);
        });
    });

    // Quiz functionality
    const quizForm = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');
    const submitBtn = document.getElementById('submit-btn');
    const tryAgainBtn = document.getElementById('try-again-btn');

    // Correct answers
    const correctAnswers = {
        q1: 'c',
        q2: 'a',
        q3: 'c',
        q4: 'c',
        q5: 'd'
    };

    // Feedback for each question
    const feedback = {
        q1: {
            correct: "Correct! '*element*' is not a valid CSS selector. Valid selectors include class selectors (.class-name), ID selectors (#id-name), and attribute selectors ([attribute=value]).",
            incorrect: "Incorrect. '*element*' is not a valid CSS selector. The correct answer is c)."
        },
        q2: {
            correct: "Correct! The push() method adds elements to the end of an array.",
            incorrect: "Incorrect. The push() method adds elements to the end of an array. The correct answer is a)."
        },
        q3: {
            correct: "Correct! &lt;h1&gt; is used for the largest heading in HTML.",
            incorrect: "Incorrect. &lt;h1&gt; is used for the largest heading in HTML. The correct answer is c)."
        },
        q4: {
            correct: "Correct! background-color is the CSS property used to change the background color.",
            incorrect: "Incorrect. background-color is the CSS property used to change the background color. The correct answer is c)."
        },
        q5: {
            correct: "Correct! All three options (cookies, localStorage, and sessionStorage) can be used to store client-side data in JavaScript.",
            incorrect: "Incorrect. All three options (cookies, localStorage, and sessionStorage) can be used to store client-side data in JavaScript. The correct answer is d)."
        }
    };

    quizForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let score = 0;
        let unanswered = 0;

        // Check answers for each question
        for (let i = 1; i <= 5; i++) {
            const questionName = 'q' + i;
            const selectedAnswer = document.querySelector(`input[name=${questionName}]:checked`);
            const feedbackDiv = document.getElementById(`feedback${i}`);

            if (selectedAnswer) {
                if (selectedAnswer.value === correctAnswers[questionName]) {
                    score++;
                    feedbackDiv.textContent = feedback[questionName].correct;
                    feedbackDiv.className = 'feedback correct-feedback';
                } else {
                    feedbackDiv.textContent = feedback[questionName].incorrect;
                    feedbackDiv.className = 'feedback incorrect-feedback';
                }
                feedbackDiv.style.display = 'block';
            } else {
                unanswered++;
                feedbackDiv.textContent = "You didn't answer this question.";
                feedbackDiv.className = 'feedback incorrect-feedback';
                feedbackDiv.style.display = 'block';
            }
        }

        // Display the result
        let resultMessage = `Your score: ${score} out of 5 (${(score / 5 * 100).toFixed(0)}%)`;
        if (unanswered > 0) {
            resultMessage += `<br>You left ${unanswered} question${unanswered > 1 ? 's' : ''} unanswered.`;
        }

        resultDiv.innerHTML = resultMessage;
        resultDiv.style.display = 'block';

        // Apply appropriate styling to the result
        if (score >= 4) {
            resultDiv.className = 'correct';
        } else {
            resultDiv.className = '';
        }

        // Show the Try Again button and hide Submit button
        tryAgainBtn.style.display = 'block';
        submitBtn.style.display = 'none';

        // Disable all radio buttons
        const allRadios = document.querySelectorAll('input[type="radio"]');
        allRadios.forEach(radio => {
            radio.disabled = true;
        });

        // Scroll to the result
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    });

    // Try Again button functionality
    tryAgainBtn.addEventListener('click', function () {
        // Reset all form inputs
        quizForm.reset();

        // Hide all feedback messages
        const feedbackDivs = document.querySelectorAll('.feedback');
        feedbackDivs.forEach(div => {
            div.style.display = 'none';
        });

        // Hide result
        resultDiv.style.display = 'none';

        // Show Submit button and hide Try Again button
        submitBtn.style.display = 'block';
        tryAgainBtn.style.display = 'none';

        // Enable all radio buttons
        const allRadios = document.querySelectorAll('input[type="radio"]');
        allRadios.forEach(radio => {
            radio.disabled = false;
        });

        // Scroll back to top of quiz section
        document.querySelector('.section-title h2').scrollIntoView({ behavior: 'smooth' });
    });
});
// Mobile Menu Functions
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

// Event Listeners for Mobile Menu
hamburger.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Keep all existing Modal Functions
function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

// Keep all existing Event Listeners
loginBtn.addEventListener('click', () => openModal(loginModal));
signupBtn.addEventListener('click', () => openModal(signupModal));

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(loginModal);
        closeModal(signupModal);
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) closeModal(loginModal);
    if (e.target === signupModal) closeModal(signupModal);
});

// Keep all existing Form Submissions
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Login submitted');
    closeModal(loginModal);
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Signup submitted');
    closeModal(signupModal);
});

// Keep all existing Testimonial Slider code
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Keep Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 2000);

// Keep Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navHeight = document.querySelector('.navbar').offsetHeight;

        window.scrollTo({
            top: target.offsetTop - navHeight,
            behavior: 'smooth'
        });
    });
});

// Keep Active Navigation Link Highlight
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Keep Course Enrollment
document.querySelectorAll('.btn-secondary').forEach(button => {
    button.addEventListener('click', () => {
        if (!isLoggedIn()) {
            openModal(loginModal);
            return;
        }
        button.textContent = 'Enrolled';
        button.disabled = true;
    });
});

// Keep Helper function
function isLoggedIn() {
    return false;
}

// Keep Initialize function
document.addEventListener('DOMContentLoaded', () => {
    showTestimonial(0);
});