import React, { useState } from "react";

const ProfilePage = () => {
  const [ownerPhoto, setOwnerPhoto] = useState(null);
  const [petPhoto, setPetPhoto] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    jobRole: "",
    company: "",
    degree: "",
    university: "",
    petName: "",
    petType: "",
    petBreed: "",
    petAge: "",
    idProof: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const filledFields =
    Object.values(formData).filter((val) => val !== "" && val !== null).length +
    (ownerPhoto ? 1 : 0) +
    (petPhoto ? 1 : 0);

  const totalFields = Object.keys(formData).length + 2;
  const progress = (filledFields / totalFields) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Pet Owner Profile
        </h2>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-1 text-sm">
            <span>Profile Completion</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* OWNER PHOTO */}
        <Section title="Owner Profile Photo">
          <UploadImage
            image={ownerPhoto}
            setImage={setOwnerPhoto}
            label="Upload Owner Photo"
          />
        </Section>

        {/* PERSONAL DETAILS */}
        <Section title="Personal Details">
          <Input label="Full Name" name="fullName" onChange={handleChange} />
          <Input label="Email" name="email" onChange={handleChange} />
          <Input label="Mobile Number" name="phone" onChange={handleChange} />
        </Section>

        {/* ADDRESS DETAILS */}
        <Section title="Address Details">
          <Input label="Street Address" name="street" onChange={handleChange} />
          <Input label="City" name="city" onChange={handleChange} />
          <Input label="State" name="state" onChange={handleChange} />
          <Input label="Country" name="country" onChange={handleChange} />
        </Section>

        {/* WORK DETAILS */}
        <Section title="Work Experience">
          <Input label="Job Role" name="jobRole" onChange={handleChange} />
          <Input label="Company Name" name="company" onChange={handleChange} />
        </Section>

        {/* EDUCATION DETAILS */}
        <Section title="Education">
          <Input label="Degree" name="degree" onChange={handleChange} />
          <Input label="University" name="university" onChange={handleChange} />
        </Section>

        {/* PET PROFILE */}
        <Section title="Pet Profile 🐶">
          <UploadImage
            image={petPhoto}
            setImage={setPetPhoto}
            label="Upload Pet Photo"
          />
          <Input label="Pet Name" name="petName" onChange={handleChange} />
          <Input label="Pet Type (Dog/Cat)" name="petType" onChange={handleChange} />
          <Input label="Breed" name="petBreed" onChange={handleChange} />
          <Input label="Pet Age" name="petAge" onChange={handleChange} />
        </Section>

        {/* ID PROOF */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-700">
            ID Proof Upload
          </h3>
          <input
            type="file"
            name="idProof"
            className="border p-3 w-full rounded-lg"
            onChange={handleChange}
          />
          {formData.idProof && (
            <p className="text-green-600 mt-2">
              Uploaded: {formData.idProof.name}
            </p>
          )}
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Save Profile
        </button>
      </div>
    </div>
  );
};

/* SECTION COMPONENT */
const Section = ({ title, children }) => (
  <div className="mb-8 border rounded-lg p-6 bg-gray-50">
    <h3 className="text-lg font-semibold mb-4 text-purple-600">
      {title}
    </h3>
    <div className="grid md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

/* INPUT COMPONENT */
const Input = ({ label, name, onChange }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-600">
      {label}
    </label>
    <input
      type="text"
      name={name}
      onChange={onChange}
      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
    />
  </div>
);

/* IMAGE UPLOAD COMPONENT */
const UploadImage = ({ image, setImage, label }) => (
  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg">
    {image ? (
      <img
        src={URL.createObjectURL(image)}
        alt="preview"
        className="w-24 h-24 object-cover rounded-full mb-3"
      />
    ) : (
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-3 flex items-center justify-center text-gray-400">
        Photo
      </div>
    )}
    <label className="cursor-pointer text-blue-600">
      {label}
      <input
        type="file"
        hidden
        onChange={(e) => setImage(e.target.files[0])}
      />
    </label>
  </div>
);

export default ProfilePage;
