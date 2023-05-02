import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {
  removeToken: () => void;
};

function Logout({ removeToken }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    removeToken();
    navigate("/");
  }, [navigate, removeToken]);

  return null;
}

export default Logout;
