/**
 * Dependency-free Regression Test Suite for Lab Day 18–19 Prototype
 * Direct event-driven testing using Node.js built-in modules (assert, vm) and lightweight DOM stub.
 * Note: Exercises actual production code in prototype/app.js. Real browser testing and field research remain pending.
 * Runner Command: node prototype/check.cjs
 */

const assert = require('assert');
const vm = require('vm');
const appModule = require('./app.js');

console.log('=================================================================');
console.log('STARTING INTERACTION REGRESSION CHECK (prototype/check.cjs)');
console.log('Execution Mode: Direct Controller & Production Event Handlers via Node.js DOM Stub');
console.log('=================================================================\n');

// --- 1. LIGHTWEIGHT DOM STUB FACTORY ---
function createDomStub() {
  const elements = new Map();
  const eventListeners = new Map();

  function makeElement(id, tagName = 'div') {
    const classSet = new Set();
    const attrs = new Map();
    const listeners = new Map();
    const children = [];

    let _innerHTML = '';
    const el = {
      id,
      tagName: tagName.toUpperCase(),
      value: '',
      checked: false,
      disabled: false,
      get innerHTML() { return _innerHTML; },
      set innerHTML(val) {
        _innerHTML = val;
        if (val === '') {
          children.length = 0;
        }
      },
      textContent: '',
      style: {},
      children,
      classList: {
        add: (...cls) => cls.forEach(c => classSet.add(c)),
        remove: (...cls) => cls.forEach(c => classSet.delete(c)),
        toggle: (c, force) => {
          if (force === undefined) {
            if (classSet.has(c)) classSet.delete(c);
            else classSet.add(c);
          } else if (force) {
            classSet.add(c);
          } else {
            classSet.delete(c);
          }
        },
        contains: (c) => classSet.has(c)
      },
      getAttribute: (name) => attrs.get(name) || null,
      setAttribute: (name, val) => attrs.set(name, String(val)),
      removeAttribute: (name) => attrs.delete(name),
      addEventListener: (type, handler) => {
        if (!listeners.has(type)) listeners.set(type, []);
        listeners.get(type).push(handler);
      },
      click: () => {
        const handlers = listeners.get('click') || [];
        handlers.forEach(h => h({ target: el, preventDefault: () => {} }));
      },
      dispatchEvent: (evt) => {
        const handlers = listeners.get(evt.type) || [];
        handlers.forEach(h => h(evt));
      },
      focus: () => { el.focused = true; },
      appendChild: (child) => { children.push(child); return child; },
      parentElement: null
    };

    if (id) elements.set(id, el);
    return el;
  }

  // Pre-seed known elements from prototype/index.html
  const requiredIds = [
    'toggle-observer-btn', 'close-observer-btn', 'observer-drawer', 'observer-scratchpad',
    'code-editor-input', 'editor-status-indicator', 'validate-code-btn', 'reset-code-btn', 'deploy-result-message',
    'tab-opt-a', 'tab-opt-b', 'tab-opt-c', 'panel-opt-a', 'panel-opt-b', 'panel-opt-c',
    'opt-a-trigger-btn', 'opt-a-reset-btn', 'opt-a-checklist-box', 'chk-port', 'chk-host', 'chk-dockerfile',
    'opt-a-search-input', 'opt-a-search-btn', 'opt-a-search-results',
    'opt-b-start-btn', 'opt-b-trigger-container', 'opt-b-diagnostic-box', 'opt-b-submit-diag-btn',
    'opt-b-diag-feedback', 'opt-b-microsteps-box', 'opt-b-stopped-box', 'opt-b-resume-btn', 'opt-b-restart-btn',
    'microstep-card-1', 'microstep-card-2', 'microstep-card-3', 'prog-step-1', 'prog-step-2', 'prog-step-3',
    'step1-code-edit', 'step1-error-msg', 'step1-confirm-btn', 'step1-skip-btn', 'step1-stop-btn',
    'step2-code-edit', 'step2-error-msg', 'step2-back-btn', 'step2-confirm-btn', 'step2-skip-btn', 'step2-stop-btn',
    'step3-back-btn', 'step3-confirm-btn', 'step3-alt-btn', 'step3-stop-btn', 'opt-b-alt-panel', 'opt-b-nav-to-a-btn',
    'microsteps-complete-box', 'completion-summary-title', 'completion-summary-desc', 'completion-steps-list', 'opt-b-reset-steps-btn',
    'opt-c-confidence-badge', 'confidence-val', 'toggle-uncertain-btn', 'diff-scenario-label', 'diff-view-content',
    'opt-c-rejected-notice', 'opt-c-unreject-btn', 'opt-c-apply-btn', 'opt-c-custom-btn', 'opt-c-reject-btn',
    'opt-c-rollback-btn', 'opt-c-wrong-btn', 'opt-c-reset-btn', 'opt-c-custom-box', 'opt-c-custom-textarea',
    'opt-c-save-custom-btn', 'opt-c-cancel-custom-btn', 'opt-c-notification'
  ];

  requiredIds.forEach(id => makeElement(id));

  // Pre-seed elements that start with class 'hidden' in index.html
  const initialHiddenIds = [
    'observer-drawer', 'deploy-result-message', 'opt-a-checklist-box',
    'opt-b-diagnostic-box', 'opt-b-diag-feedback', 'opt-b-microsteps-box', 'opt-b-stopped-box',
    'microstep-card-2', 'microstep-card-3', 'step1-error-msg', 'step2-error-msg', 'opt-b-alt-panel',
    'microsteps-complete-box', 'opt-c-rejected-notice', 'opt-c-custom-box', 'opt-c-notification'
  ];
  initialHiddenIds.forEach(id => {
    const el = elements.get(id);
    if (el) el.classList.add('hidden');
  });

  // Connect parent relationships for specific elements
  elements.get('opt-b-start-btn').parentElement = elements.get('opt-b-trigger-container');

  const doc = {
    getElementById: (id) => elements.get(id) || null,
    createElement: (tag) => makeElement(null, tag),
    querySelector: (sel) => {
      if (sel === 'input[name="diag-answer"]:checked') {
        return doc._selectedRadio || null;
      }
      return null;
    },
    querySelectorAll: (sel) => {
      if (sel === 'input[name="diag-answer"]') {
        return doc._radios || [];
      }
      return [];
    },
    _selectedRadio: null,
    _radios: [
      { value: 'hardcode-3000', checked: false },
      { value: 'env-port', checked: false },
      { value: 'unsure', checked: false }
    ]
  };

  return { doc, elements };
}

// ============================================================================
// TEST SUITE 1: Pattern-Based Validation Engine & Negative Cases
// ============================================================================
console.log('--- TEST SUITE 1: Validation Engine (Pattern Heuristic & Negative Cases) ---');

// 1a. Initial defective code must fail
const resDefective = appModule.validateCode(appModule.INITIAL_SOURCE_CODE);
assert.strictEqual(resDefective.success, false, 'Initial defective code must fail');
assert.ok(resDefective.reason.includes('PORT = 3000') || resDefective.reason.includes('localhost'));

// 1b. Correctly patched code must succeed with simulation label
const resPatched = appModule.validateCode(appModule.CORRECT_PATCHED_CODE);
assert.strictEqual(resPatched.success, true, 'Correctly patched code must pass');
assert.ok(resPatched.message.includes('[SIMULATION SUCCESS]'), 'Success message must state simulation');

// 1c. Specific acceptance negative case: malformed chained string
const malformedChained = "require('express'); express(); process.env.PORT; app.listen('0.0.0.0'); ???";
const resMalformedChained = appModule.validateCode(malformedChained);
assert.strictEqual(resMalformedChained.success, false, 'Chained malformed string must be rejected as unsupported');
assert.ok(resMalformedChained.reason.toUpperCase().includes('UNSUPPORTED PATTERN'));

// 1d. Appended ??? to correct code must fail
const resAppendedGarbage = appModule.validateCode(appModule.CORRECT_PATCHED_CODE + '\n???');
assert.strictEqual(resAppendedGarbage.success, false, 'Appended ??? garbage must fail validation');

// 1e. Extra trailing }); must fail
const resTrailingBracket = appModule.validateCode(appModule.CORRECT_PATCHED_CODE + '\n});');
assert.strictEqual(resTrailingBracket.success, false, 'Extra trailing }); must fail validation');

// 1f. Comment spoofing: comments containing target keywords but defective code must FAIL
const commentSpoofCode = `
// process.env.PORT '0.0.0.0'
/* process.env.PORT = 8080 '0.0.0.0' */
const express = require('express');
const app = express();
const PORT = 3000;
app.listen(PORT, 'localhost', () => {});
`;
const resCommentSpoof = appModule.validateCode(commentSpoofCode);
assert.strictEqual(resCommentSpoof.success, false, 'Comment spoofing must be detected and rejected');

// 1g. String literal containing spoof comment must fail
const stringSpoofCode = `const express = require('express');
const app = express();
app.get('/', (req, res) => { res.send('Hello from Cloud Run Microservice!'); });
console.log("spoof // process.env.PORT '0.0.0.0'");
const PORT = 3000;
app.listen(PORT, 'localhost', () => {});`;
const resStringSpoof = appModule.validateCode(stringSpoofCode);
assert.strictEqual(resStringSpoof.success, false, 'String spoof must be rejected as unsupported');

// 1h. Empty or comment-only code must fail
assert.strictEqual(appModule.validateCode('').success, false, 'Empty code must fail');
assert.strictEqual(appModule.validateCode('   // only comment \n /* block */  ').success, false, 'Comment-only code must fail');

// 1i. Arbitrary code not matching Express teaching fixture must report unsupported pattern
const arbitraryCode = `console.log("hello world");`;
const resArbitrary = appModule.validateCode(arbitraryCode);
assert.strictEqual(resArbitrary.success, false);
assert.ok(resArbitrary.reason.toUpperCase().includes('UNSUPPORTED PATTERN'), 'Unrecognized pattern must be reported as unsupported');

// 1j. Manual edit retaining original standalone DEFECT comment must pass
const manualEditWithOriginalComment = `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Cloud Run Microservice!');
});

// DEFECT: Hardcoded port 3000 and bound to localhost
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Server running on port \${PORT}\`);
});`;
const resManualWithComment = appModule.validateCode(manualEditWithOriginalComment);
assert.strictEqual(resManualWithComment.success, true, 'Manual edit keeping original comment must pass');

// 1k. Negative case: console.log(???) in listen block is invalid JS and must fail validation
const invalidLogCode = appModule.CORRECT_PATCHED_CODE.replace("console.log(`Server running on port ${PORT}`);", "console.log(???);");
const resInvalidLog = appModule.validateCode(invalidLogCode);
assert.strictEqual(resInvalidLog.success, false, 'Code with console.log(???) must fail validation');
assert.throws(() => new vm.Script(invalidLogCode), /SyntaxError/, 'console.log(???) is invalid JS and must throw SyntaxError in vm.Script');

// 1l. Negative case: unclosed block comment '/*\n' + CORRECT_PATCHED_CODE must fail validation as unsupported
const unclosedCommentCode = '/*\n' + appModule.CORRECT_PATCHED_CODE;
const resUnclosedComment = appModule.validateCode(unclosedCommentCode);
assert.strictEqual(resUnclosedComment.success, false, 'Unclosed block comment must fail validation as unsupported');
assert.throws(() => new vm.Script(unclosedCommentCode), /SyntaxError/, 'Unclosed block comment must throw SyntaxError in vm.Script');

console.log('  [PASS] Test Suite 1: Validation engine accurately identifies defects, spoofs, and unsupported patterns.\n');

// ============================================================================
// TEST SUITE 2: Storage Guard & In-Memory Fallback Under Blocked Storage
// ============================================================================
console.log('--- TEST SUITE 2: SessionStorage Guard (file:// or Blocked Storage) ---');

// Simulate throwing storage
global.sessionStorage = {
  getItem: () => { throw new Error('SecurityError: Access is denied for this document.'); },
  setItem: () => { throw new Error('SecurityError: Access is denied for this document.'); }
};

// Must not throw during safe access
appModule.safeSetStorage('test_key', 'test_value');
const retrieved = appModule.safeGetStorage('test_key');
assert.strictEqual(retrieved, 'test_value', 'In-memory fallback must retain notes when storage throws');

// Controller initialization with throwing storage must not crash
const { doc: stubDoc } = createDomStub();
let testController;
assert.doesNotThrow(() => {
  testController = appModule.createController(stubDoc);
}, 'createController must not crash under throwing sessionStorage');

console.log('  [PASS] Test Suite 2: Storage guard handles blocked storage gracefully without aborting init.\n');

// ============================================================================
// TEST SUITE 3: Option A Interaction Transitions via Production Handlers
// ============================================================================
console.log('--- TEST SUITE 3: Option A Event Handlers (Checklist, Search, Reset) ---');

const { doc: docA, elements: elA } = createDomStub();
const ctrlA = appModule.createController(docA);

// 3a. User clicks trigger checklist
assert.strictEqual(ctrlA.state.optA.checklistVisible, false);
elA.get('opt-a-trigger-btn').click();
assert.strictEqual(ctrlA.state.optA.checklistVisible, true);
assert.strictEqual(elA.get('opt-a-checklist-box').classList.contains('hidden'), false, 'Checklist must be visible');

// 3b. Search for PORT
elA.get('opt-a-search-input').value = 'port';
elA.get('opt-a-search-btn').click();
const searchContainer = elA.get('opt-a-search-results');
assert.ok(searchContainer.children.length > 0, 'Search results must render DOM cards');
assert.ok(searchContainer.innerHTML !== '' || searchContainer.children.length > 0);

// 3c. Search for unmatched query
elA.get('opt-a-search-input').value = 'unmatched_query_xyz';
elA.get('opt-a-search-btn').click();
assert.strictEqual(searchContainer.children.length, 1, 'Only summary message rendered for unmatched query');

// 3d. Reset Option A
elA.get('opt-a-reset-btn').click();
assert.strictEqual(ctrlA.state.optA.checklistVisible, false, 'Checklist hidden on reset');
assert.strictEqual(elA.get('opt-a-search-input').value, '', 'Search input cleared on reset');
assert.strictEqual(ctrlA.state.code.A, appModule.INITIAL_SOURCE_CODE, 'Code A restored on reset');

console.log('  [PASS] Test Suite 3: Option A checklist, search, and reset handlers verified.\n');

// ============================================================================
// TEST SUITE 4: Option B Production Transitions, Re-editing, Skip, Stop & Node vm.Script Compilation
// ============================================================================
console.log('--- TEST SUITE 4: Option B Socratic Navigator (Transitions, Re-edit, Skip, Stop, VM Compilation) ---');

const { doc: docB, elements: elB } = createDomStub();
const ctrlB = appModule.createController(docB);

// 4a. Start navigator & answer diagnostic with "unsure"
elB.get('opt-b-start-btn').click();
assert.strictEqual(ctrlB.state.optB.started, true);

// Select radio "unsure"
docB._selectedRadio = { value: 'unsure' };
elB.get('opt-b-submit-diag-btn').click();
assert.strictEqual(ctrlB.state.optB.diagAnswered, true);
assert.strictEqual(ctrlB.state.optB.currentStep, 1);
assert.ok(elB.get('opt-b-diag-feedback').innerHTML.includes('Chưa rõ'), 'Contextual feedback for unsure must be displayed');

// 4b. Step 1: Reject empty/malformed snippet
elB.get('step1-code-edit').value = '   ';
elB.get('step1-confirm-btn').click();
assert.strictEqual(ctrlB.state.optB.currentStep, 1, 'Empty snippet must reject confirmation and stay on step 1');
assert.strictEqual(elB.get('step1-error-msg').classList.contains('hidden'), false, 'Error message must be shown');

// 4b-2. Step 1: Reject out-of-range port number
elB.get('step1-code-edit').value = 'const PORT = process.env.PORT || 999999;';
elB.get('step1-confirm-btn').click();
assert.strictEqual(ctrlB.state.optB.currentStep, 1, 'Out-of-range port must be rejected');

// 4c. Step 1: Valid snippet confirmation
elB.get('step1-code-edit').value = 'const PORT = process.env.PORT || 8080;';
elB.get('step1-confirm-btn').click();
assert.strictEqual(ctrlB.state.optB.currentStep, 2, 'Valid snippet advances to step 2');
assert.strictEqual(ctrlB.state.optB.stepProgress[1], true, 'Step 1 marked confirmed');

// 4d. Re-editing step 1: Go back and change snippet
elB.get('step2-back-btn').click();
assert.strictEqual(ctrlB.state.optB.currentStep, 1, 'Back button returns to step 1');

// Change snippet to custom port 9000
elB.get('step1-code-edit').value = 'const PORT = process.env.PORT || 9000;';
elB.get('step1-confirm-btn').click();
assert.strictEqual(ctrlB.state.optB.currentStep, 2);
assert.ok(ctrlB.state.code.B.includes('PORT || 9000'), 'Rebuilt code must contain newly changed snippet');

// Verify code compiles cleanly with Node vm.Script without syntax error (trailing }); bug fix)
assert.doesNotThrow(() => {
  new vm.Script(ctrlB.state.code.B);
}, 'Option B intermediate code must compile cleanly in Node vm');

// 4e-1. Step 2: Reject malformed listen snippet (binding localhost)
elB.get('step2-code-edit').value = "app.listen(PORT, 'localhost', () => {});";
elB.get('step2-confirm-btn').click();
assert.strictEqual(ctrlB.state.optB.currentStep, 2, 'Malformed listen snippet must be rejected');
assert.strictEqual(elB.get('step2-error-msg').classList.contains('hidden'), false);

// 4e-2. Step 2: Reject snippet containing console.log(???)
elB.get('step2-code-edit').value = "app.listen(PORT, '0.0.0.0', () => {\n  console.log(???);\n});";
elB.get('step2-confirm-btn').click();
assert.strictEqual(ctrlB.state.optB.currentStep, 2, 'Snippet containing console.log(???) must be rejected');
assert.strictEqual(elB.get('step2-error-msg').classList.contains('hidden'), false);

// 4e-3. Step 2: Valid Confirm
elB.get('step2-code-edit').value = `app.listen(PORT, '0.0.0.0', () => {\n  console.log(\`Server running on port \${PORT}\`);\n});`;
elB.get('step2-confirm-btn').click();
assert.strictEqual(ctrlB.state.optB.currentStep, 3);
assert.strictEqual(ctrlB.state.optB.stepProgress[2], true);

// Verify completed code compiles cleanly in Node vm and passes validation
assert.doesNotThrow(() => {
  new vm.Script(ctrlB.state.code.B);
}, 'Option B complete code must compile cleanly in Node vm');
assert.strictEqual(appModule.validateCode(ctrlB.state.code.B).success, true, 'Completed Option B code must pass Cloud Run validation');

// 4f. Step 3 Actions: Alternative panel toggle and Step 3 finish
elB.get('step3-alt-btn').click();
assert.strictEqual(elB.get('opt-b-alt-panel').classList.contains('hidden'), false, 'Alternative panel shown');

elB.get('step3-confirm-btn').click();
assert.strictEqual(ctrlB.state.optB.completed, true);
assert.ok(elB.get('completion-summary-title').textContent.includes('Hoàn Thành Đầy Đủ'), 'Summary marks full completion');

// 4g. Test Skip Semantics in a fresh controller
const { doc: docB2, elements: elB2 } = createDomStub();
const ctrlB2 = appModule.createController(docB2);
elB2.get('opt-b-start-btn').click();
docB2._selectedRadio = { value: 'env-port' };
elB2.get('opt-b-submit-diag-btn').click();

// Skip step 1
elB2.get('step1-skip-btn').click();
assert.strictEqual(ctrlB2.state.optB.currentStep, 2, 'Skipping step 1 advances to step 2');
assert.strictEqual(ctrlB2.state.optB.stepProgress[1], false, 'Skipped step must NOT be marked confirmed');

// Skip step 2
elB2.get('step2-skip-btn').click();
assert.strictEqual(ctrlB2.state.optB.currentStep, 3);
assert.strictEqual(ctrlB2.state.optB.stepProgress[2], false, 'Skipped step 2 must NOT be marked confirmed');

// Finish step 3 with skipped steps
elB2.get('step3-confirm-btn').click();
assert.ok(elB2.get('completion-summary-title').textContent.includes('Có Bước Bị Bỏ Qua'), 'Summary must flag skipped steps');

// 4h. Test Stop Guidance Semantics & Handler Guards
const { doc: docB3, elements: elB3 } = createDomStub();
const ctrlB3 = appModule.createController(docB3);
elB3.get('opt-b-start-btn').click();
docB3._selectedRadio = { value: 'hardcode-3000' };
elB3.get('opt-b-submit-diag-btn').click();

elB3.get('step1-stop-btn').click();
assert.strictEqual(ctrlB3.state.optB.stopped, true, 'Stop guidance sets stopped flag');
assert.strictEqual(elB3.get('opt-b-stopped-box').classList.contains('hidden'), false, 'Stopped view displayed');
assert.strictEqual(elB3.get('microstep-card-1').classList.contains('hidden'), true, 'Microstep card hidden while stopped');

// Guard check: programmatic click on step1-confirm-btn while stopped must NOT advance or modify code
elB3.get('step1-code-edit').value = 'const PORT = process.env.PORT || 8080;';
elB3.get('step1-confirm-btn').click();
assert.strictEqual(ctrlB3.state.optB.currentStep, 1, 'While stopped, confirm must not advance step');
assert.strictEqual(ctrlB3.state.optB.stepProgress[1], false, 'While stopped, confirm must not mark step done');

// Guard check: programmatic click on step1-skip-btn while stopped must NOT advance
elB3.get('step1-skip-btn').click();
assert.strictEqual(ctrlB3.state.optB.currentStep, 1, 'While stopped, skip must not advance step');

// Resume from stop
elB3.get('opt-b-resume-btn').click();
assert.strictEqual(ctrlB3.state.optB.stopped, false, 'Resume un-pauses guidance');
assert.strictEqual(elB3.get('microstep-card-1').classList.contains('hidden'), false, 'Microstep card re-shown');

// Reset Option B
elB3.get('opt-b-restart-btn').click();
assert.strictEqual(ctrlB3.state.optB.started, false);
assert.strictEqual(ctrlB3.state.code.B, appModule.INITIAL_SOURCE_CODE, 'Code B restored to initial state');

console.log('  [PASS] Test Suite 4: Option B transitions, re-edits, snippet validation, skip, stop, guards, and Node VM compilation verified.\n');

// ============================================================================
// TEST SUITE 5: Option C Production Handlers (Apply, Reject, Customize, Rollback, Reset)
// ============================================================================
console.log('--- TEST SUITE 5: Option C Event Handlers (Apply, Reject, Customize, Rollback, Reset) ---');

const { doc: docC, elements: elC } = createDomStub();
const ctrlC = appModule.createController(docC);

// 5a. Apply normal patch
elC.get('opt-c-apply-btn').click();
assert.strictEqual(ctrlC.state.optC.applied, true);
assert.strictEqual(ctrlC.state.code.C, appModule.CORRECT_PATCHED_CODE);
assert.doesNotThrow(() => new vm.Script(ctrlC.state.code.C), 'Patched code C must compile cleanly in Node vm');

// 5b. Rollback restores code
elC.get('opt-c-rollback-btn').click();
assert.strictEqual(ctrlC.state.code.C, appModule.INITIAL_SOURCE_CODE);
assert.strictEqual(ctrlC.state.optC.applied, false);

// 5c. Reject locks proposal and prevents applying
elC.get('opt-c-reject-btn').click();
assert.strictEqual(ctrlC.state.optC.rejected, true);
assert.strictEqual(elC.get('opt-c-apply-btn').disabled, true, 'Apply button must be disabled when rejected');
assert.strictEqual(elC.get('opt-c-custom-btn').disabled, true, 'Customize button must be disabled when rejected');

// Try clicking disabled apply
elC.get('opt-c-apply-btn').click();
assert.strictEqual(ctrlC.state.code.C, appModule.INITIAL_SOURCE_CODE, 'Clicking apply while rejected must NOT apply code');

// Unreject restores apply button
elC.get('opt-c-unreject-btn').click();
assert.strictEqual(ctrlC.state.optC.rejected, false);
assert.strictEqual(elC.get('opt-c-apply-btn').disabled, false);

// 5d. Custom edit and save
elC.get('opt-c-custom-btn').click();
assert.strictEqual(elC.get('opt-c-custom-box').classList.contains('hidden'), false);
elC.get('opt-c-custom-textarea').value = `const express = require('express');\nconst app = express();\nconst PORT = process.env.PORT || 8080;\napp.listen(PORT, '0.0.0.0', () => {});`;
elC.get('opt-c-save-custom-btn').click();
assert.ok(ctrlC.state.code.C.includes('listen(PORT, \'0.0.0.0\''), 'Custom saved code applied to Code C');

// 5e. Toggle uncertain scenario and report wrong
elC.get('toggle-uncertain-btn').click();
assert.strictEqual(ctrlC.state.optC.scenario, 'uncertain');

elC.get('opt-c-wrong-btn').click();
assert.strictEqual(ctrlC.state.optC.reportedWrong, true);
const scratchNotes = appModule.safeGetStorage('observer_notes');
assert.ok(scratchNotes.includes('Báo AI đoán sai'), 'Reporting wrong must log locally to observer scratchpad');

// 5f. Reset Option C restores everything
elC.get('opt-c-reset-btn').click();
assert.strictEqual(ctrlC.state.optC.scenario, 'normal');
assert.strictEqual(ctrlC.state.optC.rejected, false);
assert.strictEqual(ctrlC.state.code.C, appModule.INITIAL_SOURCE_CODE);

console.log('  [PASS] Test Suite 5: Option C apply, reject lock, customize, rollback, report, and reset verified.\n');

// ============================================================================
// TEST SUITE 6: Tab Isolation & Safe HTML Escaping
// ============================================================================
console.log('--- TEST SUITE 6: Tab State Isolation & Safe HTML Escaping ---');

const { doc: docIso, elements: elIso } = createDomStub();
const ctrlIso = appModule.createController(docIso);

// Modify code in Option B
ctrlIso.state.code.B = 'CUSTOM CODE B';

// Switch to Tab C and verify code in Tab A and Tab C remain unaffected
ctrlIso.switchTab('C');
assert.strictEqual(ctrlIso.state.code.A, appModule.INITIAL_SOURCE_CODE, 'Code A must remain initial');
assert.strictEqual(ctrlIso.state.code.C, appModule.INITIAL_SOURCE_CODE, 'Code C must remain initial');
assert.strictEqual(ctrlIso.state.code.B, 'CUSTOM CODE B', 'Code B retains its isolated state');

// Verify HTML escaping
const raw = '<script>alert("xss")</script>&"\'';
const escaped = appModule.escapeHtml(raw);
assert.ok(!escaped.includes('<script>'));
assert.ok(escaped.includes('&lt;script&gt;'));
assert.ok(escaped.includes('&amp;'));
assert.ok(escaped.includes('&quot;'));
assert.ok(escaped.includes('&#039;'));

console.log('  [PASS] Test Suite 6: Tab state isolation and HTML escaping verified.\n');

console.log('=================================================================');
console.log('ALL REGRESSION CHECKS PASSED (6/6 TEST SUITES)');
console.log('Note: Executed with lightweight Node.js DOM stub + Node vm compiler.');
console.log('Browser/visual checks and empirical field testing remain pending.');
console.log('=================================================================');
