import React, { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useModal } from "react-simple-modal-provider";
import { useSession } from "next-auth/react";
import axios from "axios";
import CivilEventsModal from "../components/Events/Events";
import EventFields from "../components/Events/EventFields";

export default function Event() {
  const { open: openModal } = useModal("CivilEventsModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const [eventData, seteventData] = useState([]); // [{},{}
  const { data: session } = useSession();

  const fetcheventData = async () => {
    try {
      const res = await axios.get(`/api/faculty/Events/fetch`, {
        params: {
          username: session.user.username,
        },
      });

      console.log(res);

      seteventData(res.data);
    } catch (error) {
      console.error("Error fetching personal information:", error);
    }
  };

  useEffect(() => {
    // fetch data from db
    if (session) {
      fetcheventData();
    }
    // setEducationalData(data)
  }, [session]);

  return (
    <div>
      {" "}
      <div className="flex justify-end items-center gap-x-8 text-2xl">
        <FiPlusCircle className="text-blue-900" onClick={openModal} />
        <RiDeleteBin6Line className="text-red-600" />
      </div>
      {isFormVisible && <CivilEventsModal />}
      {/* <ModalField data={eventData} /> */}
      {eventData.length > 0 &&
        eventData.map((event, index) => (
          <EventFields key={index} data={event} />
        ))}
    </div>
  );
}
