# vet-hospital
Veterinary Hospital Management System project

Application Flow
=================

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

Shared Component Ideas

1) Pharmacy inventory Table, and stock details (Shared among pharmacy, admin, doctor - to see availability)
2) Patient/Owner component (Nurse can edit details)
3) Medical history (Should this be a separate component?)