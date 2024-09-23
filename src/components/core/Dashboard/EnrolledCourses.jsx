
import { useSelector } from "react-redux";

export default function MessOwner() {
  const user = useSelector((state) => state.auth.user); // assuming this is how user data is accessed

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-richblack-5">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-richblack-200">
          This are Favourite  Mess
        </p>
      </div>
    </div>
  );
}