// Models import
import * as seatModel from '../models/seats';

/* Compare user email with license key domain */
export const isUserDomainWrong = (user_email: string, domain_name: string): boolean => {
  const user_email_domain = '@'.concat(user_email.split('@')[1]);
  return user_email_domain !== domain_name ? true : false;
};

/* Check if a license is currently fully reserved */
export const isLicenseFullyReserved = async (license_id: number, user_count: number): Promise<boolean> => {
  const result = await seatModel.countCurrentLicenseSeat(license_id);
  return Number(result) >= user_count ? true : false;
};

/* Check if user has ongoing reservation for the same license key 
  If yes then extend current reservation time by top-up, then return true
  If no then return false */
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

/* Return a payload object for a seat to be inserted into DB */
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
