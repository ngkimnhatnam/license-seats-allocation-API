// Models import
import * as seatModel from '../models/seats';

export const isUserDomainWrong = (user_email: string, domain_name: string): boolean => {
  const user_email_domain = '@'.concat(user_email.split('@')[1]);
  return user_email_domain !== domain_name ? true : false;
};

export const isLicenseFullyReserved = async (license_id: number, user_count: number): Promise<boolean> => {
  const result = await seatModel.countCurrentLicenseSeat(license_id);
  return Number(result) >= user_count ? true : false;
};

export const isReservationOngoing = async (
  license_id: number,
  user_email: string,
  lease_time: number,
): Promise<boolean> => {
  const seatInfo = await seatModel.findOneByLicenseIdAndEmail(license_id, user_email);
  if (seatInfo.length > 0) {
    const { id, lease_end } = seatInfo[0];
    const new_lease_end = Number(lease_end) + 3600 * lease_time;
    await seatModel.extendOne(new_lease_end, id);
    return true;
  }
  return false;
};

export const prepareSeatReservationInfo = (license_id: number, user_email: string, lease_time: number) => {
  const lease_start = Math.round(Date.now() / 1000);
  const lease_end = lease_start + 3600 * lease_time;
  return {
    license_id,
    user_email,
    lease_start,
    lease_end,
  };
};
