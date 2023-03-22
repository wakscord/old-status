export const uptimeToString = (uptime: number) => {
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor(((uptime % 86400) % 3600) / 60);
  const seconds = Math.floor(((uptime % 86400) % 3600) % 60);

  let str = "";

  if (days > 0) str += `${days}일 `;
  if (hours > 0) str += `${hours}시간 `;

  str += `${minutes}분 `;
  str += `${seconds}초`;

  return str;
};
