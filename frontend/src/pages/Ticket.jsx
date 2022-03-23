import { useSelector, useDispatch } from "react-redux";
import { getTicketById, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, reset as notesReset } from "../features/notes/noteSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Ticket = () => {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );
  const { notes, isLoading: notesLoading } = useSelector(
    (state) => state.notes
  );
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicketById(params.ticketId));
    dispatch(getNotes(params.ticketId));
  }, [dispatch, isError, message, params.ticketId]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticket._id));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  if (isLoading || notesLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h2>Error, Something went wrong</h2>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url={"/tickets"} />
        <h2>
          Ticket Id: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("es-ES")}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Product:</h3>
          <p>{ticket.product}</p>
          <hr />
          <h3>Description:</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </header>
      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
};
export default Ticket;
