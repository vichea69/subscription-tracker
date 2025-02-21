import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);
        if (decision.isDenied()) {
            if (decision.reason.isRateLimited()) {
                return res.status(429).json({ error: "Too many requests" });
            }
            if (decision.reason.isBot()) {
                return res.status(403).json({ error: "Bot detected" });
            }
            return res.status(403).json({ error: "Access denied" });
        }
        next();
    } catch (error) {
        console.error("Arcjet middleware error", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default arcjetMiddleware;