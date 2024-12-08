# vet-hospital
Veterinary Hospital Management System project

VetClinic Pro is a veterinary hospital management system designed to streamline operations within a veterinary hospital. This application caters to the needs of different stakeholders, including Admins, Doctors, Nurses, Lab Assistants, and Pharmacists, by providing role-based dashboards, treatment workflows, payments and other functionalities.

1. Abstract
-----------
Problem Addressed: Managing a veterinary hospital involves complex operations, such as patient registration, treatment workflows, inventory management, and billing. Manual systems often result in inefficiencies, errors, and delays.
Methodology: VetClinic Pro implements a role-based management system with secure authentication, streamlined workflows, and payment integration for efficient operation and enhanced patient care.
Key Results and Findings: The system automates key processes like billing and inventory updates, ensures role-specific task management, and enables secure payment processing, improving overall operational efficiency.
Significance: VetClinic Pro transforms veterinary hospital operations by providing a user-friendly, efficient, and scalable solution, ensuring better care and seamless financial transactions.

2. Introduction
---------------
Background
Veterinary hospitals manage various operations, such as patient registration, treatment, lab tests, and pharmacy services. Current systems often lack integration, leading to inefficiencies and communication gaps.
Problem Statement
How can veterinary hospitals streamline operations, ensuring seamless workflows and secure financial transactions while reducing errors?

Objectives/Goals
a) Implement a role-based management system with secure access control.
b) Automate key processes like billing and inventory management.
c) Integrate payment processing for seamless financial transactions.
d) Provide an intuitive interface for all stakeholders.

Scope and Limitations
Scope:
a) Focuses on role-based management (Admin, Doctor, Nurse, Lab Assistant, Pharmacist).
b) Covers operations such as patient management, billing, and inventory updates.
c) Integrates a secure payment system for financial transactions.
Limitations:
a) Does not include advanced analytics or revenue monitoring in this version.
b) Limited to on-premise deployment in the current scope.

3. Literature Review
--------------------
Existing Solutions:
a) Traditional hospital management systems for human healthcare are robust but lack customization for veterinary operations.
b) Standalone tools exist for scheduling, inventory, or billing but do not provide an integrated solution.
Gaps Identified:
a) Lack of comprehensive, role-based solutions tailored for veterinary workflows.
b) Limited support for integrated payment processing in existing veterinary management systems.
VetClinic Pro addresses these gaps by offering a unified system with role-based functionality and payment integration.

4. Methodology
--------------
Approach
a) Role-Based Design: Assign tasks and dashboards based on user roles to streamline operations and avoid overlap.
b) Secure Authentication: Implement user login with role-based redirection.
c) Payment Integration: Enable secure online and offline payment options for patients.
Tools and Technologies
a) Programming Languages: JavaScript (Node.js for backend).
b) Frameworks: React.js, Express.js, Redux, Material UI, D3.js.
c) Database: MongoDB.
d) Payment Gateway: Stripe Payments.
Data Collection and Analysis
a) Collect user and patient data during registration.
b) Analyse payment records and appointment schedules to ensure smooth transactions.

5. Project Design/Implementation
--------------------------------
System Architecture
a) Frontend: Role-specific dashboards providing access to relevant features.
b) Backend: RESTful APIs and JWT Tokens for authentication, database queries, and payment processing.
c) Database: A NoSQL structure with collections for users, patients, appointments, inventory, and payment records.
Key Features
a) Admin: User management.
b) Nurse: Patient registration, preliminary tests, and appointment scheduling.
c) Doctor: Patient treatment, prescriptions, and lab test management.
d) Lab Assistant: Lab test results and billing.
e) Pharmacist: Inventory updates, dispensing medicines, and billing.

Workflows
Authentication:
a) The user logs in.
b) The system verifies credentials and redirects to the respective dashboard.
Payment Processing:
a) The payment links are automatically sent to the owner’s email after the prescription.
b) The system redirects the user to a secure payment portal.
c) Payment confirmation updates the database and appointment records.

6. Challenges and Solutions
---------------------------
Challenges
a) Integration with Payment Gateway: Ensuring secure and seamless payment processing.
    Solution: Integrated a third-party payment processor with encrypted transactions.
b) Role-Specific Access Control: Initial overlaps in role permissions confused.
    Solution: Refined access controls and conducted extensive user testing.

7. References
-------------
a) React.js Documentation: https://legacy.reactjs.org/
b) Node.js Documentation: https://nodejs.org/docs/
c) Stripe Payment Gateway Documentation: https://stripe.com/docs/
d) MongoDB Documentation: https://www.mongodb.com/docs/


Application Flow In Detail
==========================

Authentication and Autherization

1) User (Admin, Doctor, Nurse, Lab Assistant, Pharmacist) logs in with (username/email) and password.
2) The user is then automatically redirected to respective dashboards based on the credentials.
3) After authentication, the user is authorized to do specific tasks based on the credentials.

Admin

1) Admin registers users (Doctor, Nurse, Lab Assistant, Pharmacist) with system generated password.
2) Users will be able to change the default passwords later on.
3) Admin should be able to see the summary of all users, pharmacy inventory with stock details. (Stock update is done by Pharmacist).
4) Optionally admin should be able to see a revenue analytics. (Can make use of Graphs).

Nurse 

1) Nurse can register new patients with their owner details.
2) Nurse can schedule an appointment.
3) Nurse will do the preliminary test for a patient appointment and pass the patient to doctor.
4) Nurse can view patient/owner and appointment details.

Doctor

1) Doctor can his appointments related to him.
2) Can see patient/owner details.
3) Treat patients (Prelims from Nurse should be done before he can treat).
4) Write prescriptions, send patient to lab test and view test result once it is available from Lab assistant.

Lab Assistant

1) Does the lab tests presribed by Doctor and send results back to him.
2) View patient/Owner details.
3) Create lab test bill (automatic) and attach it to appointment. 

Pharmacists

1) Update medicine inventory.
2) Check medicine prescribed by doctor and deliver it to patient.
3) Create pharmacy bill (automatic) and attach it to appointment.
4) View patient/Owner details.
