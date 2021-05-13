// Service import
import * as licenseService from '../services/licenses';

// Dependencies import
import { Request, Response } from 'express';

//@ts-ignore
export const addNewLicense = async (req: Request, res: Response) => {
  const payload = {
    license_key: req.body.license_key,
    email_domain: req.body.email_domain,
    user_count: Number(req.body.user_count),
    lease_time: Number(req.body.lease_time),
  };
  try {
    const result = await licenseService.handleLicenseAddition(payload);
    res.status(result.status).json({ ...result });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};
