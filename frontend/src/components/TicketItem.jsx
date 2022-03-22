import { Link } from "react-router-dom";

const TicketItem = ({ ticket }) => {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("es-ES")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status.toLowerCase()}`}>
        {ticket.status}
      </div>
      <Link to={`/tickets/${ticket._id}`} className="btn btn-reverse btn-sm">
        Open
      </Link>
    </div>
  );
};
export default TicketItem;
