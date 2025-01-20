export const formatCurrentDate = (): string => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const monthStr = getMonthWithDeclension(month);
  const year = date.getFullYear();
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} ${monthStr} ${year} ${time}`;
};

export const getMonthWithDeclension = (month: number): string => {
  const months = [
    { name: "січень", declension: "січня" },
    { name: "лютий", declension: "лютого" },
    { name: "березень", declension: "березня" },
    { name: "квітень", declension: "квітня" },
    { name: "травень", declension: "травня" },
    { name: "червень", declension: "червня" },
    { name: "липень", declension: "липня" },
    { name: "серпень", declension: "серпня" },
    { name: "вересень", declension: "вересня" },
    { name: "жовтень", declension: "жовтня" },
    { name: "листопад", declension: "листопада" },
    { name: "грудень", declension: "грудня" },
  ];

  return months[month]?.declension || "";
};
