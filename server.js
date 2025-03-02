const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

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
app.get("/R2022/:semester", (req, res) => {
    const semester = req.params.semester;
    res.render("calculation", { semester });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
