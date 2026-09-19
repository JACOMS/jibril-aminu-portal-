document.addEventListener('DOMContentLoaded', () => {
  const resultForm = document.getElementById('result-form');
  const formSection = document.getElementById('form-section');
  const loadingState = document.getElementById('loading-state');
  const resultSection = document.getElementById('result-section');
  const prankModal = document.getElementById('prank-modal');
  const resetBtn = document.getElementById('reset-btn');
  const liveRegion = document.getElementById('live-region');

  const nameInput = document.getElementById('student-name');
  const matricInput = document.getElementById('matric-number');
  const semesterSelect = document.getElementById('semester-select');

  const displayName = document.getElementById('display-name');
  const displayMatric = document.getElementById('display-matric');
  const displaySemester = document.getElementById('display-semester');

  const nameError = document.getElementById('name-error');
  const matricError = document.getElementById('matric-error');
  const semesterError = document.getElementById('semester-error');

  let prankTimer = null;

  resultForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const studentNameVal = nameInput.value.trim();
    const matricNumVal = matricInput.value.trim();
    const semesterVal = semesterSelect.value;

    formSection.classList.add('hidden');
    loadingState.classList.remove('hidden');
    loadingState.setAttribute('aria-hidden', 'false');
    
    updateLiveRegion("Retrieving academic record... Please wait.");

    setTimeout(() => {
      loadingState.classList.add('hidden');
      loadingState.setAttribute('aria-hidden', 'true');

      displayName.textContent = studentNameVal;
      displayMatric.textContent = matricNumVal.toUpperCase();
      displaySemester.textContent = semesterVal;

      resultSection.classList.remove('hidden');
      resultSection.setAttribute('aria-hidden', 'false');
      updateLiveRegion("Academic results retrieved successfully.");

      prankTimer = setTimeout(() => {
        prankModal.classList.remove('hidden');
        prankModal.setAttribute('aria-hidden', 'false');
        resetBtn.focus();
        updateLiveRegion("Prank revealed: Got You!");
      }, 1500);

    }, 1800);
  });

  resetBtn.addEventListener('click', () => {
    resetPortal();
  });

  function validateForm() {
    let isValid = true;
    clearErrors();

    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Please enter your full name');
      isValid = false;
    }

    if (!matricInput.value.trim()) {
      showError(matricInput, matricError, 'Please enter your matriculation number');
      isValid = false;
    }

    if (!semesterSelect.value) {
      showError(semesterSelect, semesterError, 'Please select a semester');
      isValid = false;
    }

    return isValid;
  }

  function showError(inputElem, errorElem, message) {
    inputElem.classList.add('input-error');
    errorElem.textContent = message;
  }

  function clearErrors() {
    [nameInput, matricInput, semesterSelect].forEach(input => {
      input.classList.remove('input-error');
    });
    nameError.textContent = '';
    matricError.textContent = '';
    semesterError.textContent = '';
  }

  function updateLiveRegion(msg) {
    if (liveRegion) {
      liveRegion.textContent = msg;
    }
  }

  function resetPortal() {
    if (prankTimer) {
      clearTimeout(prankTimer);
      prankTimer = null;
    }

    prankModal.classList.add('hidden');
    prankModal.setAttribute('aria-hidden', 'true');
    resultSection.classList.add('hidden');
    resultSection.setAttribute('aria-hidden', 'true');
    loadingState.classList.add('hidden');
    loadingState.setAttribute('aria-hidden', 'true');

    resultForm.reset();
    clearErrors();

    formSection.classList.remove('hidden');
    nameInput.focus();
    updateLiveRegion("Portal reset to initial state.");
  }
});
