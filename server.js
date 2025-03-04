const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

const url = "mongodb+srv://vengatavisva7:vyqmD0KF7Qg3LxPg@cgpa.d7e5p.mongodb.net/?retryWrites=true&w=majority&appName=CGPA";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Database connected successfully");
})
.catch((err) => {
    console.error("Error: Can't connect to Database", err);
});

// Define Schema
const Regulation2022Schema = new mongoose.Schema({
    semesters: [
        {
            semesterNumber: { type: String, required: true },
            subjects: [
                {
                    subjectCode: { type: String, required: true },
                    subjectName: { type: String, required: true },
                    credits: { type: Number, required: true }
                }
            ],
            totalCredits: { type: Number, required: true }
        }
    ]
});

// Define Model
const R2022 = mongoose.model("R2022", Regulation2022Schema);

// Upload Data Function
/*const uploadData = async () => {
    try {
            const semData = new R2022({
                semesters: [
                    {
                        semesterNumber: "8",
                        subjects: [
                            {
                                subjectCode: "CS2891",
                                subjectName: "Project Work/Intership",
                                credits: 10
                            }                        ],
                        totalCredits: 10
                    }
                ]
            });

            await semData.save();
            console.log("Semester data uploaded successfully!");
    } catch (error) {
        console.error("Error uploading data:", error);
    }
};*/

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/cgpa", (req, res) => {
    res.render("cgpa");
});

// Render Semester Selection Page
app.get("/R2022", (req, res) => {
    res.render("R2022", { regulation: "R2022" });
});

// Handle Semester Selection & Redirect to Calculation Page
app.post("/R2022/semester", (req, res) => {
    const selectedSemester = req.body.Semester;
    if (!selectedSemester) {
        return res.redirect("/R2022");
    }
    res.redirect(`/R2022/${selectedSemester}`);
});

// Render Calculation Page with Selected Semester
app.get("/R2022/:semester", async (req, res) => {
    const semester = req.params.semester;

    try {
        const data = await R2022.findOne(
            { "semesters.semesterNumber": semester }, 
            { "semesters.$": 1 } // Fetch only the selected semester
        );

        if (!data) {
            return res.status(404).send("Semester not found");
        }

        const subjects = data.semesters[0].subjects; // Extract subjects for the semester

        res.render("calculation", { semester, subjects }); // Pass subjects to EJS
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// Call `uploadData()` Once Database Connection is Open
//mongoose.connection.once("open", uploadData);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
