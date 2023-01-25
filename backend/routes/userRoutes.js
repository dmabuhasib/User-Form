import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const userRouter = express.Router();
userRouter.post(
    '/usersectordata',
    expressAsyncHandler(async (req, res) => {
      const newUser = new User({
        name: req.body.name,
        sectors: req.body.sectors,
        agreeToTerms: req.body.agreeToTerms,
      });
      const user = await newUser.save();
      res.send({
        _id: user._id,
        name: user.name,
        sectors: user.sectors,
        agreeToTerms: user.agreeToTerms,
      });
    })
  );
  userRouter.put(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        user.name = req.body.name || user.name;
        user.sectors = req.body.sectors || user.sectors;
        user.agreeToTerms = Boolean(req.body.agreeToTerms);
        const updatedUser = await user.save();
        res.send({ message: 'User Updated', user: updatedUser });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    }) 
  );
  export default userRouter;