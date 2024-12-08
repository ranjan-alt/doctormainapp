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
  console.log(docId, "docId on frontend"); // i am getting docId HERE
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } =
    useContext(AppContext);
  console.log(doctors.slots, "slotss");
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(false);
  console.log(docInfo, "docinfo");
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  // const { fetchReviews, review } = useReview();
  // const [reviews, setReviews] = useState([]);

  // console.log(fetchReviews);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (docId) {
  //     console.log(docId, "dooooocc");
  //     const getReviews = async () => {
  //       try {
  //         const reviews = await fetchReviews(docId, backendUrl, toast);
  //         setReviews(reviews);
  //         console.log(reviews, "reviews received"); //undefined
  //       } catch (error) {
  //         console.log(error, "Error fetching reviews");
  //       }
  //     };

  //     getReviews();
  //   }
  // }, [docId, backendUrl, toast]);

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

  // const getAvailableSolts = async () => {
  //   setDocSlots([]);

  //   // getting current date
  //   let today = new Date();

  //   for (let i = 0; i < 7; i++) {
  //     // getting date with index
  //     let currentDate = new Date(today);
  //     currentDate.setDate(today.getDate() + i);

  //     // setting end time of the date with index
  //     let endTime = new Date();
  //     endTime.setDate(today.getDate() + i);
  //     endTime.setHours(21, 0, 0, 0);

  //     // setting hours
  //     if (today.getDate() === currentDate.getDate()) {
  //       currentDate.setHours(
  //         currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
  //       );
  //       currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
  //     } else {
  //       currentDate.setHours(10);
  //       currentDate.setMinutes(0);
  //     }

  //     let timeSlots = [];

  //     while (currentDate < endTime) {
  //       let formattedTime = currentDate.toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       });

  //       let day = currentDate.getDate();
  //       let month = currentDate.getMonth() + 1;
  //       let year = currentDate.getFullYear();

  //       const slotDate = day + "_" + month + "_" + year;
  //       const slotTime = formattedTime;

  //       const isSlotAvailable =
  //         docInfo.slots_booked[slotDate] &&
  //         docInfo.slots_booked[slotDate].includes(slotTime)
  //           ? false
  //           : true;

  //       if (isSlotAvailable) {
  //         // Add slot to array
  //         timeSlots.push({
  //           datetime: new Date(currentDate),
  //           time: formattedTime,
  //         });
  //       }

  //       // Increment current time by 30 minutes
  //       currentDate.setMinutes(currentDate.getMinutes() + 30);
  //     }

  //     setDocSlots((prev) => [...prev, timeSlots]);
  //   }
  // };
  const getAvailableSlots = () => {
    const slots = [];
    if (docInfo?.slots?.length > 0) {
      docInfo.slots.forEach((slot) => {
        if (slot.day) {
          const availableSlots = generateSlots(slot.fromTime, slot.toTime);
          slots.push({ day: slot.day, slots: availableSlots });
        }
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
              </div>
            ))}
        </div>
        {selectedDay && (
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots
              .filter((slot) => slot.day === selectedDay)
              .map((slot, index) => (
                <div key={index} className="flex gap-2">
                  {slot.slots.map((time, i) => (
                    <span
                      key={i}
                      onClick={() => {
                        setSelectedTime(time);
                        setSlotIndex(index);
                      }}
                      className={`px-4 py-2 rounded-full cursor-pointer text-sm font-light flex-shrink-0 
                ${
                  selectedTime === time
                    ? "bg-[#2563eb] text-white"
                    : "text-[#949494] border border-[#B4B4B4]"
                } 
                hover:bg-[#2563eb] hover:text-white transition-colors`}
                    >
                      {time}
                    </span>
                  ))}
                </div>
              ))}
          </div>
        )}
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
