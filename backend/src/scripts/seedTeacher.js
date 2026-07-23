require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Teacher = require("../models/Teacher");

async function seed() {

    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Teacher.findOne({
        email: "admin@classroom.com"
    });

    if (existing) {
        console.log("Teacher already exists");
        process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Teacher.create({
        name: "Administrator",
        email: "admin@classroom.com",
        password: hashedPassword,
        role: "admin"
    });

    console.log("✅ Admin teacher created");

    process.exit();
}

seed();