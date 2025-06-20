import React, { useState, useEffect } from "react";
import img from "../assets/Image.jpg";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    persons: "1",
  });

  const [additionalPersons, setAdditionalPersons] = useState([]);

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

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;

    if (name === "persons") {
      const count = parseInt(value) - 1;
      const newPersons = Array(count)
        .fill(0)
        .map(
          (_, idx) =>
            additionalPersons[idx] || { name: "", age: "", gender: "" }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const completeData = {
      primary: formData,
      others: additionalPersons,
    };

    const res = await fetch("http://localhost:8080/api/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(completeData),
    });

    if (res.ok) {
      alert(
        "Thanks for the registration. Your application is pending for approval."
      );
      setFormData({
        name: "",
        age: "",
        gender: "",
        mobile: "",
        email: "",
        persons: "1",
      });
      setAdditionalPersons([]);
    } else {
      alert("Submission failed. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
      style={{
        backgroundImage: `url(${img})`,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="w-full max-w-xl bg-white/40 backdrop-blur-md rounded-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        <div className="p-3 text-center border-b-2 border-white/60">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-wide">
            Ayodhya & Chitrakut Dham Yatra 2025
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center ">
            Registration Form
          </h2>

          <div className="flex items-center space-x-4">
            <label htmlFor="persons" className="w-40 text-white  font-semibold">
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
            <option>Other</option>
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
              className="p-4 mt-4 border border-white/30 bg-white/30 rounded-lg space-y-3"
            >
              <h3 className="text-lg font-semibold text-white text-center">
                Add Details {index + 2} Person
              </h3>
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
                <option>Other</option>
              </select>
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-semibold tracking-wide shadow-lg cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
