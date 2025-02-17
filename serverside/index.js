import express from "express";
import cors from "cors"
import { adminRouter } from "./Routes/AdminRoute.js"
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import jwt, { decode } from "jsonwebtoken"
import cookieParser from "cookie-parser";


const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.static('Public'))

app.use("/auth", adminRouter)
app.use("/employee", EmployeeRouter)

const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    console.log(token);
    if (token) {
        jwt.verify(token, "jwt_secret_key", (err, decoded) => {
            if (err) return res.json({ status: false, Error: "Wrong token" })
            req.id = decoded.id
            req.role = decoded.role
            next()
        })
    } else {
        return res.json({ status: false, Error: "Not authenticated" })
    }
}

app.get("/verify", verifyUser, (req, res) => {
    return res.json({ status: true, role: req.role, id: req.id })
})

app.listen(8000, () => {
    console.log("server running at port 8000");
})
