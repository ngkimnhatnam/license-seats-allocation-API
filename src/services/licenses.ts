// Models import
import * as licenseModel from '../models/licenses';

export const handleLicenseAddition = async (payload: licenseModel.LicenseCreationInput) => {
  try {
    const result = await licenseModel.insertOne(payload);
    return {
      message: 'License inserted successfully',
      status: 201,
      id: result,
    };
  } catch (error) {
    if (error.code === '23505') {
      throw { message: 'This license key already exists', status: 400 };
    }
    throw { message: 'Something went wrong', status: 500 };
  }
};
