import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  getToken: () => string | undefined;
};

const Protected = ({ getToken }: Props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/protected", {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (getToken()) {
      fetchData();
    }
  }, [getToken]);
  return (
    <div>
      {data ? (
        <p>Response data: {JSON.stringify(data)}</p>
      ) : (
        <p>Loading secured data...</p>
      )}
    </div>
  );
};

export default Protected;
