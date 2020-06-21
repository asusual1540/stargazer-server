const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../../models/admin")
const isAuth = require("../../middleware/is-auth")

module.exports = {
    addAdmin: async (name, password, secret) => {
        if (secret !== "1540") {
            throw new Error("Unable to create an admin")
        }
        try {
            const admin = await Admin.findOne({ name: name })
            if (admin) return new Error("Admin already exists by that name")
            const hashedPassword = await bcrypt.hash(password, 12)
            const newAdmin = new Admin({
                name,
                password: hashedPassword
            })
            const createdAdmin = await newAdmin.save()
            return {
                ...createdAdmin._doc,
                password: null,
                date: new Date(createdAdmin._doc.date).toISOString()
            }
        } catch (err) {
            return new Error("Couldnot add an admin" + err)
        }
    },
    get_all_admins: async () => {
        try {
            const admins = await Admin.find()
            return admins.map(admin => {
                return {
                    ...admin._doc,
                    password: null,
                    date: new Date(admin._doc.date).toISOString()
                }
            })
        } catch (err) {
            return new Error("Couldnot find any admins" + err)
        }
    },
    adminLogin: async (name, password) => {
        const admin = await Admin.findOne({ name: name })
        if (!admin) {
            throw new Error("User does not exists")
        }
        const isEqual = await bcrypt.compare(password, admin.password)
        if (isEqual === false) {
            throw new Error("Password is incorrect")
        }
        const token = jwt.sign(
            { adminID: admin.id, name: admin.name, accessType: admin.accessType },
            "Iamkira1540",
            {
                expiresIn: "1h"
            }
        )
        return {
            token: token
        }
    },
    changeAdminPassword: async (prevPassword, newPassword, adminID) => {

        try {
            if (prevPassword === "" && newPassword === "") {
                throw new Error("Fields are empty")
            }
            const admin = await Admin.findOne({ _id: adminID })
            if (prevPassword !== "" && newPassword !== "") {
                const isEqual = await bcrypt.compare(prevPassword, admin.password)
                if (isEqual === false) {
                    throw new Error("Password is incorrect")
                }
                const hashedPassword = await bcrypt.hash(newPassword, 12)
                admin.password = hashedPassword
            }
            const updatedAdmin = await admin.save()
            return updatedAdmin
        } catch (err) {
            return new Error("Couldnot change password of admin from resolver" + err)
        }
    }
}
