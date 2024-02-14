# HRMS Project Documentation

Make sure you have Node.js and npm installed on your system.
## Environment Variables

To run the hrms Project, you'll need to set up the following environment variables in your `.env` file:

### MongoDB Configuration
- `DATA_BASE_URL`: MongoDB connection URL, e.g., `mongodb://localhost:27017/hrms`
- `authSource`: MongoDB authentication source, e.g., `admin`

### Twilio Configuration
- `ACCOUNTSID`: Twilio Account SID for sending SMS notifications
- `AUTHTOKEN`: Twilio Auth Token
- `SIDVERIFYSID`: Twilio SID Verify SID for phone number verification
- `MOBILE_NUMBER`: Your registered Twilio mobile number for notifications, e.g., `+1234567890`

### JSON Web Token Configuration
- `JWT_SECRETM`: Secret key for JSON Web Tokens for students
- `JWT_SECRET_ADMIN`: Secret key for JSON Web Tokens for administrators
- `JWT_PAYLOAD_SECRET_KEY`: Secret key for JSON Web Token payload


## Contribution

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy learning with the hrms Project!
