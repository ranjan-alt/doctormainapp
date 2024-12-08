import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [newSlot, setNewSlot] = useState({ day: "", fromTime: "", toTime: "" });

  const updateProfile = async () => {
    try {
      const updateData = {
        docId: profileData._id,
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available,
        slots: profileData.slots,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }

      setIsEdit(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Add new slot to profile
  const addSlot = () => {
    if (newSlot.day && newSlot.fromTime && newSlot.toTime) {
      const slots = profileData?.slots || [];

      // Ensure the slot has the correct structure
      const updatedSlot = {
        day: newSlot.day,
        fromTime: newSlot.fromTime,
        toTime: newSlot.toTime,
      };

      const isSlotExist = slots.some(
        (slot) =>
          slot.day === newSlot.day &&
          slot.fromTime === newSlot.fromTime &&
          slot.toTime === newSlot.toTime
      );

      if (isSlotExist) {
        toast.error("Slot already exists!");
        return;
      }

      const updatedSlots = [...slots, updatedSlot];
      setProfileData((prev) => ({ ...prev, slots: updatedSlots }));
      setNewSlot({ day: "", fromTime: "", toTime: "" });
    } else {
      toast.error("Please provide both day and time.");
    }
  };
  useEffect(() => {
    if (dToken) {
      getProfileData();
      console.log(profileData?.slots, "ranjan");
    }
    const transformedSlots = profileData?.slots?.map((slot) => {
      if (slot.time) {
        return {
          ...slot,
          fromTime: slot.time, // Assuming the single time is the start time
          toTime: slot.time, // You can modify this logic based on your needs
        };
      }
      return slot;
    });
    console.log(transformedSlots);
  }, [dToken]);

  return (
    profileData && (
      <div className="w-full">
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-[#2563eb]/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* ----- Doc Info : name, degree, experience ----- */}

            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>

            {/* ----- Doc About ----- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
                About :
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {isEdit ? (
                  <textarea
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        about: e.target.value,
                      }))
                    }
                    type="text"
                    className="w-full outline-primary p-2"
                    rows={8}
                    value={profileData.about}
                  />
                ) : (
                  profileData.about
                )}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input
                type="checkbox"
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
              />
              <label htmlFor="">Available</label>
            </div>

            {/* Display and edit slots */}
            {isEdit && (
              <div className="mt-4 space-y-4">
                <div className="mt-4 flex items-center space-x-4">
                  {/* Day Dropdown */}
                  <div className="flex flex-col space-y-1 w-32">
                    <label
                      htmlFor="day"
                      className="text-sm font-medium text-gray-700"
                    >
                      Select Day
                    </label>
                    <select
                      id="day"
                      value={newSlot.day}
                      onChange={(e) =>
                        setNewSlot((prev) => ({ ...prev, day: e.target.value }))
                      }
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Select Day</option>
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>

                  {/* From Time */}
                  <div className="flex flex-col space-y-1 w-32">
                    <label
                      htmlFor="fromTime"
                      className="text-sm font-medium text-gray-700"
                    >
                      From Time
                    </label>
                    <input
                      type="time"
                      id="fromTime"
                      value={newSlot.fromTime}
                      onChange={(e) =>
                        setNewSlot((prev) => ({
                          ...prev,
                          fromTime: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  {/* To Time */}
                  <div className="flex flex-col space-y-1 w-32">
                    <label
                      htmlFor="toTime"
                      className="text-sm font-medium text-gray-700"
                    >
                      To Time
                    </label>
                    <input
                      type="time"
                      id="toTime"
                      value={newSlot.toTime}
                      onChange={(e) =>
                        setNewSlot((prev) => ({
                          ...prev,
                          toTime: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  {/* Add Slot Button */}
                  <button
                    onClick={addSlot}
                    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
                  >
                    Add Slot
                  </button>
                </div>

                <div className="mt-4">
                  <p>Existing Slots:</p>
                  <ul>
                    {profileData?.slots?.map((slot, index) => (
                      <li key={index}>
                        {slot.day} - {slot.fromTime} to {slot.toTime}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-[#2563eb] hover:text-white transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit((prev) => !prev)}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-[#2563eb] hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
