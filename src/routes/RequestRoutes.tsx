import { Route } from "react-router-dom";
import Requests from "../pages/Requests";
import RequestChat from "../pages/RequestChat";

const RequestRoutes = (
  <>
    <Route path="/requests" element={<Requests />} />
    <Route path="/request/:id" element={<RequestChat />} />
  </>
);

export default RequestRoutes;
