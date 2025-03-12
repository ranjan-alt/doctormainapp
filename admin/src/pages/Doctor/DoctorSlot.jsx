import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-multi-date-picker";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
const DoctorSlot = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editingSlotIndex, setEditingSlotIndex] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [newSlot, setNewSlot] = useState({ day: "", fromTime: "", toTime: "" });

  const { profileData, setProfileData, dToken, getProfileData } =
    useContext(DoctorContext);
  const { backendUrl } = useContext(AppContext);
  //add slot
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

  //update slot
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

  //save slot edit

  const saveSlotEdit = (index, updatedSlot) => {
    const updatedSlots = [...profileData.slots];
    updatedSlots[index] = updatedSlot;
    setProfileData((prev) => ({ ...prev, slots: updatedSlots }));
    setEditingSlotIndex(null);
    toast.success("Slot updated successfully!");
  };

  //delete solot

  const deleteSlot = (index) => {
    const updatedSlots = profileData.slots.filter((_, i) => i !== index);
    setProfileData((prev) => ({ ...prev, slots: updatedSlots }));
    toast.success("Slot deleted successfully!");
  };

  // transformed slot

  return (
    <h1>
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
    </h1>
  );
};

export default DoctorSlot;
