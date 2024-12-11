import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-multi-date-picker";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [newSlot, setNewSlot] = useState({ day: "", fromTime: "", toTime: "" });
  const [selectedDates, setSelectedDates] = useState([]);
  console.log(selectedDates, "selected");
  const [editingSlotIndex, setEditingSlotIndex] = useState(null);

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
    if (!selectedDates.length) {
      toast.error("Please select at least one date.");
      return;
    }
    if (!newSlot.fromTime || !newSlot.toTime) {
      toast.error("Please provide both from and to times.");
      return;
    }

    const slots = profileData?.slots || [];
    const updatedSlots = [...slots];

    // Iterate over selectedDates and create a slot for each date
    selectedDates.forEach((date) => {
      const day = date.format("YYYY-MM-DD"); // Format date as needed

      const isSlotExist = slots.some(
        (slot) =>
          slot.day === day &&
          slot.fromTime === newSlot.fromTime &&
          slot.toTime === newSlot.toTime
      );

      if (!isSlotExist) {
        updatedSlots.push({
          day,
          fromTime: newSlot.fromTime,
          toTime: newSlot.toTime,
        });
      }
    });

    // Update profile data with new slots
    setProfileData((prev) => ({ ...prev, slots: updatedSlots }));

    // Clear the selected dates and time inputs
    setSelectedDates([]);
    setNewSlot({ day: "", fromTime: "", toTime: "" });

    toast.success("Slots added successfully!");
  };

  const saveSlotEdit = (index, updatedSlot) => {
    const updatedSlots = [...profileData.slots];
    updatedSlots[index] = updatedSlot;
    setProfileData((prev) => ({ ...prev, slots: updatedSlots }));
    setEditingSlotIndex(null);
    toast.success("Slot updated successfully!");
  };

  const deleteSlot = (index) => {
    const updatedSlots = profileData.slots.filter((_, i) => i !== index);
    setProfileData((prev) => ({ ...prev, slots: updatedSlots }));
    toast.success("Slot deleted successfully!");
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
  const handleDateChange = (date) => {
    if (selectedDates.some((d) => d.getTime() === date.getTime())) {
      // Remove date if already selected
      setSelectedDates(
        selectedDates.filter((d) => d.getTime() !== date.getTime())
      );
    } else {
      // Add new date
      setSelectedDates([...selectedDates, date]);
    }
  };
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
                <DatePicker
                  multiple
                  value={selectedDates}
                  onChange={setSelectedDates}
                  format="YYYY-MM-DD"
                  className="custom-datepicker"
                />

                <div className="flex gap-4">
                  <input
                    type="time"
                    value={newSlot.fromTime}
                    onChange={(e) =>
                      setNewSlot((prev) => ({
                        ...prev,
                        fromTime: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="time"
                    value={newSlot.toTime}
                    onChange={(e) =>
                      setNewSlot((prev) => ({
                        ...prev,
                        toTime: e.target.value,
                      }))
                    }
                  />
                </div>

                <button
                  onClick={addSlot}
                  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                  Add Slot
                </button>
              </div>
            )}
            <div className="mt-4">
              <p className="font-medium">Existing Slots:</p>
              <ul>
                {profileData?.slots?.map((slot, index) => {
                  const isEditing = editingSlotIndex === index;
                  return (
                    <li key={index} className="flex items-center gap-4 text-sm">
                      {isEditing ? (
                        <>
                          <input
                            type="date"
                            value={slot.day}
                            onChange={(e) =>
                              saveSlotEdit(index, {
                                ...slot,
                                day: e.target.value,
                              })
                            }
                          />
                          <input
                            type="time"
                            value={slot.fromTime}
                            onChange={(e) =>
                              saveSlotEdit(index, {
                                ...slot,
                                fromTime: e.target.value,
                              })
                            }
                          />
                          <input
                            type="time"
                            value={slot.toTime}
                            onChange={(e) =>
                              saveSlotEdit(index, {
                                ...slot,
                                toTime: e.target.value,
                              })
                            }
                          />
                          <button
                            onClick={() => setEditingSlotIndex(null)}
                            className="text-blue-500"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <span>
                            {slot.day} - {slot.fromTime} to {slot.toTime}
                          </span>
                          {isEdit && (
                            <>
                              <button
                                onClick={() => setEditingSlotIndex(index)}
                                className="text-blue-500"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteSlot(index)}
                                className="text-red-500 ml-2"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
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
