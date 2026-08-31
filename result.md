#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_`pa`th.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Modern software developer personal portfolio website (Next.js App Router, TypeScript, Tailwind, GSAP, Three.js). Contact form must persist submissions to a database (PostgreSQL requested; MongoDB fallback active until DATABASE_URL is provided)."

backend:
  - task: "Contact form submission API (POST /api/contacts)"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "POST /api/contacts validates name/email/subject/message (email regex, message >=10 chars). Uses PostgreSQL via lib/pg.js when DATABASE_URL is set (creates contacts table via ensureContactsTable), otherwise falls back to MongoDB collection 'contacts'. DATABASE_URL not yet provided, so MongoDB fallback path is active. Returns 201 with {contact, storage} on success, 400 on invalid input. Manual curl showed 201 (mongodb-fallback) and 400 for invalid."
        -working: true
        -agent: "testing"
        -comment: "✅ PASSED all tests. Valid submission: Returns 201 with contact object (id as UUID, name, email, subject, message, created_at) and storage='mongodb-fallback' as expected. Invalid submissions: All 4 validation scenarios (missing name, invalid email 'bad', empty subject, message <10 chars) correctly return 400 with error field. Contact data persists correctly to MongoDB. Test timestamp: 2026-08-28T08:28:19."
  - task: "Contact listing API (GET /api/contacts)"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "GET /api/contacts returns up to 100 recent contacts from PostgreSQL (if DATABASE_URL set) or MongoDB fallback. Should return {contacts: [...], storage}."
        -working: true
        -agent: "testing"
        -comment: "✅ PASSED. Returns 200 with JSON containing 'contacts' array and 'storage' field. Retrieved 2 contacts from MongoDB fallback. Previously posted contact (from POST test) successfully appears in the list. Response structure correct with all required fields."
  - task: "Legacy status endpoints (/api/root, /api/status GET+POST)"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Pre-existing template endpoints retained. /api/root GET -> {message: Hello World}. /api/status POST requires client_name, GET returns list."
        -working: true
        -agent: "testing"
        -comment: "✅ PASSED all sanity checks. GET /api/root returns 200 with {message:'Hello World'}. POST /api/status with {client_name:'tester'} returns 200 with id (UUID), client_name, and timestamp. GET /api/status returns 200 with array of status entries. All endpoints functioning correctly."

frontend:
  - task: "Portfolio pages, theme toggle, GSAP, 3D scene, command palette"
    implemented: true
    working: "NA"
    file: "app/page.tsx and others"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "All 10 pages + dynamic routes built. Verified 200 via curl and screenshots for dark+light themes and working Three.js scene (React 19 + R3F v9). Frontend testing NOT yet requested by user."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: false

test_plan:
  current_focus:
    - "Contact form submission API (POST /api/contacts)"
    - "Contact listing API (GET /api/contacts)"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    -agent: "main"
    -message: "Please test the backend contact API at /api/contacts. Base URL is the app's external URL + /api (or localhost:3000/api). Test: (1) POST valid payload {name, email, subject, message>=10 chars} -> expect 201 with contact object and storage field ('mongodb-fallback' since DATABASE_URL not set). (2) POST invalid payloads (missing name, bad email, empty subject, message<10 chars) -> expect 400. (3) GET /api/contacts -> expect 200 with contacts array. (4) Sanity check legacy /api/root -> 200 {message:'Hello World'}. Note: DATABASE_URL is intentionally not configured yet, so MongoDB fallback is expected; do NOT flag that as a failure."
    -agent: "testing"
    -message: "Backend testing complete. All 6 test scenarios PASSED (100% success rate). Contact API (POST/GET) working correctly with MongoDB fallback. All validation rules enforced properly. Legacy endpoints functioning as expected. No critical issues found. Backend is production-ready for MongoDB storage. Ready for main agent to summarize and finish."