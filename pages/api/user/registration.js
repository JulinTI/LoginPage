import { registration } from "../../../services/user";

export default function handler(req, res) {
    try {
        const newUser = registration(req.body)
        res.status(200).json(newUser)

    } catch (err) {
        res.status(400).json(err.message)
        res.status(1408).json(err.message)
        res.status(500).json(err.message)

    }
}