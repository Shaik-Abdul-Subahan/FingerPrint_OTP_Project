let otpGen;
let timer;
let secondsRemaining = 10;

function OTPFn() {
    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    clearFn();
    otpGen = Math.floor(1000 + Math.random() * 9000);
    const temp = document.getElementById('content');
    const showOtp = document.createElement('div');
    showOtp.classList.add('otp-display');
    showOtp.innerHTML = `
        <p class="otp-text">Generated OTP: 
            <span>${otpGen}</span>
        </p>`;
    temp.appendChild(showOtp);
    document.getElementById('otpForm').style.display = 'flex';
    startTimer();
}

function clearFn() {
    const prevOtp = document.querySelector('.otp-display');
    if (prevOtp) {
        prevOtp.remove();
    }
    resetTimer();
    document.getElementById('errorMessage').innerText = '';
    enableInputField();
}

function OTPVerifyFn() {
    const userOtp = document.getElementById('userOTP').value;
    if (userOtp === "") {
        alert("Please enter OTP.");
        return;
    }
    const enterOtp = parseInt(userOtp);
    if (!isNaN(enterOtp)) {
        if (secondsRemaining > 0) {
            if (enterOtp === otpGen) {
                showMsgFn();
                document.getElementById('generateBtn').disabled = false;
                resetTimer();
                enableInputField();
            } else {
                document.getElementById('errorMessage').innerText = 'Invalid OTP. Please try again.';
            }
        } else {
            document.getElementById('errorMessage').innerText = 'OTP Expired. Please generate a new OTP.';
            resetTimer();
        }
    } else {
        alert("Invalid OTP. Please try again.");
    }
}

function showMsgFn() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.animation = 'fadeIn 1s forwards';
    successMessage.style.display = 'flex';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

function startTimer() {
    timer = setInterval(function () {
        if (secondsRemaining <= 0) {
            clearInterval(timer);
            document.getElementById('generateBtn').disabled = false;
            document.getElementById('errorMessage').innerText = 'OTP Expired. Please generate a new OTP.';
            resetTimer();
            disableInputField();
        } else {
            document.getElementById('timer').innerText = `Time Remaining: ${secondsRemaining} seconds`;
            secondsRemaining--;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    document.getElementById('timer').innerText = '';
    secondsRemaining = 10;
}

function disableInputField() {
    document.getElementById('userOTP').disabled = true;
}

function enableInputField() {
    document.getElementById('userOTP').disabled = false;
}

function clearFields() {
    document.getElementById('userOTP').value = '';
    clearFn();
}







// FingerPrint JS Code

let isScanning = false;
let countdown = 5;
const scanToAnalyse = document.getElementById('scan-to-analyse');
const resetBtn = document.getElementById('reset-btn');
const fingerprintImg = document.getElementById('fingerprint-img');
const scannerLine = document.getElementById('scanner-line');
const textAnimate = document.querySelector('.text-animate'); // Text animation element

let authenticationState = 'success'; // Initial state for alternating authentication

fingerprintImg.addEventListener('click', startScan);

function startScan() {
    if (!isScanning) {
        isScanning = true;

        // Keep the text animation running only when showing the final result (not during countdown)
        textAnimate.style.animation = "none"; // Ensure no animation for the countdown phase

        scanToAnalyse.innerHTML = `<h2>Scanning Fingerprint in: ${countdown} seconds...</h2>`;
        textAnimate.innerHTML = "Scanning Fingerprint...Done!"; // Show initial scanning text

        // Start scanning process
        countdown = 5; // Reset countdown
        let countdownTimer = setInterval(() => {
            countdown--;
            scanToAnalyse.innerHTML = `<h2>A Moment, it's just ${countdown} seconds...</h2>`;

            if (countdown <= 0) {
                clearInterval(countdownTimer);
                scanToAnalyse.innerHTML = "<h2>Authentication Completed. Please Wait...</h2>";

                // Simulate fingerprint authentication result (alternate between success and failure)
                setTimeout(() => {
                    const isAuthenticated = authenticateFingerprint();

                    // Show authentication result inside the animated text
                    if (isAuthenticated) {
                        // Successful authentication
                        textAnimate.innerHTML = "Authentication Successful"; // Show success message in the text animation
                        textAnimate.style.color = "green"; // Change color to green
                    } else {
                        // Failed authentication
                        textAnimate.innerHTML = "Authentication Failed. Try again!"; // Show failure message in the text animation
                        textAnimate.style.color = "red"; // Change color to red
                    }

                    // Stop the scanning animation and apply the result text animation
                    scannerLine.style.animation = 'none'; // Stop the scanning animation

                    // Apply the animation for the result text
                    textAnimate.style.animation = "textAnimation 2s ease-in-out"; // Add animation back for the result

                    resetBtn.style.display = 'block'; // Show the reset button

                }, 5000); // Wait 5 seconds before showing the result (for simulation)
            }
        }, 2000); // Countdown interval
    }
}

// Simulate fingerprint authentication (alternate between success and failure)
function authenticateFingerprint() {
    // Alternate between success and failure each time
    if (authenticationState === 'success') {
        authenticationState = 'failure'; // Change state to 'failure' after success
        return true; // Simulate success
    } else {
        authenticationState = 'success'; // Change state to 'success' after failure
        return false; // Simulate failure
    }
}

// Reset scan to initial state
function resetScan() {
    scanToAnalyse.innerHTML = "<h2>Scan To Authenticate!</h2>"; // Reset text to initial state
    resetBtn.style.display = 'none'; // Hide reset button
    scannerLine.style.animation = 'scanAnimation 2.5s infinite alternate ease-in-out'; // Restart scanning animation
    isScanning = false; // Reset scanning state
    textAnimate.innerHTML = "Scan To Authenticate!"; // Reset text in animation to initial state
    textAnimate.style.color = ""; // Reset color of animation text
    textAnimate.style.animation = "textAnimation 2s ease-in-out"; // Restart animation with original content
}






