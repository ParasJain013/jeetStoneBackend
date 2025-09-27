const { contactSchema } = require('../schema');
const db = require('../config/firebase');

const sendMessage = async (req, res) => {
    try {
        const { error, value } = contactSchema.validate(req.body, { abortEarly: false });

        if (error) {
            // Collect readable messages
            const messages = error.details.map(e => {
                switch (e.type) {
                    case "string.empty":
                        return `${e.context.label} cannot be empty.`;
                    case "string.email":
                        return "Please enter a valid email address.";
                    case "string.min":
                        return `${e.context.label} is too short.`;
                    case "string.pattern.base":
                        return "Phone number must contain only digits (10-15 characters).";
                    default:
                        return e.message;
                }
            });

            return res.status(400).json({
                status: "error",
                message: "Please correct the following errors:",
                details: messages
            });
        }

        const newDoc = await db.collection('contacts').add(value);

        return res.status(201).json({
            status: "success",
            message: "Thank you! Your message has been sent successfully.",
            id: newDoc.id
        });

    } catch (err) {
        console.error("Error sending message:", err);
        return res.status(500).json({
            status: "error",
            message: "Something went wrong while sending your message. Please try again later."
        });
    }
};

module.exports = {
    sendMessage
};
