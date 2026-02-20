
import dayjs from "dayjs";

export const isExpired = (slot, date) => {
  if (!date) return false;

  const now = dayjs();
  const slotTime = dayjs(date)
    .hour(slot.hour)
    .minute(slot.minute)
    .second(0);

  if (!dayjs(date).isSame(now, "day")) return false;
  return slotTime.isBefore(now);
};
