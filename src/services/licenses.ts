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

export const handleSeatReservation = async (user_payload: { license_key: string; user_email: string }) => {
  const { license_key, user_email } = user_payload;
  try {
    const result = await licenseModel.getOneByKeyName(license_key);
    if (result.length === 0) {
      throw { message: 'Non-existing license', status: 400 };
    }

    const { id, email_domain, user_count, lease_time } = result[0];

    if (isUserDomainWrong(user_email, email_domain)) {
      throw { message: 'Your domain is not entitled to any license key', status: 400 };
    }

    if (await isLicenseFullyReserved(id, user_count)) {
      throw { message: 'No more free slots now', status: 400 };
    }

    const lease_start = Math.round(Date.now() / 1000);
    const lease_end = lease_start + 3600 * lease_time;
    const pay = {
      license_id: id,
      user_email,
      lease_start,
      lease_end,
    };
    const res = await licenseModel.addSeat(pay);

    return {
      message: 'Seat for license reserved',
      status: 201,
      id: res,
    };
  } catch (err) {
    console.log(err);
    if (err.status) {
      throw { message: err.message, status: err.status };
    }
    throw { message: 'Something went wrong', status: 500 };
  }
};

const isUserDomainWrong = (user_email: string, domain_name: string): boolean => {
  const user_email_domain = '@'.concat(user_email.split('@')[1]);
  return user_email_domain !== domain_name ? true : false;
};

const isLicenseFullyReserved = async (license_id: number, user_count: number): Promise<boolean> => {
  try {
    const result = await licenseModel.countCurrentLicenseSeat(license_id);
    return Number(result) >= user_count ? true : false;
  } catch (error) {
    throw { message: 'Error', status: 400 };
  }
};
