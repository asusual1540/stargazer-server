const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const SuperAdmin = require("../models/super_admin")

module.exports = {
    create_super_admin: async (name, password, secret) => {
        if (secret !== "1540") {
            throw new Error("Unable to create an admin")
        }
        try {
            const super_admin = await SuperAdmin.find()
            if (super_admin.length > 0) return new Error("Super Admin already exists")
            const hashedPassword = await bcrypt.hash(password, 12)
            const newSuperAdmin = new SuperAdmin({
                name,
                password: hashedPassword
            })
            const createdSuperAdmin = await newSuperAdmin.save()
            return {
                ...createdSuperAdmin._doc,
                password: null,
                date: new Date(createdSuperAdmin._doc.date).toISOString()
            }
        } catch (err) {
            return new Error("Couldnot add an super admin" + err)
        }
    },

    super_admin_login: async (name, password) => {
        const super_admin = await SuperAdmin.findOne({ name: name })
        if (!super_admin) {
            throw new Error("User does not exists")
        }
        const isEqual = await bcrypt.compare(password, super_admin.password)
        if (isEqual === false) {
            throw new Error("Password is incorrect")
        }
        const token = jwt.sign(
            { userID: super_admin.id, username: super_admin.name, accessType: super_admin.accessType },
            "Iamkira1540",
            {
                expiresIn: "1h"
            }
        )
        return {
            token: token
        }
    },
    changeAdminPassword: async (prevPassword, newPassword, super_adminID) => {

        try {
            if (prevPassword === "" && newPassword === "") {
                throw new Error("Fields are empty")
            }
            const super_admin = await Admin.findOne({ _id: super_adminID })
            if (prevPassword !== "" && newPassword !== "") {
                const isEqual = await bcrypt.compare(prevPassword, super_admin.password)
                if (isEqual === false) {
                    throw new Error("Password is incorrect")
                }
                const hashedPassword = await bcrypt.hash(newPassword, 12)
                super_admin.password = hashedPassword
            }
            const updatedAdmin = await super_admin.save()
            return updatedAdmin
        } catch (err) {
            return new Error("Couldnot change password of super_admin from resolver" + err)
        }
    }
}
