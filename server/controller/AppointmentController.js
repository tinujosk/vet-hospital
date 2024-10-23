import Appointment from '../model/Appointment.js';

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment.save();
    
    return res.status(201).json(savedAppointment); // Return the created appointment with a 201 status
  } catch (error) {
    console.error('Error creating appointment:', error);
    return res.status(500).json({ message: 'Failed to create appointment', error: error.message });
  }
};

export const getAppointments = async (req, res) => {
  console.log("Fetching all appointments...");

  try {
    const appointments = await Appointment.find();

    // Log each appointment in a more readable format
    if (appointments.length === 0) {
      console.log("No appointments found.");
    } else {
      console.log("Fetched appointments:");
      appointments.forEach((appointment, index) => {
        console.log(`Appointment ${index + 1}:`, {
          id: appointment._id,
          appointment_id: appointment.appointment_id,
          doctor_id: appointment.doctor_id,
          patient_id: appointment.patient_id,
          appointment_date: appointment.appointment_date,
          time_slot: appointment.time_slot,
          reason: appointment.reason,
          status: appointment.status
        });
      });
    }
    
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res.status(500).json({ message: error.message });
  }
};


  export const getAppointmentById = async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.id);
      if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };