import axios from 'axios';
export const getAccessTokenRealms = async () => {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'password');
  formData.append('client_id', process.env.CLIENT_ID_KEYCLOCK);
  formData.append('username', process.env.USER_NAME_KEYCLOCK);
  formData.append('password', process.env.PASSWORDS_KEYCLOCK);

  try {
    const data = await axios.post(
      `https://internship-id.zodinet.tech/realms/master/protocol/openid-connect/token`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return data.data;
  } catch (error) {
    return error.message;
  }
};
export const signUpKeyClock = async (signUpInfo, accessToken) => {
  try {
    const data = await axios.post(
      `https://internship-id.zodinet.tech/admin/realms/Booking/users`,
      signUpInfo,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return data.data;
  } catch (error) {
    return error.message;
  }
};
