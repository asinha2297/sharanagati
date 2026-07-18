import React, { useState, useEffect } from "react";
import img from "../assets/Image.jpg";

const LATE_FEE_CUTOFF = new Date("2026-07-31T23:59:59+05:30");
const LATE_FEE_AMOUNT = 500;

export default function RegistrationForm() {
  const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
  const apiUrl = (path) => `${API_URL}${path}`;

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    medicalStudent: "No",
    attendingClasses: "",
    mobile: "",
    email: "",
    category: "",
    paymentType: "advance",
    transactionId: "",
    paymentScreenshot: "",
    persons: "1",
  });

  const [additionalPersons, setAdditionalPersons] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedRegistrations, setSavedRegistrations] = useState(() => {
    const stored = localStorage.getItem("registrations");
    return stored ? JSON.parse(stored) : [];
  });
  const [authMobile, setAuthMobile] = useState("");
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [isPayingRemaining, setIsPayingRemaining] = useState(false);
  const [viewMode, setViewMode] = useState("login");
  const [existingRegistration, setExistingRegistration] = useState(null);

  // Disable Category A once total registered person names reach the cap.
  const MAX_CATEGORY_A_REGISTRATIONS = 42;
  const totalRegisteredPersons = savedRegistrations.reduce((total, entry) => {
    let personsCount = 0;

    if (typeof entry?.name === "string" && entry.name.trim()) {
      personsCount += 1;
    }

    if (Array.isArray(entry?.additionalPerson)) {
      personsCount += entry.additionalPerson.reduce((count, person) => {
        if (typeof person?.name === "string" && person.name.trim()) {
          return count + 1;
        }
        return count;
      }, 0);
    }

    return total + personsCount;
  }, 0);
  const isCategoryADisabled = totalRegisteredPersons >= MAX_CATEGORY_A_REGISTRATIONS;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Lock body scroll when confirmation modal is shown
  useEffect(() => {
    if (showConfirmation) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [showConfirmation]);

  useEffect(() => {
    if (isCategoryADisabled && formData.category === "A") {
      setFormData((prev) => ({ ...prev, category: "" }));
    }
  }, [isCategoryADisabled, formData.category]);

  const getPricing = (paymentType) => {
    if (paymentType === "full") {
      return {
        categoryA: 8000,
        categoryB: 7500,
        childDiscount: 5000,
        medicalStudent: 6000,
      };
    }

    return {
      categoryA: 4000,
      categoryB: 3800,
      childDiscount: 2500,
      medicalStudent: 3000,
    };
  };

  const getBaseAmountForCategory = (category, paymentType) => {
    const pricing = getPricing(paymentType);
    if (category === "A") return pricing.categoryA;
    if (category === "B") return pricing.categoryB;
    return 0;
  };

  const getAmountsForGroup = (participants, category, paymentType) => {
    const pricing = getPricing(paymentType);
    const baseAmount = getBaseAmountForCategory(category, paymentType);
    let discountedChildUsed = false;

    return participants.map((person) => {
      const numericAge = parseInt(person.age, 10);
      const isMedicalStudent = person.medicalStudent === "Yes" || person.medicalStudent === true;

      if (Number.isNaN(numericAge)) return 0;
      if (numericAge < 3) return 0;

      if (isMedicalStudent) {
        return pricing.medicalStudent;
      }

      if (numericAge >= 3 && numericAge <= 17) {
        if (!discountedChildUsed) {
          discountedChildUsed = true;
          return pricing.childDiscount;
        }

        return baseAmount;
      }

      return baseAmount;
    });
  };

  const calculateTotalAmount = () => {
    const participants = [
      { age: formData.age, medicalStudent: formData.medicalStudent },
      ...additionalPersons.map((person) => ({
        age: person.age,
        medicalStudent: person.medicalStudent,
      })),
    ];
    const perPersonAmounts = getAmountsForGroup(
      participants,
      formData.category,
      formData.paymentType
    );
    return perPersonAmounts.reduce((total, amount) => total + amount, 0);
  };

  const isLateFeeApplicable = new Date() > LATE_FEE_CUTOFF;

  const calculatePaymentSummary = () => {
    const participants = [
      { age: formData.age, medicalStudent: formData.medicalStudent },
      ...additionalPersons.map((person) => ({
        age: person.age,
        medicalStudent: person.medicalStudent,
      })),
    ];

    const advancePerPerson = getAmountsForGroup(participants, formData.category, "advance");
    const fullPerPerson = getAmountsForGroup(participants, formData.category, "full");
    const selectedPerPerson =
      formData.paymentType === "full" ? fullPerPerson : advancePerPerson;

    const advanceTotal = advancePerPerson.reduce((total, amount) => total + amount, 0);
    const fullTotal = fullPerPerson.reduce((total, amount) => total + amount, 0);
    const lateFeeAmount = isLateFeeApplicable ? LATE_FEE_AMOUNT : 0;
    const payableNow =
      (formData.paymentType === "full" ? fullTotal : advanceTotal) + lateFeeAmount;
    const fullAmount = fullTotal + lateFeeAmount;
    const remainingAmount = Math.max(0, fullAmount - payableNow);

    return {
      selectedPerPerson,
      payableNow,
      fullAmount,
      remainingAmount,
      lateFeeApplied: isLateFeeApplicable,
      lateFeeAmount,
    };
  };

  const formatCurrency = (value) => {
    return value ? `₹${value.toLocaleString()}` : "-";
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const upiOnlyCheckoutConfig = {
    config: {
      display: {
        blocks: {
          upi: {
            name: "Pay via UPI",
            instruments: [{ method: "upi" }],
          },
        },
        sequence: ["block.upi"],
        preferences: {
          show_default_blocks: false,
        },
      },
    },
    method: {
      upi: true,
      card: false,
      netbanking: false,
      wallet: false,
      emi: false,
      paylater: false,
    },
  };

  /*
  const exportToCsv = () => {
    if (!savedRegistrations.length) return;

    const headers = [
      "Name",
      "Mobile",
      "Email",
      "Category",
      "Age",
      "Gender",
      "Persons",
      "Total Amount",
      "Transaction ID",
      "Payment Screenshot",
      "Additional Persons",
    ];

    const rows = savedRegistrations.map((entry) => {
      const additionalPeople = Array.isArray(entry.additionalPerson)
        ? entry.additionalPerson
            .map((person) => `${person.name} (${person.age}, ${person.gender})`)
            .join(" | ")
        : "";

      return [
        entry.name || "",
        entry.mobile || "",
        entry.email || "",
        entry.category || "",
        entry.age || "",
        entry.gender || "",
        entry.persons || "",
        entry.totalAmount || "",
        entry.transactionId || "",
        entry.paymentScreenshot || "",
        additionalPeople,
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "registrations.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  */

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;

    if (name === "persons") {
      const count = parseInt(value) - 1;
      const newPersons = Array(count)
        .fill(0)
        .map(
          (_, idx) =>
            additionalPersons[idx] || {
              attendingClasses: "",
              name: "",
              age: "",
              gender: "",
              medicalStudent: "No",
            }
        );
      setAdditionalPersons(newPersons);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleAdditionalChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...additionalPersons];
    updated[index][name] = value;
    setAdditionalPersons(updated);
  };

  const handlePaymentScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, paymentScreenshot: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const participants = [
      { age: formData.age, medicalStudent: formData.medicalStudent },
      ...additionalPersons.map((person) => ({
        age: person.age,
        medicalStudent: person.medicalStudent,
      })),
    ];
    const paymentSummary = calculatePaymentSummary();
    const perPersonAmounts = paymentSummary.selectedPerPerson;

    const completeDataBase = {
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      medicalStudent: formData.medicalStudent === "Yes",
      attendingClasses: formData.attendingClasses,
      category: formData.category,
      paymentType: formData.paymentType,
      mobile: formData.mobile,
      email: formData.email,
      transactionId: formData.transactionId,
      // paymentScreenshot will be ensured below
      persons: parseInt(formData.persons),
      amountPerPerson: perPersonAmounts[0] || 0,
      totalAmount: paymentSummary.payableNow,
      paidAmount: paymentSummary.payableNow,
      fullAmount: paymentSummary.fullAmount,
      remainingAmount: paymentSummary.remainingAmount,
      paymentStatus: paymentSummary.remainingAmount > 0 ? "pending" : "completed",
      lateFeeApplied: paymentSummary.lateFeeApplied,
      lateFeeAmount: paymentSummary.lateFeeAmount,
      additionalPerson: additionalPersons.map((person, index) => ({
        id: index + 1,
        name: person.name,
        age: parseInt(person.age),
        gender: person.gender,
        medicalStudent: person.medicalStudent === "Yes",
        attendingClasses: person.attendingClasses,
        amount: perPersonAmounts[index + 1] || 0,
      })),
    };

    const submitToServer = async (completeData, paymentData) => {
      try {
        const payload = new FormData();
        const fileInput = document.getElementById("paymentScreenshot");
        const file = fileInput && fileInput.files && fileInput.files[0];
        const submissionData = {
          ...completeData,
          paymentScreenshot: file ? file.name : "",
          razorpayPaymentId: paymentData?.razorpay_payment_id || "",
          razorpayOrderId: paymentData?.razorpay_order_id || "",
          razorpaySignature: paymentData?.razorpay_signature || "",
        };

        payload.append("name", submissionData.name);
        payload.append("age", submissionData.age);
        payload.append("gender", submissionData.gender);
        payload.append("medicalStudent", String(submissionData.medicalStudent));
        payload.append("category", submissionData.category);
        payload.append("paymentType", submissionData.paymentType);
        payload.append("mobile", submissionData.mobile);
        payload.append("email", submissionData.email);
        payload.append("transactionId", submissionData.transactionId);
        payload.append("persons", submissionData.persons);
        payload.append("amountPerPerson", submissionData.amountPerPerson);
        payload.append("totalAmount", submissionData.totalAmount);
        payload.append("paidAmount", submissionData.paidAmount);
        payload.append("fullAmount", submissionData.fullAmount);
        payload.append("remainingAmount", submissionData.remainingAmount);
        payload.append("paymentStatus", submissionData.paymentStatus);
        payload.append("lateFeeApplied", String(submissionData.lateFeeApplied));
        payload.append("lateFeeAmount", submissionData.lateFeeAmount);
        payload.append("razorpayPaymentId", submissionData.razorpayPaymentId);
        payload.append("razorpayOrderId", submissionData.razorpayOrderId);
        payload.append("razorpaySignature", submissionData.razorpaySignature);
        payload.append(
          "additionalPerson",
          JSON.stringify(submissionData.additionalPerson)
        );

        if (file) {
          payload.append("paymentScreenshot", file);
        }

        const saveResponse = await fetch(apiUrl("/api/registration/save-to-json"), {
          method: "POST",
          body: payload,
        });

        if (!saveResponse.ok) {
          const text = await saveResponse.text();
          throw new Error(`Server responded with ${saveResponse.status}: ${text}`);
        }

        await saveResponse.json();

        setSavedRegistrations((prev) => {
          const updated = [...prev, submissionData];
          localStorage.setItem("registrations", JSON.stringify(updated));
          return updated;
        });

        setShowConfirmation(true);
        setErrorMessage("");
        setFormData({
          name: "",
          age: "",
          gender: "",
          medicalStudent: "No",
          attendingClasses: "",
          mobile: "",
          email: "",
          category: "",
          paymentType: "advance",
          transactionId: "",
          paymentScreenshot: "",
          persons: "1",
        });
        setAdditionalPersons([]);
      } catch (err) {
        console.error("Registration save failed:", err);
        setErrorMessage("Failed to save registration. Please try again.");
      }
    };

    try {
      const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKeyId) {
        setErrorMessage("Payment is not configured. Please contact support.");
        return;
      }

      const totalAmount = paymentSummary.payableNow;
      if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
        setErrorMessage("Invalid payment amount.");
        return;
      }

      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) {
        setErrorMessage("Unable to load Razorpay Checkout. Please try again.");
        return;
      }

      const createOrderResponse = await fetch(apiUrl("/api/create-order"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "registration",
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
          registration: {
            category: formData.category,
            paymentType: formData.paymentType,
            participants,
          },
        }),
      });

      const orderData = await createOrderResponse.json();
      if (!createOrderResponse.ok || !orderData?.order_id) {
        throw new Error(orderData?.message || "Unable to create payment order");
      }

      const calculated = orderData?.calculated || {};
      const payableNow = Number(calculated.payableNow ?? completeDataBase.totalAmount);
      const fullAmount = Number(calculated.fullAmount ?? completeDataBase.fullAmount);
      const remainingAmount = Number(
        calculated.remainingAmount ?? Math.max(0, fullAmount - payableNow)
      );
      const finalizedData = {
        ...completeDataBase,
        totalAmount: payableNow,
        paidAmount: payableNow,
        fullAmount,
        remainingAmount,
        paymentStatus: remainingAmount > 0 ? "pending" : "completed",
        lateFeeApplied:
          calculated.lateFeeApplied === undefined
            ? completeDataBase.lateFeeApplied
            : Boolean(calculated.lateFeeApplied),
        lateFeeAmount: Number(calculated.lateFeeAmount ?? completeDataBase.lateFeeAmount),
      };

      const paymentData = await new Promise((resolve, reject) => {
        const razorpay = new window.Razorpay({
          key: razorpayKeyId,
          amount: orderData.amount,
          currency: orderData.currency,
          order_id: orderData.order_id,
          name: "Sharanagati",
          description: "Yatra Registration Payment",
          handler: (response) => resolve(response),
          modal: {
            ondismiss: () => reject(new Error("Payment cancelled by user")),
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.mobile,
          },
          theme: {
            color: "#1E3A8A",
          },
          ...upiOnlyCheckoutConfig,
        });

        razorpay.on("payment.failed", (response) => {
          const reason = response?.error?.description || "Payment failed";
          reject(new Error(reason));
        });

        razorpay.open();
      });

      const verifyResponse = await fetch(apiUrl("/api/verify-payment"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });
      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok || !verifyData?.success) {
        throw new Error(verifyData?.message || "Payment verification failed");
      }

      await submitToServer(finalizedData, paymentData);
      setExistingRegistration({
        name: finalizedData.name,
        mobile: finalizedData.mobile,
        category: finalizedData.category,
        persons: finalizedData.persons,
        paidAmount: finalizedData.paidAmount,
        fullAmount: finalizedData.fullAmount,
        remainingAmount: finalizedData.remainingAmount,
        paymentStatus: finalizedData.paymentStatus,
        paymentType: finalizedData.paymentType,
      });
      if (finalizedData.remainingAmount > 0) {
        setViewMode("remaining");
      } else {
        setViewMode("completed");
      }
    } catch (err) {
      console.error("Payment flow failed:", err);
      setErrorMessage(`Payment failed. ${err.message}`);
    }
  };

  const handleMobileLogin = async (e) => {
    e.preventDefault();
    const mobile = authMobile.trim();

    if (!mobile) {
      setErrorMessage("Please enter mobile number.");
      return;
    }

    try {
      setIsCheckingStatus(true);
      setErrorMessage("");

      const response = await fetch(
        apiUrl(`/api/registration/status?mobile=${encodeURIComponent(mobile)}`)
      );
      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to check registration status");
      }

      if (data.requiresRegistration) {
        setFormData((prev) => ({ ...prev, mobile }));
        setViewMode("form");
        return;
      }

      const registration = data.registration || null;
      setExistingRegistration(registration);
      if (registration?.remainingAmount > 0) {
        setViewMode("remaining");
      } else {
        setViewMode("completed");
      }
    } catch (err) {
      setErrorMessage(err.message || "Unable to login");
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleRemainingPayment = async () => {
    try {
      if (!existingRegistration?.remainingAmount || existingRegistration.remainingAmount <= 0) {
        setViewMode("completed");
        return;
      }

      const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKeyId) {
        setErrorMessage("Payment is not configured. Please contact support.");
        return;
      }

      setIsPayingRemaining(true);
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) {
        throw new Error("Unable to load Razorpay Checkout. Please try again.");
      }

      const createOrderResponse = await fetch(apiUrl("/api/create-order"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "remaining",
          mobile: existingRegistration?.mobile,
          currency: "INR",
          receipt: `remaining_${Date.now()}`,
        }),
      });

      const orderData = await createOrderResponse.json();
      if (!createOrderResponse.ok || !orderData?.order_id) {
        throw new Error(orderData?.message || "Unable to create payment order");
      }

      const paymentData = await new Promise((resolve, reject) => {
        const razorpay = new window.Razorpay({
          key: razorpayKeyId,
          amount: orderData.amount,
          currency: orderData.currency,
          order_id: orderData.order_id,
          name: "Sharanagati",
          description: "Remaining Yatra Payment",
          handler: (response) => resolve(response),
          modal: {
            ondismiss: () => reject(new Error("Payment cancelled by user")),
          },
          prefill: {
            name: existingRegistration?.name || "",
            contact: existingRegistration?.mobile || "",
          },
          theme: {
            color: "#1E3A8A",
          },
          ...upiOnlyCheckoutConfig,
        });

        razorpay.on("payment.failed", (response) => {
          const reason = response?.error?.description || "Payment failed";
          reject(new Error(reason));
        });

        razorpay.open();
      });

      const verifyResponse = await fetch(apiUrl("/api/verify-payment"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });
      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok || !verifyData?.success) {
        throw new Error(verifyData?.message || "Payment verification failed");
      }

      const updateResponse = await fetch(apiUrl("/api/registration/complete-payment"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: existingRegistration.mobile,
          amountPaid: existingRegistration.remainingAmount,
          razorpayPaymentId: paymentData?.razorpay_payment_id || "",
          razorpayOrderId: paymentData?.razorpay_order_id || "",
          razorpaySignature: paymentData?.razorpay_signature || "",
        }),
      });
      const updateData = await updateResponse.json();

      if (!updateResponse.ok || !updateData?.success) {
        throw new Error(updateData?.message || "Unable to update remaining payment");
      }

      setExistingRegistration((prev) => ({
        ...(prev || {}),
        paidAmount: updateData.paidAmount,
        remainingAmount: updateData.remainingAmount,
        paymentStatus: updateData.paymentStatus,
      }));
      setViewMode(updateData.remainingAmount > 0 ? "remaining" : "completed");
    } catch (err) {
      setErrorMessage(`Payment failed. ${err.message}`);
    } finally {
      setIsPayingRemaining(false);
    }
  };

  const paymentSummary = calculatePaymentSummary();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-[#FFF7E0]"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full bg-[#1E3A8A] px-4 py-2 text-sm font-semibold text-white shadow-lg">
        Registrations: {totalRegisteredPersons}
      </div>
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-2xl border border-[#D4AF37]/20 shadow-[0_8px_32px_0_rgba(30,58,138,0.12)]">
        <div className="p-3 text-center border-b-2 border-[#D4AF37]/30">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E3A8A] tracking-wide">
            Ahobilam - Vijayawada Dham Yatra 2026
          </h2>
        </div>

        {showConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative bg-[#FFF7E0] rounded-2xl p-10 shadow-2xl max-w-lg w-full text-center space-y-6 border border-[#D4AF37]/20">
              <h1 className="text-4xl font-semibold text-[#1E3A8A]">|| Hare Krishna ||</h1>
              <p className="text-2xl font-medium text-[#475569]">Thanks for the Registration</p>
              <button
                onClick={() => setShowConfirmation(false)}
                className="mt-6 px-8 py-3 bg-[#F59E0B] text-white rounded-lg hover:bg-[#d97706] text-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mx-5 mt-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 text-sm">
            {errorMessage}
          </div>
        )}

        {viewMode === "login" && (
          <form onSubmit={handleMobileLogin} className="p-5 space-y-6">
            <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-4 text-center">
              Login with Mobile
            </h2>
            <input
              type="tel"
              name="authMobile"
              placeholder="Enter Mobile Number"
              required
              value={authMobile}
              onChange={(e) => setAuthMobile(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg bg-white/80"
            />
            <p className="text-sm text-[#475569]">
              Kindly use only this number for future login purposes.
            </p>
            <button
              type="submit"
              disabled={isCheckingStatus}
              className="w-full px-8 py-3 bg-[#1E3A8A] hover:bg-[#142a63] disabled:bg-slate-400 text-white rounded-lg font-semibold tracking-wide shadow-lg"
            >
              {isCheckingStatus ? "Checking..." : "Continue"}
            </button>
          </form>
        )}

        {viewMode === "remaining" && (
          <div className="p-5 space-y-5">
            <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center">Remaining Payment</h2>
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4 space-y-2 text-[#475569]">
              <p>
                Devotee: <span className="font-semibold text-[#1E3A8A]">{existingRegistration?.name}</span>
              </p>
              <p>
                Mobile: <span className="font-semibold text-[#1E3A8A]">{existingRegistration?.mobile}</span>
              </p>
              <p>
                Paid: <span className="font-semibold text-[#1E3A8A]">{formatCurrency(Number(existingRegistration?.paidAmount || 0))}</span>
              </p>
              <p>
                Remaining: <span className="font-semibold text-[#1E3A8A]">{formatCurrency(Number(existingRegistration?.remainingAmount || 0))}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemainingPayment}
              disabled={isPayingRemaining}
              className="w-full px-8 py-3 bg-[#F59E0B] hover:bg-[#d97706] disabled:bg-slate-400 text-white rounded-lg font-semibold tracking-wide shadow-lg"
            >
              {isPayingRemaining ? "Processing..." : "Pay Remaining Amount"}
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode("login");
                setExistingRegistration(null);
                setErrorMessage("");
              }}
              className="w-full px-8 py-3 border border-[#1E3A8A] text-[#1E3A8A] rounded-lg font-semibold"
            >
              Back to Login
            </button>
          </div>
        )}

        {viewMode === "completed" && (
          <div className="p-8 text-center space-y-4">
            <h2 className="text-3xl font-semibold text-[#1E3A8A]">Payment Completed</h2>
            <p className="text-[#475569]">No remaining amount is pending for this mobile number.</p>
            <button
              type="button"
              onClick={() => {
                setViewMode("login");
                setExistingRegistration(null);
                setErrorMessage("");
                setAuthMobile("");
              }}
              className="mt-2 px-8 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#142a63]"
            >
              Check Another Mobile
            </button>
          </div>
        )}

        {viewMode === "form" && (
          <form onSubmit={handleSubmit} className="p-5 space-y-6">
            <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-4 text-center">
              Registration Form
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
              <label
                htmlFor="attendingClasses"
                className="w-full sm:w-40 text-[#1E3A8A] font-semibold"
              >
                Do you attend classes regularly?
              </label>
              <select
                name="attendingClasses"
                id="attendingClasses"
                required
                value={formData.attendingClasses}
                onChange={handleFormDataChange}
                className="flex-1 px-4 py-3 border rounded-lg bg-white/80"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
              <label
                htmlFor="persons"
                className="w-full sm:w-40 text-[#1E3A8A] font-semibold"
              >
                No. of Persons
              </label>
              <select
                name="persons"
                id="persons"
                required
                value={formData.persons}
                onChange={handleFormDataChange}
                className="flex-1 px-4 py-3 border rounded-lg bg-white/80"
              >
                <option value="">Select</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
              <label htmlFor="category" className="w-full sm:w-40 text-[#1E3A8A] font-semibold">
                Category
              </label>
              <div className="flex-1">
                <select
                  name="category"
                  id="category"
                  required
                  value={formData.category}
                  onChange={handleFormDataChange}
                  className="w-full px-4 py-3 border rounded-lg bg-white/80"
                >
                  <option value="">Select Category</option>
                  <option value="A" disabled={isCategoryADisabled}>
                    Category A
                  </option>
                  <option value="B">Category B</option>
                </select>
                {isCategoryADisabled && (
                  <p className="mt-2 text-sm text-amber-600">
                    Category A is temporarily unavailable because the quota limit has been reached.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
              <label htmlFor="paymentType" className="w-full sm:w-40 text-[#1E3A8A] font-semibold">
                Payment Type
              </label>
              <select
                name="paymentType"
                id="paymentType"
                required
                value={formData.paymentType}
                onChange={handleFormDataChange}
                className="flex-1 px-4 py-3 border rounded-lg bg-white/80"
              >
                <option value="advance">Advance Payment</option>
                <option value="full">Full Payment</option>
              </select>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleFormDataChange}
              className="w-full px-4 py-3 border rounded-lg bg-white/80"
            />

            <input
              type="number"
              name="age"
              min={1}
              max={100}
              placeholder="Age"
              required
              value={formData.age}
              onChange={handleFormDataChange}
              className="w-full px-4 py-3 border rounded-lg bg-white/80"
            />

            <select
              name="gender"
              required
              value={formData.gender}
              onChange={handleFormDataChange}
              className="w-full px-4 py-3 border rounded-lg bg-white/80"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              {/* <option>Other</option> */}
            </select>

            <select
              name="medicalStudent"
              required
              value={formData.medicalStudent}
              onChange={handleFormDataChange}
              className="w-full px-4 py-3 border rounded-lg bg-white/80"
            >
              <option value="No">Not a Medical Student</option>
              <option value="Yes">Medical Student</option>
            </select>

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              required
              value={formData.mobile}
              onChange={handleFormDataChange}
              className="w-full px-4 py-3 border rounded-lg bg-white/80"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleFormDataChange}
              className="w-full px-4 py-3 border rounded-lg bg-white/80"
            />


            {additionalPersons.map((person, index) => (
              <div
                key={index}
                className="p-4 mt-4 border border-[#D4AF37]/20 bg-white/90 rounded-lg space-y-3"
              >
                <h3 className="text-lg font-semibold text-[#1E3A8A] text-center">
                  Add Details {index + 2} Devotee
                </h3>
                {/* <div>
                  <label className="block text-[#1E3A8A] font-semibold mb-2">
                    Are you attending classes on regualr basis?
                  </label>
                  <select
                    name="attendingClasses"
                    required
                    value={person.attendingClasses || ""}
                    onChange={(e) => handleAdditionalChange(index, e)}
                    className="w-full px-4 py-3 border rounded-lg bg-white/80"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div> */}
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={person.name}
                  onChange={(e) => handleAdditionalChange(index, e)}
                  className="w-full px-4 py-3 border rounded-lg bg-white/80"
                />
                <input
                  type="number"
                  name="age"
                  min={1}
                  placeholder="Age"
                  required
                  value={person.age}
                  onChange={(e) => handleAdditionalChange(index, e)}
                  className="w-full px-4 py-3 border rounded-lg bg-white/80"
                />
                <select
                  name="gender"
                  required
                  value={person.gender}
                  onChange={(e) => handleAdditionalChange(index, e)}
                  className="w-full px-4 py-3 border rounded-lg bg-white/80"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  {/* <option>Other</option> */}
                </select>

                <select
                  name="medicalStudent"
                  required
                  value={person.medicalStudent || "No"}
                  onChange={(e) => handleAdditionalChange(index, e)}
                  className="w-full px-4 py-3 border rounded-lg bg-white/80"
                >
                  <option value="No">Not a Medical Student</option>
                  <option value="Yes">Medical Student</option>
                </select>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
              <label htmlFor="amount" className="w-full sm:w-40 text-[#1E3A8A] font-semibold">
                Amount
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formatCurrency(paymentSummary.payableNow)}
                readOnly
                className="flex-1 px-4 py-3 border rounded-lg bg-gray-100 text-[#1E3A8A]"
              />
            </div>

            <div className="p-4 rounded-2xl border border-[#D4AF37]/20 bg-[#FFF7E0] shadow-sm space-y-4">
              <h3 className="text-xl font-semibold text-[#1E3A8A]">Payment Information</h3>
              <div className="text-sm text-[#475569] space-y-2">
                <p className="font-semibold text-[#1E3A8A]">Account Details</p>
                <p>Account Name: Rounak Ranjan Singh</p>
                <p>Account Number: 470410110004309</p>
                <p>IFSC: BKID0004704</p>
                <p>Bank: Bank of India</p>
                <p>UPI ID: rounakrock.singh07-2@okhdfcbank</p>
                {/* <p>UPI ID: <a href="upi://pay?pa=rounakrock.singh07-2@okhdfcbank&pn=Rounak%20Ranjan%20Singh&cu=INR" className="text-blue-600 underline">rounakrock.singh07-2@okhdfcbank</a></p> */}
                <p>
                  Category A Amount: {formData.paymentType === "full" ? "₹8000" : "₹4000"}
                </p>
                <p>
                  Category B Amount: {formData.paymentType === "full" ? "₹7500" : "₹3800"}
                </p>
                <p>
                  Child Amount (age 3-17): {formData.paymentType === "full" ? "₹5000" : "₹2500"} (only one child)
                </p>
                <p>
                  Medical Student Amount: {formData.paymentType === "full" ? "₹6000" : "₹3000"}
                </p>
                <p>Additional child (age 3-17): Category fare applies</p>
                <p>Child below 3 years: ₹0</p>
                <p>Late Fee Policy (after 31 Jul 2026): ₹500</p>
                <p>
                  Late Fee Applied Now: {paymentSummary.lateFeeApplied ? "₹500" : "₹0"}
                </p>
                <p className="font-semibold text-[#1E3A8A]">
                  Payable Now: {formatCurrency(paymentSummary.payableNow)}
                </p>
                <p className="font-semibold text-[#1E3A8A]">
                  Full Amount: {formatCurrency(paymentSummary.fullAmount)}
                </p>
                <p className="font-semibold text-[#1E3A8A]">
                  Remaining Amount: {formatCurrency(paymentSummary.remainingAmount)}
                </p>
              </div>
              {/* <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <label htmlFor="transactionId" className="block text-[#1E3A8A] font-semibold mb-2">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    id="transactionId"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleFormDataChange}
                    placeholder="Enter transaction ID"
                    className="w-full px-4 py-3 border rounded-lg bg-white/80"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="paymentScreenshot" className="block text-[#1E3A8A] font-semibold mb-2">
                    Upload Payment Screenshot
                  </label>
                  <input
                    type="file"
                    id="paymentScreenshot"
                    accept="image/*"
                    onChange={handlePaymentScreenshotChange}
                    className="w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-[#1E3A8A] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:cursor-pointer hover:file:bg-[#142a63]"
                  />
                  {formData.paymentScreenshot && (
                    <p className="mt-2 text-sm text-green-600">Screenshot ready to submit.</p>
                  )}
                </div>
              </div> */}
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-[#F59E0B] hover:bg-[#d97706] text-white rounded-lg font-semibold tracking-wide shadow-lg cursor-pointer"
              >
                Submit
              </button>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setViewMode("login");
                  setErrorMessage("");
                }}
                className="px-6 py-2 border border-[#1E3A8A] text-[#1E3A8A] rounded-lg"
              >
                Back to Login
              </button>
            </div>
          </form>

        )}
      </div>
    </div>
  );
}
