const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    if (!numWeeks ||!weeklyRevenue) return res.status(400).send( { message: 'Please enter a number of weeks and a weekly revenue'});
    if (isNaN(numWeeks) || isNaN(weeklyRevenue)) return res.status(400).send( { message: 'Please enter a number of weeks and weekly revenue' });
    if (numWeeks * weeklyRevenue < 1000000) return res.status(400).send( { message: 'Idea not profitable'});
    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
