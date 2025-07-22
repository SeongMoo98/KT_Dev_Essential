// 계산기 상태 변수들
let currentNumber = '0';
let previousNumber = null;
let currentOperator = null;
let shouldResetDisplay = false;
let hasDecimal = false;
let hasCalculated = false;

// DOM 요소
const resultDisplay = document.getElementById('result');
const clearBtn = document.getElementById('clearBtn');

// 숫자 추가 함수
function appendNumber(number) {
    if (shouldResetDisplay) {
        currentNumber = '';
        shouldResetDisplay = false;
        hasDecimal = false;
    }
    
    // 계산 후 새로운 숫자 입력 시 초기화
    if (hasCalculated && currentOperator === null) {
        currentNumber = '';
        hasCalculated = false;
        hasDecimal = false;
    }
    
    // 소수점이 이미 있으면 추가 소수점 방지
    if (number === '.' && hasDecimal) {
        return;
    }
    
    // 첫 번째 숫자가 0이고 소수점이 아니면 0 제거
    if (currentNumber === '0' && number !== '.') {
        currentNumber = '';
    }
    
    // 소수점 추가 시 플래그 설정
    if (number === '.') {
        hasDecimal = true;
    }
    
    currentNumber += number;
    updateDisplay();
    updateClearButton();
}

// 소수점 추가 함수
function appendDecimal() {
    appendNumber('.');
}

// 연산자 설정 함수
function setOperator(operator) {
    if (currentOperator && !shouldResetDisplay) {
        calculate();
    }
    
    previousNumber = parseFloat(currentNumber);
    currentOperator = operator;
    shouldResetDisplay = true;
    hasDecimal = false;
    hasCalculated = false;
    
    // 연산자 버튼 활성화 표시
    updateOperatorButtons(operator);
}

// 계산 함수
function calculate() {
    if (currentOperator === null || shouldResetDisplay) {
        return;
    }
    
    const current = parseFloat(currentNumber);
    let result;
    
    switch (currentOperator) {
        case '+':
            result = previousNumber + current;
            break;
        case '−':
            result = previousNumber - current;
            break;
        case '×':
            result = previousNumber * current;
            break;
        case '÷':
            if (current === 0) {
                alert('0으로 나눌 수 없습니다.');
                clearDisplay();
                return;
            }
            result = previousNumber / current;
            break;
        default:
            return;
    }
    
    // 결과를 현재 숫자로 설정
    currentNumber = result.toString();
    
    // 정수인 경우 소수점 제거
    if (Number.isInteger(result)) {
        currentNumber = Math.floor(result).toString();
    }
    
    // 너무 큰 숫자 처리
    if (result > 999999999) {
        currentNumber = result.toExponential(3);
    }
    
    currentOperator = null;
    previousNumber = null;
    shouldResetDisplay = true;
    hasDecimal = currentNumber.includes('.');
    hasCalculated = true;
    
    updateDisplay();
    updateOperatorButtons(null);
    updateClearButton();
}

// 부호 변경 함수
function toggleSign() {
    if (currentNumber === '0') {
        return;
    }
    
    if (currentNumber.startsWith('-')) {
        currentNumber = currentNumber.substring(1);
    } else {
        currentNumber = '-' + currentNumber;
    }
    
    updateDisplay();
}

// 퍼센트 계산 함수
function calculatePercentage() {
    const number = parseFloat(currentNumber);
    const result = number / 100;
    
    currentNumber = result.toString();
    
    // 정수인 경우 소수점 제거
    if (Number.isInteger(result)) {
        currentNumber = Math.floor(result).toString();
    }
    
    updateDisplay();
}

// 디스플레이 초기화 함수
function clearDisplay() {
    // AC 상태일 때 (모든 것을 지움)
    if (clearBtn.textContent === 'AC') {
        currentNumber = '0';
        previousNumber = null;
        currentOperator = null;
        shouldResetDisplay = false;
        hasDecimal = false;
        hasCalculated = false;
        updateOperatorButtons(null);
    } 
    // C 상태일 때 (현재 입력만 지움)
    else {
        currentNumber = '0';
        shouldResetDisplay = false;
        hasDecimal = false;
    }
    
    updateDisplay();
    updateClearButton();
}

// 한 글자 지우기 함수
function backspace() {
    if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
        if (currentNumber === '') {
            currentNumber = '0';
        }
        // 소수점이 제거되었는지 확인
        hasDecimal = currentNumber.includes('.');
        updateDisplay();
        updateClearButton();
    } else {
        clearDisplay();
    }
}

// 디스플레이 업데이트 함수
function updateDisplay() {
    // 숫자가 너무 길면 폰트 크기 조정
    let fontSize = 80;
    if (currentNumber.length > 8) {
        fontSize = Math.max(40, 80 - (currentNumber.length - 8) * 5);
    }
    
    resultDisplay.style.fontSize = fontSize + 'px';
    resultDisplay.textContent = currentNumber;
}

// 연산자 버튼 활성화 상태 업데이트
function updateOperatorButtons(activeOperator) {
    const operatorButtons = document.querySelectorAll('.operator');
    
    operatorButtons.forEach(button => {
        if (button.textContent === activeOperator) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Clear 버튼 텍스트 업데이트
function updateClearButton() {
    if (currentNumber === '0' && currentOperator === null && previousNumber === null) {
        clearBtn.textContent = 'AC';
        clearBtn.classList.remove('clear');
    } else {
        clearBtn.textContent = 'C';
        clearBtn.classList.add('clear');
    }
}

// 키보드 이벤트 리스너
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // 숫자 키
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    }
    // 연산자 키
    else if (key === '+' || key === '-') {
        setOperator(key === '+' ? '+' : '−');
    }
    else if (key === '*') {
        setOperator('×');
    }
    else if (key === '/') {
        event.preventDefault();
        setOperator('÷');
    }
    // 소수점
    else if (key === '.') {
        appendDecimal();
    }
    // 엔터키 또는 등호
    else if (key === 'Enter' || key === '=') {
        calculate();
    }
    // 백스페이스
    else if (key === 'Backspace') {
        backspace();
    }
    // ESC 키
    else if (key === 'Escape') {
        clearDisplay();
    }
});

// 초기 디스플레이 설정
updateDisplay();
updateClearButton(); 