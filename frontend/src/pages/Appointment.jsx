import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";
import { useReview } from "../context/ReviewContext";
import ReviewPage from "./ReviewPage";

const Appointment = () => {
  const { docId } = useParams();

  const { doctors, currencySymbol, backendUrl, token, getDoctosData } =
    useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(false);

  const [docSlots, setDocSlots] = useState([]);

  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const generateSlots = (fromTime, toTime) => {
    const slots = [];
    const [fromHours, fromMinutes] = fromTime.split(":").map(Number);
    const [toHours, toMinutes] = toTime.split(":").map(Number);

    let current = new Date();
    current.setHours(fromHours, fromMinutes, 0, 0);
    const end = new Date();
    end.setHours(toHours, toMinutes, 0, 0);

    while (current < end) {
      const timeString = current.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      slots.push(timeString);
      current.setMinutes(current.getMinutes() + 15);
    }

    return slots;
  };

  const getAvailableSlots = () => {
    const slots = [];
    const daysOfWeek = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];

    const today = new Date(); // Current date
    today.setHours(0, 0, 0, 0); // Reset time for consistent date comparison

    const currentDayIndex = today.getDay(); // Index of the current day (0 for Sunday, etc.)

    const getDateForDay = (dayIndex) => {
      const currentDate = new Date(today); // Clone today
      const daysDiff =
        dayIndex >= currentDayIndex
          ? dayIndex - currentDayIndex
          : 7 - (currentDayIndex - dayIndex); // Adjust for wrapping around to the next week
      currentDate.setDate(today.getDate() + daysDiff); // Adjust the date
      return currentDate;
    };

    // Generate slots for each day in order
    if (docInfo?.slots?.length > 0) {
      const orderedSlots = [...docInfo.slots].sort((a, b) => {
        const aDayIndex = daysOfWeek.indexOf(a.day.toUpperCase());
        const bDayIndex = daysOfWeek.indexOf(b.day.toUpperCase());
        const normalizedADayIndex =
          aDayIndex >= currentDayIndex
            ? aDayIndex - currentDayIndex
            : aDayIndex + 7 - currentDayIndex;
        const normalizedBDayIndex =
          bDayIndex >= currentDayIndex
            ? bDayIndex - currentDayIndex
            : bDayIndex + 7 - currentDayIndex;
        return normalizedADayIndex - normalizedBDayIndex;
      });

      orderedSlots.forEach((slot) => {
        const slotDayIndex = daysOfWeek.indexOf(slot.day.toUpperCase());
        const slotDate = getDateForDay(slotDayIndex);

        // Get booked slots for this day
        const bookedSlots = docInfo.slots_booked?.[slot.day] || [];

        // Generate available slots for this day
        const availableSlots = generateSlots(slot.fromTime, slot.toTime).map(
          (time) => {
            const isBooked = bookedSlots.includes(time); // Check if time is booked
            return {
              time,
              available: !isBooked,
            };
          }
        );

        // Add the slot details
        slots.push({
          day: slot.day,
          date: slotDate.toLocaleDateString(),
          slots: availableSlots,
        });
      });
    }

    setDocSlots(slots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book appointment");
      return navigate("/login");
    }

    // Ensure we get a valid date from the available slots
    const selectedSlot = docSlots[slotIndex]?.slots?.find(
      (slot) => slot === selectedTime
    );
    // if (!selectedSlot) {
    //   toast.error("Invalid time selected");
    //   return;
    // }

    // Get the correct selected date
    const date = new Date();
    date.setDate(date.getDate() + selectedDay); // Ensure you're getting the right day index

    // Set the selected time in the format "HH:mm"
    const [hour, minute] = selectedTime.split(":");
    date.setHours(hour, minute);

    // Format the date and time for the request
    let day = date.getDate();
    let month = date.getMonth() + 1; // Month is zero-based
    let year = date.getFullYear();

    const slotDate = selectedDay;
    const slotTime = selectedTime; // Already in HH:mm format

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return docInfo ? (
    <div>
      {/* ---------- Doctor Details ----------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-[#2563eb] w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt=""
          />
        </div>

        <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* ----- Doc Info : name, degree, experience ----- */}

          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {docInfo.name}{" "}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>

          {/* ----- Doc About ----- */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
              About <img className="w-3" src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-800">
              {currencySymbol}
              {docInfo.fees}
            </span>{" "}
          </p>
        </div>
      </div>

      {/* Booking slots */}
      <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
        <p>Available Days</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots.map((slot, index) => (
              <div
                onClick={() => {
                  setSelectedDay(slot.day);
                  setSlotIndex(index);
                }}
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  selectedDay === slot.day
                    ? "bg-[#2563eb] text-white"
                    : "border border-[#DDDDDD]"
                }`}
              >
                <p>{slot.day}</p>
                <p className="text-xs"> {slot.date}</p>
              </div>
            ))}
        </div>

        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {selectedDay &&
            docSlots
              .filter((slot) => slot.day === selectedDay)
              .map((slot, index) => (
                <div key={index} className="flex gap-2">
                  {slot.slots.map((slotObj, i) => (
                    <span
                      key={i}
                      onClick={() => {
                        if (slotObj.available) {
                          setSelectedTime(slotObj.time);
                          setSlotIndex(index);
                        }
                      }}
                      className={`px-4 py-2 rounded-full cursor-pointer text-sm font-light flex-shrink-0 
              ${
                slotObj.available
                  ? selectedTime === slotObj.time
                    ? "bg-[#2563eb] text-white"
                    : "text-[#949494] border border-[#B4B4B4]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } 
              ${slotObj.available ? "hover:bg-[#2563eb] hover:text-white" : ""}
              transition-colors`}
                    >
                      {slotObj.available ? slotObj.time : "Not Available"}
                    </span>
                  ))}
                </div>
              ))}
        </div>
        <button
          onClick={bookAppointment}
          className="bg-[#2563eb] text-white text-sm font-light px-20 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>

      <ReviewPage docId={docId} backendUrl={backendUrl} />
      {/* Listing Releated Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null;
};

export default Appointment;
