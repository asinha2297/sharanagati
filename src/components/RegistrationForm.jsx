import React, { useState, useEffect } from "react";
import img from "../assets/Image.jpg";

export default function RegistrationForm() {
  const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
  const apiUrl = (path) => `${API_URL}${path}`;

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    attendingClasses: "",
    mobile: "",
    email: "",
    category: "",
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

  // Category A rooms available = 22
  const MAX_CATEGORY_A_REGISTRATIONS = 35;
  const isCategoryADisabled = savedRegistrations.length >= MAX_CATEGORY_A_REGISTRATIONS;

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

  const getBaseAmountForCategory = (category) => {
    if (category === "A") return 4000;
    if (category === "B") return 3800;
    return 0;
  };

  const getAmountsForGroup = (ages, category) => {
    const baseAmount = getBaseAmountForCategory(category);
    let discountedChildUsed = false;

    return ages.map((age) => {
      const numericAge = parseInt(age, 10);

      if (Number.isNaN(numericAge)) return 0;
      if (numericAge < 3) return 0;

      if (numericAge >= 3 && numericAge <= 17) {
        if (!discountedChildUsed) {
          discountedChildUsed = true;
          return 2500;
        }

        return baseAmount;
      }

      return baseAmount;
    });
  };

  const calculateTotalAmount = () => {
    const groupAges = [formData.age, ...additionalPersons.map((person) => person.age)];
    const perPersonAmounts = getAmountsForGroup(groupAges, formData.category);
    return perPersonAmounts.reduce((total, amount) => total + amount, 0);
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

    const groupAges = [formData.age, ...additionalPersons.map((person) => person.age)];
    const perPersonAmounts = getAmountsForGroup(groupAges, formData.category);

    const completeDataBase = {
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      attendingClasses: formData.attendingClasses,
      category: formData.category,
      mobile: formData.mobile,
      email: formData.email,
      transactionId: formData.transactionId,
      // paymentScreenshot will be ensured below
      persons: parseInt(formData.persons),
      amountPerPerson: perPersonAmounts[0] || 0,
      totalAmount: calculateTotalAmount(),
      additionalPerson: additionalPersons.map((person, index) => ({
        id: index + 1,
        name: person.name,
        age: parseInt(person.age),
        gender: person.gender,
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
        payload.append("category", submissionData.category);
        payload.append("mobile", submissionData.mobile);
        payload.append("email", submissionData.email);
        payload.append("transactionId", submissionData.transactionId);
        payload.append("persons", submissionData.persons);
        payload.append("amountPerPerson", submissionData.amountPerPerson);
        payload.append("totalAmount", submissionData.totalAmount);
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
          attendingClasses: "",
          mobile: "",
          email: "",
          category: "",
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

      const totalAmount = calculateTotalAmount();
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
          amount: Math.round(totalAmount * 100),
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
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

      await submitToServer(completeDataBase, paymentData);
    } catch (err) {
      console.error("Payment flow failed:", err);
      setErrorMessage(`Payment failed. ${err.message}`);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-[#FFF7E0]"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full bg-[#1E3A8A] px-4 py-2 text-sm font-semibold text-white shadow-lg">
        Registrations: {savedRegistrations.length}
      </div>
      {showConfirmation ? (
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
      ) : errorMessage ? (
        <div className="bg-red-100 rounded-2xl p-10 shadow-2xl max-w-md w-full text-center space-y-6">
          <h1 className="text-3xl font-semibold text-red-600">
            ⚠️ Submission Failed
          </h1>
          <p className="text-base text-gray-700">{errorMessage}</p>
          <button
            onClick={() => setErrorMessage("")}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-2xl border border-[#D4AF37]/20 shadow-[0_8px_32px_0_rgba(30,58,138,0.12)]">
          <div className="p-3 text-center border-b-2 border-[#D4AF37]/30">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E3A8A] tracking-wide">
              Ahobilam - Vijayawada Dham Yatra 2026
            </h2>
          </div>

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
                    Category A is currently unavailable because 10 registrations have already been recorded.
                  </p>
                )}
              </div>
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
                value={formatCurrency(calculateTotalAmount())}
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
                <p>Category A Amount: ₹4000</p>
                <p>Category B Amount: ₹3800</p>
                <p>Child Amount (age 3-17): ₹2500 (only one child)</p>
                <p>Additional child (age 3-17): Category fare applies</p>
                <p>Child below 3 years: ₹0</p>
                <p className="font-semibold text-[#1E3A8A]">
                  Total Payable: {formatCurrency(calculateTotalAmount())}
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
          </form>

          {/* <div className={activeTab === "export" ? "p-5 space-y-4" : "hidden"}>
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4 shadow-sm">
              <h3 className="text-xl font-semibold text-[#1E3A8A]">
                Shri Ahobilam-Vijayawada Dhaam Yatra
              </h3>
              <p className="text-sm text-[#475569] mt-1">Placeholder</p>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FFF7E0] p-4 shadow-sm">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-semibold text-[#1E3A8A]">Registered Entries</h3>
                <button
                  type="button"
                  onClick={exportToCsv}
                  className="rounded-lg bg-[#1E3A8A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#142a63]"
                >
                  Export CSV
                </button>
              </div>
              {savedRegistrations.length === 0 ? (
                <p className="text-sm text-[#475569]">No registrations yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#D4AF37]/20 text-[#1E3A8A]">
                        <th className="px-2 py-2">Name</th>
                        <th className="px-2 py-2">Mobile</th>
                        <th className="px-2 py-2">Category</th>
                        <th className="px-2 py-2">Persons</th>
                        <th className="px-2 py-2">Amount</th>
                        <th className="px-2 py-2">Transaction ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedRegistrations.map((entry, index) => (
                        <tr key={`${entry.mobile || index}-${index}`} className="border-b border-[#D4AF37]/10">
                          <td className="px-2 py-2">{entry.name}</td>
                          <td className="px-2 py-2">{entry.mobile}</td>
                          <td className="px-2 py-2">{entry.category}</td>
                          <td className="px-2 py-2">{entry.persons}</td>
                          <td className="px-2 py-2">{formatCurrency(entry.totalAmount)}</td>
                          <td className="px-2 py-2">{entry.transactionId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}
