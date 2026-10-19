import { sql } from "../config/db.js";

export const createNotification = async (message, productId = null) => {
    await sql`
        INSERT INTO notifications (message, product_id)
        VALUES (${message}, ${productId})
    `;
};

export const getNotifications = async (req, res) => {
    try {
        await sql`
            DELETE FROM notifications
            WHERE created_at < NOW() - INTERVAL '24 hours'
        `;

        const notifications = await sql`
            SELECT id, message, product_id, created_at
            FROM notifications
            WHERE created_at >= NOW() - INTERVAL '24 hours'
            ORDER BY created_at DESC
        `;

        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
