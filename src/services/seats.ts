// Models import
import * as seatModel from '../models/seats';
import * as licenseModel from '../models/licenses';

// Helpers import
import * as seatHelper from '../helpers/seats';

export const handleSeatReservation = async (user_payload: { license_key: string; user_email: string }) => {
  const { license_key, user_email } = user_payload;
  try {
    const license_data = await licenseModel.getOneByKeyName(license_key);
    if (license_data.length === 0) {
      throw { message: 'Non-existing license', status: 400 };
    }

    const { id, email_domain, user_count, lease_time } = license_data[0];

    if (seatHelper.isUserDomainWrong(user_email, email_domain)) {
      throw { message: 'Your domain is not entitled to any license key', status: 400 };
    }

    if (await seatHelper.isReservationOngoing(id, user_email, lease_time)) {
      return {
        message: 'Seat for license renewed successfully',
        status: 200,
      };
    }

    if (await seatHelper.isLicenseFullyReserved(id, user_count)) {
      throw { message: 'No more free slots now', status: 400 };
    }

    const seat_info = seatHelper.prepareSeatReservationInfo(id, user_email, lease_time);
    const add_seat_result = await seatModel.addOne(seat_info);

    return {
      message: 'Seat for license reserved',
      status: 201,
      id: add_seat_result,
    };
  } catch (err) {
    if (err.status) {
      throw { message: err.message, status: err.status };
    }
    throw { message: 'Something went wrong', status: 500 };
  }
};

export const handleSeatRelease = async (user_email: string) => {
  try {
    await seatModel.releaseOne(user_email);
    return {
      message: 'Seat released successfully',
      status: 200,
    };
  } catch (err) {
    throw { message: 'Something went wrong', status: 500 };
  }
};
