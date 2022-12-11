import jwt from 'jsonwebtoken'

export const isAuth = async (req, res, next) => {
    const accessToken = req.headers('accessToken')

    if (!accessToken) return res.json({msg: 'You are not login!'})

    try {
        const validToken = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.user = validToken

        if (validToken) {
            next()
        }
    } catch(err) {
        res.json({error: err})
    }
}

export const signToken  = (user) => {
    return jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30d',
        }
      );
}