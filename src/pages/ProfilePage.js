import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  PawPrint,
  Calendar,
  CreditCard,
} from "lucide-react";

const ProfilePage = () => {
  const [ownerPhoto, setOwnerPhoto] = useState(null);
  const [petPhoto, setPetPhoto] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

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
    idProofNumber: "",
    numberOfPets: "",
    petName: "",
    petType: "",
    petBreed: "",
    petAge: "",
    idProofFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  const handleEdit = () => {
    setIsSaved(false);
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

        {/* SAVE STATUS BAR */}
        {isSaved && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center mb-6 font-medium">
            Profile Saved Successfully ✅
          </div>
        )}

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
          <Input icon={<User size={16} />} label="Username" name="username" onChange={handleChange} disabled={isSaved}/>
          <Input icon={<Mail size={16} />} label="Email ID" name="email" type="email" onChange={handleChange} disabled={isSaved}/>
        </Card>

        {/* OWNER PHOTO */}
        <Card title="Owner Profile Photo">
          <UploadImage image={ownerPhoto} setImage={setOwnerPhoto} disabled={isSaved}/>
        </Card>

        {/* PERSONAL DETAILS */}
        <Card title="Personal Details">
          <Input icon={<User size={16} />} label="Full Name" name="fullName" onChange={handleChange} disabled={isSaved}/>
          <Input icon={<Phone size={16} />} label="Phone Number" name="phone" type="tel" onChange={handleChange} disabled={isSaved}/>
          <Input icon={<Calendar size={16} />} label="Age" name="age" type="number" onChange={handleChange} disabled={isSaved}/>
          
          <div>
            <label className="block text-sm mb-1 text-gray-600">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              disabled={isSaved}
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Date of Birth</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              disabled={isSaved}
              className="w-full border p-3 rounded-lg"
            />
          </div>
        </Card>

        {/* ADDRESS DETAILS */}
        <Card title="Address Details">
          <Input icon={<MapPin size={16} />} label="Street" name="street" onChange={handleChange} disabled={isSaved}/>
          <Input icon={<MapPin size={16} />} label="City" name="city" onChange={handleChange} disabled={isSaved}/>
          <Input icon={<MapPin size={16} />} label="State" name="state" onChange={handleChange} disabled={isSaved}/>
          <Input icon={<MapPin size={16} />} label="Country" name="country" onChange={handleChange} disabled={isSaved}/>
          <Input icon={<MapPin size={16} />} label="Pincode" name="pincode" type="number" onChange={handleChange} disabled={isSaved}/>
        </Card>

        {/* PET DETAILS */}
        <Card title="Pet Details 🐶">
          <UploadImage image={petPhoto} setImage={setPetPhoto} disabled={isSaved}/>
          <Input icon={<PawPrint size={16} />} label="Number of Pets" name="numberOfPets" type="number" onChange={handleChange} disabled={isSaved}/>
          <Input icon={<PawPrint size={16} />} label="Pet Name" name="petName" onChange={handleChange} disabled={isSaved}/>
          <Input icon={<PawPrint size={16} />} label="Pet Type" name="petType" onChange={handleChange} disabled={isSaved}/>
          <Input icon={<PawPrint size={16} />} label="Breed" name="petBreed" onChange={handleChange} disabled={isSaved}/>
          <Input icon={<Calendar size={16} />} label="Pet Age" name="petAge" type="number" onChange={handleChange} disabled={isSaved}/>
        </Card>

        {/* ID PROOF */}
        <Card title="ID Proof">
          <Input icon={<CreditCard size={16} />} label="ID Proof Number" name="idProofNumber" onChange={handleChange} disabled={isSaved}/>
          <div>
            <label className="block text-sm mb-1 text-gray-600">Upload ID Proof</label>
            <input
              type="file"
              name="idProofFile"
              onChange={handleChange}
              disabled={isSaved}
              className="border p-3 w-full rounded-lg"
            />
            {formData.idProofFile && (
              <p className="text-green-600 mt-2">
                Uploaded: {formData.idProofFile.name}
              </p>
            )}
          </div>
        </Card>

        {/* SAVE / EDIT BUTTONS */}
        <div className="flex gap-4 mt-6">
          {!isSaved ? (
            <button
              onClick={handleSave}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Save Profile
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

/* CARD */
const Card = ({ title, children }) => (
  <div className="mb-8 bg-gray-50 p-6 rounded-xl border shadow-sm">
    <h3 className="text-lg font-semibold text-purple-600 mb-4">{title}</h3>
    <div className="grid md:grid-cols-2 gap-4">{children}</div>
  </div>
);

/* INPUT */
const Input = ({ icon, label, name, onChange, type = "text", disabled }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-600">{label}</label>
    <div className="flex items-center border rounded-lg px-3">
      {icon && <span className="text-gray-400 mr-2">{icon}</span>}
      <input
        type={type}
        name={name}
        onChange={onChange}
        disabled={disabled}
        className="w-full p-2 outline-none bg-transparent"
      />
    </div>
  </div>
);

/* IMAGE UPLOAD */
const UploadImage = ({ image, setImage, disabled }) => (
  <div className="flex flex-col items-center border-2 border-dashed border-purple-300 p-4 rounded-xl w-full">
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
    {!disabled && (
      <label className="text-sm text-purple-600 cursor-pointer">
        Upload
        <input
          type="file"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
    )}
  </div>
);

export default ProfilePage;
