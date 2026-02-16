import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  PawPrint,
  DollarSign,
  Calendar,
} from "lucide-react";

const ProfilePage = () => {
  const [ownerPhoto, setOwnerPhoto] = useState(null);
  const [petPhoto, setPetPhoto] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    phone: "",
    age: "",
    gender: "",
    dob: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    jobRole: "",
    company: "",
    experience: "",
    expectedSalary: "",
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
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          🐾 Pet Owner Profile
        </h2>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-1">
            <span>Profile Completion</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* ACCOUNT INFO */}
        <Card title="Account Information">
          <Input icon={<User size={16} />} label="Username" name="username" onChange={handleChange} />
          <Input icon={<Mail size={16} />} label="Email ID" name="email" type="email" onChange={handleChange} />
        </Card>

        {/* OWNER PHOTO */}
        <Card title="Owner Profile Photo">
          <UploadImage image={ownerPhoto} setImage={setOwnerPhoto} />
        </Card>

        {/* PERSONAL DETAILS */}
        <Card title="Personal Details">
          <Input icon={<User size={16} />} label="Full Name" name="fullName" onChange={handleChange} />
          <Input icon={<Phone size={16} />} label="Phone Number" name="phone" type="tel" onChange={handleChange} />
          <Input icon={<Calendar size={16} />} label="Age" name="age" type="number" onChange={handleChange} />

          <div>
            <label className="block text-sm mb-1 text-gray-600">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>
        </Card>

        {/* ADDRESS DETAILS */}
        <Card title="Address Details">
          <Input icon={<MapPin size={16} />} label="Street Address" name="street" onChange={handleChange} />
          <Input icon={<MapPin size={16} />} label="City" name="city" onChange={handleChange} />
          <Input icon={<MapPin size={16} />} label="State" name="state" onChange={handleChange} />
          <Input icon={<MapPin size={16} />} label="Country" name="country" onChange={handleChange} />
          <Input icon={<MapPin size={16} />} label="Pincode" name="pincode" type="number" onChange={handleChange} />
        </Card>

        {/* WORK EXPERIENCE */}
        <Card title="Work Experience">
          <Input icon={<Briefcase size={16} />} label="Job Role" name="jobRole" onChange={handleChange} />
          <Input icon={<Briefcase size={16} />} label="Company Name" name="company" onChange={handleChange} />
          <Input icon={<Briefcase size={16} />} label="Years of Experience" name="experience" type="number" onChange={handleChange} />
          <Input icon={<DollarSign size={16} />} label="Expected Salary" name="expectedSalary" type="number" onChange={handleChange} />
        </Card>

        {/* EDUCATION */}
        <Card title="Education">
          <Input icon={<GraduationCap size={16} />} label="Degree" name="degree" onChange={handleChange} />
          <Input icon={<GraduationCap size={16} />} label="University" name="university" onChange={handleChange} />
        </Card>

        {/* PET PROFILE */}
        <Card title="Pet Profile 🐶">
          <UploadImage image={petPhoto} setImage={setPetPhoto} />
          <Input icon={<PawPrint size={16} />} label="Pet Name" name="petName" onChange={handleChange} />
          <Input icon={<PawPrint size={16} />} label="Pet Type (Dog/Cat)" name="petType" onChange={handleChange} />
          <Input icon={<PawPrint size={16} />} label="Breed" name="petBreed" onChange={handleChange} />
          <Input icon={<Calendar size={16} />} label="Pet Age" name="petAge" type="number" onChange={handleChange} />
        </Card>

        {/* ID PROOF */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-purple-600">
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

        {/* BUTTONS */}
        <div className="flex gap-4 mt-6">
          <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
            Save Profile
          </button>
          <button className="w-full bg-gray-300 py-3 rounded-lg hover:bg-gray-400 transition">
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

/* CARD COMPONENT */
const Card = ({ title, children }) => (
  <div className="mb-8 bg-gray-50 p-6 rounded-xl border shadow-sm">
    <h3 className="text-lg font-semibold text-purple-600 mb-4">
      {title}
    </h3>
    <div className="grid md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

/* INPUT COMPONENT */
const Input = ({ icon, label, name, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-600">
      {label}
    </label>
    <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-purple-400">
      {icon && <span className="text-gray-400 mr-2">{icon}</span>}
      <input
        type={type}
        name={name}
        onChange={onChange}
        className="w-full p-2 outline-none"
      />
    </div>
  </div>
);

/* IMAGE UPLOAD */
const UploadImage = ({ image, setImage }) => (
  <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-300 p-4 rounded-xl w-full">
    {image ? (
      <img
        src={URL.createObjectURL(image)}
        alt="preview"
        className="w-20 h-20 object-cover rounded-full mb-2 border-2 border-purple-400"
      />
    ) : (
      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-purple-400 text-sm mb-2">
        Photo
      </div>
    )}
    <label className="text-sm text-purple-600 cursor-pointer">
      Upload
      <input
        type="file"
        hidden
        onChange={(e) => setImage(e.target.files[0])}
      />
    </label>
  </div>
);

export default ProfilePage;
