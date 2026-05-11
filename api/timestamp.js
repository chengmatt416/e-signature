module.exports = (req, res) => {
    const now = new Date();
    res.status(200).json({
        timestamp: now.getTime(),
        iso: now.toISOString()
    });
};
