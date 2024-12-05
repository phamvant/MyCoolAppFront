import { Route } from "react-router-dom"
import Requests from "../pages/Requests"

const RequestRoutes = (
    <>
        <Route path="/requests" element={<Requests />} />
    </>
)

export default RequestRoutes;