import { Request, Response } from 'express'
import { UserProfileFacade } from '../facades/UserProfileFacade'
import { catchAsync } from '../utils/catchAsync'

export class UserProfileController {
  constructor(private userProfileFacade: UserProfileFacade) {}

  createUserProfile = catchAsync(async (req: Request, res: Response) => {
    const { userData, religionData, petData } = req.body
    const profile = await this.userProfileFacade.createUserProfile(
      userData,
      religionData,
      petData,
    )
    res.status(201).json({ status: 'success', data: profile })
  })
}
