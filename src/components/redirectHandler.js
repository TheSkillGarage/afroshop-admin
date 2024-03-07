import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import Cookies from 'js-cookie';
import { userLogin, putRequest } from "../redux/action";
import { AFROADMIN_TOKEN } from "../utils/constants";
import { getTokenFromCookie } from "../utils";
import { expirationDate } from "../utils";

const RedirectHandler = () => { 
  const { provider } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

   const token = getTokenFromCookie();

    const updateUserConfirmation = async () => {
    try {
      if (!user || !user.id) {
        throw new Error('User information is missing or incomplete');
      }

      const [success, responseData] = await putRequest(
        `/api/users/${user.id}`,
        {
          role: 3,
        },
        token
      );
      if (!success || responseData?.error) {
        console.error(responseData?.error?.message || 'An error occurred, please try again');
      } else {
        dispatch(userLogin(responseData));
      }
    } catch (error) {
      console.error('Error updating user confirmation:', error);
    }
  };

  useEffect(() => {
    const handleRedirect = async () => {
      const { search } = location;
      const params = new URLSearchParams(search);
      const idToken = params.get('id_token');

      if (idToken) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/auth/${provider}/callback${search}`
          );

          if (res.status !== 200) {
            throw new Error(`Couldn't authenticate with Strapi. Status: ${res.status}`);
          }

          const { jwt, user } = res.data;
          dispatch(userLogin(user));
         
          Cookies.set(AFROADMIN_TOKEN, jwt, { expires: expirationDate })
          updateUserConfirmation();
          navigate('/dashboard');
        } catch (error) {
          console.error('Authentication error:', error.message);
          navigate('/404');
        } finally {
          setLoading(false);
        }
      } else {
        console.error('ID token not found');
        navigate('/404');
        setLoading(false);
      }
    };

    handleRedirect();
  }, [provider, navigate, location, dispatch]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>Authentication complete. Redirecting...</div>
      )}
    </div>
  );
};

export default RedirectHandler;
