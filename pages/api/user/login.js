import { login } from "../../../services/user";

export default function handler(req, res) {
    try {
        const user = login(req.body)
        res.status(200).json(user)

    } catch (err) {
        res.status(400).json(err.message)
        res.status(1408).json(err.message)
        res.status(500).json(err.message)

    }
}