const calculateJaipurAmounts = (registration) => {
  const participants = Array.isArray(registration?.participants)
    ? registration.participants
    : [];
  const roomType = registration?.roomType;
  const paymentType = registration?.paymentType;

  if (
    !participants.length ||
    participants.length > 5 ||
    !["double", "triple"].includes(roomType) ||
    !["advance", "full"].includes(paymentType)
  ) {
    return null;
  }

  let totalDepositAmount = 0;
  let totalAmount = 0;
  const normalizedParticipants = [];

  for (const person of participants) {
    const age = Number(person?.age);
    const name = String(person?.name || "").trim();
    if (
      !name || !Number.isFinite(age) || age < 0 || age > 120 ||
      !["Male", "Female"].includes(person?.gender) ||
      !["Yes", "No"].includes(person?.attendingClasses)
    ) {
      return null;
    }

    const underFive = age < 5;
    const student = person.medicalStudent === "Medical Student" || (age >= 10 && age <= 17);
    const amount = underFive ? 0 : student ? 6800 : age < 10 ? 4700 : roomType === "double" ? 9500 : 8800;
    const depositAmount = underFive ? 0 : student || age < 10 ? 3800 : roomType === "double" ? 4800 : 4400;
    totalDepositAmount += depositAmount;
    totalAmount += amount;
    normalizedParticipants.push({
      name,
      age,
      gender: person.gender,
      medicalStudent: person.medicalStudent || "No",
      attendingClasses: person.attendingClasses,
      amount,
      depositAmount,
    });
  }

  const paidAmount = paymentType === "full" ? totalAmount : totalDepositAmount;
  return {
    roomType,
    paymentType,
    participants: normalizedParticipants,
    depositAmount: totalDepositAmount,
    paidAmount,
    totalAmount,
  };
};

module.exports = calculateJaipurAmounts;
