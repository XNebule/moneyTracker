const aS = require("../analytics/analytics.service")

exports.getCashflow = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const data = await aS.getCashflow(userId)

        res.json({
            success: true,
            data
        })

    } catch (err) {
        next(err)
    }
}

exports.getMonthlyExpenses = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const data = await aS.getMonthlyExpenses(userId)

        res.json({
            success: true,
            data
        })

    } catch (err) {
        next(err)
    }
}

exports.getCatBreakdown = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const data = await aS.getCatBreakdown(userId)

        res.json({
            success: true,
            data
        })

    } catch (err) {
        next(err)
    }
}